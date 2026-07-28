import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import errorHandler from './middleware/errorHandler.js'
import authRoutes from './routes/auth.routes.js'
import doctorRoutes from './routes/doctor.routes.js'
import adminRoutes from '../backend/routes/admin.routes.js'
import doctorAppointmentRoute from './routes/apointment.routes.js'
import prescriptionRoutes from './routes/prescription.route.js'
import profileRoutes from './routes/profile.routes.js'
import paymentRoutes from './routes/payment.routes.js'
import { paymentWebhook } from './controllers/payment.controller.js'

dotenv.config()

const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}))

app.use(helmet())
app.use(compression())

// Stripe Webhook MUST receive raw buffer before express.json() parses body
app.post("/api/payments/webhook", express.raw({ type: "application/json" }), paymentWebhook);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Doctor Appointment API is running 🚀",
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api/appointment', doctorAppointmentRoute);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/payments", paymentRoutes);

app.use(errorHandler);

export default app;