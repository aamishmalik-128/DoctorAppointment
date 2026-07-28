import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
    getMyNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.use(authMiddleware);

// Get logged in user's notifications
router.get("/", getMyNotifications);

// Mark one notification as read
router.patch("/:id/read", markAsRead);

// Mark all notifications as read
router.patch("/read-all", markAllAsRead);

// Delete notification
router.delete("/:id", deleteNotification);

export default router;