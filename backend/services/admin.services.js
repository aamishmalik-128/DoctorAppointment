import { ROLES } from "../constants/roles.js";
import Doctor from "../models/Doctor.js";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";

// 1. Get Pending Doctors
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

// 2. Approve Doctor
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
    return doctor;
};

// 3. Reject Doctor
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
    return doctor;
};

// 4. Get All Doctors
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

// 5. Get All Users
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

// 6. Block User
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
    return user;
};

// 7. Unblock User
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
    return user;
};

// 8. Get Dashboard Stats
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