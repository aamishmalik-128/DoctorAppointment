import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import cloudinary from "../config/cloudinary.js";

export const updateProfile = async (userId, data) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    if (data.fullName !== undefined) user.fullName = data.fullName;
    if (data.phone !== undefined) user.phone = data.phone;
    if (data.gender !== undefined) user.gender = data.gender;
    if (data.dateOfBirth !== undefined) user.dateOfBirth = data.dateOfBirth || null;
    if (data.address !== undefined) user.address = data.address;

    await user.save({ validateModifiedOnly: true });

    return {
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            phone: user.phone,
            gender: user.gender,
            dateOfBirth: user.dateOfBirth,
            address: user.address,
            createdAt: user.createdAt,
        },
    };
};

export const uploadAvatar = async (userId, file) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError("User not found", 404);
    }

    if (!file || !file.buffer) {
        throw new AppError("Invalid image file uploaded", 400);
    }

    const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "carepoint/profile",
                resource_type: "auto",
            },
            (error, result) => {
                if (error) {
                    reject(new AppError(error.message || "Cloudinary upload failed", 500));
                } else {
                    resolve(result);
                }
            }
        );
        stream.end(file.buffer);
    });

    user.avatar = uploadResult.secure_url;
    await user.save({ validateModifiedOnly: true });
    return user;
};

export const deleteAvatar = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError("User not found", 404);
    }

    if (!user.avatar) {
        return user;
    }

    try {
        const parts = user.avatar.split('/upload/');
        if (parts.length >= 2) {
            const publicId = parts[1]
                .replace(/^v\d+\//, "")      // remove version (v123456/)
                .replace(/\.[^/.]+$/, "");   // remove extension (.jpg, .png)

            await cloudinary.uploader.destroy(publicId);
        }
    } catch (error) {
        console.error("Cloudinary delete error:", error);
    }

    user.avatar = "";
    await user.save({ validateModifiedOnly: true });

    return user;
};