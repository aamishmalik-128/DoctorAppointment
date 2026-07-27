import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { roleMiddleware } from '../middleware/roleMiddleware.js'
import {bookAppointment, cancelAppointment, completeAppointment, confirmAppointment, getAppointmentById, getDoctorAppointments, getMyAppointments, rejectAppointment, rescheduleAppointment} from '../controllers/appointment.controller.js'

const router=express.Router()

//user appointment routes
router.post('/', authMiddleware,roleMiddleware('patient'),bookAppointment)
router.get('/',authMiddleware,roleMiddleware("patient"),getMyAppointments)

//appointment routes for doctors only

router.get('/appointments/',authMiddleware,roleMiddleware("doctor"),getDoctorAppointments)

//user route
router.get("/:id",authMiddleware,roleMiddleware("patient"),getAppointmentById)
router.patch("/:id/cancel",authMiddleware,roleMiddleware("patient"),cancelAppointment);


//appointment routes for doctors only

router.get('/appointments/',authMiddleware,roleMiddleware("doctor"),getDoctorAppointments)
router.patch("/appointments/:id/confirm",authMiddleware,roleMiddleware("doctor"),confirmAppointment);
router.patch("/appointments/:id/reject",authMiddleware,roleMiddleware("doctor"),rejectAppointment);
router.patch("/appointments/:id/complete",authMiddleware,roleMiddleware("doctor"),completeAppointment);
router.patch("/appointments/:id/reschedule",authMiddleware,roleMiddleware("doctor"),rescheduleAppointment);
router.post("/",authMiddleware,roleMiddleware("patient"),bookAppointment);
router.get("/my",authMiddleware,roleMiddleware("patient"),getMyAppointments);
export default router