import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    Bell,
    CheckCheck,
    Trash2,
    Search,
    Filter,
    Calendar,
    FileText,
    CreditCard,
    RefreshCw,
    Shield,
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    Loader2,
    Sparkles,
} from "lucide-react";
import {
    getMyNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
} from "../../redux/feature/notification/notificationThunk";

const getNotificationIcon = (type) => {
    switch (type) {
        case "appointment":
            return <Calendar className="h-5 w-5 text-teal-600" />;
        case "prescription":
            return <FileText className="h-5 w-5 text-emerald-600" />;
        case "payment":
            return <CreditCard className="h-5 w-5 text-indigo-600" />;
        case "refund":
            return <RefreshCw className="h-5 w-5 text-amber-600" />;
        default:
            return <Shield className="h-5 w-5 text-blue-600" />;
    }
};

const getBadgeStyle = (type) => {
    switch (type) {
        case "appointment":
            return "bg-teal-50 text-teal-700 border-teal-200";
        case "prescription":
            return "bg-emerald-50 text-emerald-700 border-emerald-200";
        case "payment":
            return "bg-indigo-50 text-indigo-700 border-indigo-200";
        case "refund":
            return "bg-amber-50 text-amber-700 border-amber-200";
        default:
            return "bg-blue-50 text-blue-700 border-blue-200";
    }
};

const formatTimeAgo = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

