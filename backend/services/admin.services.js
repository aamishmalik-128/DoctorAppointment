import Doctor from "../models/Doctor.js"
import AppError from "../utils/AppError.js"



export const getPendingDoctors = async()=>{
    const doctors= await Doctor.find({
        status:"pending"
    }).populate("user","fullName email").sort({
        createdAt:-1
    })
    return doctors
}


export const approveDoctor=async(doctorId)=>{
    const doctor=await Doctor.findById(doctorId);
    if(!doctor){
        throw new AppError("Doctor not found",404);
    }
    if(doctor.status === "approved"){
        throw new AppError("Doctor is already Approved",400)
    }
    if (doctor.status === "rejected") {
    throw new AppError(
        "Rejected doctor cannot be approved directly",
        400
    );
}
    doctor.status="approved"
    await doctor.save()
    await doctor.populate("user", "fullName email");
    return doctor;
}


export const rejectDoctor= async(doctorId)=>{
    const doctor= await Doctor.findById(doctorId)
    if(!doctor){
        throw new AppError("Doctor not found",404)
    }
    if(doctor.status === "rejected"){
        throw new AppError("Doctor is Already rejected",400);
    }
    doctor.status="rejected"
    await doctor.save();
    await doctor.populate("user","fullName email")
    return doctor
}

export const getAllDoctors = async (query) => {


    const {page=1,limit=10,status,specialization,hospital,}=query;
    const filter ={}
    if(status){
        filter.status = status
    }
    if(specialization){
        filter.specialization=specialization
    }
    if(hospital){
        filter.hospital=hospital
    }
    const pageNumber = Number(page);
    const limitNumber=Number(limit);
    const skip =(pageNumber-1)*limitNumber;
    const totalDoctors = await Doctor.countDocuments(filter);

    const doctors = (await Doctor.find(filter).populate("user","fullName email")).toSorted({createdAt: -1}).skip(skip).limit(limitNumber)
    
    return{
        totalDoctors,
        currentPage:pageNumber,
        totalPages:Math.ceil(totalDoctors/limitNumber),
        doctors
    }
}