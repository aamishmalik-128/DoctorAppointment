import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, HeartPulse, Bell } from "lucide-react";
import { motion } from "framer-motion";
import MobileMenu from "./MobileMenu";
import UserDropdown from "./UserDropDown";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Temporary values
    const isAuthenticated = false;
    const user = null;

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Doctors", path: "/doctors" },
        { name: "Specialties", path: "/specialties" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-md text-white shadow-md">

            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-3 group shrink-0"
                >
                    <div className="rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 p-2.5 text-slate-950 shadow-sm group-hover:scale-105 transition-transform">
                        <HeartPulse
                            size={24}
                            className="text-slate-950"
                        />
                    </div>

                    <div>

                        <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-tight">

                            Care<span className="text-teal-400">Point</span>

                        </h1>

                        <p className="text-[11px] font-medium text-slate-400">

                            Healthcare Platform

                        </p>

                    </div>

                </Link>

                {/* Desktop Links */}
                <nav className="hidden items-center gap-7 lg:flex">

                    {navLinks.map((link) => (

                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `relative text-sm font-semibold transition-colors duration-150 py-1
                                ${isActive
                                    ? "text-teal-400"
                                    : "text-slate-300 hover:text-teal-400"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {link.name}

                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-teal-400 shadow-sm"
                                        />
                                    )}
                                </>
                            )}
                        </NavLink>

                    ))}

                </nav>

                {/* Right Side Actions */}
                <div className="hidden items-center gap-3 lg:flex">

                    {!isAuthenticated ? (
                        <>
                            <Link
                                to="/login"
                                className="rounded-xl border border-slate-700 bg-slate-900/80 px-4.5 py-2 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white hover:border-slate-600 hover:bg-slate-800 transition-all duration-200 active:scale-[0.98]"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="rounded-xl bg-teal-500 px-4.5 py-2 text-xs sm:text-sm font-semibold text-slate-950 hover:bg-teal-400 shadow-sm transition-all duration-200 active:scale-[0.98]"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            <button className="relative p-2 rounded-xl text-slate-300 hover:text-teal-400 hover:bg-slate-900 transition-colors">

                                <Bell
                                    size={20}
                                />

                                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-teal-400 ring-2 ring-slate-950" />

                            </button>
                            <UserDropdown user={user} />
                        </>
                    )}

                </div>

                {/* Mobile Hamburger Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
                    aria-label="Toggle Menu"
                >
                    {isOpen ? (
                        <X size={26} />
                    ) : (
                        <Menu size={26} />
                    )}
                </button>

            </div>

            {/* Mobile Drawer */}
            <MobileMenu
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                navLinks={navLinks}
                isAuthenticated={isAuthenticated}
            />

        </header>
    );
};

export default Navbar;
