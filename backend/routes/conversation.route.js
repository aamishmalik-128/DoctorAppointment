import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {createOrGetConversation,getMyConversations,} from "../controllers/conversation.controller.js";

const router = express.Router();

// Patient starts chat
router.post("/",authMiddleware,createOrGetConversation);

// Doctor & Patient conversation list
router.get("/",authMiddleware,getMyConversations);

export default router;