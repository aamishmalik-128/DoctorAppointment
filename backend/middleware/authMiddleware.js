import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import AppError from '../utils/AppError.js'
import { roleMiddleware } from './roleMiddleware.js';

const authMiddleware = async (req, res, next) => {
    try {
        //console.log(req.headers);
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new AppError("Authentication Failed", 401);
        }
        if (!authHeader.startsWith("Bearer ")) {
            throw new AppError("Invalid Authorization Header", 401);
        }
        //console.log(req.headers.authorization)
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)

        const user = await User.findById(decoded.id)
        if (!user) {
            throw new AppError("User not found", 401)
        }
        if (user.isBlocked) {
            throw new AppError("Your account has been Blocked", 403)
        }
        req.user = {
            id: user._id,
            _id: user._id,
            role: user.role,
            email: user.email,
            isVerified: user.isVerified
        }
        next()
    } catch (error) {
        next(error)
    }
}

export default authMiddleware
