import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Star,
    MapPin,
    BriefcaseMedical,
    CalendarDays,
    ArrowRight,
    Sparkles,
    Loader2,
    Stethoscope,
    UserCheck,
} from "lucide-react";
import { fetchPublicDoctors } from "../../redux/feature/doctor/doctorThunk";
import { formatDoctorName } from "../../utils/formatDoctorName";

const TopDoctors = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { publicDoctors = [], loading } = useSelector(
        (state) => state.doctor || {}
    );

    useEffect(() => {
        dispatch(fetchPublicDoctors({ limit: 6 }));
    }, [dispatch]);

    const realDoctors = Array.isArray(publicDoctors) ? publicDoctors.slice(0, 6) : [];

    return (
        <section className="relative overflow-hidden bg-white py-20 lg:py-28 text-slate-800 border-t border-teal-100/60">
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
                        Verified Specialists
                    </span>

                    <h2 className="mt-6 font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
                        Meet Our{" "}
                        <span className="bg-gradient-to-r from-teal-700 via-emerald-600 to-teal-500 bg-clip-text text-transparent">
                            Top Rated Doctors
                        </span>
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
                        Book direct consultations with highly qualified and verified medical practitioners.
                    </p>
                </motion.div>

                {/* Loading State */}
                {loading && realDoctors.length === 0 ? (
                    <div className="mt-16 flex flex-col items-center justify-center py-16 text-slate-400 gap-3">
                        <Loader2 size={36} className="animate-spin text-teal-600" />
                        <p className="text-sm font-semibold text-slate-600">Loading top verified doctors...</p>
                    </div>
                ) : realDoctors.length === 0 ? (
                    /* Empty State if no real approved doctors in database yet */
                    <div className="mt-16 text-center py-16 rounded-3xl border border-teal-100 bg-teal-50/30 p-8 max-w-xl mx-auto space-y-4">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 text-teal-700">
                            <Stethoscope size={28} />
                        </div>
                        <h3 className="text-lg font-extrabold text-slate-900">Registered Doctors Available Soon</h3>
                        <p className="text-xs text-slate-600">
                            Our team is currently reviewing doctor profile applications. Explore all specialties or apply to join CarePoint as a medical practitioner.
                        </p>
                        <button
                            onClick={() => navigate("/doctors")}
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:from-teal-700 hover:to-emerald-700 transition cursor-pointer"
                        >
                            <span>Browse All Specialties</span>
                            <ArrowRight size={14} />
                        </button>
                    </div>
                ) : (
                    /* Real Doctor Cards Grid */
                    <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {realDoctors.map((doctor, index) => {
                            const name = formatDoctorName(
                                doctor?.user?.fullName || doctor?.fullName
                            );
                            const avatar =
                                doctor?.user?.avatar ||
                                doctor?.profileImage ||
                                "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600";
                            const spec = doctor?.specialization || "General Physician";
                            const hospital = doctor?.hospital || "CarePoint Medical Center";
                            const fee = doctor?.consultationFee || 0;
                            const experience = doctor?.experience || 1;
                            const isAvailable = doctor?.isAvailable !== false;

                            return (
                                <motion.div
                                    key={doctor._id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.1,
                                        ease: "easeOut",
                                    }}
                                    whileHover={{ y: -6 }}
                                    className="bg-white rounded-2xl border border-teal-100 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col justify-between h-full group text-slate-800"
                                >
                                    <div>
                                        {/* Doctor Avatar & Basic Header */}
                                        <div className="flex items-start gap-3.5 mb-3.5">
                                            <div className="relative shrink-0">
                                                <img
                                                    src={avatar}
                                                    alt={name}
                                                    className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover border border-teal-100 shadow-xs"
                                                />
                                                <span
                                                    className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                                                        isAvailable ? "bg-emerald-500" : "bg-slate-400"
                                                    }`}
                                                    title={isAvailable ? "Available for booking" : "Unavailable"}
                                                />
                                            </div>

                                            <div className="flex-1 min-w-0 pt-0.5 text-left">
                                                <h3 className="font-heading font-bold text-slate-900 text-base sm:text-lg leading-snug truncate group-hover:text-teal-700 transition-colors">
                                                    {name}
                                                </h3>
                                                <p className="text-teal-700 text-xs sm:text-sm font-bold mt-0.5 truncate">
                                                    {spec}
                                                </p>

                                                <div className="flex items-center gap-1.5 mt-1.5">
                                                    <Star size={13} className="text-amber-400 fill-amber-400 shrink-0" />
                                                    <span className="text-xs font-extrabold text-slate-800">4.9</span>
                                                    <span className="text-xs text-slate-400 font-semibold">(Verified)</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Experience & Fee Specs Box */}
                                        <div className="space-y-2 py-3 border-y border-teal-100 mb-4 bg-teal-50/40 rounded-xl px-3.5 text-xs text-slate-600 text-left">
                                            <div className="flex items-center justify-between">
                                                <span className="flex items-center gap-2 text-slate-500 font-medium">
                                                    <BriefcaseMedical size={13} className="text-teal-600 shrink-0" />
                                                    Experience
                                                </span>
                                                <span className="font-bold text-slate-800">{experience} Years</span>
                                            </div>

                                            <div className="flex items-center justify-between pt-1 border-t border-teal-100/60">
                                                <span className="flex items-center gap-2 text-slate-500 font-medium">
                                                    <MapPin size={13} className="text-teal-600 shrink-0" />
                                                    Hospital
                                                </span>
                                                <span className="font-bold text-slate-800 truncate max-w-[150px]">{hospital}</span>
                                            </div>

                                            <div className="flex items-center justify-between pt-1.5 border-t border-teal-100/60">
                                                <span className={`font-semibold text-xs ${isAvailable ? "text-emerald-600" : "text-slate-500"}`}>
                                                    {isAvailable ? "● Available Today" : "● Off Schedule"}
                                                </span>
                                                <span className="font-extrabold text-slate-900 text-sm">
                                                    Rs. {fee} <span className="text-[11px] font-normal text-slate-400">/visit</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-2.5 pt-1">
                                        <button
                                            onClick={() => navigate(`/doctors/${doctor._id}`)}
                                            className="flex-1 text-center py-2.5 px-3 bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold rounded-xl border border-teal-200/60 transition-colors cursor-pointer"
                                        >
                                            View Profile
                                        </button>
                                        <button
                                            onClick={() => navigate(`/doctors/${doctor._id}`)}
                                            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                                        >
                                            Book Now
                                            <CalendarDays size={14} />
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                {/* View All Doctors Footer Button */}
                <div className="mt-14 text-center">
                    <button
                        onClick={() => navigate("/doctors")}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-200 active:scale-[0.98] cursor-pointer"
                    >
                        <span>View All Doctors</span>
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TopDoctors;
