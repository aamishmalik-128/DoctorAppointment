import Notification from "../models/Notification.js";
import AppError from "../utils/AppError.js";

export const createNotification = async ({ user, title, message, type = "system", referenceId = null }) => {
    const notification = await Notification.create({ user, title, message, type, referenceId });
    return notification;
};

export const getMyNotifications = async (userId, query = {}) => {
    const { page = 1, limit = 10 } = query || {};
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const totalNotifications = await Notification.countDocuments({ user: userId });
    const unreadCount = await Notification.countDocuments({ user: userId, isRead: false });

    const notifications = await Notification.find({ user: userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber);

    return {
        notifications,
        unreadCount,
        totalNotifications,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalNotifications / limitNumber),
    };
};

export const markAsRead = async (userId, notificationId) => {
    const notification = await Notification.findOne({ _id: notificationId, user: userId });
    if (!notification) {
        throw new AppError("Notification not found", 404);
    }
    notification.isRead = true;
    await notification.save();
    return notification;
};

export const markAllAsRead = async (userId) => {
    await Notification.updateMany(
        { user: userId, isRead: false },
        { isRead: true }
    );
    return;
};

export const deleteNotification = async (userId, notificationId) => {
    const notification = await Notification.findOne({ _id: notificationId, user: userId });
    if (!notification) {
        throw new AppError("Notification not found", 404);
    }
    await notification.deleteOne();
    return;
};