import { ROLES } from "../constants/roles.js";
import Doctor from "../models/Doctor.js";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import * as notificationService from "./notification.services.js";

export const getPendingDoctors = async () => {
    const doctors = await Doctor.find({
        status: "pending",
    })
        .populate("user", "fullName email")
        .sort({
            createdAt: -1,
        });
    return doctors;
};

export const approveDoctor = async (doctorId) => {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
        throw new AppError("Doctor not found", 404);
    }
    if (doctor.status === "approved") {
        throw new AppError("Doctor is already approved", 400);
    }
    if (doctor.status === "rejected") {
        throw new AppError("Rejected doctor cannot be approved directly", 400);
    }
    doctor.status = "approved";
    await doctor.save();
    await doctor.populate("user", "fullName email");

    try {
        const userId = doctor.user._id || doctor.user;
        await notificationService.createNotification({
            user: userId,
            title: "Doctor Approved",
            message: "Congratulations! Your doctor account has been approved.",
            type: "system",
            referenceId: doctor._id,
        });
    } catch (notifErr) {
        console.error("Notification creation error on approveDoctor:", notifErr);
    }

    return doctor;
};

export const rejectDoctor = async (doctorId) => {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
        throw new AppError("Doctor not found", 404);
    }
    if (doctor.status === "rejected") {
        throw new AppError("Doctor is already rejected", 400);
    }
    doctor.status = "rejected";
    await doctor.save();
    await doctor.populate("user", "fullName email");

    try {
        const userId = doctor.user._id || doctor.user;
        await notificationService.createNotification({
            user: userId,
            title: "Doctor Application Rejected",
            message: "Your doctor profile has been rejected by the admin.",
            type: "system",
            referenceId: doctor._id,
        });
    } catch (notifErr) {
        console.error("Notification creation error on rejectDoctor:", notifErr);
    }

    return doctor;
};

export const getAllDoctors = async (query = {}) => {
    const { page = 1, limit = 10, status, specialization, hospital } = query || {};
    const filter = {};
    if (status) {
        filter.status = status;
    }
    if (specialization) {
        filter.specialization = specialization;
    }
    if (hospital) {
        filter.hospital = hospital;
    }
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;
    const totalDoctors = await Doctor.countDocuments(filter);

    const doctors = await Doctor.find(filter)
        .populate("user", "fullName email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber);

    return {
        totalDoctors,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalDoctors / limitNumber),
        doctors,
    };
};

export const getAllUser = async (query = {}) => {
    const { page = 1, limit = 10, role, isBlocked } = query || {};
    const filter = {};
    if (isBlocked !== undefined) {
        filter.isBlocked = isBlocked === "true";
    }
    if (role) {
        filter.role = role;
    }
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;
    const totalUsers = await User.countDocuments(filter);

    const users = await User.find(filter)
        .select("-password -refreshToken")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber);

    return {
        totalUsers,
        users,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalUsers / limitNumber),
    };
};

export const blockUser = async (currentUserId, targetUserId) => {
    if (currentUserId === targetUserId) {
        throw new AppError("You cannot block your own account", 400);
    }
    const user = await User.findById(targetUserId);
    if (!user) {
        throw new AppError("User not found", 404);
    }
    if (user.role === "admin") {
        throw new AppError("Super Admin account cannot be blocked", 403);
    }
    if (user.isBlocked) {
        throw new AppError("User is already blocked", 400);
    }
    user.isBlocked = true;
    await user.save();

    try {
        await notificationService.createNotification({
            user: user._id,
            title: "Account Blocked",
            message: "Your account has been blocked by the administrator.",
            type: "system",
            referenceId: user._id,
        });
    } catch (notifErr) {
        console.error("Notification creation error on blockUser:", notifErr);
    }

    return user;
};

export const unblockUser = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError("User not found.", 404);
    }

    if (!user.isBlocked) {
        throw new AppError("User is already active.", 400);
    }

    user.isBlocked = false;
    await user.save();

    try {
        await notificationService.createNotification({
            user: user._id,
            title: "Account Reactivated",
            message: "Your account has been reactivated.",
            type: "system",
            referenceId: user._id,
        });
    } catch (notifErr) {
        console.error("Notification creation error on unblockUser:", notifErr);
    }

    return user;
};

export const getDashboardStats = async () => {
    const [
        totalUsers,
        totalDoctors,
        pendingDoctors,
        approvedDoctors,
        rejectedDoctors,
        blockedUsers,
    ] = await Promise.all([
        User.countDocuments(),
        Doctor.countDocuments(),
        Doctor.countDocuments({ status: "pending" }),
        Doctor.countDocuments({ status: "approved" }),
        Doctor.countDocuments({ status: "rejected" }),
        User.countDocuments({ isBlocked: true }),
    ]);

    return {
        totalUsers,
        totalDoctors,
        pendingDoctors,
        approvedDoctors,
        rejectedDoctors,
        blockedUsers,
    };
};