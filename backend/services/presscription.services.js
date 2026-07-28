import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import Prescription from "../models/Prescription.js";
import AppError from "../utils/AppError.js";
import * as notificationService from "./notification.services.js";


export const createPrescription =async(userId,prescriptionData)=>{
    const {appointmentId,diagnosis,medications,tests,advice,followUpDate,followUpdate}=prescriptionData;
    const finalFollowUp = followUpDate || followUpdate;
    if(!appointmentId || !diagnosis){
        throw new AppError("Appointment and diagnosis are required",400)
    }

    const doctor = await Doctor.findOne({user:userId})

    if(!doctor){
        throw new AppError("Doctor profile not found",404)
    }
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
        throw new AppError("Appointment not found", 404);
    }
    if (appointment.doctor.toString() !== doctor._id.toString()) {
        throw new AppError(
            "You cannot create prescription for this appointment",
            403
        );
    }

    // Appointment must be confirmed or completed
    if (appointment.status !== "confirmed" && appointment.status !== "completed") {
        throw new AppError(
            "Prescription can only be created for confirmed or completed appointments",
            400
        );
    }
    const existingPrescription = await Prescription.findOne({
        appointment: appointment._id,
    });
    if (existingPrescription) {
        throw new AppError(
            "Prescription already exists for this appointment",
            400
        );
    }
    const prescription = await Prescription.create({
        appointment: appointment._id,
        doctor: doctor._id,
        patient: appointment.patient,
        diagnosis,
        medications,
        tests,
        advice,
        followUpDate: finalFollowUp,
    });

    // Auto-mark appointment as completed when prescription is created
    if (appointment.status === "confirmed") {
        appointment.status = "completed";
        await appointment.save();
    }
    await prescription.populate([
        {
            path: "appointment",
        },
        {
            path: "patient",
            select: "fullName email",
        },
        {
            path: "doctor",
            populate: {
                path: "user",
                select: "fullName email",
            },
        },
    ]);

    // Send notification to Patient
    try {
        await notificationService.createNotification({
            user: appointment.patient,
            title: "Prescription Available",
            message: "Your doctor has uploaded your prescription.",
            type: "prescription",
            referenceId: prescription._id,
        });
    } catch (notifErr) {
        console.error("Notification creation error on createPrescription:", notifErr);
    }

    return prescription;
}


export const getDoctorPrescriptions = async (userId, query = {}) => {
    const doctor = await Doctor.findOne({ user: userId });

    if (!doctor) {
        throw new AppError("Doctor profile not found", 404);
    }

    const {
        page = 1,
        limit = 10,
        patient,
    } = query;

    const filter = {
        doctor: doctor._id,
    };

    if (patient) {
        filter.patient = patient;
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const totalPrescriptions = await Prescription.countDocuments(filter);

    const prescriptions = await Prescription.find(filter)
        .populate({
            path: "patient",
            select: "fullName email",
        })
        .populate({
            path: "appointment",
            select: "appointmentDateTime status",
        })
        .sort({
            createdAt: -1,
        })
        .skip(skip)
        .limit(limitNumber);

    return {
        prescriptions,
        totalPrescriptions,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalPrescriptions / limitNumber),
    };
};




export const getPrescriptionById = async (userId, role, prescriptionId) => {

    const prescription = await Prescription.findById(prescriptionId)
        .populate({
            path: "patient",
            select: "fullName email",
        })
        .populate({
            path: "appointment",
        })
        .populate({
            path: "doctor",
            populate: {
                path: "user",
                select: "fullName email",
            },
        });

    if (!prescription) {
        throw new AppError("Prescription not found", 404);
    }

    // Doctor Authorization
    if (role === "doctor") {

        const doctor = await Doctor.findOne({ user: userId });

        if (!doctor) {
            throw new AppError("Doctor profile not found", 404);
        }

        if (
            prescription.doctor._id.toString() !==
            doctor._id.toString()
        ) {
            throw new AppError("Unauthorized", 403);
        }
    }

    // Patient Authorization
    if (role === "patient") {

        if (
            prescription.patient._id.toString() !==
            userId.toString()
        ) {
            throw new AppError("Unauthorized", 403);
        }
    }

    return prescription;
};


export const updatePrescription = async (
    userId,
    prescriptionId,
    updateData
) => {
    const doctor = await Doctor.findOne({ user: userId });

    if (!doctor) {
        throw new AppError("Doctor profile not found", 404);
    }

    const prescription = await Prescription.findById(prescriptionId);

    if (!prescription) {
        throw new AppError("Prescription not found", 404);
    }

    if (prescription.doctor.toString() !== doctor._id.toString()) {
        throw new AppError("Unauthorized", 403);
    }

    const {
        diagnosis,
        medications,
        tests,
        advice,
        followUpDate,
    } = updateData;

    if (diagnosis !== undefined) {
        prescription.diagnosis = diagnosis;
    }

    if (medications !== undefined) {
        prescription.medications = medications;
    }

    if (tests !== undefined) {
        prescription.tests = tests;
    }

    if (advice !== undefined) {
        prescription.advice = advice;
    }

    if (followUpDate !== undefined) {
        prescription.followUpDate = followUpDate;
    }

    await prescription.save();

    await prescription.populate([
        {
            path: "patient",
            select: "fullName email",
        },
        {
            path: "appointment",
        },
        {
            path: "doctor",
            populate: {
                path: "user",
                select: "fullName email",
            },
        },
    ]);

    return prescription;
};


export const getMyPrescriptions = async (userId, query = {}) => {
    const { page = 1, limit = 10 } = query || {};

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const filter = {
        patient: userId,
    };

    const totalPrescriptions = await Prescription.countDocuments(filter);

    const prescriptions = await Prescription.find(filter)
        .populate({
            path: "doctor",
            populate: {
                path: "user",
                select: "fullName email",
            },
        })
        .populate({
            path: "appointment",
            select: "appointmentDateTime status consultationType",
        })
        .sort({
            createdAt: -1,
        })
        .skip(skip)
        .limit(limitNumber);

    return {
        prescriptions,
        totalPrescriptions,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalPrescriptions / limitNumber),
    };
};