import React from "react";
import { useSelector } from "react-redux";
import { Menu, ShieldAlert, Bell } from "lucide-react";

const Topbar = ({ onOpenMobileSidebar }) => {
    const { user } = useSelector((state) => state.auth || {});

    return (
        <header className="sticky top-0 z-40 border-b border-teal-100/80 bg-white/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
                <button
                    onClick={onOpenMobileSidebar}
                    className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-teal-50 hover:text-teal-700 transition cursor-pointer"
                >
                    <Menu size={22} />
                </button>

                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-800 bg-teal-100/90 px-2.5 py-0.5 rounded-md border border-teal-200/60">
                        <ShieldAlert size={13} className="text-teal-600" /> Super Admin
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative rounded-xl p-2 text-slate-600 hover:bg-teal-50 hover:text-teal-700 transition cursor-pointer">
                    <Bell size={18} />
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-teal-500 ring-2 ring-white" />
                </button>

                <div className="flex items-center gap-3 border-l border-teal-100 pl-4">
                    {user?.avatar ? (
                        <img
                            src={user.avatar}
                            alt={user.fullName || "Admin Avatar"}
                            className="h-9 w-9 rounded-full border-2 border-teal-500 object-cover shadow-xs"
                        />
                    ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 font-bold text-white shadow-xs text-xs">
                            {user?.fullName?.charAt(0).toUpperCase() || "A"}
                        </div>
                    )}

                    <div className="hidden sm:block text-left">
                        <p className="text-xs font-bold text-slate-900 leading-tight">
                            {user?.fullName || "System Admin"}
                        </p>
                        <p className="text-[11px] font-medium text-slate-400">
                            {user?.email || "admin@carepoint.com"}
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
