import { motion } from "framer-motion";
import {
    Search,
    CalendarCheck,
    FileCheck2,
    Sparkles,
} from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Find Your Doctor",
        description:
            "Browse hundreds of verified specialists based on experience, specialty and availability.",
        icon: Search,
    },
    {
        number: "02",
        title: "Book Appointment",
        description:
            "Choose a suitable date and time, then confirm your appointment within seconds.",
        icon: CalendarCheck,
    },
    {
        number: "03",
        title: "Get Treatment",
        description:
            "Consult your doctor and receive your digital prescription directly in your account.",
        icon: FileCheck2,
    },
];

const HowItWorks = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-teal-50/60 to-emerald-50 py-20 lg:py-28 text-slate-800 border-t border-teal-100/60">

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center flex flex-col items-center"
                >

                    <span className="inline-flex items-center gap-2 rounded-full bg-teal-100/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-800 border border-teal-200/80">
                        <Sparkles size={14} className="text-teal-600" />
                        Simple Process
                    </span>

                    <h2 className="mt-6 font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
                        Book An Appointment
                        <span className="bg-gradient-to-r from-teal-700 via-emerald-600 to-teal-500 bg-clip-text text-transparent">
                            {" "}
                            In 3 Easy Steps
                        </span>
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
                        We have designed a simple healthcare experience that allows patients to connect with doctors within minutes.
                    </p>

                </motion.div>

                {/* Steps Timeline Grid */}
                <div className="relative mt-16 lg:mt-24">

                    {/* Connecting Timeline Line for Desktop */}
                    <div className="absolute left-1/6 right-1/6 top-6 hidden h-0.5 bg-gradient-to-r from-teal-300 via-emerald-400 to-teal-300 lg:block" />

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                        {steps.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.15,
                                        ease: "easeOut",
                                    }}
                                    whileHover={{ y: -8 }}
                                    className="relative flex flex-col items-center text-center group"
                                >
                                    {/* Number Badge */}
                                    <div className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-emerald-600 text-white font-heading font-extrabold text-base shadow-md border-4 border-slate-50 group-hover:scale-110 transition-transform">
                                        {step.number}
                                    </div>

                                    {/* Card */}
                                    <div className="w-full rounded-2xl bg-white/90 border border-teal-100 p-8 sm:p-9 shadow-sm group-hover:shadow-xl group-hover:border-teal-300 transition-all duration-200 flex-1 flex flex-col items-center backdrop-blur-md">

                                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-teal-500/10 border border-teal-200/50 text-teal-700 group-hover:bg-gradient-to-br group-hover:from-teal-600 group-hover:to-emerald-600 group-hover:text-white transition-all duration-300 shadow-xs">
                                            <Icon size={36} />
                                        </div>

                                        <h3 className="mt-6 font-heading font-bold text-xl sm:text-2xl text-slate-900 tracking-tight group-hover:text-teal-700 transition-colors">
                                            {step.title}
                                        </h3>

                                        <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                                            {step.description}
                                        </p>

                                    </div>
                                </motion.div>
                            );
                        })}

                    </div>

                </div>

            </div>

        </section>
    );
};

export default HowItWorks;
