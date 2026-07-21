import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import  {roleMiddleware}  from '../middleware/roleMiddleware.js'
import { approveDoctor, getAllDoctors, getPendingDoctors, rejectedDoctor } from '../controllers/admin.controller.js'



const router = express.Router()

router.get("/doctors/pending",authMiddleware,roleMiddleware("admin"),getPendingDoctors)
router.patch("/doctor/:id/approve",authMiddleware,roleMiddleware("admin"),approveDoctor)
router.patch("/doctor/:id/reject",authMiddleware,roleMiddleware("admin"),rejectedDoctor)
router.get('/doctors',authMiddleware,roleMiddleware("admin"),getAllDoctors)
export default router