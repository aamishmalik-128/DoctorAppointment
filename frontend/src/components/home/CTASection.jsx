import { motion } from "framer-motion";
import { ArrowRight, Stethoscope, CalendarDays, ShieldCheck, Video, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 py-20 lg:py-28 text-white">

            <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8 text-center">

                {/* Hero Header Motion Container */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.7,
                        ease: "easeOut",
                    }}
                    className="flex flex-col items-center"
                >
                    <span className="inline-flex items-center gap-2 rounded-full bg-teal-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-300 border border-teal-500/30">
                        <ShieldCheck size={14} className="text-teal-400" />
                        Your Health Comes First
                    </span>

                    <h2 className="mt-6 font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight max-w-4xl">
                        Book Trusted Doctors{" "}
                        <br className="hidden sm:inline" />
                        <span className="text-teal-400">Anytime, Anywhere</span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-200 font-normal">
                        Connect with experienced healthcare professionals, schedule appointments online, and receive quality medical care without unnecessary waiting.
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.7,
                        delay: 0.15,
                        ease: "easeOut",
                    }}
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
                >
                    <Link
                        to="/doctors"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-teal-500 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-md hover:bg-teal-400 transition-all duration-200 active:scale-[0.98]"
                    >
                        <CalendarDays size={18} className="text-slate-950" />
                        Book Appointment
                    </Link>

                    <Link
                        to="/register/doctor"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-slate-800/80 px-7 py-3.5 text-sm font-semibold text-white border border-slate-700 hover:bg-slate-800 transition-all duration-200 active:scale-[0.98] group"
                    >
                        <Stethoscope size={18} className="text-teal-400" />
                        Become a Doctor
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                {/* Feature Cards with High Contrast Crisp Text */}
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full text-left">

                    <motion.div
                        whileHover={{
                            y: -6,
                        }}
                        transition={{ duration: 0.2 }}
                        className="rounded-2xl bg-slate-800/60 p-6 sm:p-7 border border-slate-700/80 shadow-md hover:border-teal-500/50 transition-colors"
                    >
                        <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mb-4 text-teal-300">
                            <ShieldCheck size={20} />
                        </div>
                        <h3 className="font-heading font-bold text-lg text-white">
                            500+ Verified Doctors
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                            Specialists across cardiology, neurology, pediatrics and 20+ disciplines.
                        </p>
                    </motion.div>

                    <motion.div
                        whileHover={{
                            y: -6,
                        }}
                        transition={{ duration: 0.2 }}
                        className="rounded-2xl bg-slate-800/60 p-6 sm:p-7 border border-slate-700/80 shadow-md hover:border-teal-500/50 transition-colors"
                    >
                        <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mb-4 text-teal-300">
                            <Clock size={20} />
                        </div>
                        <h3 className="font-heading font-bold text-lg text-white">
                            Instant Secure Booking
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                            Fast, reliable and encrypted appointment scheduling in under 60 seconds.
                        </p>
                    </motion.div>

                    <motion.div
                        whileHover={{
                            y: -6,
                        }}
                        transition={{ duration: 0.2 }}
                        className="rounded-2xl bg-slate-800/60 p-6 sm:p-7 border border-slate-700/80 shadow-md hover:border-teal-500/50 transition-colors sm:col-span-2 md:col-span-1"
                    >
                        <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mb-4 text-teal-300">
                            <Video size={20} />
                        </div>
                        <h3 className="font-heading font-bold text-lg text-white">
                            HD Video Consultations
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                            Consult with doctors from home with instant digital prescription delivery.
                        </p>
                    </motion.div>

                </div>

            </div>

        </section>
    );
};

export default CTASection;
