import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDoctorPrescriptions } from "../../redux/feature/prescription/prescriptionThunk";
import {
    FileText,
    Calendar,
    User,
    Pill,
    Search,
    ChevronRight,
    Eye,
    Loader2,
    AlertCircle,
    Plus,
    ClipboardList,
} from "lucide-react";

const StatCard = ({ title, value, icon }) => {
    return (
        <div className="rounded-2xl bg-white/95 p-4 shadow-xs border border-teal-100/80 hover:border-teal-300 transition-all text-left backdrop-blur-md">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        {title}
                    </p>
                    <h2 className="mt-1 text-xl sm:text-2xl font-bold text-slate-900">
                        {value}
                    </h2>
                </div>
                {icon && (
                    <div className="rounded-xl bg-teal-500/10 p-2.5 text-teal-700 border border-teal-200/50 shrink-0">
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );
};

const DoctorPrescriptions = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { prescriptions = [], loading, error } = useSelector(
        (state) => state.prescription || {}
    );

    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        dispatch(getDoctorPrescriptions());
    }, [dispatch]);

    const prescriptionList = Array.isArray(prescriptions) ? prescriptions : [];

    const filteredPrescriptions = prescriptionList.filter((item) => {
        const patientName = (item?.patient?.fullName || item?.patient?.name || "").toLowerCase();
        const diagnosis = (item?.diagnosis || "").toLowerCase();
        const query = searchQuery.toLowerCase().trim();

        return !query || patientName.includes(query) || diagnosis.includes(query);
    });

    return (
        <div className="space-y-5 text-left max-w-5xl mx-auto">
            {/* Compact Header */}
            <div className="rounded-2xl border border-teal-100 bg-white/95 px-5 py-4 shadow-sm backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-100">
                        <FileText size={12} /> Clinical Documentation
                    </span>
                    <h1 className="mt-1 text-lg sm:text-xl font-bold text-slate-800 tracking-tight">
                        Issued Prescriptions
                    </h1>
                    <p className="text-xs text-slate-500">
                        Manage patient prescriptions, add new treatment plans, or update advice.
                    </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    {/* Search Bar */}
                    <div className="relative w-full sm:w-60">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search patient or diagnosis..."
                            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-teal-100 bg-teal-50/20 text-slate-800 placeholder-slate-400 outline-none focus:border-teal-500 focus:bg-white transition shadow-xs"
                        />
                    </div>

                    <button
                        onClick={() => navigate("/doctor/prescriptions/create")}
                        className="flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 transition shadow-md shrink-0 cursor-pointer"
                    >
                        <Plus size={15} /> Create Rx
                    </button>
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-medium text-rose-600 shadow-xs">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{typeof error === "string" ? error : error?.message || "Error loading prescriptions."}</span>
                </div>
            )}

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                <StatCard title="Total Prescriptions" value={prescriptionList.length} icon={<FileText size={18} />} />
                <StatCard title="Total Patients" value={new Set(prescriptionList.map(p => p.patient?._id)).size} icon={<User size={18} />} />
                <StatCard title="Medications Prescribed" value={prescriptionList.reduce((acc, p) => acc + (p.medications?.length || 0), 0)} icon={<Pill size={18} />} />
            </div>

            {/* Prescriptions List */}
            {loading ? (
                <div className="rounded-2xl border border-teal-100 bg-white/95 p-10 text-center text-teal-700 font-semibold shadow-xs flex flex-col items-center justify-center gap-2">
                    <Loader2 size={22} className="animate-spin text-teal-600" />
                    <span className="text-xs">Fetching prescriptions...</span>
                </div>
            ) : filteredPrescriptions.length === 0 ? (
                <div className="rounded-2xl border border-teal-100 bg-white/95 p-10 text-center text-slate-500 shadow-xs space-y-2">
                    <FileText size={32} className="mx-auto text-teal-400 opacity-60" />
                    <h3 className="text-sm font-bold text-slate-800">
                        No Prescriptions Found
                    </h3>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                        No prescription records match your query. Click "Create Rx" to add one.
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredPrescriptions.map((item) => {
                        const patientName = item?.patient?.fullName || item?.patient?.name || "Patient";
                        const patientEmail = item?.patient?.email || "No email";
                        const createdDate = item?.createdAt
                            ? new Date(item.createdAt).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                              })
                            : "N/A";
                        const medsCount = item?.medications?.length || 0;
                        const testsCount = item?.tests?.length || 0;

                        return (
                            <div
                                key={item._id}
                                onClick={() => navigate(`/doctor/prescriptions/${item._id}`)}
                                className="rounded-2xl border border-teal-100/90 bg-white/95 p-5 shadow-xs hover:border-teal-300 hover:shadow-md transition-all space-y-3 cursor-pointer group text-left"
                            >
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-teal-100/80 pb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-extrabold shadow-xs shrink-0 text-base">
                                            Rx
                                        </div>

                                        <div>
                                            <h2 className="text-base font-bold text-slate-800 group-hover:text-teal-700 transition">
                                                {patientName}
                                            </h2>
                                            <p className="text-xs font-medium text-slate-500 flex items-center gap-1 mt-0.5">
                                                <User size={12} /> {patientEmail}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 self-end sm:self-center">
                                        <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/60 flex items-center gap-1">
                                            <Calendar size={12} className="text-teal-600" /> {createdDate}
                                        </span>
                                    </div>
                                </div>

                                {/* Summary Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-teal-50/30 p-3 rounded-xl border border-teal-100/60 text-xs">
                                    <div>
                                        <p className="text-[10px] font-semibold text-slate-400 uppercase">Diagnosis</p>
                                        <p className="font-bold text-slate-800 truncate">{item.diagnosis || "N/A"}</p>
                                    </div>

                                    <div>
                                        <p className="text-[10px] font-semibold text-slate-400 uppercase">Prescribed Medicines</p>
                                        <p className="font-bold text-slate-800 flex items-center gap-1">
                                            <Pill size={13} className="text-teal-600" /> {medsCount} {medsCount === 1 ? "Medicine" : "Medicines"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[10px] font-semibold text-slate-400 uppercase">Recommended Tests</p>
                                        <p className="font-bold text-slate-800 flex items-center gap-1">
                                            <ClipboardList size={13} className="text-teal-600" /> {testsCount} {testsCount === 1 ? "Test" : "Tests"}
                                        </p>
                                    </div>
                                </div>

                                {/* Action Bar */}
                                <div className="flex items-center justify-between pt-0.5">
                                    <p className="text-xs text-slate-500 italic">
                                        {item.followUpDate ? `Follow-up: ${new Date(item.followUpDate).toLocaleDateString()}` : "No follow-up date"}
                                    </p>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/doctor/prescriptions/${item._id}`);
                                        }}
                                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200/80 hover:bg-teal-100 transition cursor-pointer shadow-xs"
                                    >
                                        <Eye size={13} /> View Rx Details
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default DoctorPrescriptions;