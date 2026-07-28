import mongoose, { Types } from "mongoose";

const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        enum: [
            "appointment",
            "prescription",
            "payment",
            "refund",
            "system",
        ],
        default: "system",
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    referenceId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    },
},{timestamps:true});
export default mongoose.model(
    "Notification",
    notificationSchema
);
