import Doctor from "../models/Doctor.js";
import User from "../models/User.js";
import * as doctorService from '../services/doctorServices.js'


export const registerDoctor=async(req,res,next)=>{
    try{
        const result = await doctorService.registerDoctor(req.body)
        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(201).json({
            success: true,
            message: "Doctor account registered successfully",
            accessToken: result.accessToken,
            user: result.user,
        });
    }catch(error){
        next(error)
    }
}
export const createDoctorProfile = async(req,res,next)=>{
    try {
            const doctor = await doctorService.createDoctorProfile(req.user.id,req.body)
            return res.status(201).json({
                success:true,
                message: "Doctor Profile created successfully.",
                doctor,
            });
    } catch (error) {
        next(error)
    }
}

export const getDoctorProfile = async(req,res,next)=>{
    try {
        const doctor = await doctorService.getDoctorProfile(req.user.id)
        return res.status(200).json({
            success:true,
            doctor
        })
    } catch (error) {
        next(error)
    }
}

export const updateDoctorProfile= async(req,res,next)=>{
    try {
        const doctor = await doctorService.updateDoctorProfile(req.user.id,req.body)
        return res.status(200).json({success:true,message:"Doctor profile updated successfully",doctor})
    } catch (error) {
        next(error)
    }
}

export const getAllDoctors= async(req,res,next)=>{
    try {
        const result = await doctorService.getAllDoctors(req.query)
        return res.status(200).json({
            success:true,
            ...result
        })
    } catch (error) {
        next(error)
    }
}

export const getDoctorById = async (req,res,next)=>{
    try {
        const doctor = await doctorService.getDoctorById(req.params.id)
        return res.status(200).json({
            success:true,
            doctor,
        })
    } catch (error) {
        next(error)
    }
}