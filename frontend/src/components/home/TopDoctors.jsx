import { motion } from "framer-motion";
import {
    Star,
    MapPin,
    BriefcaseMedical,
    CalendarDays,
    ArrowRight,
    Sparkles,
} from "lucide-react";

const doctors = [
    {
        id: 1,
        name: "Dr. Sarah Ahmed",
        specialization: "Cardiologist",
        experience: 12,
        hospital: "Shifa International",
        fee: 3000,
        rating: 4.9,
        available: true,
        image:
            "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600",
    },
    {
        id: 2,
        name: "Dr. Fahad Khan",
        specialization: "Neurologist",
        experience: 10,
        hospital: "CMH Rawalpindi",
        fee: 3500,
        rating: 4.8,
        available: true,
        image:
            "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600",
    },
    {
        id: 3,
        name: "Dr. Ayesha Malik",
        specialization: "Dermatologist",
        experience: 8,
        hospital: "Holy Family Hospital",
        fee: 2500,
        rating: 4.7,
        available: true,
        image:
            "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600",
    },
];

const TopDoctors = () => {
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
                        Our Specialists
                    </span>

                    <h2 className="mt-6 font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                        Meet Our{" "}
                        <span className="text-teal-400">
                            Top Rated Doctors
                        </span>
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-200 font-normal">
                        Consult highly experienced and verified doctors across multiple medical specialties.
                    </p>
                </motion.div>

                {/* Doctor Cards Grid */}
                <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                    {doctors.map((doctor, index) => (

                        <motion.div
                            key={doctor.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.12,
                                ease: "easeOut",
                            }}
                            whileHover={{
                                y: -6,
                            }}
                            className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-7 shadow-xl hover:shadow-2xl hover:border-teal-500/40 transition-all duration-300 flex flex-col justify-between h-full group text-slate-800"
                        >

                            <div>
                                {/* Top Header Info & Avatar — Reduced Gap */}
                                <div className="flex items-start gap-3.5 mb-3.5">
                                    <div className="relative shrink-0">
                                        <img
                                            src={doctor.image}
                                            alt={doctor.name}
                                            className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover border border-slate-100 shadow-xs"
                                        />
                                        <span
                                            className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                                                doctor.available ? "bg-emerald-500" : "bg-rose-500"
                                            }`}
                                            title={doctor.available ? "Available" : "Unavailable"}
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0 pt-0.5">
                                        <h3 className="font-heading font-bold text-slate-900 text-base sm:text-lg leading-snug truncate group-hover:text-teal-600 transition-colors">
                                            {doctor.name}
                                        </h3>
                                        <p className="text-teal-600 text-xs sm:text-sm font-bold mt-0.5">
                                            {doctor.specialization}
                                        </p>

                                        <div className="flex items-center gap-1.5 mt-1.5">
                                            <Star size={13} className="text-amber-400 fill-amber-400 shrink-0" />
                                            <span className="text-xs font-extrabold text-slate-800">{doctor.rating}</span>
                                            <span className="text-xs text-slate-400">(150+ reviews)</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Highlights Details Box — Compact Padding & Spacing */}
                                <div className="space-y-2 py-3 border-y border-slate-100 mb-4 bg-slate-50/80 rounded-xl px-3.5 text-xs text-slate-600">
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-2 text-slate-500 font-medium">
                                            <BriefcaseMedical size={13} className="text-teal-600 shrink-0" />
                                            Experience
                                        </span>
                                        <span className="font-bold text-slate-800">{doctor.experience} Years</span>
                                    </div>

                                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                                        <span className="flex items-center gap-2 text-slate-500 font-medium">
                                            <MapPin size={13} className="text-teal-600 shrink-0" />
                                            Hospital
                                        </span>
                                        <span className="font-bold text-slate-800 truncate max-w-[150px]">{doctor.hospital}</span>
                                    </div>

                                    <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/60">
                                        <span className={`font-semibold ${doctor.available ? "text-emerald-600" : "text-rose-600"}`}>
                                            {doctor.available ? "● Available Today" : "● Unavailable"}
                                        </span>
                                        <span className="font-extrabold text-slate-900 text-sm">
                                            Rs. {doctor.fee} <span className="text-[11px] font-normal text-slate-400">/visit</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2.5 pt-1">
                                <button className="flex-1 text-center py-2.5 px-3 bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition-colors">
                                    View Profile
                                </button>
                                <button className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors">
                                    Book Now
                                    <CalendarDays size={14} />
                                </button>
                            </div>

                        </motion.div>

                    ))}

                </div>

                {/* Bottom CTA */}
                <div className="mt-14 text-center">
                    <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-500 hover:bg-teal-400 px-8 py-3.5 text-sm font-semibold text-slate-950 shadow-md transition-all duration-200 active:scale-[0.98]">
                        View All Doctors
                        <ArrowRight size={18} />
                    </button>
                </div>

            </div>

        </section>
    );
};

export default TopDoctors;
