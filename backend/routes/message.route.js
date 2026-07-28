import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
    sendMessage,
    getConversationMessages,
    markMessagesAsRead,
} from "../controllers/message.controller.js";

const router = express.Router();

// Send a message
router.post(
    "/",
    authMiddleware,
    sendMessage
);

// Get all messages of a conversation
router.get(
    "/:conversationId",
    authMiddleware,
    getConversationMessages
);

// Mark conversation messages as read
router.patch(
    "/:conversationId/read",
    authMiddleware,
    markMessagesAsRead
);

export default router;