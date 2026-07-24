import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { User, LogOut, ChevronRight, LayoutDashboard } from "lucide-react";

const MobileMenu = ({
    isOpen,
    setIsOpen,
    navLinks,
    isAuthenticated,
    user,
    handleLogout,
}) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden border-t border-slate-800 bg-slate-950 px-5 py-5"
            >
                {/* Profile Card Header */}
                {isAuthenticated && (
                    <Link
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className="mb-6 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/90 p-4 transition hover:border-teal-500/50 hover:bg-slate-900 group"
                    >
                        <div className="flex items-center gap-4 min-w-0">
                            {user?.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={user.fullName || "User Avatar"}
                                    className="h-14 w-14 rounded-full border-2 border-teal-500 object-cover shrink-0"
                                />
                            ) : (
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-xl font-bold text-slate-950 shadow">
                                    {user?.fullName?.charAt(0).toUpperCase() || "U"}
                                </div>
                            )}

                            <div className="min-w-0 flex-1">
                                <h2 className="font-semibold text-white truncate group-hover:text-teal-400 transition">
                                    {user?.fullName}
                                </h2>
                                <p className="text-xs text-slate-400 truncate">
                                    {user?.email}
                                </p>
                                <span className="mt-0.5 inline-block text-[11px] font-semibold uppercase tracking-wider text-teal-400">
                                    {user?.role}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 text-slate-400 group-hover:text-teal-400 transition shrink-0 pl-2">
                            <span className="text-xs font-medium hidden sm:inline">View Profile</span>
                            <ChevronRight size={20} />
                        </div>
                    </Link>
                )}

                {/* Navigation Links */}
                <div className="flex flex-col gap-1.5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-teal-400"
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Explicit My Profile Link for Mobile */}
                    {isAuthenticated && (
                        <Link
                            to="/profile"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-teal-400 transition hover:bg-slate-900"
                        >
                            <User size={18} />
                            My Profile
                        </Link>
                    )}
                </div>

                {/* Bottom Buttons */}
                {!isAuthenticated ? (
                    <div className="mt-6 border-t border-slate-800 pt-5 space-y-3">
                        <Link
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className="block rounded-xl border border-slate-700 bg-slate-900 py-3 text-center font-semibold text-slate-200 transition hover:bg-slate-800"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            onClick={() => setIsOpen(false)}
                            className="block rounded-xl bg-teal-500 py-3 text-center font-semibold text-slate-950 transition hover:bg-teal-400"
                        >
                            Register
                        </Link>
                    </div>
                ) : (
                    <div className="mt-6 border-t border-slate-800 pt-5 space-y-3">
                        <button
                            onClick={async () => {
                                setIsOpen(false);
                                await handleLogout();
                            }}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 py-3 font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
};

export default MobileMenu;