import { useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
    Send,
    Search,
    MessageSquare,
    User,
    Stethoscope,
    Clock,
    Check,
    CheckCheck,
    ArrowLeft,
    Sparkles,
    Loader2,
    Smile,
    Shield,
    Calendar,
} from "lucide-react";

import socket from "../../socket/socket";
import {
    createOrGetConversation,
    getMyConversations,
    getConversationMessages,
    sendChatMessage,
    markMessagesAsRead,
} from "../../redux/feature/chat/chatThunk";
import {
    setActiveConversation,
    receiveSocketMessage,
    setTypingStatus,
    clearTypingStatus,
    markConversationRead,
} from "../../redux/feature/chat/chatSlice";
import { formatDoctorName } from "../../utils/formatDoctorName";

const QUICK_EMOJIS = ["😊", "👍", "🙏", "❤️", "🩺", "💊", "🏥", "✅"];

const formatTimeAgo = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    }
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const Chat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const doctorIdParam = searchParams.get("doctorId");

    const bottomRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    const { user, isAuthenticated } = useSelector((state) => state.auth || {});
    const {
        conversations = [],
        activeConversationId,
        messages = {},
        typingStatus = {},
        loadingConversations,
        loadingMessages,
        sendingMessage,
    } = useSelector((state) => state.chat || {});

    const [text, setText] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [showMobileChat, setShowMobileChat] = useState(false);

    const isDoctorRole = user?.role === "doctor";

    // 1. Socket Connection & Global Room Join on Mount
    useEffect(() => {
        if (isAuthenticated && user?._id) {
            socket.connect();
            socket.emit("join", { userId: user._id });
        }

        return () => {
            // keep socket alive for global notifications if needed
        };
    }, [isAuthenticated, user]);

    // 2. Fetch Conversations on Mount
    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getMyConversations());
        }
    }, [dispatch, isAuthenticated]);

    // 3. Auto-handle doctorIdParam if initiated from doctor profile or appointment detail
    useEffect(() => {
        if (doctorIdParam && user?.role === "patient") {
            dispatch(createOrGetConversation(doctorIdParam)).then((res) => {
                if (res.payload?._id) {
                    dispatch(setActiveConversation(res.payload._id));
                    setShowMobileChat(true);
                }
            });
        }
    }, [dispatch, doctorIdParam, user]);

    // Current Active Conversation Object
    const activeConversation = useMemo(() => {
        return conversations.find((c) => c._id === activeConversationId) || null;
    }, [conversations, activeConversationId]);

    // Current Conversation Messages List
    const activeMessages = useMemo(() => {
        if (!activeConversationId) return [];
        return messages[activeConversationId] || [];
    }, [messages, activeConversationId]);

    // Current Interlocutor Details (Doctor or Patient)
    const interlocutor = useMemo(() => {
        if (!activeConversation) return null;
        if (isDoctorRole) {
            // Patient details
            return {
                name: activeConversation.patient?.fullName || "Patient",
                avatar: activeConversation.patient?.avatar,
                email: activeConversation.patient?.email,
                role: "Patient",
            };
        } else {
            // Doctor details
            const docObj = activeConversation.doctor;
            const docUser = docObj?.user || docObj;
            return {
                name: formatDoctorName(docUser?.fullName || docObj?.fullName),
                avatar: docUser?.avatar || docObj?.profileImage,
                specialization: docObj?.specialization || "Specialist Practitioner",
                hospital: docObj?.hospital,
                role: "Doctor",
            };
        }
    }, [activeConversation, isDoctorRole]);

    // 4. Join Conversation Socket Room & Fetch Messages when Active Conversation changes
    useEffect(() => {
        if (!activeConversationId) return;

        // Join Socket Room
        socket.emit("joinConversation", activeConversationId);

        // Fetch Messages History
        dispatch(getConversationMessages(activeConversationId));

        // Mark as read
        dispatch(markMessagesAsRead(activeConversationId));
        dispatch(markConversationRead(activeConversationId));
    }, [activeConversationId, dispatch]);

    // 5. Socket Listeners for Real-Time Messages & Typing Indicators
    useEffect(() => {
        const handleReceiveMessage = (newMessage) => {
            dispatch(receiveSocketMessage(newMessage));

            // Auto-mark as read if this conversation is currently open
            if (newMessage.conversation === activeConversationId) {
                dispatch(markMessagesAsRead(activeConversationId));
            }
        };

        const handleTypingEvent = (senderName) => {
            if (activeConversationId) {
                dispatch(setTypingStatus({ conversationId: activeConversationId, sender: senderName }));
            }
        };

        const handleStopTypingEvent = () => {
            if (activeConversationId) {
                dispatch(clearTypingStatus({ conversationId: activeConversationId }));
            }
        };

        socket.on("receiveMessage", handleReceiveMessage);
        socket.on("typing", handleTypingEvent);
        socket.on("stopTyping", handleStopTypingEvent);

        return () => {
            socket.off("receiveMessage", handleReceiveMessage);
            socket.off("typing", handleTypingEvent);
            socket.off("stopTyping", handleStopTypingEvent);
        };
    }, [activeConversationId, dispatch]);

    // 6. Auto-scroll to bottom on new message
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [activeMessages, typingStatus]);

    // Handle Text Change & Emit Typing Event
    const handleTextChange = (e) => {
        const value = e.target.value;
        setText(value);

        if (activeConversationId) {
            socket.emit("typing", {
                conversationId: activeConversationId,
                sender: user?.fullName || "User",
            });

            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
            typingTimeoutRef.current = setTimeout(() => {
                socket.emit("stopTyping", { conversationId: activeConversationId });
            }, 2500);
        }
    };

    // Send Message Handler
    const handleSendMessage = async (e) => {
        if (e) e.preventDefault();
        if (!text.trim() || !activeConversationId || sendingMessage) return;

        const messageContent = text.trim();
        setText("");

        // Stop typing indicator
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        socket.emit("stopTyping", { conversationId: activeConversationId });

        // Emit realtime socket event
        socket.emit("sendMessage", {
            conversationId: activeConversationId,
            senderId: user._id,
            role: user.role,
            message: messageContent,
        });

        // Persist via REST API
        await dispatch(
            sendChatMessage({
                conversationId: activeConversationId,
                message: messageContent,
            })
        );
    };

    // Select a conversation
    const handleSelectConversation = (convId) => {
        dispatch(setActiveConversation(convId));
        setShowMobileChat(true);
    };

    // Search filter for conversation list
    const filteredConversations = useMemo(() => {
        return conversations.filter((c) => {
            if (!searchQuery.trim()) return true;
            const q = searchQuery.toLowerCase();
            const pName = (c.patient?.fullName || "").toLowerCase();
            const dName = (c.doctor?.user?.fullName || c.doctor?.fullName || "").toLowerCase();
            return pName.includes(q) || dName.includes(q);
        });
    }, [conversations, searchQuery]);

    const currentTypingUser = activeConversationId ? typingStatus[activeConversationId] : null;

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 via-teal-50/20 to-emerald-50/30 p-2 sm:p-6 lg:p-8 flex items-center justify-center text-slate-800">
            <div className="w-full max-w-7xl h-[85vh] rounded-3xl border border-white/80 bg-white/95 shadow-2xl backdrop-blur-xl flex overflow-hidden">

                {/* ==================================================== */}
                {/* LEFT SIDEBAR: Conversation List                      */}
                {/* ==================================================== */}
                <div
                    className={`${
                        showMobileChat ? "hidden md:flex" : "flex"
                    } w-full md:w-80 lg:w-96 flex-col border-r border-slate-100 bg-slate-50/50 shrink-0`}
                >
                    {/* Header & Search */}
                    <div className="p-4 sm:p-5 border-b border-slate-100 space-y-3 bg-white/80">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-md shadow-teal-500/20">
                                    <MessageSquare size={18} />
                                </div>
                                <h2 className="text-lg font-black text-slate-900 tracking-tight">
                                    Messages
                                </h2>
                            </div>
                            <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-bold text-teal-700">
                                {conversations.length} Active
                            </span>
                        </div>

                        {/* Search Input */}
                        <div className="relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={isDoctorRole ? "Search patient name..." : "Search doctor name..."}
                                className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition"
                            />
                        </div>
                    </div>

                    {/* Conversation Items List */}
                    <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
                        {loadingConversations ? (
                            <div className="flex flex-col items-center justify-center py-12 text-slate-400 gap-2">
                                <Loader2 size={24} className="animate-spin text-teal-600" />
                                <span className="text-xs font-medium">Loading chats...</span>
                            </div>
                        ) : filteredConversations.length === 0 ? (
                            <div className="py-12 px-6 text-center text-slate-500">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 mb-3">
                                    <Sparkles size={24} />
                                </div>
                                <h3 className="text-sm font-bold text-slate-800">No Conversations</h3>
                                <p className="text-xs text-slate-400 mt-1 font-medium">
                                    {isDoctorRole
                                        ? "Patient messages for booked consultations will appear here."
                                        : "Book an appointment to start chatting with your doctor."}
                                </p>
                            </div>
                        ) : (
                            filteredConversations.map((conv) => {
                                const isActive = conv._id === activeConversationId;
                                const otherUser = isDoctorRole
                                    ? {
                                          name: conv.patient?.fullName || "Patient",
                                          avatar: conv.patient?.avatar,
                                          unread: conv.unreadForDoctor || 0,
                                      }
                                    : {
                                          name: formatDoctorName(conv.doctor?.user?.fullName || conv.doctor?.fullName),
                                          avatar: conv.doctor?.user?.avatar || conv.doctor?.profileImage,
                                          unread: conv.unreadForPatient || 0,
                                      };

                                return (
                                    <div
                                        key={conv._id}
                                        onClick={() => handleSelectConversation(conv._id)}
                                        className={`group flex items-center gap-3.5 p-4 transition cursor-pointer ${
                                            isActive
                                                ? "bg-white border-l-4 border-l-teal-600 shadow-xs"
                                                : "hover:bg-slate-100/60"
                                        }`}
                                    >
                                        {/* Avatar & Online Dot */}
                                        <div className="relative shrink-0">
                                            {otherUser.avatar ? (
                                                <img
                                                    src={otherUser.avatar}
                                                    alt={otherUser.name}
                                                    className="h-12 w-12 rounded-2xl object-cover border border-slate-200 shadow-xs"
                                                />
                                            ) : (
                                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 text-white font-bold text-sm shadow-xs">
                                                    {otherUser.name.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                            <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 min-w-0 text-left">
                                            <div className="flex items-center justify-between gap-1">
                                                <h4
                                                    className={`text-xs sm:text-sm truncate ${
                                                        isActive ? "font-black text-slate-900" : "font-bold text-slate-800"
                                                    }`}
                                                >
                                                    {otherUser.name}
                                                </h4>
                                                <span className="text-[10px] font-semibold text-slate-400 shrink-0">
                                                    {formatTimeAgo(conv.lastMessageAt || conv.updatedAt)}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between gap-1 mt-1">
                                                <p className="text-xs text-slate-500 truncate font-medium max-w-[170px]">
                                                    {conv.lastMessage || "Started conversation"}
                                                </p>
                                                {otherUser.unread > 0 && (
                                                    <span className="flex h-4 min-w-[16px] items-center justify-center rounded-full bg-teal-600 px-1 text-[10px] font-black text-white shrink-0 shadow-xs">
                                                        {otherUser.unread}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* ==================================================== */}
                {/* RIGHT CHAT WINDOW                                    */}
                {/* ==================================================== */}
                <div
                    className={`${
                        !showMobileChat ? "hidden md:flex" : "flex"
                    } flex-1 flex-col h-full bg-white relative`}
                >
                    {activeConversation ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 sm:px-6 py-3.5 border-b border-slate-100 flex items-center justify-between bg-white/90 backdrop-blur-md z-10">
                                <div className="flex items-center gap-3">
                                    {/* Mobile Back Button */}
                                    <button
                                        onClick={() => setShowMobileChat(false)}
                                        className="md:hidden p-1.5 text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                                    >
                                        <ArrowLeft size={18} />
                                    </button>

                                    {/* Avatar */}
                                    <div className="relative shrink-0">
                                        {interlocutor?.avatar ? (
                                            <img
                                                src={interlocutor.avatar}
                                                alt={interlocutor.name}
                                                className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl object-cover border border-slate-200 shadow-xs"
                                            />
                                        ) : (
                                            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 text-white font-bold text-sm shadow-xs">
                                                {interlocutor?.name?.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                                    </div>

                                    {/* Info Text */}
                                    <div className="text-left">
                                        <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight">
                                            {interlocutor?.name}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-[11px] font-bold text-teal-700">
                                                {interlocutor?.specialization || interlocutor?.role}
                                            </span>
                                            <span className="text-[10px] text-emerald-600 font-extrabold flex items-center gap-1">
                                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                Online
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() =>
                                            navigate(
                                                isDoctorRole
                                                    ? "/doctor/appointments"
                                                    : "/my-appointments"
                                            )
                                        }
                                        className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-teal-200 bg-teal-50/60 px-3 py-1.5 text-xs font-bold text-teal-700 hover:bg-teal-100 transition cursor-pointer"
                                    >
                                        <Calendar size={14} />
                                        <span>Appointments</span>
                                    </button>
                                </div>
                            </div>

                            {/* Messages Scroll Area */}
                            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gradient-to-b from-slate-50/50 to-white">
                                {loadingMessages && activeMessages.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-2">
                                        <Loader2 size={28} className="animate-spin text-teal-600" />
                                        <span className="text-xs font-medium">Fetching conversation history...</span>
                                    </div>
                                ) : activeMessages.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center p-6 text-slate-500">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-teal-50 text-teal-600 mb-3 shadow-xs">
                                            <MessageSquare size={28} />
                                        </div>
                                        <h4 className="font-extrabold text-slate-800 text-base">
                                            Encrypted Medical Consultation Chat
                                        </h4>
                                        <p className="text-xs text-slate-400 max-w-sm mt-1 font-medium">
                                            Send a message to start communicating directly with {interlocutor?.name}.
                                        </p>
                                    </div>
                                ) : (
                                    activeMessages.map((msg) => {
                                        const currentUserId = (user?._id || user?.id || "")?.toString();
                                        const msgSenderId = (msg.sender?._id || msg.sender || "")?.toString();
                                        const isMine = Boolean(currentUserId && msgSenderId && msgSenderId === currentUserId);

                                        const msgSenderName = isMine
                                            ? (user?.fullName || "You")
                                            : (interlocutor?.name || "Other");

                                        const msgSenderAvatar = isMine
                                            ? user?.avatar
                                            : interlocutor?.avatar;

                                        return (
                                            <div
                                                key={msg._id || msg.createdAt}
                                                className={`flex ${isMine ? "justify-end" : "justify-start"} items-end gap-2.5 group my-1.5`}
                                            >
                                                {/* Receiver Avatar (Left) */}
                                                {!isMine && (
                                                    <div className="shrink-0 mb-0.5">
                                                        {msgSenderAvatar ? (
                                                            <img
                                                                src={msgSenderAvatar}
                                                                alt={msgSenderName}
                                                                className="h-8 w-8 rounded-full object-cover border border-slate-200 shadow-xs"
                                                            />
                                                        ) : (
                                                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-xs font-black text-white shadow-xs">
                                                                {msgSenderName.charAt(0).toUpperCase()}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Bubble */}
                                                <div
                                                    className={`max-w-[78%] sm:max-w-[65%] rounded-2xl p-3.5 shadow-xs text-left ${
                                                        isMine
                                                            ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-br-none shadow-teal-700/10"
                                                            : "bg-slate-100 text-slate-900 border border-slate-200/90 rounded-bl-none"
                                                    }`}
                                                >
                                                    <p className="text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-wrap break-words">
                                                        {msg.message}
                                                    </p>

                                                    <div
                                                        className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                                                            isMine ? "text-teal-100/90" : "text-slate-400 font-semibold"
                                                        }`}
                                                    >
                                                        <span>{formatTimeAgo(msg.createdAt)}</span>
                                                        {isMine && <CheckCheck size={13} className="text-teal-200" />}
                                                    </div>
                                                </div>

                                                {/* My Sender Avatar (Right) */}
                                                {isMine && (
                                                    <div className="shrink-0 mb-0.5">
                                                        {user?.avatar ? (
                                                            <img
                                                                src={user.avatar}
                                                                alt={user.fullName || "Me"}
                                                                className="h-8 w-8 rounded-full object-cover border border-teal-400 shadow-xs"
                                                            />
                                                        ) : (
                                                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-xs font-black text-white shadow-xs">
                                                                {(user?.fullName || "Y").charAt(0).toUpperCase()}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })
                                )}

                                {/* Typing Indicator Pill */}
                                {currentTypingUser && (
                                    <div className="flex justify-start items-center gap-2 animate-in fade-in duration-200">
                                        <div className="rounded-2xl bg-teal-50 border border-teal-200 px-4 py-2 text-xs font-bold text-teal-700 flex items-center gap-2 shadow-xs">
                                            <span className="flex items-center gap-1">
                                                <span className="h-1.5 w-1.5 rounded-full bg-teal-600 animate-bounce" />
                                                <span className="h-1.5 w-1.5 rounded-full bg-teal-600 animate-bounce [animation-delay:0.2s]" />
                                                <span className="h-1.5 w-1.5 rounded-full bg-teal-600 animate-bounce [animation-delay:0.4s]" />
                                            </span>
                                            <span>{currentTypingUser} is typing...</span>
                                        </div>
                                    </div>
                                )}

                                <div ref={bottomRef} />
                            </div>

                            {/* Quick Emoji Shortcuts Bar */}
                            <div className="px-4 py-1.5 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
                                    Quick:
                                </span>
                                {QUICK_EMOJIS.map((emoji) => (
                                    <button
                                        key={emoji}
                                        type="button"
                                        onClick={() => setText((prev) => prev + emoji)}
                                        className="text-sm hover:scale-125 transition cursor-pointer p-0.5 shrink-0"
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>

                            {/* Message Input Form */}
                            <form
                                onSubmit={handleSendMessage}
                                className="p-3 sm:p-4 bg-white border-t border-slate-100 flex items-center gap-2 sm:gap-3"
                            >
                                <input
                                    type="text"
                                    value={text}
                                    onChange={handleTextChange}
                                    placeholder="Type your medical consultation message..."
                                    className="flex-1 rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20 outline-none transition"
                                />

                                <button
                                    type="submit"
                                    disabled={!text.trim() || sendingMessage}
                                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md hover:from-teal-700 hover:to-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95"
                                >
                                    {sendingMessage ? (
                                        <Loader2 size={18} className="animate-spin text-white" />
                                    ) : (
                                        <Send size={18} />
                                    )}
                                </button>
                            </form>
                        </>
                    ) : (
                        /* Empty State when no conversation selected */
                        <div className="flex flex-col items-center justify-center h-full text-center p-8 text-slate-500 space-y-4">
                            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-50 text-teal-600 shadow-md">
                                <MessageSquare size={40} />
                            </div>
                            <div className="max-w-md space-y-1">
                                <h3 className="text-xl font-extrabold text-slate-900">
                                    CarePoint Real-Time Messaging
                                </h3>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                    Select a conversation from the left menu to view messages or start communicating with your healthcare provider.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chat;
