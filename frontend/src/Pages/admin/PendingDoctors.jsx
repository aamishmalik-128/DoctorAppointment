import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getPendingDoctors,
    approveDoctor,
    rejectDoctor,
} from "../../redux/feature/admin/adminThunk";
import { formatDoctorName } from "../../utils/formatDoctorName";
import LoadingSpinner from "../../components/admin/LoadingSpinner";
import EmptyState from "../../components/admin/EmptyState";
import ConfirmationModal from "../../components/admin/ConfirmationModal";
import {
    UserCheck,
    Check,
    X,
    Stethoscope,
    Building,
    MapPin,
    Mail,
    DollarSign,
    Clock,
    AlertCircle,
    CheckCircle2,
} from "lucide-react";

const PendingDoctors = () => {
    const dispatch = useDispatch();

    const { pendingDoctors = [], loading, error } = useSelector(
        (state) => state.admin || {}
    );

    const [actionMsg, setActionMsg] = useState("");
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        type: "approve", // 'approve' or 'reject'
        doctorId: null,
        doctorName: "",
    });

    useEffect(() => {
        dispatch(getPendingDoctors());
    }, [dispatch]);

    const handleOpenModal = (type, doctorId, doctorName) => {
        setModalConfig({
            isOpen: true,
            type,
            doctorId,
            doctorName,
        });
    };

    const handleConfirmAction = async () => {
        const { type, doctorId, doctorName } = modalConfig;
        if (!doctorId) return;

        try {
            if (type === "approve") {
                await dispatch(approveDoctor(doctorId)).unwrap();
                setActionMsg(`${doctorName} has been approved successfully.`);
            } else {
                await dispatch(rejectDoctor(doctorId)).unwrap();
                setActionMsg(`${doctorName} has been rejected.`);
            }

            setModalConfig({ isOpen: false, type: "approve", doctorId: null, doctorName: "" });
            setTimeout(() => setActionMsg(""), 3500);
        } catch (err) {
            console.error(`Failed to ${type} doctor:`, err);
        }
    };

    const doctorList = Array.isArray(pendingDoctors) ? pendingDoctors : [];

    return (
        <div className="space-y-6 text-left max-w-6xl mx-auto">
            {/* Header Banner */}
            <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 sm:p-8 shadow-xl backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-100">
                        <UserCheck size={13} className="text-teal-600" /> Verification Queue
                    </span>
                    <h1 className="mt-2 text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                        Pending Doctor Approvals
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Review submitted credentials and approve or reject doctor applications.
                    </p>
                </div>

                <div className="flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-2xl border border-amber-200 text-xs font-bold text-amber-800">
                    <Clock size={16} />
                    <span>{doctorList.length} Awaiting Verification</span>
                </div>
            </div>

            {/* Notification Banners */}
            {actionMsg && (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-700 shadow-xs">
                    <CheckCircle2 size={18} className="shrink-0" />
                    <span>{actionMsg}</span>
                </div>
            )}

            {error && (
                <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-600 shadow-xs">
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{typeof error === "string" ? error : error?.message || "Failed to load pending doctors."}</span>
                </div>
            )}

            {/* Content List */}
            {loading ? (
                <LoadingSpinner message="Fetching pending doctor applications..." />
            ) : doctorList.length === 0 ? (
                <EmptyState
                    title="No Pending Applications"
                    description="All doctor applications have been reviewed. There are no pending requests in the queue."
                    icon={CheckCircle2}
                />
            ) : (
                <div className="space-y-4">
                    {doctorList.map((doc) => {
                        const name = formatDoctorName(doc?.user?.fullName || doc?.fullName);
                        const email = doc?.user?.email || "No email provided";
                        const specialization = doc?.specialization || "General Practitioner";
                        const hospital = doc?.hospital || "Private Practice";
                        const address = doc?.clinicalAddress || "Main Clinic";
                        const fee = doc?.consultationFee || 50;

                        return (
                            <div
                                key={doc._id}
                                className="rounded-3xl border border-teal-100 bg-white/95 p-6 shadow-md backdrop-blur-xl space-y-4 hover:border-teal-300 transition-all text-left"
                            >
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-teal-100/80 pb-4">
                                    <div className="flex items-center gap-4">
                                        {doc?.user?.avatar || doc?.profileImage ? (
                                            <img
                                                src={doc?.user?.avatar || doc?.profileImage}
                                                alt={name}
                                                className="h-14 w-14 rounded-2xl object-cover border-2 border-teal-500 shadow-xs shrink-0"
                                            />
                                        ) : (
                                            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-xl font-extrabold text-white shadow-xs shrink-0">
                                                {name.charAt(0)}
                                            </div>
                                        )}

                                        <div>
                                            <h2 className="text-lg font-extrabold text-slate-900">
                                                {name}
                                            </h2>
                                            <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                                                <Mail size={13} /> {email}
                                            </p>
                                        </div>
                                    </div>

                                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 border border-amber-200">
                                        <Clock size={13} /> Pending Verification
                                    </span>
                                </div>

                                {/* Doctor Metadata Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-teal-50/30 p-4 rounded-2xl border border-teal-100/60 text-xs">
                                    <div className="space-y-0.5">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Specialization</p>
                                        <p className="font-extrabold text-slate-800 flex items-center gap-1">
                                            <Stethoscope size={14} className="text-teal-600" /> {specialization}
                                        </p>
                                    </div>

                                    <div className="space-y-0.5">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Hospital / Clinic</p>
                                        <p className="font-extrabold text-slate-800 flex items-center gap-1">
                                            <Building size={14} className="text-teal-600" /> {hospital}
                                        </p>
                                    </div>

                                    <div className="space-y-0.5">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Consultation Fee</p>
                                        <p className="font-extrabold text-slate-800 flex items-center gap-1">
                                            <DollarSign size={14} className="text-teal-600" /> ${fee}
                                        </p>
                                    </div>
                                </div>

                                {/* Address & Action Buttons */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
                                    <p className="text-xs text-slate-500 flex items-center gap-1">
                                        <MapPin size={14} className="text-teal-600 shrink-0" /> {address}
                                    </p>

                                    <div className="flex items-center gap-2 self-end sm:self-auto">
                                        <button
                                            onClick={() => handleOpenModal("reject", doc._id, name)}
                                            className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition cursor-pointer"
                                        >
                                            <X size={15} /> Reject Application
                                        </button>

                                        <button
                                            onClick={() => handleOpenModal("approve", doc._id, name)}
                                            className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 transition shadow-md shadow-teal-600/20 cursor-pointer"
                                        >
                                            <Check size={15} /> Approve Doctor
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
                onConfirm={handleConfirmAction}
                title={modalConfig.type === "approve" ? "Approve Doctor Account" : "Reject Doctor Application"}
                message={
                    modalConfig.type === "approve"
                        ? `Are you sure you want to approve ${modalConfig.doctorName}? They will be granted doctor access immediately.`
                        : `Are you sure you want to reject ${modalConfig.doctorName}?`
                }
                confirmText={modalConfig.type === "approve" ? "Approve Doctor" : "Reject Application"}
                type={modalConfig.type === "approve" ? "success" : "danger"}
            />
        </div>
    );
};

export default PendingDoctors;
