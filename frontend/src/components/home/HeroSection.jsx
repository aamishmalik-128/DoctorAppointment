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
        <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 py-16 lg:py-24 text-white">

            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 px-4 sm:px-6 lg:px-8 lg:flex-row">

                {/* Left Column — Content & Actions */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="flex-1 text-left"
                >

                    <span className="inline-flex items-center gap-2 rounded-full bg-teal-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-300 border border-teal-500/30">
                        <Sparkles size={14} className="text-teal-400" />
                        Trusted Healthcare Platform
                    </span>

                    <h1 className="mt-6 font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12]">
                        Healthcare{" "}
                        <span className="text-teal-400">
                            Made
                        </span>
                        <br />
                        Simple & Smart
                    </h1>

                    <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-slate-200 font-normal">
                        Find experienced doctors, book appointments instantly, receive digital prescriptions and manage your healthcare seamlessly from anywhere.
                    </p>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-wrap items-center gap-4">

                        <button className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-teal-500 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-md hover:bg-teal-400 transition-all duration-200 active:scale-[0.98]">
                            Book Appointment
                            <ArrowRight size={18} className="text-slate-950" />
                        </button>

                        <button className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-slate-800/80 px-7 py-3.5 text-sm font-semibold text-white border border-slate-700 hover:bg-slate-800 transition-all duration-200 active:scale-[0.98]">
                            Explore Doctors
                        </button>

                    </div>

                    {/* Quick Features Grid */}
                    <div className="mt-12 grid gap-4 grid-cols-1 sm:grid-cols-3">

                        <div className="rounded-2xl bg-slate-800/60 p-4 sm:p-5 border border-slate-700/80 shadow-md">
                            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mb-3 text-teal-300">
                                <CalendarCheck size={20} />
                            </div>
                            <h3 className="font-heading font-bold text-sm sm:text-base text-white">
                                Easy Booking
                            </h3>
                            <p className="mt-1 text-xs text-slate-300 leading-normal">
                                Schedule appointments in seconds online.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-slate-800/60 p-4 sm:p-5 border border-slate-700/80 shadow-md">
                            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mb-3 text-teal-300">
                                <ShieldCheck size={20} />
                            </div>
                            <h3 className="font-heading font-bold text-sm sm:text-base text-white">
                                Secure Records
                            </h3>
                            <p className="mt-1 text-xs text-slate-300 leading-normal">
                                Encrypted patient health data protection.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-slate-800/60 p-4 sm:p-5 border border-slate-700/80 shadow-md">
                            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mb-3 text-teal-300">
                                <HeartPulse size={20} />
                            </div>
                            <h3 className="font-heading font-bold text-sm sm:text-base text-white">
                                Trusted Doctors
                            </h3>
                            <p className="mt-1 text-xs text-slate-300 leading-normal">
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
                        className="relative flex h-[340px] w-[340px] sm:h-[450px] sm:w-[450px] items-center justify-center rounded-full bg-gradient-to-br from-teal-500 via-cyan-600 to-slate-800 p-2.5 shadow-2xl"
                    >

                        <img
                            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800"
                            alt="Doctor"
                            className="h-full w-full rounded-full object-cover border-4 border-slate-800 shadow-inner"
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
                        className="absolute left-0 sm:left-4 top-8 rounded-2xl bg-slate-800/90 backdrop-blur-md p-4 sm:p-5 shadow-xl border border-slate-700/80 flex items-center gap-3"
                    >
                        <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300 font-bold text-sm">
                            ✓
                        </div>
                        <div>
                            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                                Appointments
                            </p>
                            <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
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
                        className="absolute bottom-6 right-0 sm:right-4 rounded-2xl bg-slate-800/90 backdrop-blur-md p-4 sm:p-5 shadow-xl border border-slate-700/80 flex items-center gap-3"
                    >
                        <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300 font-bold text-sm">
                            🩺
                        </div>
                        <div>
                            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                                Verified Doctors
                            </p>
                            <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
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
