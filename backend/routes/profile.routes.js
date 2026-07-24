import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.middleware.js';
import { deleteProfileAvatar, updateProfile, uploadProfileAvatar } from '../controllers/profile.controller.js';

const router = express.Router();

router.put("/", authMiddleware, updateProfile);
router.put("/avatar",authMiddleware,upload.single("avatar"),uploadProfileAvatar);
router.delete('/avatar',authMiddleware,deleteProfileAvatar)
export default router;