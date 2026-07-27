import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    LayoutDashboard,
    UserCheck,
    Stethoscope,
    Users,
    LogOut,
    ShieldAlert,
    X,
} from "lucide-react";
import { logout } from "../../redux/feature/auth/authThunk";

const menuItems = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/admin",
    },
    {
        name: "Pending Doctors",
        icon: UserCheck,
        path: "/admin/doctors/pending",
    },
    {
        name: "Doctors",
        icon: Stethoscope,
        path: "/admin/doctors",
    },
    {
        name: "Users",
        icon: Users,
        path: "/admin/users",
    },
];

const Sidebar = ({ isMobileOpen, onCloseMobile }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await dispatch(logout()).unwrap();
            if (onCloseMobile) onCloseMobile();
            navigate("/login", { replace: true });
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
                        <div className="rounded-xl bg-gradient-to-br from-teal-600 to-emerald-600 p-2.5 text-white shadow-md shadow-teal-600/20">
                            <ShieldAlert size={22} />
                        </div>
                        <div className="text-left">
                            <h2 className="text-lg font-extrabold text-slate-900 leading-tight">
                                CarePoint
                            </h2>
                            <span className="text-[11px] font-bold text-teal-800 bg-teal-100/90 px-2 py-0.5 rounded-md border border-teal-200/60 inline-block mt-0.5">
                                Admin Portal
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
                                end={item.path === "/admin"}
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
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 min-h-screen bg-white/95 border-r border-teal-100/80 shadow-sm backdrop-blur-md flex-col shrink-0">
                {renderNavContent()}
            </aside>

            {/* Mobile Drawer */}
            {isMobileOpen && (
                <div className="md:hidden fixed inset-0 z-50 flex">
                    <div
                        onClick={onCloseMobile}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
                    />

                    <div className="relative w-72 max-w-[80vw] bg-white h-full shadow-2xl z-50 flex flex-col">
                        {renderNavContent()}
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
