import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchPublicDoctors } from "../../redux/feature/doctor/doctorThunk";
import { formatDoctorName } from "../../utils/formatDoctorName";
import {
    Stethoscope,
    Search,
    Filter,
    Building,
    DollarSign,
    Award,
    Loader2,
    AlertCircle,
    Calendar,
    Star,
    X,
} from "lucide-react";

const SPECIALTIES = [
    "All Specialties",
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
    "General Physician",
    "Gynecology",
    "Psychiatry",
];

const checkSpecMatch = (selectedSpec, docSpec) => {
    if (!selectedSpec || selectedSpec === "All Specialties") return true;
    if (!docSpec) return false;

    const sel = selectedSpec.toLowerCase();
    const doc = docSpec.toLowerCase();

    if (doc.includes(sel) || sel.includes(doc)) return true;

    if (sel.includes("cardio") && doc.includes("cardio")) return true;
    if (sel.includes("derm") && doc.includes("derm")) return true;
    if (sel.includes("neuro") && doc.includes("neuro")) return true;
    if ((sel.includes("pedia") || sel.includes("pediatr")) && (doc.includes("pedia") || doc.includes("pediatr"))) return true;
    if (sel.includes("ortho") && doc.includes("ortho")) return true;
    if (sel.includes("general") && doc.includes("general")) return true;
    if ((sel.includes("gyn") || sel.includes("ob-gyn")) && (doc.includes("gyn") || doc.includes("ob-gyn"))) return true;
    if (sel.includes("psych") && doc.includes("psych")) return true;

    return false;
};

const DoctorsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const initialSpec = searchParams.get("specialization") || "All Specialties";

    const { publicDoctors = [], loading, error } = useSelector(
        (state) => state.doctor || {}
    );

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSpecialty, setSelectedSpecialty] = useState(initialSpec);

    useEffect(() => {
        const params = {};
        if (selectedSpecialty && selectedSpecialty !== "All Specialties") {
            params.specialization = selectedSpecialty;
        }
        if (searchQuery.trim()) {
            params.search = searchQuery.trim();
        }
        dispatch(fetchPublicDoctors(params));
    }, [dispatch, selectedSpecialty, searchQuery]);

    const handleSpecialtyChange = (spec) => {
        setSelectedSpecialty(spec);
        if (spec && spec !== "All Specialties") {
            setSearchParams({ specialization: spec });
        } else {
            setSearchParams({});
        }
    };

    const handleClearSearch = () => {
        setSearchQuery("");
    };

    const doctorList = Array.isArray(publicDoctors) ? publicDoctors : [];

    const filteredDoctors = doctorList.filter((doc) => {
        const name = formatDoctorName(doc?.user?.fullName || doc?.fullName).toLowerCase();
        const hosp = (doc?.hospital || "").toLowerCase();
        const spec = (doc?.specialization || "").toLowerCase();
        const q = searchQuery.toLowerCase().trim();

        const matchesSearch = !q || name.includes(q) || hosp.includes(q) || spec.includes(q);
        const matchesSpec = checkSpecMatch(selectedSpecialty, doc?.specialization);

        return matchesSearch && matchesSpec;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/20 py-8 px-4 sm:px-6 lg:px-8 text-left">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Hero Search Header Banner */}
                <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 sm:p-10 shadow-xl backdrop-blur-xl space-y-6">
                    <div className="max-w-2xl space-y-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-lg border border-teal-100">
                            <Stethoscope size={14} className="text-teal-600" /> Verified Medical Practitioners
                        </span>
                        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                            Find & Book Leading Healthcare Specialists
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium">
                            Choose from our network of verified medical experts and schedule your consultation in seconds.
                        </p>
                    </div>

                    {/* Search & Filter Bar */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-teal-50/40 p-3 rounded-2xl border border-teal-100/80">
                        <div className="relative sm:col-span-2">
                            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by doctor name, hospital, or specialty..."
                                className="w-full pl-10 pr-9 py-2.5 text-xs font-medium rounded-xl border border-teal-100 bg-white text-slate-800 placeholder-slate-400 outline-none focus:border-teal-500 transition shadow-xs"
                            />
                            {searchQuery && (
                                <button
                                    onClick={handleClearSearch}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>

                        <div className="relative">
                            <Filter size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-teal-600 pointer-events-none" />
                            <select
                                value={selectedSpecialty}
                                onChange={(e) => handleSpecialtyChange(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 text-xs font-bold text-slate-800 rounded-xl border border-teal-100 bg-white outline-none focus:border-teal-500 transition cursor-pointer shadow-xs capitalize"
                            >
                                {SPECIALTIES.map((spec) => (
                                    <option key={spec} value={spec}>
                                        {spec}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Specialties Pill Quick Nav */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {SPECIALTIES.map((spec) => (
                        <button
                            key={spec}
                            onClick={() => handleSpecialtyChange(spec)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                                selectedSpecialty === spec
                                    ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md shadow-teal-600/20"
                                    : "bg-white/90 text-slate-600 border border-teal-100 hover:bg-teal-50 hover:text-teal-700"
                            }`}
                        >
                            {spec}
                        </button>
                    ))}
                </div>

                {/* Errors */}
                {error && (
                    <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-600 shadow-xs">
                        <AlertCircle size={18} className="shrink-0" />
                        <span>{typeof error === "string" ? error : error?.message || "Failed to load doctors list."}</span>
                    </div>
                )}

                {/* Doctors Grid */}
                {loading ? (
                    <div className="rounded-3xl border border-teal-100 bg-white/95 p-12 text-center text-teal-700 font-semibold shadow-xs flex flex-col items-center justify-center gap-3">
                        <Loader2 size={28} className="animate-spin text-teal-600" />
                        <span className="text-xs">Searching verified doctors...</span>
                    </div>
                ) : filteredDoctors.length === 0 ? (
                    <div className="rounded-3xl border border-teal-100 bg-white/95 p-12 text-center text-slate-500 shadow-xs space-y-3">
                        <Stethoscope size={38} className="mx-auto text-teal-400 opacity-60" />
                        <h3 className="text-base font-extrabold text-slate-900">
                            No Doctors Found
                        </h3>
                        <p className="text-xs text-slate-500 max-w-sm mx-auto">
                            We couldn't find any verified doctors matching your query. Try resetting your search or filters.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDoctors.map((doc) => {
                            const name = formatDoctorName(doc?.user?.fullName || doc?.fullName);
                            const specialization = doc?.specialization || "Medical Specialist";
                            const hospital = doc?.hospital || "CarePoint Medical Center";
                            const experience = doc?.experience || 5;
                            const fee = doc?.consultationFee || 50;

                            return (
                                <div
                                    key={doc._id}
                                    onClick={() => navigate(`/doctors/${doc._id}`)}
                                    className="rounded-3xl border border-teal-100/90 bg-white/95 p-6 shadow-md hover:border-teal-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5 cursor-pointer group backdrop-blur-xl"
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4 border-b border-teal-100/80 pb-4">
                                            {doc?.user?.avatar || doc?.profileImage ? (
                                                <img
                                                    src={doc?.user?.avatar || doc?.profileImage}
                                                    alt={name}
                                                    className="h-16 w-16 rounded-2xl object-cover border-2 border-teal-500 shadow-xs shrink-0"
                                                />
                                            ) : (
                                                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-2xl font-extrabold text-white shadow-xs shrink-0">
                                                    {name.charAt(0)}
                                                </div>
                                            )}

                                            <div className="space-y-1 overflow-hidden">
                                                <h2 className="text-base font-extrabold text-slate-900 group-hover:text-teal-700 transition truncate">
                                                    {name}
                                                </h2>
                                                <p className="text-xs font-bold text-teal-700 flex items-center gap-1">
                                                    <Stethoscope size={13} /> {specialization}
                                                </p>
                                                <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60 w-fit">
                                                    <Star size={11} className="fill-amber-500 text-amber-500" /> 4.9 (120+ reviews)
                                                </div>
                                            </div>
                                        </div>

                                        {/* Metadata Details */}
                                        <div className="space-y-2 text-xs text-slate-600">
                                            <p className="flex items-center gap-2 font-medium">
                                                <Building size={14} className="text-teal-600 shrink-0" />
                                                <span className="truncate">{hospital}</span>
                                            </p>
                                            <p className="flex items-center gap-2 font-medium">
                                                <Award size={14} className="text-teal-600 shrink-0" />
                                                <span>{experience} Years Clinical Experience</span>
                                            </p>
                                            <p className="flex items-center gap-2 font-extrabold text-slate-900">
                                                <DollarSign size={14} className="text-teal-600 shrink-0" />
                                                <span>Consultation Fee: ${fee}</span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="pt-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/doctors/${doc._id}`);
                                            }}
                                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 transition shadow-md shadow-teal-600/20 cursor-pointer"
                                        >
                                            <Calendar size={14} /> Book Appointment
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorsPage;
