import { motion } from "framer-motion";
import CountUpModule from "react-countup";
import {
    Users,
    Stethoscope,
    CalendarCheck,
    Building2,
    Sparkles,
} from "lucide-react";

const stats = [
    {
        id: 1,
        icon: Users,
        value: 25000,
        suffix: "+",
        title: "Happy Patients",
    },
    {
        id: 2,
        icon: Stethoscope,
        value: 450,
        suffix: "+",
        title: "Verified Doctors",
    },
    {
        id: 3,
        icon: CalendarCheck,
        value: 80000,
        suffix: "+",
        title: "Appointments",
    },
    {
        id: 4,
        icon: Building2,
        value: 70,
        suffix: "+",
        title: "Partner Hospitals",
    },
];

const StatisticsSection = () => {
    const CountUp = CountUpModule.default || CountUpModule;

    return (
        <section className="relative overflow-hidden bg-white py-20 lg:py-28 text-slate-800 border-t border-teal-100/60">

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

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
                        Trusted By Thousands
                    </span>

                    <h2 className="mt-6 font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
                        Healthcare You Can{" "}
                        <span className="bg-gradient-to-r from-teal-700 via-emerald-600 to-teal-500 bg-clip-text text-transparent">
                            Trust
                        </span>
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
                        Every appointment, every consultation and every prescription is backed by trusted healthcare professionals.
                    </p>

                </motion.div>

                {/* Stats Grid */}
                <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                    {stats.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.12,
                                    ease: "easeOut",
                                }}
                                whileHover={{ y: -6 }}
                                className="group rounded-2xl bg-teal-50/30 border border-teal-100 p-7 sm:p-8 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-200 flex flex-col items-center text-center backdrop-blur-sm"
                            >
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-500/10 border border-teal-200/50 text-teal-700 group-hover:bg-gradient-to-br group-hover:from-teal-600 group-hover:to-emerald-600 group-hover:text-white transition-all duration-300 shadow-xs">
                                    <Icon size={28} />
                                </div>

                                <h3 className="mt-6 font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
                                    <CountUp
                                        end={item.value}
                                        duration={3}
                                        enableScrollSpy
                                    />
                                    <span className="text-teal-600">{item.suffix}</span>
                                </h3>

                                <p className="mt-2 text-xs sm:text-sm font-medium text-slate-600">
                                    {item.title}
                                </p>
                            </motion.div>
                        );
                    })}

                </div>

            </div>

        </section>
    );
};

export default StatisticsSection;
