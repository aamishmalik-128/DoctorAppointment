import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Heart,
    Brain,
    Baby,
    Bone,
    Stethoscope,
    Activity,
    Eye,
    Smile,
    Shield,
    Sparkles,
    ChevronRight,
} from "lucide-react";

const SPECIALTIES = [
    {
        name: "Cardiology",
        description: "Heart specialists, blood pressure, ECG & cardiovascular care.",
        icon: Heart,
        doctorsCount: "18+ Specialists",
    },
    {
        name: "Dermatology",
        description: "Skin care, acne treatment, eczema & cosmetic dermatology.",
        icon: Sparkles,
        doctorsCount: "24+ Specialists",
    },
    {
        name: "Neurology",
        description: "Brain disorders, stroke management, migraines & nerve health.",
        icon: Brain,
        doctorsCount: "12+ Specialists",
    },
    {
        name: "Pediatrics",
        description: "Child healthcare, newborn vaccinations & pediatric wellness.",
        icon: Baby,
        doctorsCount: "30+ Specialists",
    },
    {
        name: "Orthopedics",
        description: "Bone health, joint replacement, spine care & sports injuries.",
        icon: Bone,
        doctorsCount: "15+ Specialists",
    },
    {
        name: "General Physician",
        description: "Primary care, seasonal fever, flu & routine check-ups.",
        icon: Stethoscope,
        doctorsCount: "40+ Specialists",
    },
    {
        name: "Gynecology",
        description: "Women's health, maternity care, PCOS & pregnancy guidance.",
        icon: Activity,
        doctorsCount: "22+ Specialists",
    },
    {
        name: "Psychiatry",
        description: "Mental health, therapy, anxiety, depression & wellness.",
        icon: Smile,
        doctorsCount: "16+ Specialists",
    },
    {
        name: "Ophthalmology",
        description: "Eye vision, LASIK surgery, cataract care & retina health.",
        icon: Eye,
        doctorsCount: "14+ Specialists",
    },
];

const Specialties = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/20 py-8 px-4 sm:px-6 lg:px-8 text-left">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header Banner */}
                <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 sm:p-10 shadow-xl backdrop-blur-xl space-y-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-lg border border-teal-100">
                        <Activity size={14} className="text-teal-600" /> Clinical Department Directory
                    </span>
                    <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                        Explore Specialized Medical Departments
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-2xl">
                        Find certified medical specialists tailored to your specific health requirements and book instant consultations.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SPECIALTIES.map((spec) => {
                        const Icon = spec.icon;

                        return (
                            <div
                                key={spec.name}
                                onClick={() => navigate(`/doctors?specialization=${encodeURIComponent(spec.name)}`)}
                                className="rounded-3xl border border-teal-100/90 bg-white/95 p-6 shadow-md hover:border-teal-300 hover:shadow-xl transition-all duration-300 space-y-4 cursor-pointer group backdrop-blur-xl flex flex-col justify-between"
                            >
                                <div className="space-y-3">
                                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-teal-600/20 group-hover:scale-110 transition-transform">
                                        <Icon size={26} />
                                    </div>

                                    <h2 className="text-lg font-extrabold text-slate-900 group-hover:text-teal-700 transition">
                                        {spec.name}
                                    </h2>

                                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                        {spec.description}
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-teal-100/60 flex items-center justify-between text-xs font-bold text-teal-700">
                                    <span>{spec.doctorsCount}</span>
                                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                        Browse Doctors <ChevronRight size={14} />
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Specialties;
