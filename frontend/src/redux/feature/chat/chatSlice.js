import { createSlice } from "@reduxjs/toolkit";
import {
    createOrGetConversation,
    getMyConversations,
    getConversationMessages,
    sendChatMessage,
    markMessagesAsRead,
} from "./chatThunk";

const initialState = {
    conversations: [],
    activeConversationId: null,
    messages: {}, // { [conversationId]: [msg1, msg2] }
    typingStatus: {}, // { [conversationId]: "Sender Name" }
    loadingConversations: false,
    loadingMessages: false,
    sendingMessage: false,
    error: null,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setActiveConversation(state, action) {
            state.activeConversationId = action.payload;
        },

        receiveSocketMessage(state, action) {
            const newMessage = action.payload;
            const convId = newMessage.conversation;

            if (!state.messages[convId]) {
                state.messages[convId] = [];
            }

            // Deduplicate message by _id
            const exists = state.messages[convId].some((m) => m._id === newMessage._id);
            if (!exists) {
                state.messages[convId].push(newMessage);
            }

            // Update conversation list item
            const convIndex = state.conversations.findIndex((c) => c._id === convId);
            if (convIndex !== -1) {
                state.conversations[convIndex].lastMessage = newMessage.message;
                state.conversations[convIndex].lastMessageSender = newMessage.sender?._id || newMessage.sender;
                state.conversations[convIndex].lastMessageAt = newMessage.createdAt || new Date().toISOString();
                
                // Move conversation to top
                const [movedConv] = state.conversations.splice(convIndex, 1);
                state.conversations.unshift(movedConv);
            }
        },

        setTypingStatus(state, action) {
            const { conversationId, sender } = action.payload;
            state.typingStatus[conversationId] = sender;
        },

        clearTypingStatus(state, action) {
            const { conversationId } = action.payload;
            delete state.typingStatus[conversationId];
        },

        markConversationRead(state, action) {
            const conversationId = action.payload;
            const conv = state.conversations.find((c) => c._id === conversationId);
            if (conv) {
                conv.unreadForPatient = 0;
                conv.unreadForDoctor = 0;
            }
        },

        clearChatState(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Get My Conversations
            .addCase(getMyConversations.pending, (state) => {
                state.loadingConversations = true;
                state.error = null;
            })
            .addCase(getMyConversations.fulfilled, (state, action) => {
                state.loadingConversations = false;
                state.conversations = action.payload || [];
            })
            .addCase(getMyConversations.rejected, (state, action) => {
                state.loadingConversations = false;
                state.error = action.payload;
            })

            // Create or Get Conversation
            .addCase(createOrGetConversation.fulfilled, (state, action) => {
                const newConv = action.payload;
                const exists = state.conversations.some((c) => c._id === newConv._id);
                if (!exists) {
                    state.conversations.unshift(newConv);
                }
                state.activeConversationId = newConv._id;
            })

            // Get Conversation Messages
            .addCase(getConversationMessages.pending, (state) => {
                state.loadingMessages = true;
                state.error = null;
            })
            .addCase(getConversationMessages.fulfilled, (state, action) => {
                state.loadingMessages = false;
                const { conversationId, messages } = action.payload;
                state.messages[conversationId] = messages || [];
            })
            .addCase(getConversationMessages.rejected, (state, action) => {
                state.loadingMessages = false;
                state.error = action.payload;
            })

            // Send Chat Message
            .addCase(sendChatMessage.pending, (state) => {
                state.sendingMessage = true;
            })
            .addCase(sendChatMessage.fulfilled, (state, action) => {
                state.sendingMessage = false;
                const newMessage = action.payload;
                const convId = newMessage.conversation;

                if (!state.messages[convId]) {
                    state.messages[convId] = [];
                }

                const exists = state.messages[convId].some((m) => m._id === newMessage._id);
                if (!exists) {
                    state.messages[convId].push(newMessage);
                }

                const convIndex = state.conversations.findIndex((c) => c._id === convId);
                if (convIndex !== -1) {
                    state.conversations[convIndex].lastMessage = newMessage.message;
                    state.conversations[convIndex].lastMessageSender = newMessage.sender?._id || newMessage.sender;
                    state.conversations[convIndex].lastMessageAt = newMessage.createdAt || new Date().toISOString();
                }
            })
            .addCase(sendChatMessage.rejected, (state, action) => {
                state.sendingMessage = false;
                state.error = action.payload;
            })

            // Mark Messages as Read
            .addCase(markMessagesAsRead.fulfilled, (state, action) => {
                const { conversationId } = action.payload;
                const conv = state.conversations.find((c) => c._id === conversationId);
                if (conv) {
                    conv.unreadForPatient = 0;
                    conv.unreadForDoctor = 0;
                }
            });
    },
});

export const {
    setActiveConversation,
    receiveSocketMessage,
    setTypingStatus,
    clearTypingStatus,
    markConversationRead,
    clearChatState,
} = chatSlice.actions;

export default chatSlice.reducer;
