import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import {
    createDoctorProfile,
    getAllDoctors,
    getAvailableSlots,
    getDoctorAvailability,
    getDoctorById,
    getDoctorProfile,
    registerDoctor,
    updateDoctorAvailability,
    updateDoctorProfile,
} from "../controllers/doctor.controller.js";

const router = express.Router();

// Public auth/register
router.post("/register", registerDoctor);

// Static doctor profile routes (Must be before /:id)
router.post("/profile", authMiddleware, roleMiddleware("doctor"), createDoctorProfile);
router.get("/profile", authMiddleware, roleMiddleware("doctor"), getDoctorProfile);
router.patch("/profile", authMiddleware, roleMiddleware("doctor"), updateDoctorProfile);

// Static doctor availability routes (Must be before /:id)
router.get("/availability", authMiddleware, roleMiddleware("doctor"), getDoctorAvailability);
router.patch("/availability", authMiddleware, roleMiddleware("doctor"), updateDoctorAvailability);

// Public list doctors
router.get("/", getAllDoctors);
// Slot generation
router.get("/:doctorId/available-slots", getAvailableSlots);
// Dynamic doctor by ID (MUST BE AT THE BOTTOM)
router.get("/:id", getDoctorById);

export default router;