import mongoose from "mongoose";
import availabilitySchema from "./Availability.js";

const doctorSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        specialization: {
            type: String,
            required: true,
            trim: true,
        },

        qualification: {
            type: String,
            required: true,
            trim: true,
        },

        experience: {
            type: Number,
            required: true,
            min: 0,
        },

        consultationFee: {
            type: Number,
            required: true,
            min: 0,
        },

        hospital: {
            type: String,
            trim: true,
            default: "",
        },

        clinicalAddress: {
            type: String,
            required: true,
            trim: true,
        },

        bio: {
            type: String,
            trim: true,
            default: "",
        },

        profileImage: {
            type: String,
            default: "",
        },

        availability: {
            type: [availabilitySchema],
            default: [],
        },

        slotDuration: {
            type: Number,
            default: 30,
        },

        isAvailable: {
            type: Boolean,
            default: true,
        },

        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;