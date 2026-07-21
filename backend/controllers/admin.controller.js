import User from '../models/User.js'
import * as adminServices from '../services/admin.services.js'



export const getPendingDoctors= async(req,res,next)=>{
    try {
        const doctors=await adminServices.getPendingDoctors()
        return res.status(200).json({
            success:true,
            doctors,
        })
    } catch (error) {
        next(error)
    }
}

export const approveDoctor = async(req,res,next)=>{
    try {
        const doctor = await adminServices.approveDoctor(req.params.id);
        return res.status(200).json({
            success:true,
            message:"Doctor approved Successfully",
            doctor,
        })
    } catch (error) {
        next(error)
    }
}


export const rejectedDoctor=async(req,res,next)=>{
    try {
        const doctor = await adminServices.rejectDoctor(req.params.id);
    return res.status(200).json({
        success:true,
        message:"Doctor rejected Successfully.",
        doctor,
    })
    } catch (error) {
        next(error)
    }
}

export const getAllDoctors=async(req,res,next)=>{
    try {
        const result = await adminServices.getAllDoctors(req.query)
        return res.status(200).json({
            success:true,
            ...result
        })
    } catch (error) {
        next(error)
    }
}

export const getAllUser = async(req,res,next)=>{
   try {
     const result= await adminServices.getAllUser(req.query)
     return res.status(200).json({
        success:true,
        ...result,
     })
   } catch (error) {
    next(error)
   }
} 

export const blockUser = async(req,res,next)=>{
    try {
        const user = await adminServices.blockUser(req.user.id,req.params.id)
        return res.status(200).json({
            success:true,
            message:"User Blocked Successfully",
            user,
        })
    } catch (error) {
        next(error)
    }
}


export const unblockUser = async (req, res, next) => {
    try {

        const user = await adminServices.unblockUser(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message: "User unblocked successfully.",
            user,
        });

    } catch (error) {
        next(error);
    }
};