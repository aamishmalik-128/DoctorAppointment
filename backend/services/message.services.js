import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";
import Doctor from "../models/Doctor.js";
import AppError from "../utils/AppError.js";


export const sendMessage = async (
    userId,
    role,
    conversationId,
    message
) => {

    if (!message?.trim()) {
        throw new AppError("Message is required", 400);
    }

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
        throw new AppError("Conversation not found", 404);
    }

    let sender;
    let receiver;

    if (role === "patient") {

        if (conversation.patient.toString() !== userId.toString()) {
            throw new AppError("Unauthorized", 403);
        }

        const doctor = await Doctor.findById(conversation.doctor);

        sender = userId;
        receiver = doctor.user;

        conversation.unreadForDoctor += 1;

    } else if (role === "doctor") {

        const doctor = await Doctor.findOne({
            user: userId,
        });

        if (!doctor) {
            throw new AppError("Doctor profile not found", 404);
        }

        if (conversation.doctor.toString() !== doctor._id.toString()) {
            throw new AppError("Unauthorized", 403);
        }

        sender = userId;
        receiver = conversation.patient;

        conversation.unreadForPatient += 1;

    } else {

        throw new AppError("Unauthorized", 403);

    }

    const newMessage = await Message.create({
        conversation: conversationId,
        sender,
        receiver,
        message,
    });

    conversation.lastMessage = message;
    conversation.lastMessageSender = sender;
    conversation.lastMessageAt = new Date();

    await conversation.save();

    await newMessage.populate([
        {
            path: "sender",
            select: "fullName email avatar",
        },
        {
            path: "receiver",
            select: "fullName email avatar",
        },
    ]);

    return newMessage;
};



export const getConversationMessages = async (
    userId,
    role,
    conversationId
) => {

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
        throw new AppError("Conversation not found", 404);
    }

    if (role === "patient") {

        if (conversation.patient.toString() !== userId.toString()) {
            throw new AppError("Unauthorized", 403);
        }

    } else if (role === "doctor") {

        const doctor = await Doctor.findOne({
            user: userId,
        });

        if (!doctor) {
            throw new AppError("Doctor profile not found", 404);
        }

        if (conversation.doctor.toString() !== doctor._id.toString()) {
            throw new AppError("Unauthorized", 403);
        }

    }

    const messages = await Message.find({
        conversation: conversationId,
    })
        .populate(
            "sender",
            "fullName email avatar"
        )
        .populate(
            "receiver",
            "fullName email avatar"
        )
        .sort({
            createdAt: 1,
        });

    return messages;
};


export const markMessagesAsRead = async (
    userId,
    role,
    conversationId
) => {

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
        throw new AppError("Conversation not found", 404);
    }

    await Message.updateMany(
        {
            conversation: conversationId,
            receiver: userId,
            isRead: false,
        },
        {
            isRead: true,
            readAt: new Date(),
        }
    );

    if (role === "patient") {

        conversation.unreadForPatient = 0;

    } else if (role === "doctor") {

        conversation.unreadForDoctor = 0;

    }

    await conversation.save();

    return;
};