import Doctor from "../models/Doctor.js";
import AppError from "../utils/AppError.js";
import Appointment from "../models/Appointment.js";
import {
    getDayName,
    convertToMinutes,
    getAppointmentMinutes,
    calculateAppointmentEndTime,
    isTimeWithinWorkingHours,
    isBreakTime,
    hasTimeOverlap,
} from "../utils/appointment.js";
import { APPOINTMENT_STATUS } from "../constants/appointmentStatus.js";
import { processRefund } from "./payment.services.js";
import * as notificationService from "./notification.services.js";

export const bookAppointment = async (patientId, appointmentData) => {
    const { doctorId, appointmentDateTime, consultationType, notes } = appointmentData;

    if (!doctorId || !appointmentDateTime) {
        throw new AppError("Doctor and appointment date are required.", 400);
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
        throw new AppError("Doctor not found.", 404);
    }

    if (doctor.status !== "approved") {
        throw new AppError("Doctor is not available for booking.", 400);
    }

    if (!doctor.isAvailable) {
        throw new AppError("Doctor is currently unavailable.", 400);
    }

    const day = getDayName(appointmentDateTime);
    const availability = doctor.availability.find((item) => item.day === day);
    if (!availability) {
        throw new AppError("Doctor is not available on this day.", 400);
    }

    const startTime = new Date(appointmentDateTime).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    const endTime = calculateAppointmentEndTime(startTime, doctor.slotDuration);

    if (
        !isTimeWithinWorkingHours(
            startTime,
            endTime,
            availability.startTime,
            availability.endTime
        )
    ) {
        throw new AppError("Selected time is outside doctor's working hours.", 400);
    }

    if (
        availability.breakStart &&
        availability.breakEnd &&
        hasTimeOverlap(startTime, endTime, availability.breakStart, availability.breakEnd)
    ) {
        throw new AppError("Doctor is on break during this time.", 400);
    }

    const startOfDay = new Date(appointmentDateTime);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(appointmentDateTime);
    endOfDay.setHours(23, 59, 59, 999);

    const existingAppointments = await Appointment.find({
        doctor: doctor._id,
        appointmentDateTime: {
            $gte: startOfDay,
            $lte: endOfDay,
        },
        status: {
            $nin: ["cancelled", "rejected"],
        },
    });

    for (const existing of existingAppointments) {
        const existingStart = new Date(existing.appointmentDateTime);
        const existingEnd = new Date(
            existingStart.getTime() + (existing.duration || doctor.slotDuration) * 60 * 1000
        );

        const existingStartTime = existingStart.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });

        const existingEndTime = existingEnd.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });

        if (hasTimeOverlap(startTime, endTime, existingStartTime, existingEndTime)) {
            throw new AppError("This appointment slot is already booked.", 409);
        }
    }

    const appointment = await Appointment.create({
        patient: patientId,
        doctor: doctor._id,
        appointmentDateTime,
        duration: doctor.slotDuration,
        consultationType,
        consultationFee: doctor.consultationFee,
        notes,
    });

    await appointment.populate([
        {
            path: "patient",
            select: "fullName email avatar",
        },
        {
            path: "doctor",
            select: "specialization consultationFee hospital clinicalAddress",
            populate: {
                path: "user",
                select: "fullName email avatar",
            },
        },
    ]);

    try {
        await notificationService.createNotification({
            user: appointment.patient._id || appointment.patient,
            title: "Appointment Booked",
            message: "Your appointment has been booked successfully.",
            type: "appointment",
            referenceId: appointment._id,
        });

        await notificationService.createNotification({
            user: doctor.user._id || doctor.user,
            title: "New Appointment",
            message: "A new appointment has been booked with you.",
            type: "appointment",
            referenceId: appointment._id,
        });
    } catch (notifErr) {
        console.error("Notification creation error on bookAppointment:", notifErr);
    }

    return appointment;
};

export const getMyAppointments = async (patientId, query = {}) => {
    const { page = 1, limit = 20, status } = query || {};
    const filter = { patient: patientId };

    if (status && status !== "all") {
        filter.status = status;
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const totalAppointments = await Appointment.countDocuments(filter);

    const appointments = await Appointment.find(filter)
        .populate({
            path: "doctor",
            select: "specialization consultationFee hospital clinicalAddress profileImage",
            populate: {
                path: "user",
                select: "fullName email avatar",
            },
        })
        .sort({ appointmentDateTime: -1 })
        .skip(skip)
        .limit(limitNumber);

    return {
        appointments,
        totalAppointments,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalAppointments / limitNumber),
    };
};

