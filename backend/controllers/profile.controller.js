import * as profileServices from '../services/profile.services.js';

export const updateProfile = async (req, res, next) => {
    try {
        const userId = req.user.id || req.user._id;
        const result = await profileServices.updateProfile(
            userId,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: result.user,
        });
    } catch (error) {
        next(error);
    }
};

export const uploadProfileAvatar = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image file",
            });
        }

        const userId = req.user.id || req.user._id;
        const updatedUser = await profileServices.uploadAvatar(
            userId,
            req.file
        );

        const sanitizedUser = {
            id: updatedUser._id,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            role: updatedUser.role,
            avatar: updatedUser.avatar,
            phone: updatedUser.phone,
            gender: updatedUser.gender,
            dateOfBirth: updatedUser.dateOfBirth,
            address: updatedUser.address,
            createdAt: updatedUser.createdAt,
        };

        return res.status(200).json({
            success: true,
            message: "Avatar uploaded successfully",
            user: sanitizedUser,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteProfileAvatar = async (req, res, next) => {
    try {
        const userId = req.user.id || req.user._id;
        const updatedUser = await profileServices.deleteAvatar(userId);

        const sanitizedUser = {
            id: updatedUser._id,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            role: updatedUser.role,
            avatar: updatedUser.avatar,
            phone: updatedUser.phone,
            gender: updatedUser.gender,
            dateOfBirth: updatedUser.dateOfBirth,
            address: updatedUser.address,
            createdAt: updatedUser.createdAt,
        };

        return res.status(200).json({
            success: true,
            message: "Avatar deleted successfully",
            user: sanitizedUser,
        });
    } catch (error) {
        next(error);
    }
};

export const changeUserPassword = async (req, res, next) => {
    try {
        const userId = req.user.id || req.user._id;
        const { currentPassword, newPassword, confirmPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Current password and new password are required",
            });
        }

        if (confirmPassword && newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "New password and confirm password do not match",
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: "New password must be at least 6 characters long",
            });
        }

        await profileServices.changePassword(userId, currentPassword, newPassword);

        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });
    } catch (error) {
        next(error);
    }
};