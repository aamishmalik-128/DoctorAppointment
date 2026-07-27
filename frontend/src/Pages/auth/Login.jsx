import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    Mail,
    ArrowRight,
    ShieldCheck,
    HeartPulse,
    CalendarDays,
    Sparkles,
    Lock,
    Eye,
    EyeOff,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { login } from '../../redux/feature/auth/authThunk.js';

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(login(formData));
    };

    useEffect(() => {
        if (!isAuthenticated || !user) return;

        switch (user.role) {
            case "patient":
                navigate("/");
                break;
            case "doctor":
                navigate("/doctor");
                break;
            case "admin":
                navigate("/admin");
                break;
            default:
                navigate("/");
        }
    }, [isAuthenticated, user, navigate]);

    return (
        <section className="relative min-h-[calc(100vh-5rem)] bg-gradient-to-br from-slate-50 via-teal-50/60 to-emerald-50 text-slate-800 flex items-center justify-center py-10 sm:py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Medical Pattern Grid */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

            {/* Light Sea Green Ambient Orbs */}
            <div className="absolute top-10 left-1/4 h-96 w-96 rounded-full bg-teal-300/25 blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-1/4 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl pointer-events-none" />

            <div className="mx-auto w-full max-w-7xl my-auto z-10">
                <div className="grid w-full items-center gap-10 lg:gap-16 lg:grid-cols-2">

                    {/* LEFT PANEL */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="hidden lg:flex flex-col justify-center text-left space-y-6"
                    >
                        <span className="inline-flex items-center gap-2.5 rounded-full bg-teal-100/80 px-4 py-2 text-xs font-semibold text-teal-800 border border-teal-200/80 w-fit backdrop-blur-md shadow-sm">
                            <Sparkles size={15} className="text-teal-600" />
                            Trusted Healthcare Portal
                        </span>

                        <h1 className="font-heading font-extrabold text-4xl xl:text-5xl leading-tight text-slate-900 tracking-tight">
                            Healthcare{" "}
                            <span className="bg-gradient-to-r from-teal-700 via-emerald-600 to-teal-500 bg-clip-text text-transparent block mt-1">
                                Made Simple.
                            </span>
                        </h1>

                        <p className="max-w-md text-sm xl:text-base leading-relaxed text-slate-600 font-normal">
                            Book appointments, access digital prescriptions, securely manage medical records, and consult verified healthcare professionals.
                        </p>

                        {/* Feature Cards */}
                        <div className="space-y-3.5 max-w-md pt-2">
                            <div className="flex items-center gap-4 rounded-2xl border border-teal-100 bg-white/80 p-4 shadow-sm backdrop-blur-md hover:border-teal-300 hover:shadow-md transition-all">
                                <div className="rounded-xl bg-teal-500/10 p-3 text-teal-700 shrink-0 border border-teal-200/50">
                                    <HeartPulse size={22} />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-slate-900 text-sm">
                                        Trusted Doctors
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        500+ verified medical specialists
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 rounded-2xl border border-teal-100 bg-white/80 p-4 shadow-sm backdrop-blur-md hover:border-teal-300 hover:shadow-md transition-all">
                                <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-700 shrink-0 border border-emerald-200/50">
                                    <ShieldCheck size={22} />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-slate-900 text-sm">
                                        Secure Records
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        End-to-end encrypted medical data
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 rounded-2xl border border-teal-100 bg-white/80 p-4 shadow-sm backdrop-blur-md hover:border-teal-300 hover:shadow-md transition-all">
                                <div className="rounded-xl bg-teal-500/10 p-3 text-teal-700 shrink-0 border border-teal-200/50">
                                    <CalendarDays size={22} />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-slate-900 text-sm">
                                        Instant Booking
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        Book consultations in under 60 seconds
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="flex gap-8 border-t border-teal-200/60 pt-5 max-w-md">
                            <div>
                                <h2 className="font-heading font-extrabold text-2xl text-teal-700">
                                    25K+
                                </h2>
                                <p className="text-xs text-slate-500 font-medium">
                                    Patients
                                </p>
                            </div>

                            <div>
                                <h2 className="font-heading font-extrabold text-2xl text-teal-700">
                                    500+
                                </h2>
                                <p className="text-xs text-slate-500 font-medium">
                                    Doctors
                                </p>
                            </div>

                            <div>
                                <h2 className="font-heading font-extrabold text-2xl text-teal-700">
                                    80K+
                                </h2>
                                <p className="text-xs text-slate-500 font-medium">
                                    Bookings
                                </p>
                            </div>
                        </div>

                    </motion.div>

                    {/* RIGHT PANEL — LIGHT SEA GREEN AUTH FORM CARD */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="flex justify-center w-full"
                    >

                        <div className="w-full max-w-md rounded-3xl bg-white/95 p-7 sm:p-9 shadow-2xl border border-teal-100 text-slate-900 backdrop-blur-xl relative">

                            {/* Top Accent Line */}
                            <div className="absolute top-0 inset-x-8 h-1 bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-600 rounded-b-md" />

                            {/* Header */}
                            <div className="text-left mb-6">
                                <div className="inline-flex items-center gap-2 rounded-xl bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700 mb-2 border border-teal-200/70">
                                    CarePoint Login
                                </div>
                                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                                    Welcome Back
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                    Login to continue your healthcare journey.
                                </p>
                            </div>

                            {error && (
                                <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-semibold text-rose-600">
                                    {error}
                                </div>
                            )}

                            {/* Login Form */}
                            <form className="space-y-4" onSubmit={handleSubmit}>

                                {/* Email Input */}
                                <div className="space-y-1.5 text-left">
                                    <label className="text-xs font-bold text-slate-700">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-teal-600/70" />
                                        <input
                                            type="email"
                                            name='email'
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            className="w-full rounded-xl border border-teal-100 bg-teal-50/20 pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div className="space-y-1.5 text-left">
                                    <label className="text-xs font-bold text-slate-700">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-teal-600/70" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                            className="w-full rounded-xl border border-teal-100 bg-teal-50/20 pl-10 pr-10 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between pt-1">
                                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 accent-teal-600 cursor-pointer"
                                        />
                                        Remember Me
                                    </label>

                                    <Link
                                        to="/forgot-password"
                                        className="text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>

                                {/* Login Submit Button */}
                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    type="submit"
                                    disabled={loading}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white py-3 px-4 font-bold shadow-lg shadow-teal-600/20 transition-all duration-200 active:scale-[0.98] mt-2 text-sm disabled:opacity-60 cursor-pointer"
                                >
                                    {loading ? "Signing In..." : "Login"}
                                    <ArrowRight size={16} />
                                </motion.button>

                            </form>

                            {/* Footer Links */}
                            <div className="mt-6 border-t border-teal-100/80 pt-4 text-center space-y-2">
                                <p className="text-xs text-slate-500">
                                    Don't have an account?{" "}
                                    <Link
                                        to="/register"
                                        className="font-bold text-teal-600 hover:text-teal-700"
                                    >
                                        Create Account
                                    </Link>
                                </p>

                                <div>
                                    <Link
                                        to="/doctor/register"
                                        className="text-xs font-semibold text-slate-600 hover:text-teal-600 transition-colors inline-flex items-center gap-1"
                                    >
                                        Become a Doctor <ArrowRight size={12} />
                                    </Link>
                                </div>
                            </div>

                        </div>

                    </motion.div>

                </div>

            </div>

        </section>
    );
};

export default Login;
