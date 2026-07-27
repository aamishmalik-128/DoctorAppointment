import React from "react";
import { useNavigate } from "react-router-dom";
import {
    HeartPulse,
    ShieldCheck,
    Users,
    Clock,
    Award,
    CheckCircle2,
    ChevronRight,
    Stethoscope,
    FileText,
} from "lucide-react";

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/20 py-8 px-4 sm:px-6 lg:px-8 text-left">
            <div className="max-w-6xl mx-auto space-y-10">

                {/* Hero Banner */}
                <div className="rounded-3xl border border-teal-100 bg-white/95 p-8 sm:p-12 shadow-xl backdrop-blur-xl space-y-6">
                    <div className="max-w-3xl space-y-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-lg border border-teal-100">
                            <HeartPulse size={15} className="text-teal-600" /> About CarePoint Healthcare
                        </span>
                        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                            Transforming How Patients Connect with Quality Medical Care
                        </h1>
                        <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                            CarePoint is an end-to-end digital healthcare portal engineered to make specialist doctor appointments, clinical prescriptions, and medical records seamless, transparent, and accessible for everyone.
                        </p>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-4">
                        <button
                            onClick={() => navigate("/doctors")}
                            className="flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-extrabold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 transition shadow-lg shadow-teal-600/20 cursor-pointer"
                        >
                            Find a Doctor Now <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Metrics Bar */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="rounded-2xl border border-teal-100 bg-white/95 p-6 shadow-sm text-center space-y-1">
                        <h2 className="text-3xl font-black text-teal-700">100+</h2>
                        <p className="text-xs font-bold text-slate-700">Verified Doctors</p>
                    </div>
                    <div className="rounded-2xl border border-teal-100 bg-white/95 p-6 shadow-sm text-center space-y-1">
                        <h2 className="text-3xl font-black text-teal-700">50k+</h2>
                        <p className="text-xs font-bold text-slate-700">Appointments Completed</p>
                    </div>
                    <div className="rounded-2xl border border-teal-100 bg-white/95 p-6 shadow-sm text-center space-y-1">
                        <h2 className="text-3xl font-black text-teal-700">99.4%</h2>
                        <p className="text-xs font-bold text-slate-700">Patient Satisfaction</p>
                    </div>
                    <div className="rounded-2xl border border-teal-100 bg-white/95 p-6 shadow-sm text-center space-y-1">
                        <h2 className="text-3xl font-black text-teal-700">24/7</h2>
                        <p className="text-xs font-bold text-slate-700">Platform Availability</p>
                    </div>
                </div>

                {/* Feature Highlights Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 shadow-md space-y-3">
                        <div className="h-12 w-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600">
                            <ShieldCheck size={24} />
                        </div>
                        <h3 className="text-base font-extrabold text-slate-900">Verified Medical Specialists</h3>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">
                            Every doctor profile undergo strict administrative verification of qualifications, medical license, and clinical track record before approval.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 shadow-md space-y-3">
                        <div className="h-12 w-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600">
                            <Clock size={24} />
                        </div>
                        <h3 className="text-base font-extrabold text-slate-900">Real-Time Slot Scheduling</h3>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">
                            Book in-person hospital visits or online video consultations with instant slot confirmation and automated reminder notifications.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 shadow-md space-y-3">
                        <div className="h-12 w-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600">
                            <FileText size={24} />
                        </div>
                        <h3 className="text-base font-extrabold text-slate-900">Digital Rx & Health Records</h3>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">
                            Access official print-ready electronic prescriptions, lab test recommendations, and doctor advice safely stored in your patient dashboard.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;
