import { useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, HeartPulse } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import MobileMenu from "./MobileMenu";
import UserDropdown from "./UserDropDown";
import { logout } from "../../redux/feature/auth/authThunk";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { isAuthenticated, user } = useSelector(
        (state) => state.auth || {}
    );

    // Do not render Navbar on login or register pages
    const isAuthPage =
        location.pathname.startsWith("/login") ||
        location.pathname.startsWith("/register") ||
        location.pathname.includes("register") ||
        location.pathname.includes("login");

    if (isAuthPage) {
        return null;
    }

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Doctors", path: "/doctors" },
        { name: "Specialties", path: "/specialties" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    const handleLogout = async () => {
        try {
            await dispatch(logout()).unwrap();

            setIsOpen(false);

            navigate("/login",{replace:true});
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <header className="sticky top-0 z-50 border-b border-teal-100/80 bg-white/90 backdrop-blur-md text-slate-800 shadow-sm">

            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link
                    to="/"
                    className="group flex shrink-0 items-center gap-3"
                >
                    <div className="rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 p-2.5 shadow-sm transition-transform group-hover:scale-105">
                        <HeartPulse
                            size={24}
                            className="text-white"
                        />
                    </div>

                    <div>
                        <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl text-slate-900">
                            Care
                            <span className="text-teal-600">
                                Point
                            </span>
                        </h1>
                        <p className="text-[11px] font-medium text-slate-500">
                            Healthcare Platform
                        </p>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-7 lg:flex">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `relative py-1 text-sm font-semibold transition-colors ${
                                    isActive
                                        ? "text-teal-700"
                                        : "text-slate-600 hover:text-teal-600"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {link.name}

                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-teal-600"
                                        />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Desktop Right */}
                <div className="hidden items-center gap-4 lg:flex">
                    {!isAuthenticated ? (
                        <>
                            <Link
                                to="/login"
                                className="rounded-xl border border-teal-200 bg-teal-50/50 px-5 py-2 text-sm font-semibold text-teal-700 transition hover:bg-teal-100 hover:border-teal-300"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:from-teal-700 hover:to-emerald-700"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <UserDropdown
                            user={user}
                            handleLogout={handleLogout}
                        />
                    )}
                </div>

                {/* Mobile Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="rounded-xl p-2 text-slate-600 transition hover:bg-teal-50 hover:text-teal-700 lg:hidden"
                >
                    {isOpen ? (
                        <X size={26} />
                    ) : (
                        <Menu size={26} />
                    )}
                </button>
            </div>

            <MobileMenu
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                navLinks={navLinks}
                isAuthenticated={isAuthenticated}
                user={user}
                handleLogout={handleLogout}
            />

        </header>
    );
};

export default Navbar;