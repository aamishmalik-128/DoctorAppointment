import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Stethoscope,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    ShieldCheck,
    Award,
    Activity,
    Sparkles,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../redux/feature/auth/authThunk";

const LoginDoctor = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth || {});

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [roleError, setRoleError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        if (roleError) setRoleError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setRoleError("");

        try {
            const result = await dispatch(login(formData)).unwrap();
            
            // Check if logged-in user is actually a doctor
            if (result?.user?.role !== "doctor") {
                await dispatch(logout());
                setRoleError("Only verified doctor accounts can log in here. Patient account detected.");
                return;
            }

            navigate("/doctor");
        } catch (err) {
            console.error("Doctor Login Failed:", err);
        }
    };

    // Auto-redirect if already authenticated as a doctor
    useEffect(() => {
        if (isAuthenticated && user) {
            if (user.role === "doctor") {
                navigate("/doctor");
            }
        }
    }, [isAuthenticated, user, navigate]);

    return (
        <section className="relative min-h-[calc(100vh-5rem)] bg-gradient-to-br from-slate-50 via-teal-50/60 to-emerald-50 text-slate-800 flex items-center justify-center py-10 sm:py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Medical Pattern Grid Background */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

            {/* Light Sea Green Ambient Orbs */}
            <div className="absolute top-10 left-1/4 h-96 w-96 rounded-full bg-teal-300/25 blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-1/4 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl pointer-events-none" />

            {/* Medical EKG Line Graphic Accent */}
            <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
                <svg
                    className="w-full max-w-7xl h-64 text-teal-400"
                    viewBox="0 0 1200 200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                >
                    <path d="M0,100 L400,100 L420,40 L440,160 L460,70 L480,120 L500,100 L1200,100" />
                </svg>
            </div>

            <div className="mx-auto w-full max-w-7xl my-auto z-10">
                <div className="grid w-full items-center gap-10 lg:gap-16 lg:grid-cols-2">

                    {/* LEFT PANEL - MEDICAL DOCTOR HERO */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="hidden lg:flex flex-col justify-center text-left space-y-6"
                    >
                        {/* Top Badge */}
                        <span className="inline-flex items-center gap-2.5 rounded-full bg-teal-100/80 px-4 py-2 text-xs font-semibold text-teal-800 border border-teal-200/80 w-fit backdrop-blur-md shadow-sm">
                            <Stethoscope size={16} className="text-teal-600" />
                            Verified Practitioner Portal
                        </span>

                        <h1 className="font-heading font-extrabold text-4xl xl:text-5xl leading-tight text-slate-900 tracking-tight">
                            Welcome Back,{" "}
                            <span className="bg-gradient-to-r from-teal-700 via-emerald-600 to-teal-500 bg-clip-text text-transparent block mt-1">
                                Doctor Portal
                            </span>
                        </h1>

                        <p className="max-w-md text-sm xl:text-base leading-relaxed text-slate-600 font-normal">
                            Access your medical dashboard, manage patient appointments, write digital prescriptions, and streamline your clinical workflow.
                        </p>

                        {/* Medical Lines Divider */}
                        <div className="relative w-full max-w-md my-2">
                            <div className="h-0.5 w-full bg-gradient-to-r from-teal-500 via-emerald-300 to-transparent rounded-full" />
                            <div className="absolute -top-1.5 left-1/4 h-3 w-3 rounded-full bg-teal-500 ring-4 ring-teal-100" />
                        </div>

                        {/* Feature Highlights */}
                        <div className="space-y-3.5 max-w-md pt-2">
                            <div className="flex items-center gap-4 rounded-2xl border border-teal-100 bg-white/80 p-4 shadow-sm backdrop-blur-md hover:border-teal-300 hover:shadow-md transition-all">
                                <div className="rounded-xl bg-teal-500/10 p-3 text-teal-700 shrink-0 border border-teal-200/50">
                                    <Activity size={22} />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-slate-900 text-sm">
                                        Live Appointment Management
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        View today's patient schedule and consultation slots
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 rounded-2xl border border-teal-100 bg-white/80 p-4 shadow-sm backdrop-blur-md hover:border-teal-300 hover:shadow-md transition-all">
                                <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-700 shrink-0 border border-emerald-200/50">
                                    <Award size={22} />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-slate-900 text-sm">
                                        Digital Rx & Health Records
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        Issue instant digital prescriptions with e-signatures
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 rounded-2xl border border-teal-100 bg-white/80 p-4 shadow-sm backdrop-blur-md hover:border-teal-300 hover:shadow-md transition-all">
                                <div className="rounded-xl bg-teal-500/10 p-3 text-teal-700 shrink-0 border border-teal-200/50">
                                    <ShieldCheck size={22} />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-slate-900 text-sm">
                                        Encrypted & Secure Login
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        Protected authentication with multi-tier role verification
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Trust Indicators */}
                        <div className="flex items-center gap-8 border-t border-teal-200/60 pt-5 max-w-md">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-teal-600" size={18} />
                                <span className="text-xs font-semibold text-slate-700">Verified Practitioners</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="text-teal-600" size={18} />
                                <span className="text-xs font-semibold text-slate-700">HIPAA Compliant</span>
                            </div>
                        </div>

                    </motion.div>

                    {/* RIGHT PANEL - LIGHT SEA-GREEN DOCTOR LOGIN CARD */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="flex justify-center w-full"
                    >
                        <div className="w-full max-w-md rounded-3xl bg-white/95 p-7 sm:p-9 shadow-2xl border border-teal-100 text-slate-900 backdrop-blur-xl relative">

                            {/* Top Decorative Medical Accent Bar */}
                            <div className="absolute top-0 inset-x-8 h-1 bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-600 rounded-b-md" />

                            {/* Header */}
                            <div className="text-left mb-6">
                                <div className="inline-flex items-center gap-2 rounded-xl bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700 mb-2 border border-teal-200/70">
                                    <Sparkles size={13} className="text-teal-600" />
                                    Doctor Authentication
                                </div>
                                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                                    Doctor Login
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                    Enter your credentials to access your doctor portal.
                                </p>
                            </div>

                            {/* Error Banner */}
                            {(error || roleError) && (
                                <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-semibold text-rose-600 flex items-start gap-2">
                                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                                    <span>{roleError || error}</span>
                                </div>
                            )}

                            {/* Form */}
                            <form className="space-y-4" onSubmit={handleSubmit}>

                                {/* Email Field */}
                                <div className="space-y-1.5 text-left">
                                    <label className="text-xs font-bold text-slate-700">
                                        Professional Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-teal-600/70" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="dr.sarah@carepoint.com"
                                            className="w-full rounded-xl border border-teal-100 bg-teal-50/20 pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
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
                                            required
                                            placeholder="••••••••"
                                            className="w-full rounded-xl border border-teal-100 bg-teal-50/20 pl-10 pr-10 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                                        />
                                        {/* Show / Hide Password Toggle */}
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-600 transition-colors cursor-pointer"
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

                                {/* Submit Button */}
                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    type="submit"
                                    disabled={loading}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white py-3 px-4 font-bold shadow-lg shadow-teal-600/20 transition-all duration-200 active:scale-[0.98] mt-2 text-sm disabled:opacity-60 cursor-pointer"
                                >
                                    {loading ? "Signing In..." : "Login as Doctor"}
                                    <ArrowRight size={16} />
                                </motion.button>

                            </form>

                            {/* EKG pulse divider */}
                            <div className="my-5 flex items-center justify-center gap-2">
                                <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-teal-200 to-transparent" />
                                <Stethoscope size={14} className="text-teal-400" />
                                <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-teal-200 to-transparent" />
                            </div>

                            {/* Footer Links */}
                            <div className="text-center space-y-2">
                                <p className="text-xs text-slate-500">
                                    Don't have a doctor account?{" "}
                                    <Link
                                        to="/doctor/register"
                                        className="font-bold text-teal-600 hover:text-teal-800 transition-colors"
                                    >
                                        Register as Doctor
                                    </Link>
                                </p>

                                <div>
                                    <Link
                                        to="/login"
                                        className="text-xs font-semibold text-slate-500 hover:text-teal-600 transition-colors inline-flex items-center gap-1"
                                    >
                                        Patient account? <span className="text-teal-600 font-bold underline">Patient Login</span>
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

export default LoginDoctor;
