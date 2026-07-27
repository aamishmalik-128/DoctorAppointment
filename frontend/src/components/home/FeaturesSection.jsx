import { motion } from "framer-motion";
import {
    Stethoscope,
    CalendarCheck2,
    FileText,
    ShieldCheck,
    HeartPulse,
    Clock3,
    Sparkles,
} from "lucide-react";

const features = [
    {
        icon: Stethoscope,
        title: "Verified Doctors",
        description:
            "Consult experienced healthcare professionals across specialized disciplines.",
    },
    {
        icon: CalendarCheck2,
        title: "Instant Booking",
        description:
            "Book appointments in under 60 seconds with simple online scheduling.",
    },
    {
        icon: FileText,
        title: "Digital Prescriptions",
        description:
            "Receive prescriptions digitally and access them anytime from your portal.",
    },
    {
        icon: ShieldCheck,
        title: "Secure Medical Records",
        description:
            "Your health data and records remain end-to-end encrypted and 100% private.",
    },
    {
        icon: HeartPulse,
        title: "Quality Patient Care",
        description:
            "Connect with top specialists committed to delivering compassionate care.",
    },
    {
        icon: Clock3,
        title: "Zero Waiting Times",
        description:
            "Avoid waiting in long queues by reserving your exact consultation slot.",
    },
];

const FeaturesSection = () => {
    return (
        <section className="relative overflow-hidden bg-white py-20 lg:py-28 text-slate-800 border-t border-teal-100/60">
            {/* Pattern Accent */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center flex flex-col items-center"
                >

                    <span className="inline-flex items-center gap-2 rounded-full bg-teal-100/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-800 border border-teal-200/80">
                        <Sparkles size={14} className="text-teal-600" />
                        Why Choose Us
                    </span>

                    <h2 className="mt-6 font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight max-w-3xl">
                        Everything You Need{" "}
                        <span className="bg-gradient-to-r from-teal-700 via-emerald-600 to-teal-500 bg-clip-text text-transparent">
                            For Better Healthcare
                        </span>
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
                        Our platform simplifies the healthcare experience by connecting patients with trusted doctors while making appointment management seamless.
                    </p>

                </motion.div>

                {/* Cards Grid */}
                <div className="mt-16 grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-7">

                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.08,
                                    ease: "easeOut",
                                }}
                                whileHover={{
                                    y: -8,
                                }}
                                className="group rounded-2xl bg-teal-50/30 border border-teal-100/80 p-5 sm:p-7 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col justify-between text-slate-800 backdrop-blur-sm"
                            >
                                <div>
                                    {/* Icon Badge */}
                                    <div className="flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                                    </div>

                                    <h3 className="mt-4 sm:mt-5 font-heading font-bold text-sm sm:text-xl text-slate-900 tracking-tight group-hover:text-teal-700 transition-colors">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-2 text-[11px] sm:text-sm leading-snug sm:leading-relaxed text-slate-600 font-normal">
                                        {feature.description}
                                    </p>
                                </div>

                                {/* Animated Bottom Accent Bar */}
                                <div className="mt-4 sm:mt-6 pt-2">
                                    <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-300 rounded-full" />
                                </div>
                            </motion.div>
                        );
                    })}

                </div>

            </div>

        </section>
    );
};

export default FeaturesSection;
