import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { User, LogOut, ChevronRight } from "lucide-react";

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
                className="lg:hidden border-t border-teal-100 bg-white/95 px-5 py-5 text-slate-800 backdrop-blur-xl"
            >
                {/* Profile Card Header */}
                {isAuthenticated && (
                    <Link
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className="mb-6 flex items-center justify-between rounded-2xl border border-teal-100 bg-teal-50/50 p-4 transition hover:border-teal-300 hover:bg-teal-50 group shadow-sm"
                    >
                        <div className="flex items-center gap-4 min-w-0">
                            {user?.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={user.fullName || "User Avatar"}
                                    className="h-14 w-14 rounded-full border-2 border-teal-500 object-cover shrink-0"
                                />
                            ) : (
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 text-xl font-bold text-white shadow">
                                    {user?.fullName?.charAt(0).toUpperCase() || "U"}
                                </div>
                            )}

                            <div className="min-w-0 flex-1">
                                <h2 className="font-semibold text-slate-900 truncate group-hover:text-teal-700 transition">
                                    {user?.fullName}
                                </h2>
                                <p className="text-xs text-slate-500 truncate">
                                    {user?.email}
                                </p>
                                <span className="mt-0.5 inline-block text-[11px] font-semibold uppercase tracking-wider text-teal-700">
                                    {user?.role}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 text-slate-400 group-hover:text-teal-600 transition shrink-0 pl-2">
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
                            className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-teal-50 hover:text-teal-700"
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Explicit My Profile Link for Mobile */}
                    {isAuthenticated && (
                        <Link
                            to="/profile"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-teal-700 transition hover:bg-teal-50"
                        >
                            <User size={18} />
                            My Profile
                        </Link>
                    )}
                </div>

                {/* Bottom Buttons */}
                {!isAuthenticated ? (
                    <div className="mt-6 border-t border-teal-100 pt-5 space-y-3">
                        <Link
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className="block rounded-xl border border-teal-200 bg-teal-50/50 py-3 text-center font-semibold text-teal-700 transition hover:bg-teal-100"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            onClick={() => setIsOpen(false)}
                            className="block rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 py-3 text-center font-semibold text-white transition hover:from-teal-700 hover:to-emerald-700 shadow-md"
                        >
                            Register
                        </Link>
                    </div>
                ) : (
                    <div className="mt-6 border-t border-teal-100 pt-5 space-y-3">
                        <button
                            onClick={async () => {
                                setIsOpen(false);
                                await handleLogout();
                            }}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-50 border border-rose-200 py-3 font-semibold text-rose-600 transition hover:bg-rose-600 hover:text-white"
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