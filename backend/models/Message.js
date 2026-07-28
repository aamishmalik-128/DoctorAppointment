import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        conversation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation",
            required: true,
        },

        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        message: {
            type: String,
            required: true,
            trim: true,
        },

        messageType: {
            type: String,
            enum: ["text", "image", "file"],
            default: "text",
        },

        attachment: {
            type: String,
            default: "",
        },

        isRead: {
            type: Boolean,
            default: false,
        },

        readAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

// Fetch chat history quickly
messageSchema.index({
    conversation: 1,
    createdAt: 1,
});

// Fetch unread messages
messageSchema.index({
    receiver: 1,
    isRead: 1,
});

const Message = mongoose.model("Message", messageSchema);

export default Message;