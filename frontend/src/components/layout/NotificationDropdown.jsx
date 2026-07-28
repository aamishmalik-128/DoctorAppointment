import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
    Bell,
    Check,
    CheckCheck,
    Trash2,
    Calendar,
    FileText,
    CreditCard,
    RefreshCw,
    Shield,
    ChevronRight,
    Loader2,
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
            return <Calendar className="h-4 w-4 text-teal-600" />;
        case "prescription":
            return <FileText className="h-4 w-4 text-emerald-600" />;
        case "payment":
            return <CreditCard className="h-4 w-4 text-indigo-600" />;
        case "refund":
            return <RefreshCw className="h-4 w-4 text-amber-600" />;
        default:
            return <Shield className="h-4 w-4 text-blue-600" />;
    }
};

const getNotificationBg = (type, isRead) => {
    if (isRead) return "bg-white hover:bg-slate-50/80";
    switch (type) {
        case "appointment":
            return "bg-teal-50/50 hover:bg-teal-50 border-l-4 border-l-teal-500";
        case "prescription":
            return "bg-emerald-50/50 hover:bg-emerald-50 border-l-4 border-l-emerald-500";
        case "payment":
            return "bg-indigo-50/50 hover:bg-indigo-50 border-l-4 border-l-indigo-500";
        case "refund":
            return "bg-amber-50/50 hover:bg-amber-50 border-l-4 border-l-amber-500";
        default:
            return "bg-blue-50/50 hover:bg-blue-50 border-l-4 border-l-blue-500";
    }
};

const formatTimeAgo = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const NotificationDropdown = () => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isAuthenticated } = useSelector((state) => state.auth || {});
    const { notifications = [], unreadCount = 0, loading } = useSelector(
        (state) => state.notification || {}
    );

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getMyNotifications({ page: 1, limit: 10 }));
        }
    }, [dispatch, isAuthenticated]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    const handleNotificationClick = async (notification) => {
        if (!notification.isRead) {
            await dispatch(markAsRead(notification._id));
        }
        setOpen(false);

        // Smart redirect based on type & role
        if (notification.type === "appointment" && notification.referenceId) {
            if (user?.role === "doctor") {
                navigate(`/doctor/appointments/${notification.referenceId}`);
            } else {
                navigate(`/appointments/${notification.referenceId}`);
            }
        } else if (notification.type === "prescription" && notification.referenceId) {
            if (user?.role === "doctor") {
                navigate(`/doctor/prescriptions/${notification.referenceId}`);
            } else {
                navigate(`/prescriptions/${notification.referenceId}`);
            }
        } else if (user?.role === "doctor") {
            navigate("/doctor/appointments");
        } else {
            navigate("/my-appointments");
        }
    };

    const handleMarkAllRead = (e) => {
        e.stopPropagation();
        dispatch(markAllAsRead());
    };

    const handleDelete = (e, id) => {
        e.stopPropagation();
        dispatch(deleteNotification(id));
    };

    const latestNotifications = notifications.slice(0, 5);

    return (
        <div ref={dropdownRef} className="relative inline-block text-left">
            {/* Bell Trigger Button */}
            <button
                onClick={() => setOpen(!open)}
                className="relative flex items-center justify-center rounded-xl p-2.5 text-slate-600 transition hover:bg-teal-50 hover:text-teal-700 outline-none cursor-pointer"
                title="Notifications"
                aria-label="Notifications"
            >
                <Bell size={20} className={unreadCount > 0 ? "text-teal-600" : "text-slate-600"} />
                {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-rose-500 px-1.5 text-[11px] font-extrabold text-white shadow-md ring-2 ring-white animate-pulse">
                        {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                )}
            </button>

            {/* SaaS Dropdown Container */}
            {open && (
                <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-2xl border border-slate-200/80 bg-white/95 shadow-2xl backdrop-blur-xl text-slate-800 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 bg-slate-50/60 rounded-t-2xl">
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-slate-900 text-sm">Notifications</h3>
                            {unreadCount > 0 && (
                                <span className="rounded-full bg-teal-100 px-2 py-0.5 text-xs font-semibold text-teal-700">
                                    {unreadCount} new
                                </span>
                            )}
                        </div>

                        {unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllRead}
                                className="flex items-center gap-1 text-xs font-semibold text-teal-600 transition hover:text-teal-700 cursor-pointer"
                                title="Mark all as read"
                            >
                                <CheckCheck size={14} />
                                <span>Mark all read</span>
                            </button>
                        )}
                    </div>

                    {/* Notification List */}
                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                        {loading && notifications.length === 0 ? (
                            <div className="flex items-center justify-center py-8 text-slate-400 gap-2">
                                <Loader2 size={18} className="animate-spin text-teal-600" />
                                <span className="text-xs font-medium">Loading notifications...</span>
                            </div>
                        ) : latestNotifications.length === 0 ? (
                            <div className="py-8 text-center px-4">
                                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-2">
                                    <Bell size={20} />
                                </div>
                                <p className="text-xs font-semibold text-slate-600">No notifications yet</p>
                                <p className="text-[11px] text-slate-400 mt-0.5">We'll alert you when updates arrive.</p>
                            </div>
                        ) : (
                            latestNotifications.map((notif) => (
                                <div
                                    key={notif._id}
                                    onClick={() => handleNotificationClick(notif)}
                                    className={`group relative flex items-start gap-3 p-3.5 transition cursor-pointer ${getNotificationBg(
                                        notif.type,
                                        notif.isRead
                                    )}`}
                                >
                                    {/* Icon Badge */}
                                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white shadow-xs border border-slate-100">
                                        {getNotificationIcon(notif.type)}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0 pr-6">
                                        <div className="flex items-baseline justify-between gap-1">
                                            <h4
                                                className={`text-xs font-semibold truncate ${
                                                    notif.isRead ? "text-slate-700" : "text-slate-900 font-bold"
                                                }`}
                                            >
                                                {notif.title}
                                            </h4>
                                            <span className="text-[10px] text-slate-400 shrink-0">
                                                {formatTimeAgo(notif.createdAt)}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                                            {notif.message}
                                        </p>
                                    </div>

                                    {/* Unread Indicator & Delete Button */}
                                    <div className="absolute right-3 top-3.5 flex items-center gap-1.5">
                                        {!notif.isRead && (
                                            <span className="h-2 w-2 rounded-full bg-teal-500" title="Unread" />
                                        )}
                                        <button
                                            onClick={(e) => handleDelete(e, notif._id)}
                                            className="opacity-0 group-hover:opacity-100 transition p-1 text-slate-400 hover:text-rose-600 rounded-md hover:bg-white cursor-pointer"
                                            title="Delete notification"
                                        >
                                            <Trash2 size={13} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Dropdown Footer - View All Link */}
                    <div className="border-t border-slate-100 p-2 text-center bg-slate-50/80 rounded-b-2xl">
                        <Link
                            to="/notifications"
                            onClick={() => setOpen(false)}
                            className="inline-flex items-center justify-center gap-1 w-full py-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 transition hover:bg-teal-50 rounded-xl"
                        >
                            <span>View All Notifications</span>
                            <ChevronRight size={14} />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
