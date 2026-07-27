import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
    getPrescriptionById,
    updatePrescription,
} from "../../redux/feature/prescription/prescriptionThunk";
import {
    ArrowLeft,
    Plus,
    Trash2,
    Stethoscope,
    Pill,
    ClipboardList,
    FileText,
    Calendar,
    User,
    CheckCircle2,
    AlertCircle,
    Loader2,
} from "lucide-react";

const EditPrescription = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { prescription, loading, error } = useSelector(
        (state) => state.prescription || {}
    );

    const [diagnosis, setDiagnosis] = useState("");
    const [advice, setAdvice] = useState("");
    const [followUpDate, setFollowUpDate] = useState("");
    const [medications, setMedications] = useState([]);
    const [tests, setTests] = useState([""]);
    const [validationError, setValidationError] = useState("");

    useEffect(() => {
        if (id) {
            dispatch(getPrescriptionById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (prescription) {
            setDiagnosis(prescription.diagnosis || "");
            setAdvice(prescription.advice || "");

            if (prescription.followUpDate) {
                const d = new Date(prescription.followUpDate);
                setFollowUpDate(d.toISOString().split("T")[0]);
            } else {
                setFollowUpDate("");
            }

            if (prescription.medications && prescription.medications.length > 0) {
                setMedications(prescription.medications);
            } else {
                setMedications([
                    { medicine: "", dosage: "", frequency: "", duration: "", instructions: "" },
                ]);
            }

            if (prescription.tests && prescription.tests.length > 0) {
                setTests(prescription.tests);
            } else {
                setTests([""]);
            }
        }
    }, [prescription]);

    const handleAddMedication = () => {
        setMedications([
            ...medications,
            { medicine: "", dosage: "", frequency: "", duration: "", instructions: "" },
        ]);
    };

    const handleRemoveMedication = (index) => {
        if (medications.length === 1) return;
        setMedications(medications.filter((_, i) => i !== index));
    };

    const handleMedicationChange = (index, field, value) => {
        const updated = [...medications];
        updated[index][field] = value;
        setMedications(updated);
    };

    const handleAddTest = () => {
        setTests([...tests, ""]);
    };

    const handleRemoveTest = (index) => {
        setTests(tests.filter((_, i) => i !== index));
    };

    const handleTestChange = (index, value) => {
        const updated = [...tests];
        updated[index] = value;
        setTests(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationError("");

        if (!diagnosis.trim()) {
            setValidationError("Diagnosis is required.");
            return;
        }

        const validMedications = medications.filter(
            (m) => m.medicine.trim() && m.dosage.trim() && m.frequency.trim() && m.duration.trim()
        );

        if (validMedications.length === 0) {
            setValidationError("Please provide at least one complete medication record.");
            return;
        }

        const validTests = tests.map((t) => t.trim()).filter(Boolean);

        const updateData = {
            diagnosis: diagnosis.trim(),
            medications: validMedications,
            tests: validTests,
            advice: advice.trim(),
            followUpDate: followUpDate || undefined,
        };

        try {
            await dispatch(
                updatePrescription({ prescriptionId: id, updateData })
            ).unwrap();
            navigate(`/doctor/prescriptions/${id}`);
        } catch (err) {
            console.error("Failed to update prescription:", err);
        }
    };

    if (loading && !prescription) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/40 to-emerald-50/30 flex items-center justify-center p-8">
                <div className="rounded-3xl border border-teal-100 bg-white/95 p-10 text-center text-teal-700 font-semibold shadow-xl backdrop-blur-xl flex flex-col items-center justify-center gap-3">
                    <Loader2 size={28} className="animate-spin text-teal-600" />
                    <span className="text-sm">Loading prescription details...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 text-left max-w-4xl mx-auto py-4">
            {/* Top Back Nav Button */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => navigate(`/doctor/prescriptions/${id}`)}
                    className="flex items-center gap-2 rounded-xl border border-teal-200 bg-white/95 px-4 py-2 text-xs font-bold text-teal-700 hover:bg-teal-50 transition shadow-xs cursor-pointer"
                >
                    <ArrowLeft size={16} /> Back to Details
                </button>
            </div>

            {/* Header Form Banner */}
            <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 sm:p-8 shadow-xl backdrop-blur-xl space-y-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-100">
                    <Stethoscope size={12} /> Clinical Documentation
                </span>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                    Update Medical Prescription (Rx)
                </h1>
                <p className="text-xs text-slate-500">
                    Modify diagnosis, medications, recommended tests, or follow-up instructions.
                </p>
            </div>

            {/* Error Alerts */}
            {(validationError || error) && (
                <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-600 shadow-xs">
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{validationError || (typeof error === "string" ? error : error?.message || "Failed to update prescription.")}</span>
                </div>
            )}

            {/* Prescription Edit Form */}
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* 1. Diagnosis */}
                <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 shadow-md backdrop-blur-xl space-y-4">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 border-b border-teal-100/80 pb-3">
                        <User size={15} className="text-teal-600" /> Clinical Diagnosis
                    </h2>

                    <div className="space-y-1.5 text-xs">
                        <label className="font-bold text-slate-700">Diagnosis *</label>
                        <input
                            type="text"
                            value={diagnosis}
                            onChange={(e) => setDiagnosis(e.target.value)}
                            required
                            className="w-full rounded-xl border border-teal-100 bg-teal-50/20 p-3 text-xs text-slate-800 outline-none focus:border-teal-500 focus:bg-white transition shadow-xs font-medium"
                        />
                    </div>
                </div>

                {/* 2. Medications */}
                <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 shadow-md backdrop-blur-xl space-y-4">
                    <div className="flex items-center justify-between border-b border-teal-100/80 pb-3">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                            <Pill size={15} className="text-teal-600" /> Prescribed Medications (Rx)
                        </h2>
                        <button
                            type="button"
                            onClick={handleAddMedication}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200/80 hover:bg-teal-100 transition cursor-pointer shadow-xs"
                        >
                            <Plus size={14} /> Add Medicine
                        </button>
                    </div>

                    <div className="space-y-3">
                        {medications.map((med, index) => (
                            <div
                                key={index}
                                className="p-4 rounded-2xl border border-teal-100/80 bg-teal-50/20 space-y-3 relative text-xs"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-lg">
                                        Medicine #{index + 1}
                                    </span>

                                    {medications.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveMedication(index)}
                                            className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                                    <div className="sm:col-span-2 space-y-1">
                                        <label className="font-semibold text-slate-700">Medicine Name *</label>
                                        <input
                                            type="text"
                                            value={med.medicine}
                                            onChange={(e) => handleMedicationChange(index, "medicine", e.target.value)}
                                            required
                                            className="w-full rounded-xl border border-teal-100 bg-white p-2.5 text-xs text-slate-800 outline-none focus:border-teal-500 transition shadow-xs"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="font-semibold text-slate-700">Dosage *</label>
                                        <input
                                            type="text"
                                            value={med.dosage}
                                            onChange={(e) => handleMedicationChange(index, "dosage", e.target.value)}
                                            required
                                            className="w-full rounded-xl border border-teal-100 bg-white p-2.5 text-xs text-slate-800 outline-none focus:border-teal-500 transition shadow-xs"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="font-semibold text-slate-700">Frequency *</label>
                                        <input
                                            type="text"
                                            value={med.frequency}
                                            onChange={(e) => handleMedicationChange(index, "frequency", e.target.value)}
                                            required
                                            className="w-full rounded-xl border border-teal-100 bg-white p-2.5 text-xs text-slate-800 outline-none focus:border-teal-500 transition shadow-xs"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="font-semibold text-slate-700">Duration *</label>
                                        <input
                                            type="text"
                                            value={med.duration}
                                            onChange={(e) => handleMedicationChange(index, "duration", e.target.value)}
                                            required
                                            className="w-full rounded-xl border border-teal-100 bg-white p-2.5 text-xs text-slate-800 outline-none focus:border-teal-500 transition shadow-xs"
                                        />
                                    </div>

                                    <div className="sm:col-span-3 space-y-1">
                                        <label className="font-semibold text-slate-700">Special Instructions</label>
                                        <input
                                            type="text"
                                            value={med.instructions || ""}
                                            onChange={(e) => handleMedicationChange(index, "instructions", e.target.value)}
                                            className="w-full rounded-xl border border-teal-100 bg-white p-2.5 text-xs text-slate-800 outline-none focus:border-teal-500 transition shadow-xs"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Tests & Advice */}
                <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 shadow-md backdrop-blur-xl space-y-4">
                    <div className="flex items-center justify-between border-b border-teal-100/80 pb-3">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                            <ClipboardList size={15} className="text-teal-600" /> Recommended Tests
                        </h2>
                        <button
                            type="button"
                            onClick={handleAddTest}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200/80 hover:bg-teal-100 transition cursor-pointer shadow-xs"
                        >
                            <Plus size={14} /> Add Test
                        </button>
                    </div>

                    <div className="space-y-2">
                        {tests.map((test, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={test}
                                    onChange={(e) => handleTestChange(index, e.target.value)}
                                    placeholder="Test name..."
                                    className="flex-1 rounded-xl border border-teal-100 bg-teal-50/20 p-2.5 text-xs text-slate-800 outline-none focus:border-teal-500 transition shadow-xs"
                                />
                                {tests.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTest(index)}
                                        className="text-rose-500 hover:text-rose-700 p-2 cursor-pointer"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="space-y-1.5 pt-2">
                        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                            <FileText size={14} className="text-teal-600" /> Doctor Advice & Instructions
                        </label>
                        <textarea
                            rows={3}
                            value={advice}
                            onChange={(e) => setAdvice(e.target.value)}
                            className="w-full rounded-xl border border-teal-100 bg-teal-50/20 p-3 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-teal-500 focus:bg-white transition shadow-xs resize-none"
                        />
                    </div>

                    <div className="space-y-1.5 pt-2 w-full sm:w-1/2">
                        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                            <Calendar size={14} className="text-teal-600" /> Follow-Up Date
                        </label>
                        <input
                            type="date"
                            value={followUpDate}
                            onChange={(e) => setFollowUpDate(e.target.value)}
                            className="w-full rounded-xl border border-teal-100 bg-teal-50/20 p-3 text-xs text-slate-800 outline-none focus:border-teal-500 transition shadow-xs cursor-pointer"
                        />
                    </div>
                </div>

                {/* Form Controls */}
                <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={() => navigate(`/doctor/prescriptions/${id}`)}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 border border-slate-200 transition cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 transition shadow-md cursor-pointer disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={16} className="animate-spin" /> Saving...
                            </>
                        ) : (
                            <>
                                <CheckCircle2 size={16} /> Save Changes
                            </>
                        )}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default EditPrescription;