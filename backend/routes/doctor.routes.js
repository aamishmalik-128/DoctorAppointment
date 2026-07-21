import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import { createDoctorProfile, getAllDoctors, getDoctorById, getDoctorProfile, registerDoctor,updateDoctorProfile } from "../controllers/doctor.controller.js";

const router= express.Router()
router.post("/register", registerDoctor);
router.post("/profile",authMiddleware,roleMiddleware("doctor"),createDoctorProfile);
router.get('/profile',authMiddleware,roleMiddleware("doctor"),getDoctorProfile);
router.patch("/profile",authMiddleware,roleMiddleware("doctor"),updateDoctorProfile)

router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);
export default router;