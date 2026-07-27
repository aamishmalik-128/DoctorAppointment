import { motion } from "framer-motion";
import {
    CalendarCheck,
    ShieldCheck,
    HeartPulse,
    ArrowRight,
    Sparkles,
} from "lucide-react";

const HeroSection = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-teal-50/60 to-emerald-50 py-16 lg:py-24 text-slate-800">
            {/* Medical Pattern Grid & Light Sea Green Ambient Orbs */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
            <div className="absolute top-10 left-1/4 h-96 w-96 rounded-full bg-teal-300/25 blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-1/4 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl pointer-events-none" />

            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 px-4 sm:px-6 lg:px-8 lg:flex-row relative z-10">

                {/* Left Column — Content & Actions */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="flex-1 text-left"
                >

                    <span className="inline-flex items-center gap-2 rounded-full bg-teal-100/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-800 border border-teal-200/80 backdrop-blur-md shadow-sm">
                        <Sparkles size={14} className="text-teal-600" />
                        Trusted Healthcare Platform
                    </span>

                    <h1 className="mt-6 font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.12]">
                        Healthcare{" "}
                        <span className="bg-gradient-to-r from-teal-700 via-emerald-600 to-teal-500 bg-clip-text text-transparent block mt-1">
                            Made Simple & Smart
                        </span>
                    </h1>

                    <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
                        Find experienced doctors, book appointments instantly, receive digital prescriptions and manage your healthcare seamlessly from anywhere.
                    </p>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-wrap items-center gap-4">

                        <button className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 hover:from-teal-700 hover:to-emerald-700 transition-all duration-200 active:scale-[0.98] cursor-pointer">
                            Book Appointment
                            <ArrowRight size={18} />
                        </button>

                        <button className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-teal-700 border border-teal-200 hover:bg-teal-50 transition-all duration-200 active:scale-[0.98] shadow-sm cursor-pointer">
                            Explore Doctors
                        </button>

                    </div>

                    {/* Quick Features Grid */}
                    <div className="mt-12 grid gap-4 grid-cols-1 sm:grid-cols-3">

                        <div className="rounded-2xl bg-white/80 p-4 sm:p-5 border border-teal-100 shadow-sm backdrop-blur-md hover:border-teal-300 transition-all">
                            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-200/50 flex items-center justify-center mb-3 text-teal-700">
                                <CalendarCheck size={20} />
                            </div>
                            <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                                Easy Booking
                            </h3>
                            <p className="mt-1 text-xs text-slate-500 leading-normal">
                                Schedule appointments in seconds online.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white/80 p-4 sm:p-5 border border-teal-100 shadow-sm backdrop-blur-md hover:border-teal-300 transition-all">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-200/50 flex items-center justify-center mb-3 text-emerald-700">
                                <ShieldCheck size={20} />
                            </div>
                            <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                                Secure Records
                            </h3>
                            <p className="mt-1 text-xs text-slate-500 leading-normal">
                                Encrypted patient health data protection.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white/80 p-4 sm:p-5 border border-teal-100 shadow-sm backdrop-blur-md hover:border-teal-300 transition-all">
                            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-200/50 flex items-center justify-center mb-3 text-teal-700">
                                <HeartPulse size={20} />
                            </div>
                            <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                                Trusted Doctors
                            </h3>
                            <p className="mt-1 text-xs text-slate-500 leading-normal">
                                Verified medical specialists near you.
                            </p>
                        </div>

                    </div>

                </motion.div>

                {/* Right Column — Animated Image & Stat Cards */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="relative flex flex-1 items-center justify-center w-full max-w-lg lg:max-w-none"
                >

                    {/* Main Image Frame Container */}
                    <motion.div
                        animate={{
                            y: [0, -12, 0],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="relative flex h-[340px] w-[340px] sm:h-[450px] sm:w-[450px] items-center justify-center rounded-full bg-gradient-to-br from-teal-400 via-emerald-400 to-teal-600 p-2.5 shadow-2xl shadow-teal-900/10"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800"
                            alt="Doctor"
                            className="h-full w-full rounded-full object-cover border-4 border-white shadow-inner"
                        />
                    </motion.div>

                    {/* Floating Stat Badge 1 */}
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 3.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute left-0 sm:left-4 top-8 rounded-2xl bg-white/90 backdrop-blur-md p-4 sm:p-5 shadow-xl border border-teal-100 flex items-center gap-3"
                    >
                        <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-200/50 flex items-center justify-center text-teal-700 font-bold text-sm">
                            ✓
                        </div>
                        <div>
                            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                                Appointments
                            </p>
                            <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900">
                                25K+
                            </h2>
                        </div>
                    </motion.div>

                    {/* Floating Stat Badge 2 */}
                    <motion.div
                        animate={{
                            y: [0, 10, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute bottom-6 right-0 sm:right-4 rounded-2xl bg-white/90 backdrop-blur-md p-4 sm:p-5 shadow-xl border border-teal-100 flex items-center gap-3"
                    >
                        <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-200/50 flex items-center justify-center text-teal-700 font-bold text-sm">
                            🩺
                        </div>
                        <div>
                            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                                Verified Doctors
                            </p>
                            <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900">
                                500+
                            </h2>
                        </div>
                    </motion.div>

                </motion.div>

            </div>

        </section>
    );
};

export default HeroSection;
