import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    LayoutDashboard,
    User,
    CalendarDays,
    ClipboardList,
    FileText,
    Users,
    Settings,
    LogOut,
    Stethoscope,
    X,
} from "lucide-react";
import { logout } from "../../redux/feature/auth/authThunk";

const menuItems = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/doctor",
    },
    {
        name: "Profile",
        icon: User,
        path: "/doctor/profile",
    },
    {
        name: "Availability",
        icon: CalendarDays,
        path: "/doctor/availability",
    },
    {
        name: "Appointments",
        icon: ClipboardList,
        path: "/doctor/appointments",
    },
    {
        name: "Prescriptions",
        icon: FileText,
        path: "/doctor/prescriptions",
    },
    {
        name: "Patients",
        icon: Users,
        path: "/doctor/patients",
    },
    {
        name: "Settings",
        icon: Settings,
        path: "/doctor/settings",
    },
];

const Sidebar = ({ isMobileOpen, onCloseMobile }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await dispatch(logout()).unwrap();
            if (onCloseMobile) onCloseMobile();
            navigate("/doctor/login", { replace: true });
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    const renderNavContent = () => (
        <div className="flex flex-col justify-between h-full">
            <div>
                {/* Header Branding */}
                <div className="p-5 border-b border-teal-100/80 bg-teal-50/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 p-2.5 text-white shadow-md shadow-teal-600/20">
                            <Stethoscope size={22} />
                        </div>
                        <div className="text-left">
                            <h2 className="text-lg font-extrabold text-slate-900 leading-tight">
                                CarePoint
                            </h2>
                            <span className="text-xs font-semibold text-teal-700 bg-teal-100/80 px-2 py-0.5 rounded-md border border-teal-200/60 inline-block mt-0.5">
                                Doctor Portal
                            </span>
                        </div>
                    </div>

                    {/* Mobile Close Button */}
                    {onCloseMobile && (
                        <button
                            onClick={onCloseMobile}
                            className="md:hidden p-1.5 text-slate-400 hover:text-slate-700 hover:bg-teal-50 rounded-xl transition cursor-pointer"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>

                {/* Navigation Menu */}
                <nav className="p-4 space-y-1.5 text-left">
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === "/doctor"}
                                onClick={() => onCloseMobile && onCloseMobile()}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200
                                    ${
                                        isActive
                                            ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold shadow-md shadow-teal-600/20"
                                            : "text-slate-600 hover:bg-teal-50/80 hover:text-teal-700 font-semibold"
                                    }`
                                }
                            >
                                <Icon size={18} />
                                <span>{item.name}</span>
                            </NavLink>
                        );
                    })}
                </nav>
            </div>

            {/* Logout Footer Button */}
            <div className="p-4 border-t border-teal-100/80 bg-teal-50/20">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 hover:border-rose-200 border border-transparent transition-all cursor-pointer"
                >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar (Pinned Left) */}
            <aside className="hidden md:flex w-64 min-h-[calc(100vh-4rem)] bg-white/95 border-r border-teal-100/80 shadow-sm backdrop-blur-md flex-col shrink-0">
                {renderNavContent()}
            </aside>

            {/* Mobile Slide-over Drawer & Overlay Backdrop */}
            {isMobileOpen && (
                <div className="md:hidden fixed inset-0 z-50 flex">
                    {/* Backdrop Overlay */}
                    <div
                        onClick={onCloseMobile}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
                    />

                    {/* Drawer Panel */}
                    <div className="relative w-72 max-w-[80vw] bg-white h-full shadow-2xl z-50 flex flex-col">
                        {renderNavContent()}
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;