import Doctor from "../models/Doctor.js";
import AppError from "../utils/AppError.js";
import Appointment from "../models/Appointment.js";
import {getDayName,convertToMinutes,getAppointmentMinutes,} from "../utils/appointment.js";
import { APPOINTMENT_STATUS } from "../constants/appointmentStatus.js";


//booking an appointment
export const  bookAppointment = async(patientId,appointmentData)=>{

    const {doctorId,appointmentDateTime,consultationType,notes}=appointmentData;

    if(!doctorId || !appointmentDateTime){
        throw new AppError("Doctor and Appointment date are required",404);
    }
    
    //finding doctor
    const doctor=await Doctor.findById(doctorId); 
    if(!doctor){
        throw new AppError("Doctor not Found",404);
    }

    //Doctor approved?
    if(doctor.status !== 'approved'){
        throw new AppError("Doctor is not available for booking",400)
    }

    //accepting appointments?
    if(!doctor.isAvailable){
        throw new AppError('Doctor is currently unavailable',400)
    }

    //checking working day
    const appointmentDay = getDayName(appointmentDateTime);
    const schedule = doctor.availability.find((item)=>item.day===appointmentDay);
    if(!schedule){
        throw new AppError("Doctor is not Available on this day.",400)
    }


    //checking working Hours

    const appointmentMinutes= getAppointmentMinutes(appointmentDateTime)
    const startMinutes=convertToMinutes(schedule.startTime)
    const endMinutes=convertToMinutes(schedule.endTime)

    if(appointmentMinutes < startMinutes ||  appointmentMinutes >=endMinutes){
        throw new AppError("Doctor is unavailable at this time.", 400)
    }


    //break time

    if(schedule.breakStart && schedule.breakEnd){
        const breakStart = convertToMinutes(schedule.breakStart)
        const breakEnd= convertToMinutes(schedule.breakEnd)

        if(appointmentMinutes >= breakStart && appointmentMinutes < breakEnd){
            throw new AppError('Doctor is on break during this time',404)
        }
    }

    //exact slot already booked?

    const existingAppointment = await Appointment.findOne({doctor:doctor._id,appointmentDateTime:new Date(appointmentDateTime),status:{$in:['pending','confirmed']}})

    if(exisitingAppointment){
        throw new AppError("This appointment slot is already Booked",409)
    }

    //overlapping appointment

    const appointmentStart = new Date(appointmentDateTime);
    const appointmentEnd= new Date(appointmentStart);

    appointmentEnd.setMinutes(appointmentEnd.getMinutes()+doctor.slotDuration)

    const overlappingAppointment = await Appointment.findOne({
        doctor:doctor._id,
        status:{$in:['pending','confirmed']},
        appointmentDateTime:{
            $lt:appointmentEnd,
            $gte: new Date(appointmentStart.getTime()-doctor.slotDuration *6000)
        }
    })
    if(overlappingAppointment){
        throw new AppError("Appointment overlaps with another booking",409)
    }


    //create appointments

    const appointment = await Appointment.create({

        patient: patientId,

        doctor: doctor._id,

        appointmentDateTime,

        duration: doctor.slotDuration,

        consultationFee: doctor.consultationFee,

        consultationType,

        notes,

    });


    await appointment.populate([
        {
            path: "patient",
            select: "fullName email",
        },
        {
            path: "doctor",
            populate: {
                path: "user",
                select: "fullName email",
            },
        },
    ]);
    return appointment
}




export const getMyAppointments = async (patientId,query)=>{
    const {page=1,limit=10,status,}=query;
    const filter = {patient:patientId}
    if(status){
        filter.status = status
    }
    const pageNumber= Number(page)
    const limitNumber= Number(limit)
    const skip = (pageNumber - 1)*limitNumber;
    const totalAppointments = await Appointment.countDocuments(filter);
    const appointments= await Appointment.find(filter).populate({
        path:"doctor",
        populate:{
            path:"user",
            select:"fullName email"
        }
    }).sort({appointmentDateTime:-1}).skip(skip).limit(limitNumber);
    return {
    appointments,
    totalAppointments,
    currentPage: pageNumber,
    totalPages: Math.ceil(totalAppointments / limitNumber),
};
}




//fetching only logged in user appointment

export const getAppointmentById=async(appointmentId,patientId)=>{
    const appointment= await Appointment.findById(appointmentId).populate({
        path:"patient",
        select:"fullName email"
    }).populate({
        path:"doctor",
        populate:{
            path:"user",
            select:"fullName email"
        }
    })
    if(!appointment){
        throw new AppError("Appointment not found",404)
    }
    //checking ownership
    if(appointment.patient._id.toString()!==patientId.toString()){
        throw new AppError("no appointment found for you yet",404)
    }
    return appointment
}


