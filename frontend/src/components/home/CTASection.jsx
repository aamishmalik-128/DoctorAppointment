import { motion } from "framer-motion";
import { ArrowRight, Stethoscope, CalendarDays, ShieldCheck, Video, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-teal-50/60 to-emerald-50 py-20 lg:py-28 text-slate-800 border-t border-teal-100/60">

            <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8 text-center">

                {/* Hero Header Motion Container */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="flex flex-col items-center"
                >
                    <span className="inline-flex items-center gap-2 rounded-full bg-teal-100/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-800 border border-teal-200/80">
                        <ShieldCheck size={14} className="text-teal-600" />
                        Your Health Comes First
                    </span>

                    <h2 className="mt-6 font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-tight max-w-4xl">
                        Book Trusted Doctors{" "}
                        <br className="hidden sm:inline" />
                        <span className="bg-gradient-to-r from-teal-700 via-emerald-600 to-teal-500 bg-clip-text text-transparent">Anytime, Anywhere</span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
                        Connect with experienced healthcare professionals, schedule appointments online, and receive quality medical care without unnecessary waiting.
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
                >
                    <Link
                        to="/doctors"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 hover:from-teal-700 hover:to-emerald-700 transition-all duration-200 active:scale-[0.98]"
                    >
                        <CalendarDays size={18} />
                        Book Appointment
                    </Link>

                    <Link
                        to="/doctor/register"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-teal-700 border border-teal-200 hover:bg-teal-50 transition-all duration-200 active:scale-[0.98] group shadow-sm"
                    >
                        <Stethoscope size={18} className="text-teal-600" />
                        Become a Doctor
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                {/* Feature Cards */}
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full text-left">

                    <motion.div
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-2xl bg-white/80 p-6 sm:p-7 border border-teal-100 shadow-sm hover:shadow-md hover:border-teal-300 transition-all backdrop-blur-md"
                    >
                        <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-200/50 flex items-center justify-center mb-4 text-teal-700">
                            <ShieldCheck size={20} />
                        </div>
                        <h3 className="font-heading font-bold text-lg text-slate-900">
                            500+ Verified Doctors
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                            Specialists across cardiology, neurology, pediatrics and 20+ disciplines.
                        </p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-2xl bg-white/80 p-6 sm:p-7 border border-teal-100 shadow-sm hover:shadow-md hover:border-teal-300 transition-all backdrop-blur-md"
                    >
                        <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-200/50 flex items-center justify-center mb-4 text-teal-700">
                            <Clock size={20} />
                        </div>
                        <h3 className="font-heading font-bold text-lg text-slate-900">
                            Instant Secure Booking
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                            Fast, reliable and encrypted appointment scheduling in under 60 seconds.
                        </p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-2xl bg-white/80 p-6 sm:p-7 border border-teal-100 shadow-sm hover:shadow-md hover:border-teal-300 transition-all backdrop-blur-md sm:col-span-2 md:col-span-1"
                    >
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-200/50 flex items-center justify-center mb-4 text-emerald-700">
                            <Video size={20} />
                        </div>
                        <h3 className="font-heading font-bold text-lg text-slate-900">
                            HD Video Consultations
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                            Consult with doctors from home with instant digital prescription delivery.
                        </p>
                    </motion.div>

                </div>

            </div>

        </section>
    );
};

export default CTASection;
