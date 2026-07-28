import Conversation from "../models/Conversation.js";
import Doctor from "../models/Doctor.js";
import Appointment from "../models/Appointment.js";
import AppError from "../utils/AppError.js";

export const createOrGetConversation = async (
    userId,
    role,
    doctorId
) => {
    if (role !== "patient") {
        throw new AppError(
            "Only patients can start conversations",
            403
        );
    }

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
        throw new AppError("Doctor not found", 404);
    }

    // Patient must have at least one appointment with this doctor
    const appointment = await Appointment.findOne({
        patient: userId,
        doctor: doctorId,
    });

    if (!appointment) {
        throw new AppError(
            "You can only chat with doctors you have booked.",
            403
        );
    }

    let conversation = await Conversation.findOne({
        patient: userId,
        doctor: doctorId,
    })
        .populate("patient", "fullName email avatar")
        .populate({
            path: "doctor",
            populate: {
                path: "user",
                select: "fullName email avatar",
            },
        });

    if (conversation) {
        return conversation;
    }

    conversation = await Conversation.create({
        patient: userId,
        doctor: doctorId,
    });

    await conversation.populate([
        {
            path: "patient",
            select: "fullName email avatar",
        },
        {
            path: "doctor",
            populate: {
                path: "user",
                select: "fullName email avatar",
            },
        },
    ]);

    return conversation;
};


export const getMyConversations = async (
    userId,
    role
) => {
    let filter = {};

    if (role === "patient") {
        filter.patient = userId;

        // Auto-ensure conversations exist for all doctors the patient has appointments with
        try {
            const bookedDoctorIds = await Appointment.distinct("doctor", { patient: userId });
            for (const docId of bookedDoctorIds) {
                if (docId) {
                    await Conversation.findOneAndUpdate(
                        { patient: userId, doctor: docId },
                        { patient: userId, doctor: docId },
                        { upsert: true, new: true }
                    );
                }
            }
        } catch (err) {
            console.error("Auto conversation generation error:", err);
        }

    } else if (role === "doctor") {
        const doctor = await Doctor.findOne({
            user: userId,
        });

        if (!doctor) {
            throw new AppError(
                "Doctor profile not found",
                404
            );
        }

        filter.doctor = doctor._id;

        // Auto-ensure conversations exist for all patients who booked appointments with this doctor
        try {
            const bookedPatientIds = await Appointment.distinct("patient", { doctor: doctor._id });
            for (const patId of bookedPatientIds) {
                if (patId) {
                    await Conversation.findOneAndUpdate(
                        { patient: patId, doctor: doctor._id },
                        { patient: patId, doctor: doctor._id },
                        { upsert: true, new: true }
                    );
                }
            }
        } catch (err) {
            console.error("Auto doctor conversation generation error:", err);
        }

    } else {
        throw new AppError("Unauthorized", 403);
    }

    const conversations = await Conversation.find(filter)
        .populate(
            "patient",
            "fullName email avatar"
        )
        .populate({
            path: "doctor",
            populate: {
                path: "user",
                select: "fullName email avatar",
            },
        })
        .sort({
            lastMessageAt: -1,
        });

    return conversations;
};