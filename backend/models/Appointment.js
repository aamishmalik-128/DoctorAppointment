import mongoose from "mongoose";
import { APPOINTMENT_STATUS } from "../constants/appointmentStatus.js";
import { PAYMENT_STATUS } from "../constants/paymentStatus.js";

const appointmentSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: true,
        },

        appointmentDateTime: {
            type: Date,
            required: true,
        },

        duration: {
            type: Number,
            default: 30,
        },

        consultationType: {
            type: String,
            enum: ["clinic", "online", "in-person", "video"],
            default: "clinic",
        },

        consultationFee: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: Object.values(APPOINTMENT_STATUS),
            default: APPOINTMENT_STATUS.PENDING,
        },

        paymentStatus: {
            type: String,
            enum: Object.values(PAYMENT_STATUS),
            default: PAYMENT_STATUS.PENDING,
        },

        notes: {
            type: String,
            trim: true,
            default: "",
        },

        cancellationReason: {
            type: String,
            trim: true,
            default: "",
        },
        paymentIntentId: {
            type: String,
            default: "",
        },

        paidAt: {
            type: Date,
        },

        paymentMethod: {
            type: String,
            default: "card",
        },

        refundId: {
            type: String,
            default: "",
        },

        refundedAt: {
            type: Date,
        },

        refundAmount: {
            type: Number,
            default: 0,
        }
    },
    {
        timestamps: true,
    }
);

appointmentSchema.index({
    doctor: 1,
    appointmentDateTime: 1,
});

appointmentSchema.index({
    patient: 1,
});

appointmentSchema.index({
    status: 1,
});

appointmentSchema.index({
    appointmentDateTime: 1,
});

const Appointment = mongoose.model(
    "Appointment",
    appointmentSchema
);

export default Appointment;