import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'
import {bookAppointment, cancelAppointment, getAppointmentById, getMyAppointments} from '../controllers/appointment.controller.js'

const router=express.Router()

router.post('/', authMiddleware,roleMiddleware('patient'),bookAppointment)
router.get('/',authMiddleware,roleMiddleware("patient"),getMyAppointments)
router.get("/:id",authMiddleware,roleMiddleware("patient"),getAppointmentById)
router.patch("/:id/cancel",authMiddleware,roleMiddleware("patient"),cancelAppointment);
export default router