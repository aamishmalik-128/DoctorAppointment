import express from 'express'
import * as authController from '../controllers/auth.controller.js'
import { loginValidation, registerValidation, } from '../validators/auth.validator.js'
import authMiddleware from '../middleware/authMiddleware.js';


const router=express.Router();


router.post('/register',registerValidation,authController.register)

router.post('/login',loginValidation,authController.login)
 
router.post('/logout',authMiddleware,authController.logout)

router.post('/refresh-token',authController.refreshAccessToken)
router.get("/me",authMiddleware,authController.getCurrentUser);

export default router
