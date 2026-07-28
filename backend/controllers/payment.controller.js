import * as paymentService from "../services/payment.services.js";

export const createPaymentIntent = async (req, res, next) => {
    try {

        const payment =
            await paymentService.createPaymentIntent(
                req.user.id,
                req.body
            );

        return res.status(200).json({
            success: true,
            ...payment,
        });

    } catch (error) {
        next(error);
    }
};

export const confirmPayment = async (req, res, next) => {
    try {

        const appointment =
            await paymentService.confirmPayment(
                req.user.id,
                req.body
            );

        return res.status(200).json({
            success: true,
            message: "Payment confirmed successfully.",
            appointment,
        });

    } catch (error) {
        next(error);
    }
};


export const paymentWebhook = async (req, res, next) => {
    try {

        await paymentService.paymentWebhook(req);

        return res.status(200).json({
            received: true,
        });

    } catch (error) {
        next(error);
    }
};