export const getAppointmentById = async (appointmentId, userId) => {
    const appointment = await Appointment.findById(appointmentId)
        .populate({
            path: "patient",
            select: "fullName email avatar phone gender",
        })
        .populate({
            path: "doctor",
            select: "specialization consultationFee hospital clinicalAddress profileImage",
            populate: {
                path: "user",
                select: "fullName email avatar",
            },
        });

    if (!appointment) {
        throw new AppError("Appointment not found.", 404);
    }

    const doctor = await Doctor.findOne({ user: userId });
    const isPatient = appointment.patient._id.toString() === userId.toString();
    const isDoctor = doctor && appointment.doctor._id.toString() === doctor._id.toString();

    if (!isPatient && !isDoctor) {
        throw new AppError("Unauthorized access to appointment.", 403);
    }

    return appointment;
};

export const cancelAppointment = async (appointmentId, patientId, reason) => {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
        throw new AppError("Appointment not found.", 404);
    }

    if (appointment.patient.toString() !== patientId.toString()) {
        throw new AppError("Unauthorized access to appointment.", 403);
    }

    if (appointment.status === APPOINTMENT_STATUS.COMPLETED) {
        throw new AppError("Completed appointments cannot be cancelled.", 400);
    }

    if (appointment.status === APPOINTMENT_STATUS.CANCELLED) {
        throw new AppError("Appointment is already cancelled.", 400);
    }

    if (appointment.status === APPOINTMENT_STATUS.REJECTED) {
        throw new AppError("Rejected appointments cannot be cancelled.", 400);
    }

    appointment.status = APPOINTMENT_STATUS.CANCELLED;
    if (reason) {
        appointment.cancellationReason = reason;
    }

    if (appointment.paymentStatus === "paid") {
        await processRefund(appointment);
    } else {
        await appointment.save();
    }

    await appointment.populate([
        {
            path: "patient",
            select: "fullName email avatar",
        },
        {
            path: "doctor",
            select: "user specialization consultationFee hospital clinicalAddress",
            populate: {
                path: "user",
                select: "fullName email avatar",
            },
        },
    ]);

    try {
        const doctorObj = await Doctor.findById(appointment.doctor);
        if (doctorObj && doctorObj.user) {
            await notificationService.createNotification({
                user: doctorObj.user._id || doctorObj.user,
                title: "Appointment Cancelled",
                message: "A patient has cancelled an appointment.",
                type: "appointment",
                referenceId: appointment._id,
            });
        }
    } catch (notifErr) {
        console.error("Notification creation error on cancelAppointment:", notifErr);
    }

    return appointment;
};

export const getDoctorAppointments = async (userId, query = {}) => {
    const doctor = await Doctor.findOne({ user: userId });
    if (!doctor) {
        throw new AppError("Doctor profile not found.", 404);
    }

    const { page = 1, limit = 20, status, consultationType, date } = query || {};
    const filter = { doctor: doctor._id };

    if (status && status !== "all") {
        filter.status = status;
    }

    if (consultationType) {
        filter.consultationType = consultationType;
    }

    if (date) {
        const start = new Date(date);
        start.setHours(0, 0, 0, 0);

        const end = new Date(date);
        end.setHours(23, 59, 59, 999);

        filter.appointmentDateTime = {
            $gte: start,
            $lte: end,
        };
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const totalAppointments = await Appointment.countDocuments(filter);

    const appointments = await Appointment.find(filter)
        .populate({
            path: "patient",
            select: "fullName email avatar phone",
        })
        .sort({ appointmentDateTime: -1 })
        .skip(skip)
        .limit(limitNumber);

    return {
        appointments,
        totalAppointments,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalAppointments / limitNumber),
    };
};

