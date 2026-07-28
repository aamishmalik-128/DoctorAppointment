import { useEffect, useRef, useState } from "react";
import {
    Bell,
    ChevronDown,
    User,
    Calendar,
    FileText,
    MessageSquare,
    LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import NotificationDropdown from "./NotificationDropdown";

const UserDropdown = ({ user, handleLogout }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
    }, []);

    const isDoctor = user?.role === "doctor";

    return (
        <div
            ref={dropdownRef}
            className="relative flex items-center gap-3"
        >
            {/* SaaS Notification Bell & Dropdown */}
            <NotificationDropdown />

            {/* Avatar button */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 outline-none cursor-pointer"
            >
                {user?.avatar ? (
                    <img
                        src={user.avatar}
                        alt={user.fullName || "User Avatar"}
                        className="h-10 w-10 rounded-full border-2 border-teal-500 object-cover shadow-sm"
                    />
                ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 font-bold text-white shadow-sm">
                        {user?.fullName?.charAt(0).toUpperCase() || "U"}
                    </div>
                )}

                <ChevronDown
                    size={18}
                    className={`transition ${
                        open ? "rotate-180" : ""
                    } text-slate-500`}
                />
            </button>

            {/* Dropdown Menu */}
            {open && (
                <div className="absolute right-0 top-14 w-72 overflow-hidden rounded-2xl border border-teal-100 bg-white/95 shadow-2xl backdrop-blur-xl z-50 text-slate-800">
                    {/* Header */}
                    <div className="border-b border-teal-100 p-5 bg-teal-50/40">
                        <div className="flex items-center gap-4">
                            {user?.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={user.fullName || "User Avatar"}
                                    className="h-14 w-14 rounded-full border-2 border-teal-500 object-cover shadow-sm"
                                />
                            ) : (
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 text-xl font-bold text-white shadow-sm">
                                    {user?.fullName?.charAt(0).toUpperCase() || "U"}
                                </div>
                            )}

                            <div className="overflow-hidden text-left">
                                <h2 className="font-semibold text-slate-900 truncate">
                                    {user?.fullName}
                                </h2>
                                <p className="text-xs text-slate-500 truncate">
                                    {user?.email}
                                </p>
                                <span className="text-xs font-semibold capitalize text-teal-700">
                                    {user?.role}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <button
                        onClick={() => {
                            navigate(isDoctor ? "/doctor/profile" : "/profile");
                            setOpen(false);
                        }}
                        className="flex w-full items-center gap-3 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-teal-50 hover:text-teal-700 cursor-pointer"
                    >
                        <User size={18} className="text-teal-600" />
                        My Profile
                    </button>

                    <button
                        onClick={() => {
                            navigate(isDoctor ? "/doctor/appointments" : "/my-appointments");
                            setOpen(false);
                        }}
                        className="flex w-full items-center gap-3 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-teal-50 hover:text-teal-700 cursor-pointer"
                    >
                        <Calendar size={18} className="text-teal-600" />
                        My Appointments
                    </button>

                    <button
                        onClick={() => {
                            navigate(isDoctor ? "/doctor/prescriptions" : "/my-prescriptions");
                            setOpen(false);
                        }}
                        className="flex w-full items-center gap-3 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-teal-50 hover:text-teal-700 cursor-pointer"
                    >
                        <FileText size={18} className="text-teal-600" />
                        My Prescriptions
                    </button>

                    <button
                        onClick={() => {
                            navigate(isDoctor ? "/doctor/chat" : "/chat");
                            setOpen(false);
                        }}
                        className="flex w-full items-center gap-3 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-teal-50 hover:text-teal-700 cursor-pointer"
                    >
                        <MessageSquare size={18} className="text-teal-600" />
                        Messages & Chat
                    </button>

                    <button
                        onClick={async () => {
                            setOpen(false);
                            await handleLogout();
                        }}
                        className="flex w-full items-center gap-3 border-t border-teal-100 px-5 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 cursor-pointer"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;