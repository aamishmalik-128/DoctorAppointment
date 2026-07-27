import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPrescriptionById } from "../../redux/feature/prescription/prescriptionThunk";
import { formatDoctorName } from "../../utils/formatDoctorName";
import {
    ArrowLeft,
    Printer,
    Stethoscope,
    Building,
    MapPin,
    Mail,
    User,
    Calendar,
    Pill,
    ClipboardList,
    FileText,
    Loader2,
    AlertCircle,
    CheckCircle2,
    Edit3,
} from "lucide-react";

const PrescriptionDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { prescription, loading, error } = useSelector(
        (state) => state.prescription || {}
    );

    const { user: currentUser } = useSelector(
        (state) => state.auth || {}
    );

    useEffect(() => {
        if (id) {
            dispatch(getPrescriptionById(id));
        }
    }, [dispatch, id]);

    const handlePrint = () => {
        window.print();
    };

    const isDoctorRole = currentUser?.role === "doctor";

    const getBackPath = () => {
        if (isDoctorRole) {
            return "/doctor/prescriptions";
        }
        return "/my-prescriptions";
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/40 to-emerald-50/30 flex items-center justify-center p-8">
                <div className="rounded-3xl border border-teal-100 bg-white/95 p-10 text-center text-teal-700 font-semibold shadow-xl backdrop-blur-xl flex flex-col items-center justify-center gap-3">
                    <Loader2 size={28} className="animate-spin text-teal-600" />
                    <span className="text-sm">Loading prescription details...</span>
                </div>
            </div>
        );
    }

    if (error || !prescription) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/40 to-emerald-50/30 py-12 px-4 text-left">
                <div className="max-w-2xl mx-auto rounded-3xl border border-teal-100 bg-white/95 p-8 text-center shadow-xl backdrop-blur-xl space-y-4">
                    <AlertCircle size={40} className="mx-auto text-rose-500" />
                    <h2 className="text-xl font-bold text-slate-900">
                        Prescription Not Found
                    </h2>
                    <p className="text-xs text-slate-500">
                        {typeof error === "string" ? error : "The requested prescription record does not exist."}
                    </p>
                    <button
                        onClick={() => navigate(getBackPath())}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 shadow-md transition cursor-pointer"
                    >
                        <ArrowLeft size={16} /> Back to Prescriptions
                    </button>
                </div>
            </div>
        );
    }

    const doctorName = formatDoctorName(
        prescription?.doctor?.user?.fullName || prescription?.doctor?.fullName
    );
    const doctorSpecialization = prescription?.doctor?.specialization || "General Practitioner";
    const doctorHospital = prescription?.doctor?.hospital || "CarePoint Central Clinic";
    const doctorAddress = prescription?.doctor?.clinicalAddress || "Medical Block A";
    const doctorEmail = prescription?.doctor?.user?.email || "N/A";

    const patientName = prescription?.patient?.fullName || "Patient";
    const patientEmail = prescription?.patient?.email || "N/A";

    const issueDate = prescription?.createdAt
        ? new Date(prescription.createdAt).toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "long",
              day: "numeric",
          })
        : "N/A";

    const followUpDate = prescription?.followUpDate
        ? new Date(prescription.followUpDate).toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "long",
              day: "numeric",
          })
        : null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/40 to-emerald-50/30 py-8 px-4 sm:px-6 lg:px-8 text-left">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Top Action Bar (Hidden when printing) */}
                <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
                    <button
                        onClick={() => navigate(getBackPath())}
                        className="flex items-center gap-2 rounded-xl border border-teal-200 bg-white/95 px-4 py-2 text-xs font-bold text-teal-700 hover:bg-teal-50 transition shadow-xs cursor-pointer"
                    >
                        <ArrowLeft size={16} /> Back to Prescriptions
                    </button>

                    <div className="flex items-center gap-2">
                        {isDoctorRole && (
                            <button
                                onClick={() => navigate(`/doctor/prescriptions/${prescription._id}/edit`)}
                                className="flex items-center gap-1.5 rounded-xl border border-teal-200 bg-teal-50 px-4 py-2 text-xs font-bold text-teal-800 hover:bg-teal-100 transition shadow-xs cursor-pointer"
                            >
                                <Edit3 size={15} /> Edit Prescription
                            </button>
                        )}

                        <button
                            onClick={handlePrint}
                            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:from-teal-700 hover:to-emerald-700 transition cursor-pointer"
                        >
                            <Printer size={15} /> Print / Save PDF
                        </button>
                    </div>
                </div>

                {/* Print-Ready Prescription Document Card */}
                <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-6 text-slate-800 print:shadow-none print:border-none print:p-0">

                    {/* Official Rx Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-teal-500/30 pb-6">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <Stethoscope className="text-teal-600" size={24} />
                                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                                    {doctorName}
                                </h1>
                            </div>
                            <p className="text-xs font-semibold text-teal-700">{doctorSpecialization}</p>
                            <p className="text-xs text-slate-500 flex items-center gap-1">
                                <Building size={13} /> {doctorHospital}
                            </p>
                            <p className="text-xs text-slate-500 flex items-center gap-1">
                                <MapPin size={13} /> {doctorAddress}
                            </p>
                        </div>

                        <div className="text-left sm:text-right space-y-1">
                            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-2xl font-black text-white shadow-md">
                                Rx
                            </div>
                            <p className="text-[11px] font-mono text-slate-400 font-bold">
                                Ref: #{prescription._id?.slice(-8).toUpperCase()}
                            </p>
                            <p className="text-xs font-semibold text-slate-600 flex items-center justify-start sm:justify-end gap-1">
                                <Calendar size={13} className="text-teal-600" /> Date: {issueDate}
                            </p>
                        </div>
                    </div>

                    {/* Patient Information Banner */}
                    <div className="rounded-2xl bg-teal-50/40 p-4 border border-teal-100/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="flex items-center gap-2.5">
                            <User className="text-teal-600 shrink-0" size={16} />
                            <div>
                                <p className="text-[10px] font-semibold text-slate-400 uppercase">Patient Name</p>
                                <p className="font-extrabold text-slate-900 text-sm">{patientName}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                            <Mail className="text-teal-600 shrink-0" size={16} />
                            <div>
                                <p className="text-[10px] font-semibold text-slate-400 uppercase">Patient Email</p>
                                <p className="font-bold text-slate-800">{patientEmail}</p>
                            </div>
                        </div>
                    </div>

                    {/* Diagnosis Section */}
                    <div className="space-y-2">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                            <FileText size={15} className="text-teal-600" /> Clinical Diagnosis
                        </h2>
                        <div className="rounded-2xl border border-teal-100 bg-white p-4 text-sm font-bold text-slate-900 shadow-xs">
                            {prescription.diagnosis}
                        </div>
                    </div>

                    {/* Medications Table */}
                    <div className="space-y-3">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                            <Pill size={15} className="text-teal-600" /> Prescribed Medications
                        </h2>

                        {prescription.medications && prescription.medications.length > 0 ? (
                            <div className="overflow-x-auto rounded-2xl border border-teal-100">
                                <table className="w-full text-left text-xs border-collapse">
                                    <thead>
                                        <tr className="bg-teal-50/60 text-teal-800 font-bold border-b border-teal-100">
                                            <th className="p-3">#</th>
                                            <th className="p-3">Medicine Name</th>
                                            <th className="p-3">Dosage</th>
                                            <th className="p-3">Frequency</th>
                                            <th className="p-3">Duration</th>
                                            <th className="p-3">Instructions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-teal-100/60 font-medium text-slate-700">
                                        {prescription.medications.map((med, index) => (
                                            <tr key={index} className="hover:bg-teal-50/20">
                                                <td className="p-3 font-bold text-teal-700">{index + 1}</td>
                                                <td className="p-3 font-bold text-slate-900">{med.medicine}</td>
                                                <td className="p-3">{med.dosage}</td>
                                                <td className="p-3">{med.frequency}</td>
                                                <td className="p-3">{med.duration}</td>
                                                <td className="p-3 italic text-slate-500">{med.instructions || "-"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-xs text-slate-500 italic">No medications listed.</p>
                        )}
                    </div>

                    {/* Recommended Tests */}
                    {prescription.tests && prescription.tests.length > 0 && (
                        <div className="space-y-2">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                                <ClipboardList size={15} className="text-teal-600" /> Recommended Tests & Investigations
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {prescription.tests.map((test, idx) => (
                                    <span
                                        key={idx}
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-teal-50 px-3.5 py-1.5 text-xs font-semibold text-teal-800 border border-teal-200"
                                    >
                                        <CheckCircle2 size={13} className="text-teal-600" /> {test}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Advice / Recommendations */}
                    {prescription.advice && (
                        <div className="space-y-2">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                                <FileText size={15} className="text-teal-600" /> Doctor's Advice & Instructions
                            </h2>
                            <div className="rounded-2xl border border-teal-100 bg-teal-50/20 p-4 text-xs font-medium text-slate-700 italic">
                                "{prescription.advice}"
                            </div>
                        </div>
                    )}

                    {/* Follow-Up Date Banner */}
                    {followUpDate && (
                        <div className="rounded-2xl bg-gradient-to-r from-teal-500/10 to-emerald-500/10 p-4 border border-teal-200/60 flex items-center gap-3">
                            <Calendar className="text-teal-600 shrink-0" size={20} />
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Next Follow-Up Visit</p>
                                <p className="text-sm font-extrabold text-slate-900">{followUpDate}</p>
                            </div>
                        </div>
                    )}

                    {/* Footer Signature Block */}
                    <div className="pt-8 border-t border-slate-200 flex items-end justify-between text-xs">
                        <div className="text-slate-400">
                            <p className="font-semibold text-slate-600">CarePoint Electronic Medical Records System</p>
                            <p>Digitally signed by authorized medical practitioner</p>
                        </div>
                        <div className="text-right space-y-1">
                            <div className="h-10 border-b border-slate-300 w-40 ml-auto" />
                            <p className="font-bold text-slate-900">{doctorName}</p>
                            <p className="text-slate-400">Signature / License Stamp</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PrescriptionDetails;
