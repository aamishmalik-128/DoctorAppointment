import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';
import {
    bookAppointment,
    cancelAppointment,
    completeAppointment,
    confirmAppointment,
    getAppointmentById,
    getDoctorAppointments,
    getMyAppointments,
    rejectAppointment,
    rescheduleAppointment,
} from '../controllers/appointment.controller.js';

const router = express.Router();

// Specific routes MUST be defined before wildcard /:id route

// Patient specific routes
router.post('/', authMiddleware, roleMiddleware('patient'), bookAppointment);
router.post('/book', authMiddleware, roleMiddleware('patient'), bookAppointment);
router.get('/', authMiddleware, roleMiddleware('patient'), getMyAppointments);
router.get('/my', authMiddleware, roleMiddleware('patient'), getMyAppointments);

// Doctor specific routes
router.get('/doctor/all', authMiddleware, roleMiddleware('doctor'), getDoctorAppointments);
router.get('/appointments', authMiddleware, roleMiddleware('doctor'), getDoctorAppointments);
router.patch('/appointments/:id/confirm', authMiddleware, roleMiddleware('doctor'), confirmAppointment);
router.patch('/appointments/:id/reject', authMiddleware, roleMiddleware('doctor'), rejectAppointment);
router.patch('/appointments/:id/complete', authMiddleware, roleMiddleware('doctor'), completeAppointment);
router.patch('/appointments/:id/reschedule', authMiddleware, roleMiddleware('doctor'), rescheduleAppointment);

// Action routes for specific appointments
router.patch('/:id/cancel', authMiddleware, roleMiddleware('patient'), cancelAppointment);

// Wildcard /:id route MUST be placed at the bottom so literal strings like "appointments" or "my" are not matched as IDs
router.get('/:id', authMiddleware, roleMiddleware('patient', 'doctor'), getAppointmentById);

export default router;