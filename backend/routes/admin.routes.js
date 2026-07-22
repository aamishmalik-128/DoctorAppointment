import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import  {roleMiddleware}  from '../middleware/roleMiddleware.js'
import { approveDoctor, getAllDoctors, getAllUser, getPendingDoctors, rejectedDoctor,blockUser,unblockUser,getDashBoardStats } from '../controllers/admin.controller.js'





const router = express.Router()

//for doctors
router.get("/doctors/pending",authMiddleware,roleMiddleware("admin"),getPendingDoctors)
router.patch("/doctor/:id/approve",authMiddleware,roleMiddleware("admin"),approveDoctor)
router.patch("/doctors/:id/reject",authMiddleware,roleMiddleware("admin"),rejectedDoctor)
router.get('/doctors',authMiddleware,roleMiddleware("admin"),getAllDoctors)

//for users

router.get('/users',authMiddleware,roleMiddleware("admin"),getAllUser)
router.patch('/users/:id/block',authMiddleware,roleMiddleware("admin"),blockUser)
router.patch("/users/:id/unblock",authMiddleware,roleMiddleware("admin"),unblockUser);


//for statistics on dashboard
router.get("/dashboard",authMiddleware,roleMiddleware("admin"),getDashBoardStats)
export default router