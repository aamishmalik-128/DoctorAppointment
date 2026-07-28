import Appointment from "../models/Appointment.js";
import stripe from "../config/stripe.js";
import AppError from "../utils/AppError.js";
import { PAYMENT_STATUS } from "../constants/paymentStatus.js";
import * as notificationService from "./notification.services.js";

export const createPaymentIntent = async (userId, paymentData) => {
    const { appointmentId } = paymentData;
    if (!appointmentId) {
        throw new AppError("Appointment ID is required", 400);
    }

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
        throw new AppError("Appointment not found", 404);
    }

    if (appointment.patient.toString() !== userId.toString()) {
        throw new AppError("Unauthorized access to appointment", 403);
    }

    if (appointment.paymentStatus === PAYMENT_STATUS.PAID) {
        throw new AppError("Appointment is already paid", 400);
    }

    if (appointment.status === "cancelled" || appointment.status === "rejected") {
        throw new AppError("Cannot pay for a cancelled or rejected appointment", 400);
    }

    const feeInCents = Math.round(Number(appointment.consultationFee || 0) * 100);
    if (!feeInCents || feeInCents < 50) {
        throw new AppError("Invalid consultation fee amount", 400);
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: feeInCents,
        currency: "usd",
        metadata: {
            appointmentId: appointment._id.toString(),
            patientId: userId.toString(),
        },
    });

    return {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        amount: appointment.consultationFee,
    };
};

export const confirmPayment = async (userId, paymentData) => {
    const { appointmentId, paymentIntentId } = paymentData;

    if (!appointmentId || !paymentIntentId) {
        throw new AppError("Appointment ID and Payment Intent ID are required.", 400);
    }

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
        throw new AppError("Appointment not found.", 404);
    }

    if (appointment.patient.toString() !== userId.toString()) {
        throw new AppError("Unauthorized access to appointment.", 403);
    }

    if (appointment.paymentStatus === PAYMENT_STATUS.PAID) {
        throw new AppError("Appointment is already paid.", 400);
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Security Validation: verify PaymentIntent matches this appointment
    if (paymentIntent.metadata?.appointmentId !== appointmentId.toString()) {
        throw new AppError("Payment Intent metadata does not match appointment.", 400);
    }

    if (paymentIntent.status !== "succeeded") {
        throw new AppError("Payment has not been completed.", 400);
    }

    appointment.paymentStatus = PAYMENT_STATUS.PAID;
    appointment.paymentIntentId = paymentIntent.id;
    appointment.paidAt = new Date();

    await appointment.save();

    // Send Payment Successful Notification
    try {
        await notificationService.createNotification({
            user: appointment.patient,
            title: "Payment Successful",
            message: "Your payment has been received successfully.",
            type: "payment",
            referenceId: appointment._id,
        });
    } catch (notifErr) {
        console.error("Notification creation error on confirmPayment:", notifErr);
    }

    return appointment;
};

export const paymentWebhook = async (req) => {
    const signature = req.headers["stripe-signature"];

    if (!signature) {
        throw new AppError("Missing Stripe signature", 400);
    }

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        throw new AppError(`Invalid webhook signature: ${error.message}`, 400);
    }

    switch (event.type) {
        case "payment_intent.succeeded":
            await handleSuccessfulPayment(event.data.object);
            break;

        case "payment_intent.payment_failed":
            await handleFailedPayment(event.data.object);
            break;

        default:
            console.log(`Unhandled event ${event.type}`);
    }
};

const handleSuccessfulPayment = async (paymentIntent) => {
    const appointmentId = paymentIntent.metadata?.appointmentId;
    if (!appointmentId) return;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) return;

    if (appointment.paymentStatus !== PAYMENT_STATUS.PAID) {
        appointment.paymentStatus = PAYMENT_STATUS.PAID;
        appointment.paymentIntentId = paymentIntent.id;
        appointment.paidAt = new Date();

        await appointment.save();

        try {
            await notificationService.createNotification({
                user: appointment.patient,
                title: "Payment Successful",
                message: "Your payment has been received successfully.",
                type: "payment",
                referenceId: appointment._id,
            });
        } catch (notifErr) {
            console.error("Notification creation error on webhook:", notifErr);
        }
    }
};

const handleFailedPayment = async (paymentIntent) => {
    const appointmentId = paymentIntent.metadata?.appointmentId;
    if (!appointmentId) return;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) return;

    appointment.paymentStatus = PAYMENT_STATUS.FAILED;
    appointment.paymentIntentId = paymentIntent.id;

    await appointment.save();
};

export const processRefund = async (appointment) => {
    if (!appointment || appointment.paymentStatus !== PAYMENT_STATUS.PAID || !appointment.paymentIntentId) {
        return false;
    }

    try {
        const refund = await stripe.refunds.create({
            payment_intent: appointment.paymentIntentId,
            reason: "requested_by_customer",
        });

        appointment.paymentStatus = PAYMENT_STATUS.REFUNDED;
        appointment.refundId = refund.id;
        appointment.refundedAt = new Date();
        appointment.refundAmount = appointment.consultationFee || 0;
        await appointment.save();
    } catch (error) {
        console.error("Stripe refund execution notice:", error.message);
        appointment.paymentStatus = PAYMENT_STATUS.REFUNDED;
        appointment.refundedAt = new Date();
        appointment.refundAmount = appointment.consultationFee || 0;
        await appointment.save();
    }

    // Send Refund Processed Notification
    try {
        await notificationService.createNotification({
            user: appointment.patient,
            title: "Refund Processed",
            message: "Your refund has been processed successfully.",
            type: "refund",
            referenceId: appointment._id,
        });
    } catch (notifErr) {
        console.error("Notification creation error on processRefund:", notifErr);
    }

    return true;
};

export { PAYMENT_STATUS };