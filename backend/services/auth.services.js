import User from "../models/User.js";

import { ROLES } from "../constants/roles.js";

import AppError from "../utils/AppError.js";

import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";

import jwt from 'jsonwebtoken'



export const register = async ({ fullName, email, password, role }) => {
   
    console.log("fullName:", fullName);
    console.log("email:", email);
    console.log("password:", password);
    console.log("role:", role);

    
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        throw new AppError("Email Already Registered", 409)
    }
    const user = await User.create({ fullName, email, password, role, isVerified: role === ROLES.PATIENT })
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
export const login = async ({ email, password }) => {
    const user = await User.findOne({ email }).select("+password +refreshToken")
    if (!user) {
        throw new AppError("InValid email or password", 401)
    }
    const matched = await user.comparePassword(password);
    if (!matched) {
        throw new AppError("Invalid Email or password", 401)
    }
    if (user.isBlocked) {
        throw new AppError("Your Account has been Blocked", 403)
    }
    if (user.role === ROLES.DOCTOR && !user.isVerified) {
        throw new AppError("Waiting for Admin Approval", 403)
    }
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
export const logout = async (userId) => {

    await User.findByIdAndUpdate(

        userId,

        {

            refreshToken: null,

        }

    );

};


export const refreshAccessToken = async (refreshToken) => {
    if (!refreshToken) {
        throw new AppError("Refresh token is required", 401)
    }
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_ACCESS_SECRET)
    const user = await User.findById(decoded.id).select('+refreshToken');
    if (user.refreshToken !== refreshToken) {
        throw new AppError("Invalid refresh Token", 401)
    }
    const accessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    await User.findByIdAndUpdate(user._id, {
        refreshToken: newRefreshToken,
    })
    return {
        accessToken,
        refreshToken: newRefreshToken
    }
}