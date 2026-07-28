import * as notificationService from "../services/notification.services.js";

export const getMyNotifications = async (
    req,
    res,
    next
) => {
    try {

        const result =
            await notificationService.getMyNotifications(
                req.user.id,
                req.query
            );

        return res.status(200).json({
            success: true,
            ...result,
        });

    } catch (error) {
        next(error);
    }
};

export const markAsRead = async (
    req,
    res,
    next
) => {
    try {

        const notification =
            await notificationService.markAsRead(
                req.user.id,
                req.params.id
            );

        return res.status(200).json({
            success: true,
            message: "Notification marked as read.",
            notification,
        });

    } catch (error) {
        next(error);
    }
};

export const markAllAsRead = async (
    req,
    res,
    next
) => {
    try {

        await notificationService.markAllAsRead(
            req.user.id
        );

        return res.status(200).json({
            success: true,
            message:
                "All notifications marked as read.",
        });

    } catch (error) {
        next(error);
    }
};

export const deleteNotification = async (
    req,
    res,
    next
) => {
    try {

        await notificationService.deleteNotification(
            req.user.id,
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message:
                "Notification deleted successfully.",
        });

    } catch (error) {
        next(error);
    }
};