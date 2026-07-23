import { token } from "morgan";
import User from "../models/User.js";
import {generateAccessToken, generateRefreshToken} from "../utils/generateToken.js";
import AppError from "../utils/AppError.js";
import { ROLES } from "../constants/roles.js";
import * as authService from '../services/auth.services.js'





export  const register = async (req,res,next)=>{
    try {
        console.log("entering the register function")
        console.log(req.body);
        const result = await authService.register(req.body)
        console.log("user added")
        res.cookie('refreshToken',result.refreshToken,{
            httpOnly:true,
            secure:false,
            sameSite:'strict',
            maxAge:7*24*60*60*1000
        })
        const refreshToken = req.cookies.refreshToken
        console.log(refreshToken)
        res.status(201).json({
            success:true,
            message:"Registration successful",
            accessToken:result.accessToken,
            user:result.user,
        })
    } catch (error) {
        next(error)
    }
}

export const  login = async(req,res,next)=>{
    try{
      
        const result = await authService.login(req.body);
        res.cookie(
            "refreshToken",
            result.refreshToken,
            {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
        res.status(200).json({success:true,message:"Login Successfull",accessToken: result.accessToken,user: result.user
         
    });
    }catch(error){
        next(error)
    }

}

export const logout = async(req,res,next)=>{
    try {
        await authService.logout(req.user.id);
        res.clearCookie('refreshToken',{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000,
        })
        res.status(200).json({
            success:true,
            message:"Logged out successfully"
        });
    } catch (error) {
        next(error)
    }
}

export const refreshAccessToken = async(req,res,next)=>{
    try {
        const refreshToken= req.cookies.refreshToken
        const result = await authService.refreshAccessToken(refreshToken);
        res.cookie("refreshToken",result.refreshToken,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:7 * 24 * 60 * 60 * 1000,

        })
        res.status(200).json({
            success:true,
            accessToken:result.accessToken,
        })
    } catch (error) {
        next(error)
    }
}



export const getCurrentUser = async(req,res,next)=>{
    try {
        const user = await authService.getCurrentUser(req.user.id)
        res.status(200).json({
            success:true,
            user,
        })
    } catch (error) {
        next(error)
    }
} 