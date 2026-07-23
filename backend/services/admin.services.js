import { ROLES } from "../constants/roles.js"
import Doctor from "../models/Doctor.js"
import User from "../models/User.js"
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

    const doctors = await Doctor.find(filter).populate("user","fullName email").sort({createdAt: -1}).skip(skip).limit(limitNumber)
    
    return{
        totalDoctors,
        currentPage:pageNumber,
        totalPages:Math.ceil(totalDoctors/limitNumber),
        doctors
    }
}


export const getAllUser =async(query)=>{
    const {page=1,limit =10,role,isBlocked}=query
    const filter ={}
    if(isBlocked!==undefined){
        filter.isBlocked=isBlocked==="true"
    }
    if(role){
        filter.role=role
    }
     const pageNumber = Number(page);
    const limitNumber=Number(limit);
    const skip =(pageNumber-1)*limitNumber;
    const totalUsers = await User.countDocuments(filter);
    const users = await User.find(filter).select('-password -refreshToken').sorted({createdAt: -1}).skip(skip).limit(limitNumber)
    return{
        totalUsers,
        user,
        currentPage:pageNumber,
        totalPages:Math.ceil(totalUsers/limitNumber)
    }
} 

export const blockUser = async (currentUserId,targetUserId)=>{
    if(currentUserId === targetUserId){
        throw new AppError("You cannot block your own account",404)
    }
    const user = await User.findById(targetUserId)
    if(!user){
        throw new AppError("User not found",404)
    }
    if(user.role ==="admin"){
        throw new AppError("Super Admin account cannot be Blocked",403)
    }
    if(user.isBlocked){
        throw new AppError("User is already Blocked",400)
    }
    user.isBlocked=true
    await user.save()
    return user;
}

export const unblockUser = async (userId) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new AppError("User not found.", 404);
    }

    if (!user.isBlocked) {
        throw new AppError("User is already active.", 400);
    }

    user.isBlocked = false;

    await user.save();

    return user;
};

export const getDashboardStats = async ()=>{
    const [totalUser,totalDoctos,pendingDoctors,approvedDoctors,rejectedDoctors,blockedUsers,]=await Promise.all([
        User.countDocuments(),
        Doctor.countDocuments(),
        Doctor.countDocuments({
            status:"pending"
        }),
        Doctor.countDocuments({
            status:"approved"
        }),
        Doctor.countDocuments({
            status:"rejected"
        }),
        User.countDocuments({
            isBlocked:true,
        }),
    ]);


    return {totalUser,totalDoctos,pendingDoctors,approvedDoctors,rejectDoctors,blockUsers}
}