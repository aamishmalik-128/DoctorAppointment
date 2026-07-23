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
        <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 py-20 lg:py-28 text-white">

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center flex flex-col items-center"
                >

                    <span className="inline-flex items-center gap-2 rounded-full bg-teal-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-300 border border-teal-500/30">
                        <Sparkles size={14} className="text-teal-400" />
                        Simple Process
                    </span>

                    <h2 className="mt-6 font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                        Book An Appointment
                        <span className="text-teal-400">
                            {" "}
                            In 3 Easy Steps
                        </span>
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-200 font-normal">
                        We have designed a simple healthcare experience that allows patients to connect with doctors within minutes.
                    </p>

                </motion.div>

                {/* Steps Timeline Grid */}
                <div className="relative mt-16 lg:mt-24">

                    {/* Connecting Timeline Line for Desktop */}
                    <div className="absolute left-1/6 right-1/6 top-6 hidden h-0.5 bg-gradient-to-r from-teal-500/30 via-teal-400 to-teal-500/30 lg:block" />

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                        {steps.map((step, index) => {

                            const Icon = step.icon;

                            return (

                                <motion.div
                                    key={index}
                                    initial={{
                                        opacity: 0,
                                        y: 40,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    viewport={{
                                        once: true,
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.15,
                                        ease: "easeOut",
                                    }}
                                    whileHover={{
                                        y: -8,
                                    }}
                                    className="relative flex flex-col items-center text-center group"
                                >

                                    {/* Number Badge */}
                                    <div className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-teal-500 text-slate-950 font-heading font-extrabold text-base shadow-md border-4 border-slate-900 group-hover:scale-110 transition-transform">
                                        {step.number}
                                    </div>

                                    {/* Card */}
                                    <div className="w-full rounded-2xl bg-slate-800/60 border border-slate-700/80 p-8 sm:p-9 shadow-md group-hover:border-teal-500/50 transition-all duration-200 flex-1 flex flex-col items-center">

                                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-teal-500/20 border border-teal-500/30 text-teal-300 group-hover:bg-teal-500 group-hover:text-slate-950 transition-all duration-300 shadow-sm">
                                            <Icon
                                                size={36}
                                            />
                                        </div>

                                        <h3 className="mt-6 font-heading font-bold text-xl sm:text-2xl text-white tracking-tight group-hover:text-teal-400 transition-colors">
                                            {step.title}
                                        </h3>

                                        <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-300 font-normal">
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
