import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    CalendarDays,
    Users,
    DollarSign,
    ClipboardList,
    Stethoscope,
    ArrowRight,
    Sparkles,
    CheckCircle2,
    Clock,
    Award,
    ShieldCheck,
    AlertCircle,
    Loader2,
} from "lucide-react";
import { getDoctorProfile } from "../../redux/feature/doctor/doctorThunk";

import { formatDoctorName } from "../../utils/formatDoctorName";

const DashboardHome = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth || {});
    const { loading, doctorProfile, profileCompleted, error } = useSelector(
        (state) => state.doctor || {}
    );

    useEffect(() => {
        dispatch(getDoctorProfile());
    }, [dispatch]);

    const stats = [
        {
            title: "Today's Appointments",
            value: 0,
            icon: CalendarDays,
            change: "Scheduled for today",
        },
        {
            title: "Total Patients",
            value: 0,
            icon: Users,
            change: "Active patients",
        },
        {
            title: "Monthly Revenue",
            value: doctorProfile?.fee ? `$${doctorProfile.fee * 0}` : "$0",
            icon: DollarSign,
            change: "Consultation earnings",
        },
        {
            title: "Pending Requests",
            value: 0,
            icon: ClipboardList,
            change: "Awaiting confirmation",
        },
    ];

    return (
        <div className="space-y-6 sm:space-y-8 text-left">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-600 to-emerald-600 p-6 sm:p-8 text-white shadow-xl shadow-teal-600/15">
                {/* Decorative Pattern & Ambient Glow Accent */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

                <div className="relative z-10 max-w-2xl text-left">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/20">
                        <Sparkles size={14} /> Doctor Portal
                    </span>

                    <h1 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight">
                        Welcome Back, {formatDoctorName(user?.fullName)} 👋
                    </h1>

                    <p className="mt-2 text-xs sm:text-sm text-teal-100/90 leading-relaxed font-medium">
                        Manage your patient consultations, track daily schedules, review medical histories, and issue digital prescriptions effortlessly.
                    </p>
                </div>
            </div>

            {/* Statistics Grid */}
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="rounded-2xl bg-white/95 p-5 shadow-sm border border-teal-100/80 hover:border-teal-300 hover:shadow-md transition-all duration-200 text-left"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        {item.title}
                                    </p>

                                    <h2 className="mt-1.5 text-2xl sm:text-3xl font-extrabold text-slate-900">
                                        {item.value}
                                    </h2>

                                    <p className="mt-1 text-[11px] font-semibold text-teal-600 flex items-center gap-1">
                                        <CheckCircle2 size={12} /> {item.change}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-teal-500/10 p-3.5 text-teal-700 border border-teal-200/50">
                                    <Icon size={24} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Doctor Profile State Handling */}
            {loading ? (
                /* Loading Skeleton */
                <div className="rounded-3xl border border-teal-100 bg-white/95 p-8 flex items-center justify-center gap-3 text-teal-700 font-semibold shadow-xs">
                    <Loader2 size={20} className="animate-spin text-teal-600" />
                    <span className="text-sm">Fetching doctor profile details...</span>
                </div>
            ) : profileCompleted && doctorProfile ? (
                /* Verified Doctor Profile Card */
                <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 sm:p-8 shadow-sm backdrop-blur-xl space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-teal-100/80 pb-5">
                        <div className="flex items-center gap-3.5">
                            <div className="rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 p-3 text-white shadow-md shadow-teal-600/20">
                                <Stethoscope size={24} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="text-xl font-extrabold text-slate-900">
                                        {formatDoctorName(user?.fullName || doctorProfile?.fullName)}
                                    </h2>
                                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider border ${
                                        doctorProfile?.status === "approved"
                                            ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                                            : "bg-amber-100 text-amber-800 border-amber-200"
                                    }`}>
                                        <ShieldCheck size={12} />
                                        {doctorProfile?.status || "Pending Approval"}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    {doctorProfile?.specialization || "General Practitioner"} • {doctorProfile?.qualifications || "MBBS"}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate("/doctor/profile")}
                            className="rounded-xl border border-teal-200 bg-teal-50/60 px-4 py-2 text-xs font-bold text-teal-700 hover:bg-teal-100 transition cursor-pointer shadow-xs"
                        >
                            View Full Profile
                        </button>
                    </div>

                    {/* Quick Stats Tiles */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="rounded-2xl border border-teal-100/80 bg-teal-50/30 p-4">
                            <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold">
                                <Award size={16} className="text-teal-600" /> Specialization
                            </div>
                            <p className="mt-1 font-bold text-slate-900 text-sm">
                                {doctorProfile?.specialization || "General Medicine"}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-teal-100/80 bg-teal-50/30 p-4">
                            <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold">
                                <Clock size={16} className="text-teal-600" /> Experience
                            </div>
                            <p className="mt-1 font-bold text-slate-900 text-sm">
                                {doctorProfile?.experience ? `${doctorProfile.experience} Years` : "N/A"}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-teal-100/80 bg-teal-50/30 p-4">
                            <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold">
                                <DollarSign size={16} className="text-teal-600" /> Consultation Fee
                            </div>
                            <p className="mt-1 font-bold text-slate-900 text-sm">
                                {doctorProfile?.fee ? `$${doctorProfile.fee}` : "Not Set"}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                /* Profile Action Required Banner */
                <div className="rounded-3xl border border-teal-200/80 bg-teal-50/50 p-6 sm:p-8 text-left backdrop-blur-sm shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-2 max-w-2xl">
                        <div className="inline-flex items-center gap-2 rounded-xl bg-teal-100/80 px-3 py-1 text-xs font-bold text-teal-800 border border-teal-200">
                            <Stethoscope size={14} className="text-teal-600" />
                            Profile Action Required
                        </div>
                        <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                            Complete Your Professional Doctor Profile
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            To enable direct patient appointment bookings, please complete your profile details including your medical specialization, degree qualifications, consultation fees, and weekly availability slots.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/doctor/profile")}
                        className="shrink-0 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 px-5 py-3 font-bold text-white shadow-lg shadow-teal-600/20 transition-all duration-200 active:scale-[0.99] cursor-pointer text-xs sm:text-sm flex items-center gap-2"
                    >
                        Complete Profile
                        <ArrowRight size={16} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default DashboardHome;