import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
    Stethoscope,
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    ShieldCheck,
    Award,
    Activity,
    CheckCircle2,
    Sparkles,
    Building2,
} from "lucide-react";
import { registerDoctor } from "../../redux/feature/doctor/doctorThunk";
import { clearDoctorState } from "../../redux/feature/doctor/doctorSlice";

const RegisterDoctor = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state) => state.doctor || {});

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
        if (validationError) setValidationError("");
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
            return setValidationError("Password must be at least 6 characters.");
        }

        if (formData.password !== formData.confirmPassword) {
            return setValidationError("Passwords do not match.");
        }

        try {
            await dispatch(
                registerDoctor({
                    fullName: formData.fullName,
                    email: formData.email,
                    password: formData.password,
                })
            ).unwrap();

            // Navigate on success
            navigate("/doctor/login");
        } catch (err) {
            console.error("Doctor Registration Error:", err);
        }
    };
    useEffect(() => {
    return () => {
        dispatch(clearDoctorState());
    };
}, [dispatch]);

    return (
        <section className="relative min-h-[calc(100vh-5rem)] bg-gradient-to-br from-slate-50 via-teal-50/60 to-emerald-50 text-slate-800 flex items-center justify-center py-10 sm:py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Medical Wave Grid & Glowing Ambient Accents */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
            
            {/* Light Sea Green Ambient Orbs */}
            <div className="absolute top-10 left-1/4 h-96 w-96 rounded-full bg-teal-300/25 blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-1/4 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl pointer-events-none" />
            
            {/* Medical Line Graphic Accent (Pulse/EKG Wave background) */}
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

                    {/* LEFT PANEL - ELEGANT MEDICAL HERITAGE */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="hidden lg:flex flex-col justify-center text-left space-y-6"
                    >
                        {/* Top Badge */}
                        <span className="inline-flex items-center gap-2.5 rounded-full bg-teal-100/80 px-4 py-2 text-xs font-semibold text-teal-800 border border-teal-200/80 w-fit backdrop-blur-md shadow-sm">
                            <Stethoscope size={16} className="text-teal-600" />
                            Official Practitioner Portal
                        </span>

                        <h1 className="font-heading font-extrabold text-4xl xl:text-5xl leading-tight text-slate-900 tracking-tight">
                            Expand Your Practice with{" "}
                            <span className="bg-gradient-to-r from-teal-700 via-emerald-600 to-teal-500 bg-clip-text text-transparent block mt-1">
                                Modern CarePoint
                            </span>
                        </h1>

                        <p className="max-w-md text-sm xl:text-base leading-relaxed text-slate-600 font-normal">
                            Join our prestigious network of verified healthcare experts. Manage consultations, issue digital prescriptions, and deliver seamless care to thousands of patients.
                        </p>

                        {/* Medical Lines Divider */}
                        <div className="relative w-full max-w-md my-2">
                            <div className="h-0.5 w-full bg-gradient-to-r from-teal-500 via-emerald-300 to-transparent rounded-full" />
                            <div className="absolute -top-1.5 left-1/4 h-3 w-3 rounded-full bg-teal-500 ring-4 ring-teal-100" />
                        </div>

                        {/* Feature Badges with Light Sea-Green Medical Highlights */}
                        <div className="space-y-3.5 max-w-md pt-2">
                            <div className="flex items-center gap-4 rounded-2xl border border-teal-100 bg-white/80 p-4 shadow-sm backdrop-blur-md hover:border-teal-300 hover:shadow-md transition-all">
                                <div className="rounded-xl bg-teal-500/10 p-3 text-teal-700 shrink-0 border border-teal-200/50">
                                    <Award size={22} />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-slate-900 text-sm">
                                        Verified Practitioner Status
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        Gain instant credibility with admin-verified medical credentials
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 rounded-2xl border border-teal-100 bg-white/80 p-4 shadow-sm backdrop-blur-md hover:border-teal-300 hover:shadow-md transition-all">
                                <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-700 shrink-0 border border-emerald-200/50">
                                    <Activity size={22} />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-slate-900 text-sm">
                                        Smart Schedule Management
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        Set your consultation slots, fees, and hospital affiliations effortlessly
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 rounded-2xl border border-teal-100 bg-white/80 p-4 shadow-sm backdrop-blur-md hover:border-teal-300 hover:shadow-md transition-all">
                                <div className="rounded-xl bg-teal-500/10 p-3 text-teal-700 shrink-0 border border-teal-200/50">
                                    <ShieldCheck size={22} />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-slate-900 text-sm">
                                        HIPAA & Privacy Compliant
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        Protected patient data, records, and encrypted prescription logs
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Medical Counter Indicators */}
                        <div className="flex items-center gap-8 border-t border-teal-200/60 pt-5 max-w-md">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-teal-600" size={18} />
                                <span className="text-xs font-semibold text-slate-700">100% Verified Profiles</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Building2 className="text-teal-600" size={18} />
                                <span className="text-xs font-semibold text-slate-700">Top Hospitals</span>
                            </div>
                        </div>

                    </motion.div>

                    {/* RIGHT PANEL - LIGHT SEA-GREEN REGISTRATION CARD */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="flex justify-center w-full"
                    >
                        <div className="w-full max-w-md rounded-3xl bg-white/95 p-7 sm:p-9 shadow-2xl border border-teal-100 text-slate-900 backdrop-blur-xl relative">
                            
                            {/* Decorative Top Accent Line matching medical theme */}
                            <div className="absolute top-0 inset-x-8 h-1 bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-600 rounded-b-md" />

                            {/* Header */}
                            <div className="text-left mb-6">
                                <div className="inline-flex items-center gap-2 rounded-xl bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700 mb-2 border border-teal-200/70">
                                    <Sparkles size={13} className="text-teal-600" />
                                    Doctor Registration
                                </div>
                                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                                    Join as a Doctor
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                    Create your doctor account to setup your professional profile.
                                </p>
                            </div>

                            {/* Error Banners */}
                            {(validationError || error) && (
                                <div className="mb-4 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-semibold text-rose-600 flex items-start gap-2">
                                    <span className="mt-0.5">•</span>
                                    <span>{validationError || error}</span>
                                </div>
                            )}

                            {/* Form */}
                            <form className="space-y-4" onSubmit={handleSubmit}>

                                {/* Full Name */}
                                <div className="space-y-1.5 text-left">
                                    <label className="text-xs font-bold text-slate-700">
                                        Full Name (with Title)
                                    </label>
                                    <div className="relative">
                                        <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-teal-600/70" />
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Dr. Sarah Jenkins"
                                            className="w-full rounded-xl border border-teal-100 bg-teal-50/20 pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Email Address */}
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
                                            placeholder="dr.sarah@carepoint.com"
                                            className="w-full rounded-xl border border-teal-100 bg-teal-50/20 pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
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

                                {/* Confirm Password */}
                                <div className="space-y-1.5 text-left">
                                    <label className="text-xs font-bold text-slate-700">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-teal-600/70" />
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                            className="w-full rounded-xl border border-teal-100 bg-teal-50/20 pl-10 pr-10 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-600 transition-colors"
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
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white py-3 px-4 font-bold shadow-lg shadow-teal-600/20 transition-all duration-200 active:scale-[0.98] mt-2 text-sm disabled:opacity-60 cursor-pointer"
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Registering Doctor Account...
                                        </span>
                                    ) : (
                                        <>
                                            Register as Doctor
                                            <ArrowRight size={16} />
                                        </>
                                    )}
                                </motion.button>

                            </form>

                            {/* Decorative EKG pulse bar above footer */}
                            <div className="my-5 flex items-center justify-center gap-2">
                                <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-teal-200 to-transparent" />
                                <Stethoscope size={14} className="text-teal-400" />
                                <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-teal-200 to-transparent" />
                            </div>

                            {/* Footer Links */}
                            <div className="text-center space-y-2">
                                <p className="text-xs text-slate-500">
                                    Already registered?{" "}
                                    <Link
                                        to="/doctor/login"
                                        className="font-bold text-teal-600 hover:text-teal-800 transition-colors"
                                    >
                                        Doctor Login
                                    </Link>
                                </p>

                                <div>
                                    <Link
                                        to="/register"
                                        className="text-xs font-semibold text-slate-500 hover:text-teal-600 transition-colors inline-flex items-center gap-1"
                                    >
                                        Looking to book an appointment? <span className="text-teal-600 font-bold underline">Patient Register</span>
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

export default RegisterDoctor;
