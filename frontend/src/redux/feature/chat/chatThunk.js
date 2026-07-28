import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/axios";

// 1. Create or Get Conversation with a Doctor
export const createOrGetConversation = createAsyncThunk(
    "chat/createOrGetConversation",
    async (doctorId, thunkAPI) => {
        try {
            const { data } = await api.post("/conversations", { doctorId });
            return data.conversation;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to start conversation"
            );
        }
    }
);

// 2. Get Logged-in User's Conversations
export const getMyConversations = createAsyncThunk(
    "chat/getMyConversations",
    async (_, thunkAPI) => {
        try {
            const { data } = await api.get("/conversations");
            return data.conversations;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch conversations"
            );
        }
    }
);

// 3. Get Messages for a Conversation
export const getConversationMessages = createAsyncThunk(
    "chat/getConversationMessages",
    async (conversationId, thunkAPI) => {
        try {
            const { data } = await api.get(`/messages/${conversationId}`);
            return { conversationId, messages: data.messages };
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch messages"
            );
        }
    }
);

// 4. Send Message via REST API
export const sendChatMessage = createAsyncThunk(
    "chat/sendMessage",
    async ({ conversationId, message }, thunkAPI) => {
        try {
            const { data } = await api.post("/messages", {
                conversationId,
                message,
            });
            return data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to send message"
            );
        }
    }
);

// 5. Mark Messages as Read
export const markMessagesAsRead = createAsyncThunk(
    "chat/markMessagesAsRead",
    async (conversationId, thunkAPI) => {
        try {
            const { data } = await api.patch(`/messages/${conversationId}/read`);
            return { conversationId, message: data.message };
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to mark messages as read"
            );
        }
    }
);
