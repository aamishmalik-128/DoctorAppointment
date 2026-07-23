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
        <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 py-20 lg:py-28 text-white">

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center flex flex-col items-center"
                >

                    <span className="inline-flex items-center gap-2 rounded-full bg-teal-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-300 border border-teal-500/30">
                        <Sparkles size={14} className="text-teal-400" />
                        Why Choose Us
                    </span>

                    <h2 className="mt-6 font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight max-w-3xl">
                        Everything You Need{" "}
                        <span className="text-teal-400">
                            For Better Healthcare
                        </span>
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-200 font-normal">
                        Our platform simplifies the healthcare experience by connecting patients with trusted doctors while making appointment management seamless.
                    </p>

                </motion.div>

                {/* 2-Card Row Grid on Mobile & Tablet (grid-cols-2), 3-Card Row on Desktop (lg:grid-cols-3) */}
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
                                className="group rounded-2xl bg-white border border-slate-100 p-5 sm:p-7 shadow-xl hover:shadow-2xl hover:border-teal-500/40 transition-all duration-300 flex flex-col justify-between text-slate-800"
                            >
                                <div>
                                    {/* Vibrant Gradient Icon Badge */}
                                    <div className="flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 text-slate-950 shadow-md group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                                    </div>

                                    <h3 className="mt-4 sm:mt-5 font-heading font-bold text-sm sm:text-xl text-slate-900 tracking-tight group-hover:text-teal-600 transition-colors">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-2 text-[11px] sm:text-sm leading-snug sm:leading-relaxed text-slate-600 font-normal">
                                        {feature.description}
                                    </p>
                                </div>

                                {/* Animated Bottom Accent Bar */}
                                <div className="mt-4 sm:mt-6 pt-2">
                                    <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-300 rounded-full" />
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