const Notifications = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth || {});
    const {
        notifications = [],
        unreadCount = 0,
        loading,
        currentPage = 1,
        totalPages = 1,
        totalNotifications = 0,
    } = useSelector((state) => state.notification || {});

    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(getMyNotifications({ page, limit: 10 }));
    }, [dispatch, page]);

    const handleMarkAllRead = () => {
        dispatch(markAllAsRead());
    };

    const handleMarkSingleRead = (e, id) => {
        e.stopPropagation();
        dispatch(markAsRead(id));
    };

    const handleDelete = (e, id) => {
        e.stopPropagation();
        dispatch(deleteNotification(id));
    };

    const handleNotificationClick = async (notif) => {
        if (!notif.isRead) {
            await dispatch(markAsRead(notif._id));
        }

        if (notif.type === "appointment" && notif.referenceId) {
            if (user?.role === "doctor") {
                navigate(`/doctor/appointments/${notif.referenceId}`);
            } else {
                navigate(`/appointments/${notif.referenceId}`);
            }
        } else if (notif.type === "prescription" && notif.referenceId) {
            if (user?.role === "doctor") {
                navigate(`/doctor/prescriptions/${notif.referenceId}`);
            } else {
                navigate(`/prescriptions/${notif.referenceId}`);
            }
        } else if (user?.role === "doctor") {
            navigate("/doctor/appointments");
        } else {
            navigate("/my-appointments");
        }
    };

    // Client-side filtering & search
    const filteredNotifications = useMemo(() => {
        return notifications.filter((notif) => {
            // Tab filter
            if (activeTab === "unread" && notif.isRead) return false;
            if (activeTab === "appointment" && notif.type !== "appointment") return false;
            if (activeTab === "prescription" && notif.type !== "prescription") return false;
            if (activeTab === "payment" && notif.type !== "payment" && notif.type !== "refund") return false;

            // Search query filter
            if (searchTerm.trim()) {
                const query = searchTerm.toLowerCase();
                const titleMatch = notif.title?.toLowerCase().includes(query);
                const messageMatch = notif.message?.toLowerCase().includes(query);
                return titleMatch || messageMatch;
            }

            return true;
        });
    }, [notifications, activeTab, searchTerm]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/20 to-emerald-50/30 py-10 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl space-y-6">
                {/* Page Header Card */}
                <div className="rounded-3xl border border-white/80 bg-white/80 p-6 sm:p-8 shadow-xl backdrop-blur-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/20">
                                <Bell size={24} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-2xl font-black tracking-tight text-slate-900">
                                        Notifications Center
                                    </h1>
                                    {unreadCount > 0 && (
                                        <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold text-rose-700">
                                            {unreadCount} Unread
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-slate-500 font-medium mt-0.5">
                                    Stay updated with real-time status of your appointments, prescriptions, & payments.
                                </p>
                            </div>
                        </div>

                        {/* Top Actions */}
                        {unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllRead}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-50 border border-teal-200 px-4 py-2.5 text-xs font-bold text-teal-700 hover:bg-teal-100 transition shadow-xs cursor-pointer shrink-0"
                            >
                                <CheckCheck size={16} />
                                <span>Mark All as Read</span>
                            </button>
                        )}
                    </div>

                    {/* Filter & Search Bar */}
                    <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-slate-100">
                        {/* Search Input */}
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search notifications..."
                                className="w-full rounded-xl border border-slate-200 bg-white/90 pl-10 pr-4 py-2 text-xs font-medium text-slate-700 placeholder-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition"
                            />
                        </div>

                        {/* Tabs */}
                        <div className="flex w-full sm:w-auto items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                            {[
                                { id: "all", label: "All" },
                                { id: "unread", label: `Unread (${unreadCount})` },
                                { id: "appointment", label: "Appointments" },
                                { id: "prescription", label: "Prescriptions" },
                                { id: "payment", label: "Payments" },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`rounded-xl px-3.5 py-2 text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                                        activeTab === tab.id
                                            ? "bg-teal-700 text-white shadow-md shadow-teal-700/20"
                                            : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Notifications List */}
                <div className="space-y-3">
                    {loading && notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-3xl border border-white/80 bg-white/80 p-12 text-center shadow-lg backdrop-blur-xl">
                            <Loader2 size={32} className="animate-spin text-teal-600 mb-3" />
                            <p className="text-sm font-bold text-slate-700">Loading your notifications...</p>
                        </div>
                    ) : filteredNotifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-3xl border border-white/80 bg-white/80 p-12 text-center shadow-lg backdrop-blur-xl">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 mb-4">
                                <Sparkles size={32} />
                            </div>
                            <h3 className="text-lg font-extrabold text-slate-900">No Notifications Found</h3>
                            <p className="text-xs text-slate-500 max-w-sm mt-1 font-medium">
                                {searchTerm || activeTab !== "all"
                                    ? "No notifications match your current search or filter criteria."
                                    : "You're all caught up! New updates regarding your appointments will appear here."}
                            </p>
                        </div>
                    ) : (
                        filteredNotifications.map((notif) => (
                            <div
                                key={notif._id}
                                onClick={() => handleNotificationClick(notif)}
                                className={`group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border p-4 sm:p-5 transition shadow-sm hover:shadow-md cursor-pointer ${
                                    notif.isRead
                                        ? "bg-white/90 border-slate-200/80 hover:bg-white"
                                        : "bg-gradient-to-r from-teal-50/70 via-white to-emerald-50/40 border-teal-200/90 shadow-teal-500/5"
                                }`}
                            >
                                <div className="flex items-start gap-4 min-w-0">
                                    {/* Icon Box */}
                                    <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white shadow-xs border border-slate-100">
                                        {getNotificationIcon(notif.type)}
                                    </div>

                                    {/* Text Info */}
                                    <div className="space-y-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3
                                                className={`text-sm font-bold truncate ${
                                                    notif.isRead ? "text-slate-800" : "text-slate-950 font-black"
                                                }`}
                                            >
                                                {notif.title}
                                            </h3>
                                            <span
                                                className={`rounded-full border px-2 py-0.5 text-[10px] font-bold capitalize ${getBadgeStyle(
                                                    notif.type
                                                )}`}
                                            >
                                                {notif.type}
                                            </span>
                                            {!notif.isRead && (
                                                <span className="flex items-center gap-1 rounded-full bg-teal-500/10 px-2 py-0.5 text-[10px] font-extrabold text-teal-700">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                                                    Unread
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-xs font-medium text-slate-600 leading-relaxed">
                                            {notif.message}
                                        </p>

                                        <p className="text-[11px] font-semibold text-slate-400">
                                            {formatTimeAgo(notif.createdAt)}
                                        </p>
                                    </div>
                                </div>

                                {/* Right Actions */}
                                <div className="flex items-center gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 shrink-0 self-end sm:self-center">
                                    {!notif.isRead && (
                                        <button
                                            onClick={(e) => handleMarkSingleRead(e, notif._id)}
                                            className="inline-flex items-center gap-1 rounded-xl bg-slate-100 hover:bg-teal-50 hover:text-teal-700 px-3 py-1.5 text-xs font-bold text-slate-600 transition cursor-pointer"
                                            title="Mark as read"
                                        >
                                            <CheckCircle2 size={14} />
                                            <span className="hidden sm:inline">Mark Read</span>
                                        </button>
                                    )}

                                    <button
                                        onClick={(e) => handleDelete(e, notif._id)}
                                        className="rounded-xl p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                                        title="Delete notification"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm backdrop-blur-xl">
                        <p className="text-xs font-semibold text-slate-600">
                            Page <span className="font-bold text-slate-900">{currentPage}</span> of{" "}
                            <span className="font-bold text-slate-900">{totalPages}</span> ({totalNotifications} total)
                        </p>

                        <div className="flex items-center gap-2">
                            <button
                                disabled={currentPage <= 1}
                                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs"
                            >
                                <ChevronLeft size={14} />
                                <span>Previous</span>
                            </button>

                            <button
                                disabled={currentPage >= totalPages}
                                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs"
                            >
                                <span>Next</span>
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notifications;
