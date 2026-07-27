import Doctor from "../models/Doctor.js";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import { ROLES } from "../constants/roles.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";
import Appointment from "../models/Appointment.js";
import { generateSlots, getDayName } from "../utils/appointment.js";

export const registerDoctor = async ({ fullName, email, password }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new AppError("Email Already Registered", 409);
    }
    const user = await User.create({ fullName, email, password, role: ROLES.DOCTOR });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    await user.updateOne({
        refreshToken,
    });

    return {
        accessToken,
        refreshToken,
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
        },
    };
};

export const createDoctorProfile = async (userId, doctorData) => {
    const existingProfile = await Doctor.findOne({ user: userId });
    if (existingProfile) {
        throw new AppError("Doctor profile already exists", 400);
    }
    const { specialization, qualification, experience, consultationFee, hospital, clinicalAddress, bio } = doctorData;
    if (!specialization || !qualification || experience === undefined || consultationFee === undefined || !clinicalAddress) {
        throw new AppError("Please fill all required fields.", 400);
    }
    const doctor = await Doctor.create({
        user: userId,
        specialization,
        qualification,
        experience,
        consultationFee,
        hospital,
        clinicalAddress,
        bio,
    });
    await doctor.populate("user", "fullName email role avatar");
    return doctor;
};

export const getDoctorProfile = async (userId) => {
    const doctor = await Doctor.findOne({ user: userId }).populate("user", "fullName email role avatar");
    if (!doctor) {
        throw new AppError("Doctor Profile not found", 404);
    }
    return doctor;
};

export const updateDoctorProfile = async (userId, doctorData) => {
    const doctor = await Doctor.findOne({ user: userId });
    if (!doctor) {
        throw new AppError("Doctor profile not found", 404);
    }
    const allowedFields = [
        "specialization",
        "qualification",
        "experience",
        "consultationFee",
        "hospital",
        "clinicalAddress",
        "bio",
    ];
    allowedFields.forEach((field) => {
        if (doctorData[field] !== undefined) {
            doctor[field] = doctorData[field];
        }
    });
    await doctor.save();
    await doctor.populate("user", "fullName email role avatar");
    return doctor;
};

export const getAllDoctors = async (query) => {
    const {
        page = 1,
        limit = 10,
        specialization,
        hospital,
        minFee,
        maxFee,
    } = query;

    const filter = {
        status: "approved",
    };

    if (specialization) {
        filter.specialization = {
            $regex: specialization,
            $options: "i",
        };
    }

    if (hospital) {
        filter.hospital = {
            $regex: hospital,
            $options: "i",
        };
    }

    if (minFee || maxFee) {
        filter.consultationFee = {};
        if (minFee) {
            filter.consultationFee.$gte = Number(minFee);
        }
        if (maxFee) {
            filter.consultationFee.$lte = Number(maxFee);
        }
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const doctors = await Doctor.find(filter)
        .populate("user", "fullName email avatar")
        .skip(skip)
        .limit(limitNumber)
        .sort({ createdAt: -1 });

    const totalDoctors = await Doctor.countDocuments(filter);

    return {
        currentPage: pageNumber,
        totalPages: Math.ceil(totalDoctors / limitNumber),
        totalDoctors,
        doctors,
    };
};

export const getDoctorById = async (doctorId) => {
    const doctor = await Doctor.findOne({ _id: doctorId, status: "approved" }).populate("user", "fullName avatar");
    if (!doctor) {
        throw new AppError("Doctor not found", 404);
    }
    return doctor;
};

export const getDoctorAvailability = async (userId) => {
    const doctor = await Doctor.findOne({ user: userId });
    if (!doctor) {
        throw new AppError("Doctor profile not found", 404);
    }
    return doctor.availability;
};

export const updateDoctorAvailability = async (userId, availability) => {
    const doctor = await Doctor.findOne({ user: userId });
    if (!doctor) {
        throw new AppError("Doctor Profile not found", 404);
    }
    if (!Array.isArray(availability)) {
        throw new AppError("Availability must be an array", 400);
    }
    const days = availability.map((slot) => slot.day);
    const uniqueDays = new Set(days);
    if (days.length !== uniqueDays.size) {
        throw new AppError("A day can only be added once", 400);
    }
    doctor.availability = availability;
    await doctor.save();
    return doctor.availability;
};

export const getAvailableSlots = async (doctorId, date) => {
    if (!date) {
        throw new AppError("Date is required.", 400);
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
        throw new AppError("Doctor not found.", 404);
    }

    if (doctor.status !== "approved") {
        throw new AppError("Doctor is not approved.", 400);
    }

    const day = getDayName(date);
    const availability = doctor.availability.find((item) => item.day === day);

    if (!availability) {
        return {
            day,
            availableSlots: [],
        };
    }

    const generatedSlots = generateSlots(availability, doctor.slotDuration);

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const appointments = await Appointment.find({
        doctor: doctor._id,
        appointmentDateTime: {
            $gte: startOfDay,
            $lte: endOfDay,
        },
        status: {
            $nin: ["cancelled"],
        },
    });

    const bookedSlots = appointments.map((appointment) =>
        new Date(appointment.appointmentDateTime).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        })
    );

    const now = new Date();
    const isToday = new Date(date).toDateString() === now.toDateString();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const availableSlots = generatedSlots.filter((slot) => {
        if (bookedSlots.includes(slot)) return false;

        if (isToday) {
            const [h, m] = slot.split(":").map(Number);
            const slotMinutes = h * 60 + m;
            if (slotMinutes <= currentMinutes) {
                return false;
            }
        }
        return true;
    });

    return {
        day,
        availableSlots,
    };
};