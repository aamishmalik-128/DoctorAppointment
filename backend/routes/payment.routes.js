import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';
import { createPaymentIntent, confirmPayment, paymentWebhook } from '../controllers/payment.controller.js';

const router = express.Router();

router.post('/create-intent', authMiddleware, roleMiddleware('patient'), createPaymentIntent);
router.patch('/confirm', authMiddleware, roleMiddleware('patient'), confirmPayment);
router.post('/webhook', paymentWebhook);

export default router;