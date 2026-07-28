import { Server } from "socket.io";
import onlineUsers from "./onlineUsers.js";
import Conversation from "../models/Conversation.js";
import Doctor from "../models/Doctor.js";
import Message from "../models/Message.js";

let io;

export const initializeSocket = (server) => {

    io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            credentials: true,
        },
    });

    io.on("connection", (socket) => {

        console.log("Socket Connected:", socket.id);

        // ==========================
        // User Connected
        // ==========================

        socket.on("join", ({ userId }) => {

            onlineUsers.set(userId, socket.id);

            console.log(`${userId} joined`);

        });

        // ==========================
        // Join Conversation Room
        // ==========================

        socket.on("joinConversation", (conversationId) => {

            socket.join(conversationId);

        });

        // ==========================
        // Send Message
        // ==========================

        socket.on("sendMessage", async (data) => {

            try {

                const {
                    conversationId,
                    senderId,
                    role,
                    message,
                } = data;

                const conversation =
                    await Conversation.findById(
                        conversationId
                    );

                if (!conversation) return;

                let receiverId;

                if (role === "patient") {

                    const doctor =
                        await Doctor.findById(
                            conversation.doctor
                        );

                    receiverId = doctor.user;

                    conversation.unreadForDoctor++;

                } else {

                    receiverId =
                        conversation.patient;

                    conversation.unreadForPatient++;

                }

                const newMessage =
                    await Message.create({
                        conversation:
                            conversationId,
                        sender: senderId,
                        receiver: receiverId,
                        message,
                    });

                conversation.lastMessage =
                    message;

                conversation.lastMessageSender =
                    senderId;

                conversation.lastMessageAt =
                    new Date();

                await conversation.save();

                await newMessage.populate([
                    {
                        path: "sender",
                        select:
                            "fullName avatar",
                    },
                    {
                        path: "receiver",
                        select:
                            "fullName avatar",
                    },
                ]);

                io.to(conversationId).emit(
                    "receiveMessage",
                    newMessage
                );

            } catch (error) {

                console.log(error);

            }

        });

        // ==========================
        // Typing
        // ==========================

        socket.on(
            "typing",
            ({ conversationId, sender }) => {

                socket.to(conversationId).emit(
                    "typing",
                    sender
                );

            }
        );

        socket.on(
            "stopTyping",
            ({ conversationId }) => {

                socket.to(conversationId).emit(
                    "stopTyping"
                );

            }
        );

        // ==========================
        // Disconnect
        // ==========================

        socket.on("disconnect", () => {

            for (const [userId, socketId] of onlineUsers) {

                if (socketId === socket.id) {

                    onlineUsers.delete(userId);

                    break;

                }

            }

            console.log("Disconnected");

        });

    });

};

export const getIO = () => io;