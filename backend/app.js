import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import errorHandler from './middleware/errorHandler.js'
import authRoutes from './routes/auth.routes.js'
dotenv.config()
// console.log('process', process.env.MONGO_URI)
const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))

app.use(helmet())
app.use(compression())

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
app.use(errorHandler)

export default app;