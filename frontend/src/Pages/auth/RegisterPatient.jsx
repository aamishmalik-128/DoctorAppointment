import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    ShieldCheck,
    HeartPulse,
    CalendarDays,
    Sparkles,
} from "lucide-react";
import { register } from "../../redux/feature/auth/authThunk";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state) => state.auth || {});

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [validationError, setValidationError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setValidationError("");

        if (
            !formData.fullName ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            return setValidationError("All fields are required.");
        }

        if (formData.password.length < 6) {
            return setValidationError(
                "Password must be at least 6 characters."
            );
        }

        if (formData.password !== formData.confirmPassword) {
            return setValidationError(
                "Passwords do not match."
            );
        }

        try {
            await dispatch(
                register({
                    fullName: formData.fullName,
                    email: formData.email,
                    password: formData.password,
                })
            ).unwrap();

            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section className="relative min-h-[calc(100vh-5rem)] bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white flex items-center justify-center py-10 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8">

            {/* Ambient Background Accents */}
            <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

            <div className="mx-auto w-full max-w-7xl my-auto">

                <div className="grid w-full items-center gap-8 lg:gap-16 lg:grid-cols-2">

                    {/* LEFT PANEL */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="hidden lg:flex flex-col justify-center text-left"
                    >
                        <span className="inline-flex items-center gap-2 rounded-full bg-teal-500/20 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-300 border border-teal-500/30 w-fit">
                            <Sparkles size={14} className="text-teal-400" />
                            Trusted Healthcare Portal
                        </span>

                        <h1 className="mt-5 font-heading font-extrabold text-4xl xl:text-5xl leading-tight text-white tracking-tight">
                            Start Your{" "}
                            <span className="block text-teal-400">
                                Healthcare Journey.
                            </span>
                        </h1>

                        <p className="mt-4 max-w-md text-sm xl:text-base leading-relaxed text-slate-300 font-normal">
                            Create your account to book appointments, access digital prescriptions, securely manage medical records, and consult verified healthcare professionals.
                        </p>

                        {/* Feature Badges */}
                        <div className="mt-7 space-y-3 max-w-md">

                            <div className="flex items-center gap-3.5 rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 backdrop-blur-md hover:border-teal-500/40 transition-colors shadow-sm">
                                <div className="rounded-lg bg-teal-500/20 p-2.5 text-teal-300 shrink-0">
                                    <HeartPulse size={20} />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-white text-sm">
                                        Trusted Doctors
                                    </h3>
                                    <p className="text-xs text-slate-400">
                                        500+ verified medical specialists
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3.5 rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 backdrop-blur-md hover:border-teal-500/40 transition-colors shadow-sm">
                                <div className="rounded-lg bg-teal-500/20 p-2.5 text-teal-300 shrink-0">
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-white text-sm">
                                        Secure Records
                                    </h3>
                                    <p className="text-xs text-slate-400">
                                        End-to-end encrypted medical data
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3.5 rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 backdrop-blur-md hover:border-teal-500/40 transition-colors shadow-sm">
                                <div className="rounded-lg bg-teal-500/20 p-2.5 text-teal-300 shrink-0">
                                    <CalendarDays size={20} />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-white text-sm">
                                        Instant Booking
                                    </h3>
                                    <p className="text-xs text-slate-400">
                                        Book consultations in under 60 seconds
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* Quick Stats */}
                        <div className="mt-8 flex gap-8 border-t border-slate-800/80 pt-6 max-w-md">
                            <div>
                                <h2 className="font-heading font-extrabold text-2xl text-teal-400">
                                    25K+
                                </h2>
                                <p className="text-xs text-slate-400 font-medium">
                                    Patients
                                </p>
                            </div>

                            <div>
                                <h2 className="font-heading font-extrabold text-2xl text-teal-400">
                                    500+
                                </h2>
                                <p className="text-xs text-slate-400 font-medium">
                                    Doctors
                                </p>
                            </div>

                            <div>
                                <h2 className="font-heading font-extrabold text-2xl text-teal-400">
                                    80K+
                                </h2>
                                <p className="text-xs text-slate-400 font-medium">
                                    Bookings
                                </p>
                            </div>
                        </div>

                    </motion.div>

                    {/* RIGHT PANEL — AUTH FORM CARD */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="flex justify-center w-full"
                    >

                        <div className="w-full max-w-md rounded-3xl bg-white p-7 sm:p-9 shadow-2xl border border-slate-100 text-slate-900">

                            {/* Header */}
                            <div className="text-left mb-6">
                                <div className="inline-flex items-center gap-2 rounded-xl bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700 mb-2 border border-teal-100">
                                    CarePoint Registration
                                </div>
                                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                                    Create Account
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                    Join CarePoint today to start your healthcare journey.
                                </p>
                            </div>

                            {(validationError || error) && (
                                <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-3 text-xs font-semibold text-red-600">
                                    {validationError || error}
                                </div>
                            )}

                            {/* Registration Form */}
                            <form className="space-y-4" onSubmit={handleSubmit}>

                                {/* Full Name Input */}
                                <div className="space-y-1.5 text-left">
                                    <label className="text-xs font-bold text-slate-700">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Email Input */}
                                <div className="space-y-1.5 text-left">
                                    <label className="text-xs font-bold text-slate-700">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@gmail.com"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div className="space-y-1.5 text-left">
                                    <label className="text-xs font-bold text-slate-700">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-10 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password Input */}
                                <div className="space-y-1.5 text-left">
                                    <label className="text-xs font-bold text-slate-700">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-10 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                        >
                                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    type="submit"
                                    disabled={loading}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 py-3 px-4 font-bold text-slate-950 shadow-md hover:bg-teal-400 transition-all duration-200 active:scale-[0.98] mt-2 text-sm disabled:opacity-60 cursor-pointer"
                                >
                                    {loading ? "Creating Account..." : "Register"}
                                    <ArrowRight size={16} className="text-slate-950" />
                                </motion.button>

                            </form>

                            {/* Footer Links */}
                            <div className="mt-6 border-t border-slate-100 pt-4 text-center">

                                <p className="text-xs text-slate-500">
                                    Already have an account?{" "}
                                    <Link
                                        to="/login"
                                        className="font-bold text-teal-600 hover:text-teal-700"
                                    >
                                        Login
                                    </Link>
                                </p>

                                <div className="mt-3">
                                    <Link
                                        to="/register/doctor"
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

export default Register;
