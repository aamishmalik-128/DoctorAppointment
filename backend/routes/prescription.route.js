import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import { createPrescription, getDoctorPrescriptions, getMyPrescriptions, getPrescriptionById, updatePrescription } from "../controllers/prescription.controller.js";

const router = express.Router();

router.post("/",authMiddleware,roleMiddleware("doctor"),createPrescription);
router.get("/doctor",authMiddleware,roleMiddleware("doctor"),getDoctorPrescriptions);
router.get("/",authMiddleware,roleMiddleware("patient"),getMyPrescriptions);
router.get("/:id",authMiddleware,getPrescriptionById);
router.patch("/:id",authMiddleware,roleMiddleware("doctor"),updatePrescription);

export default router;