export const confirmAppointment = async (userId, appointmentId) => {
    const doctor = await Doctor.findOne({ user: userId });
    if (!doctor) {
        throw new AppError("Doctor profile not found.", 404);
    }

    const appointment = await Appointment.findById(appointmentId).populate({
        path: "patient",
        select: "fullName email avatar",
    });

    if (!appointment) {
        throw new AppError("Appointment not found.", 404);
    }

    if (appointment.doctor.toString() !== doctor._id.toString()) {
        throw new AppError("Unauthorized.", 403);
    }

    if (appointment.status !== APPOINTMENT_STATUS.PENDING) {
        throw new AppError("Only pending appointments can be confirmed.", 400);
    }

    appointment.status = APPOINTMENT_STATUS.CONFIRMED;
    await appointment.save();

    try {
        await notificationService.createNotification({
            user: appointment.patient._id || appointment.patient,
            title: "Appointment Confirmed",
            message: "Your appointment has been confirmed by the doctor.",
            type: "appointment",
            referenceId: appointment._id,
        });
    } catch (notifErr) {
        console.error("Notification creation error on confirmAppointment:", notifErr);
    }

    return appointment;
};

export const rejectAppointment = async (userId, appointmentId, reason) => {
    const doctor = await Doctor.findOne({ user: userId });
    if (!doctor) {
        throw new AppError("Doctor profile not found.", 404);
    }

    const appointment = await Appointment.findById(appointmentId).populate({
        path: "patient",
        select: "fullName email avatar",
    });

    if (!appointment) {
        throw new AppError("Appointment not found.", 404);
    }

    if (appointment.doctor.toString() !== doctor._id.toString()) {
        throw new AppError("Unauthorized.", 403);
    }

    if (appointment.status !== APPOINTMENT_STATUS.PENDING) {
        throw new AppError("Only pending appointments can be rejected.", 400);
    }

    appointment.status = APPOINTMENT_STATUS.REJECTED;
    if (reason) {
        appointment.cancellationReason = reason;
    }

    if (appointment.paymentStatus === "paid") {
        await processRefund(appointment);
    } else {
        await appointment.save();
    }

    try {
        await notificationService.createNotification({
            user: appointment.patient._id || appointment.patient,
            title: "Appointment Rejected",
            message: "Unfortunately your appointment was rejected.",
            type: "appointment",
            referenceId: appointment._id,
        });
    } catch (notifErr) {
        console.error("Notification creation error on rejectAppointment:", notifErr);
    }

    return appointment;
};

export const completeAppointment = async (userId, appointmentId) => {
    const doctor = await Doctor.findOne({ user: userId });
    if (!doctor) {
        throw new AppError("Doctor profile not found.", 404);
    }

    const appointment = await Appointment.findById(appointmentId).populate({
        path: "patient",
        select: "fullName email avatar",
    });

    if (!appointment) {
        throw new AppError("Appointment not found.", 404);
    }

    if (appointment.doctor.toString() !== doctor._id.toString()) {
        throw new AppError("Unauthorized.", 403);
    }

    if (appointment.status !== APPOINTMENT_STATUS.CONFIRMED) {
        throw new AppError("Only confirmed appointments can be completed.", 400);
    }

    appointment.status = APPOINTMENT_STATUS.COMPLETED;
    await appointment.save();

    try {
        await notificationService.createNotification({
            user: appointment.patient._id || appointment.patient,
            title: "Appointment Completed",
            message: "Your appointment has been marked as completed.",
            type: "appointment",
            referenceId: appointment._id,
        });
    } catch (notifErr) {
        console.error("Notification creation error on completeAppointment:", notifErr);
    }

    return appointment;
};

export const rescheduleAppointment = async (userId, appointmentId, data) => {
    const doctor = await Doctor.findOne({ user: userId });
    if (!doctor) {
        throw new AppError("Doctor profile not found.", 404);
    }

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
        throw new AppError("Appointment not found.", 404);
    }

    if (appointment.doctor.toString() !== doctor._id.toString()) {
        throw new AppError("Unauthorized.", 403);
    }

    const { appointmentDateTime } = data;
    if (!appointmentDateTime) {
        throw new AppError("New appointment date and time is required.", 400);
    }

    appointment.appointmentDateTime = appointmentDateTime;
    appointment.status = "rescheduled";
    await appointment.save();

    try {
        await notificationService.createNotification({
            user: appointment.patient._id || appointment.patient,
            title: "Appointment Rescheduled",
            message: "Your appointment has been rescheduled.",
            type: "appointment",
            referenceId: appointment._id,
        });
    } catch (notifErr) {
        console.error("Notification creation error on rescheduleAppointment:", notifErr);
    }

    return appointment;
};