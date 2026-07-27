import Doctor from "../models/Doctor.js";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import { ROLES } from "../constants/roles.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";
export const registerDoctor = async ({ fullName, email, password }) => {

    console.log("fullName:", fullName);
    console.log("email:", email);
    console.log("password:", password);


    const existingUser = await User.findOne({ email })
    if (existingUser) {
        throw new AppError("Email Already Registered", 409)
    }
    const user = await User.create({ fullName, email, password, role: ROLES.DOCTOR })

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    await user.updateOne({
        refreshToken,
    });
    return {
        accessToken,
        refreshToken,
        user: {

            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,

        }
    }
}
export const createDoctorProfile = async (userId, doctorData) => {

    const existingProfile = await Doctor.findOne({ user: userId })
    if (existingProfile) {
        throw new AppError("Doctor profile already exists", 400);
    }
    const { specialization, qualification, experience, consultationFee, hospital, clinicalAddress, bio, availableDays, availableTime } = doctorData
    if (!specialization || !qualification || experience === undefined || consultationFee === undefined || !clinicalAddress) {
        throw new AppError("Please fill all required fields.", 401);
    }
    const doctor = await Doctor.create({
        user: userId,
        specialization,
        qualification,
        experience,
        consultationFee,
        hospital,
        clinicalAddress,
        bio,
        availableDays,
        availableTime,
    });
    return doctor
}


export const getDoctorProfile = async (userId) => {
    const doctor = await Doctor.findOne({ user: userId }).populate("user", "name email role")
    if (!doctor) {
        throw new AppError("Doctor Profile not found", 404)
    }
    return doctor
}



export const updateDoctorProfile = async (userId, doctorData) => {
    const doctor = await Doctor.findOne({ user: userId })
    if (!doctor) {
        throw new AppError("Doctor profile not found", 404)
    }
    const allowedFields = [
        "specialization",
        "qualification",
        "experience",
        "consultationFee",
        "hospital",
        "clinicalAddress",
        "bio",
        "availableDays",
        "availableTime",
    ];
    allowedFields.forEach((field) => {
        if (doctorData[field] !== undefined) {
            doctor[field] = doctorData[field]
        }
    })
    await doctor.save()

    await doctor.populate("user", "fullName email role")
    return doctor;
}
export const getAllDoctors = async (query) => {

    const {
        page = 1,
        limit = 10,
        specialization,
        hospital,
        minFee,
        maxFee,
    } = query;

    const filter = {
        status: "approved",
    };

    if (specialization) {
        filter.specialization = {
            $regex: specialization,
            $options: "i",
        };
    }

    if (hospital) {
        filter.hospital = {
            $regex: hospital,
            $options: "i",
        };
    }

    if (minFee || maxFee) {

        filter.consultationFee = {};

        if (minFee) {
            filter.consultationFee.$gte = Number(minFee);
        }

        if (maxFee) {
            filter.consultationFee.$lte = Number(maxFee);
        }
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const doctors = await Doctor.find(filter)
        .populate("user", "fullName email")
        .skip(skip)
        .limit(limitNumber)
        .sort({ createdAt: -1 });

    const totalDoctors = await Doctor.countDocuments(filter);

    return {
        currentPage: pageNumber,
        totalPages: Math.ceil(totalDoctors / limitNumber),
        totalDoctors,
        doctors,
    };
};

export const getDoctorById= async(doctorId)=>{
    const doctor = await Doctor.findOne({_id:doctorId,status:"approved",}).populate("user","fullName");
    if(!doctor){
        throw new AppError("Doctor not found", 404)
    }
    if(!doctor.status ==="approved"){
        throw new AppError("Doctor not found", 404)
    }
    return doctor;
}