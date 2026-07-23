
import * as appointmentService from '../services/appointment.services.js'
import AppError from "../utils/AppError.js";
export const bookAppointment =async(req,res,next)=>{
    try {
        const appointment = await appointmentService.bookAppointment(req.user.id,req.body)
        res.status(201).json({
            success:true,
            message:"Appointment Booked Successfully",
            appointment
        })
    } catch (error) {
        next(error)
    }
}


//get all appointments with filters
export const getMyAppointments = async (req, res, next) => {
    try {

        const result = await appointmentService.getMyAppointments(
            req.user.id,
            req.query
        );

        return res.status(200).json({
            success: true,
            ...result,
        });

    } catch (error) {
        next(error);
    }
};


export const getAppointmentById=async(req,res,next)=>{
    try {
        const appointment = await appointmentService.getAppointmentById(req.params.id,req.user.id)
        return res.status(200).json({
            success:true,
            appointment
        })
    } catch (error) {
        next(error)
    }
}


export const cancelAppointment= async(req,res,next)=>{
    try {
        const appointment= await appointmentService.cancelAppointment(req.params.id,req.user.id,req.body.reason)
        return res.status(200).json({
            success: true,
            message: "Appointment cancelled successfully.",
            appointment,
        });
    } catch (error) {
        next(error)
    }
}

export const getDoctorAppointments = async (req, res, next) => {
    try {

        const result = await appointmentService.getDoctorAppointments(
            req.user.id,
            req.query
        );

        return res.status(200).json({
            success: true,
            ...result,
        });

    } catch (error) {
        next(error);
    }
};

export const confirmAppointment = async (req, res, next) => {
    try {

        const appointment = await appointmentService.confirmAppointment(
            req.user.id,
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message: "Appointment confirmed successfully.",
            appointment,
        });

    } catch (error) {
        next(error);
    }
};


export const rejectAppointment = async (req, res, next) => {
    try {

        const appointment = await appointmentService.rejectAppointment(
            req.user.id,
            req.params.id,
            req.body.reason
        );

        return res.status(200).json({
            success: true,
            message: "Appointment rejected successfully.",
            appointment,
        });

    } catch (error) {
        next(error);
    }
};


export const completeAppointment = async (req, res, next) => {
    try {

        const appointment = await appointmentService.completeAppointment(
            req.user.id,
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message: "Appointment completed successfully.",
            appointment,
        });

    } catch (error) {
        next(error);
    }
};


export const rescheduleAppointment = async (req, res, next) => {
    try {

        const appointment = await appointmentService.rescheduleAppointment(
            req.user.id,
            req.params.id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Appointment rescheduled successfully.",
            appointment,
        });

    } catch (error) {
        next(error);
    }
};