export const cancelAppointment=async(appointmentId,patientId,reason)=>{
    const appointment = await Appointment.findById(appointmentId);
    if(!appointmentId){
        throw new AppError("Appointment not found",404)
    }
    //checking ownership of appointment
    if(appointment.patient._id.toString() !==patientId.toString()){
        throw new AppError("Appointment not found",404)
    }

    //cannot cancel completed appointment
    if(appointment.status === APPOINTMENT_STATUS.COMPLETED){
        throw new AppError("Completed Appointment cannot be cancelled",400)
    } 

    // Already cancelled
    if (appointment.status === APPOINTMENT_STATUS.CANCELLED) {
        throw new AppError("Appointment is already cancelled",400);
    }

     // Rejected appointment
    if (appointment.status === APPOINTMENT_STATUS.REJECTED) {
        throw new AppError("Rejected appointment cannot be cancelled",400);
    }

    // Appointment already started
    if (new Date() >= appointment.appointmentDateTime) {
        throw new AppError("Appointment has already started",400);
    }

    appointment.status = APPOINTMENT_STATUS.CANCELLED;

     if (reason) {
        appointment.cancellationReason = reason;
    }
    await appointment.save();
    await appointment.populate([
        {
            path: "patient",
            select: "fullName email",
        },
        {
            path: "doctor",
            populate: {
                path: "user",
                select: "fullName email",
            },
        },
    ]);

    return appointment;
}



export const getDoctorAppointments= async(userId,query)=>{
    const doctor = await Doctor.findOne({ user: userId });
    if (!doctor) {
        throw new AppError("Doctor profile not found", 404);
    }
    const {page = 1,limit = 10,status,consultationType,date,} = query;
    const filter = {doctor: doctor._id,};
    if (status) {
        filter.status = status
    }
    if (consultationType) {
        filter.consultationType = consultationType;
    }

    if (date) {

        const start = new Date(date);
        start.setHours(0, 0, 0, 0);

        const end = new Date(date);
        end.setHours(23, 59, 59, 999);

        filter.appointmentDateTime = {
            $gte: start,
            $lte: end,
        };
    }
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const totalAppointments = await Appointment.countDocuments(filter);

    const appointments = await Appointment.find(filter)
        .populate({
            path: "patient",
            select: "fullName email",
        })
        .sort({
            appointmentDateTime: 1,
        })
        .skip(skip)
        .limit(limitNumber);
     return {
        appointments,
        totalAppointments,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalAppointments / limitNumber),
    };
}

export const confirmAppointment= async (userId,appointmentId)=>{
    const doctor = await Doctor.findOne({user:userId});
    if(!doctor){
        throw new AppError("Doctor Profile not found",404);
    }

    const appointment = await Appointment.findById(appointmentId)
    .populate('patient','fullName email')
    .populate({
        path:"doctor",
        populate:{
            path:"user",
            select:"fullName email"
        }
    })
    if(!appointment){
        throw new AppError("Appointment not found",404)
    }
    console.log("Doctor from token:", doctor._id.toString());
console.log("Doctor in appointment:", appointment.doctor._id.toString());
    if(appointment.doctor._id.toString() !== doctor._id.toString()){
        throw new AppError("Unauthorized",403);
    }
    if(appointment.status !== "pending"){
        throw new AppError("Only pending appointments can be confirmed",400)
    }
    appointment.status = "confirmed";
    await appointment.save()
    return appointment;
}

export const rejectAppointment = async (userId,appointmentId,reason)=>{
    const doctor = await Doctor.findOne({user:userId})
    if(!doctor){
        throw new AppError("Doctor profile not Found",404)
    }
    const appointment = await Appointment.findById(appointmentId);
    if(!appointment){
         throw new AppError("Appointment not found", 404);
    }
    if (appointment.doctor.toString() !== doctor._id.toString()) {
        throw new AppError("Unauthorized", 403);
    }
    if (appointment.status !== "pending") {
        throw new AppError(
            "Only pending appointments can be rejected",
            400
        );
    }
    appointment.status = "rejected";
    appointment.cancellationReason = reason;
    await appointment.save();
    return appointment;
}
export const completeAppointment = async (userId,appointmentId) => {

    const doctor = await Doctor.findOne({ user: userId });

    if (!doctor) {
        throw new AppError("Doctor profile not found", 404);
    }

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
        throw new AppError("Appointment not found", 404);
    }

    if (appointment.doctor.toString() !== doctor._id.toString()) {
        throw new AppError("Unauthorized", 403);
    }

    if (appointment.status !== "confirmed") {
        throw new AppError(
            "Only confirmed appointments can be completed",
            400
        );
    }

    appointment.status = "completed";

    await appointment.save();

    return appointment;
};


export const rescheduleAppointment = async (userId,appointmentId,data) => {

    const doctor = await Doctor.findOne({ user: userId });

    if (!doctor) {
        throw new AppError("Doctor profile not found", 404);
    }

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
        throw new AppError("Appointment not found", 404);
    }

    if (appointment.doctor.toString() !== doctor._id.toString()) {
        throw new AppError("Unauthorized", 403);
    }

    const { appointmentDateTime } = data;

    await validateDoctorAvailability(
        doctor,
        appointmentDateTime
    );

    await validateAppointmentConflict(
        doctor._id,
        appointmentDateTime,
        doctor.slotDuration,
        appointment._id
    );

    appointment.appointmentDateTime = appointmentDateTime;
    appointment.status = "rescheduled";

    await appointment.save();

    return appointment;
};