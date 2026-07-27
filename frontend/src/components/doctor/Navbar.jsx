import { Bell, Sparkles, Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatDoctorName } from "../../utils/formatDoctorName";

const pageTitles = {
    "/doctor": "Dashboard",
    "/doctor/profile": "Doctor Profile",
    "/doctor/availability": "Schedule & Availability",
    "/doctor/appointments": "Patient Appointments",
    "/doctor/patients": "Patient Records",
    "/doctor/settings": "Account Settings",
};

const Navbar = ({ isMobileMenuOpen, onToggleMobileMenu }) => {
    const location = useLocation();
    const { user } = useSelector((state) => state.auth || {});

    const title = pageTitles[location.pathname] || "Doctor Portal";

    return (
        <header className="h-16 bg-white/90 border-b border-teal-100/80 backdrop-blur-md shadow-xs px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">

            <div className="flex items-center gap-3">
                {/* Mobile Hamburger Toggle Button */}
                <button
                    onClick={onToggleMobileMenu}
                    className="md:hidden p-2 text-slate-700 hover:text-teal-600 hover:bg-teal-50 rounded-xl border border-teal-100 transition cursor-pointer"
                    aria-label="Toggle Navigation Menu"
                >
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>

                <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                    {title}
                </h1>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">

                {/* Notifications Icon */}
                <button className="relative rounded-xl border border-teal-200/60 bg-teal-50/50 p-2 text-teal-700 hover:bg-teal-100/70 transition cursor-pointer shadow-xs">
                    <Bell size={18} />
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-teal-600 animate-pulse"></span>
                </button>

                {/* Doctor User Badge */}
                <div className="flex items-center gap-2.5 sm:gap-3 border-l border-teal-100 pl-3 sm:pl-4">
                    {user?.avatar ? (
                        <img
                            src={user.avatar}
                            alt={user.fullName}
                            className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover border-2 border-teal-500 shadow-sm"
                        />
                    ) : (
                        <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-xs sm:text-sm font-extrabold text-white shadow-sm">
                            {user?.fullName?.charAt(0).toUpperCase() || "D"}
                        </div>
                    )}

                    <div className="text-left hidden sm:block">
                        <h3 className="font-bold text-xs text-slate-900 leading-tight">
                            {formatDoctorName(user?.fullName)}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-700 uppercase tracking-wider">
                            <Sparkles size={10} className="text-teal-600" />
                            {user?.role || "Doctor"}
                        </span>
                    </div>
                </div>

            </div>

        </header>
    );
};

export default Navbar;