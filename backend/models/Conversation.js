import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
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
        lastMessage: {
            type: String,
            default: "",
            trim: true,
        },
        lastMessageSender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        lastMessageAt: {
            type: Date,
            default: Date.now,
        },
        unreadForPatient: {
            type: Number,
            default: 0,
        },
        unreadForDoctor: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

conversationSchema.index({ patient: 1, doctor: 1 }, { unique: true });
conversationSchema.index({ lastMessageAt: -1 });

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;