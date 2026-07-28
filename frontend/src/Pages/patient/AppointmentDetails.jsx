import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    getAppointmentById,
    confirmAppointment,
    rejectAppointment,
    completeAppointment,
    cancelAppointment,
} from "../../redux/feature/appointment/appointmentThunk";
import { formatDoctorName } from "../../utils/formatDoctorName";
import {
    Calendar,
    Clock,
    User,
    Mail,
    Phone,
    Wallet,
    ArrowLeft,
    Stethoscope,
    Building,
    MapPin,
    CheckCircle2,
    XCircle,
    FileText,
    Loader2,
    AlertCircle,
    Check,
    X,
    CreditCard,
    RefreshCw,
    MessageSquare,
} from "lucide-react";

// Helper InfoRow component
const InfoRow = ({ icon, title, value }) => {
    return (
        <div className="flex items-start gap-3 text-left">
            {icon && (
                <div className="mt-0.5 text-teal-600 shrink-0">
                    {icon}
                </div>
            )}
            <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {title}
                </p>
                <div className="text-sm font-bold text-slate-800 mt-0.5">
                    {value || "-"}
                </div>
            </div>
        </div>
    );
};

// Helper StatusBadge component
const StatusBadge = ({ status }) => {
    const s = (status || "").toLowerCase();
    switch (s) {
        case "confirmed":
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100/90 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
                    <CheckCircle2 size={13} /> Confirmed
                </span>
            );
        case "pending":
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100/90 px-3 py-1 text-xs font-bold text-amber-800 border border-amber-200">
                    <Clock size={13} /> Pending
                </span>
            );
        case "completed":
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-teal-100/90 px-3 py-1 text-xs font-bold text-teal-800 border border-teal-200">
                    <CheckCircle2 size={13} /> Completed
                </span>
            );
        case "paid":
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100/90 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
                    <CheckCircle2 size={13} /> Paid
                </span>
            );
        case "refunded":
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-purple-100/90 px-3 py-1 text-xs font-bold text-purple-800 border border-purple-200">
                    <RefreshCw size={13} /> Refunded
                </span>
            );
        case "cancelled":
        case "rejected":
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-100/90 px-3 py-1 text-xs font-bold text-rose-800 border border-rose-200">
                    <XCircle size={13} /> {status}
                </span>
            );
        default:
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                    {status || "Unpaid"}
                </span>
            );
    }
};

const AppointmentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { appointment, loading, error } = useSelector(
        (state) => state.appointment || {}
    );

    const { user: currentUser } = useSelector(
        (state) => state.auth || {}
    );

    const [actionMsg, setActionMsg] = useState("");
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const [cancelModalOpen, setCancelModalOpen] = useState(false);
    const [cancelReason, setCancelReason] = useState("");

    useEffect(() => {
        if (id) {
            dispatch(getAppointmentById(id));
        }
    }, [dispatch, id]);

    const handleConfirm = async () => {
        try {
            await dispatch(confirmAppointment(id)).unwrap();
            setActionMsg("Appointment confirmed successfully.");
            dispatch(getAppointmentById(id));
            setTimeout(() => setActionMsg(""), 3000);
        } catch (err) {
            console.error("Failed to confirm appointment:", err);
        }
    };

    const handleComplete = async () => {
        try {
            await dispatch(completeAppointment(id)).unwrap();
            setActionMsg("Appointment marked as completed.");
            dispatch(getAppointmentById(id));
            setTimeout(() => setActionMsg(""), 3000);
        } catch (err) {
            console.error("Failed to complete appointment:", err);
        }
    };

    const handleConfirmReject = async () => {
        try {
            await dispatch(
                rejectAppointment({
                    appointmentId: id,
                    reason: rejectReason,
                })
            ).unwrap();
            setActionMsg("Appointment rejected.");
            setRejectModalOpen(false);
            dispatch(getAppointmentById(id));
            setTimeout(() => setActionMsg(""), 3000);
        } catch (err) {
            console.error("Failed to reject appointment:", err);
        }
    };

    const handleConfirmCancel = async () => {
        try {
            await dispatch(
                cancelAppointment({
                    appointmentId: id,
                    reason: cancelReason,
                })
            ).unwrap();
            setActionMsg("Appointment cancelled successfully.");
            setCancelModalOpen(false);
            dispatch(getAppointmentById(id));
            setTimeout(() => setActionMsg(""), 3000);
        } catch (err) {
            console.error("Failed to cancel appointment:", err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/40 to-emerald-50/30 flex items-center justify-center p-8">
                <div className="rounded-3xl border border-teal-100 bg-white/95 p-10 text-center text-teal-700 font-semibold shadow-xl backdrop-blur-xl flex flex-col items-center justify-center gap-3">
                    <Loader2 size={28} className="animate-spin text-teal-600" />
                    <span className="text-sm">Loading appointment details...</span>
                </div>
            </div>
        );
    }

    if (error || !appointment) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/40 to-emerald-50/30 py-12 px-4 text-left">
                <div className="max-w-2xl mx-auto rounded-3xl border border-teal-100 bg-white/95 p-8 text-center shadow-xl backdrop-blur-xl space-y-4">
                    <AlertCircle size={40} className="mx-auto text-rose-500" />
                    <h2 className="text-xl font-bold text-slate-900">
                        Appointment Not Found
                    </h2>
                    <p className="text-xs text-slate-500">
                        {typeof error === "string" ? error : "The requested appointment record does not exist or has been removed."}
                    </p>
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 shadow-md transition cursor-pointer"
                    >
                        <ArrowLeft size={16} /> Back
                    </button>
                </div>
            </div>
        );
    }

    const patient = appointment.patient || {};
    const doctor = appointment.doctor || {};
    const doctorName = formatDoctorName(doctor?.user?.fullName || doctor?.fullName);

    const isDoctorRole = currentUser?.role === "doctor";

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/40 to-emerald-50/30 py-8 px-4 sm:px-6 lg:px-8 text-left">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center gap-2 rounded-xl border border-teal-100 bg-white px-4 py-2 text-xs font-bold text-teal-800 shadow-xs hover:bg-teal-50 transition cursor-pointer"
                >
                    <ArrowLeft size={18} />
                    Back
                </button>

                {/* Status Banners */}
                {actionMsg && (
                    <div className="mb-6 flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs sm:text-sm font-semibold text-emerald-700 shadow-xs">
                        <CheckCircle2 size={18} className="shrink-0" />
                        <span>{actionMsg}</span>
                    </div>
                )}

                {/* Main 3-Column Layout */}
                <div className="grid gap-6 lg:grid-cols-3">

                    {/* Left Column: Patient Profile Card */}
                    <div className="space-y-6 lg:col-span-1">
                        <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 shadow-xl backdrop-blur-xl text-center">
                            <div className="flex flex-col items-center">
                                {patient.avatar ? (
                                    <img
                                        src={patient.avatar}
                                        alt={patient.fullName}
                                        className="h-24 w-24 rounded-full object-cover border-4 border-teal-500 shadow-md"
                                    />
                                ) : (
                                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-3xl font-extrabold text-white shadow-md">
                                        {(patient.fullName || "P").charAt(0).toUpperCase()}
                                    </div>
                                )}

                                <h2 className="mt-4 text-xl font-extrabold text-slate-900">
                                    {patient.fullName || "Patient"}
                                </h2>

                                <span className="inline-block text-xs font-semibold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100 mt-1">
                                    Patient Profile
                                </span>
                            </div>

                            <div className="mt-6 space-y-4 border-t border-teal-100/80 pt-6">
                                <InfoRow
                                    icon={<Mail size={18} />}
                                    title="Email"
                                    value={patient.email}
                                />
                                <InfoRow
                                    icon={<Phone size={18} />}
                                    title="Phone"
                                    value={patient.phone}
                                />
                                <InfoRow
                                    icon={<User size={18} />}
                                    title="Gender"
                                    value={patient.gender}
                                />
                            </div>
                        </div>

                        {/* Doctor Quick Card */}
                        <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 shadow-xl backdrop-blur-xl text-left space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 border-b border-teal-100/80 pb-3">
                                <Stethoscope size={15} className="text-teal-600" /> Assigned Doctor
                            </h3>

                            <div className="flex items-center gap-3">
                                {doctor?.user?.avatar || doctor?.profileImage ? (
                                    <img
                                        src={doctor?.user?.avatar || doctor?.profileImage}
                                        alt={doctorName}
                                        className="h-12 w-12 rounded-xl object-cover border border-teal-400 shadow-xs shrink-0"
                                    />
                                ) : (
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-lg font-bold text-white shadow-xs shrink-0">
                                        {doctorName.charAt(0)}
                                    </div>
                                )}

                                <div>
                                    <h4 className="text-sm font-bold text-slate-900">{doctorName}</h4>
                                    <p className="text-xs font-semibold text-teal-700">{doctor.specialization || "Medical Practitioner"}</p>
                                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                        <Building size={12} /> {doctor.hospital || "CarePoint Medical"}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate(isDoctorRole ? `/doctor/chat` : `/chat?doctorId=${doctor._id}`)}
                                className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl border border-teal-200 bg-teal-50 hover:bg-teal-100 py-2.5 text-xs font-bold text-teal-800 transition shadow-xs cursor-pointer"
                            >
                                <MessageSquare size={15} />
                                <span>{isDoctorRole ? "Chat with Patient" : "Message Doctor"}</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Appointment Details & Actions */}
                    <div className="space-y-6 lg:col-span-2">

                        {/* Appointment Information Card */}
                        <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 sm:p-8 shadow-xl backdrop-blur-xl space-y-6">
                            <div className="flex items-center justify-between border-b border-teal-100/80 pb-4">
                                <h2 className="text-xl font-extrabold text-slate-900">
                                    Appointment Information
                                </h2>
                                <span className="text-xs font-mono font-bold text-slate-400">
                                    ID: #{appointment._id?.slice(-8).toUpperCase()}
                                </span>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <InfoRow
                                    icon={<Calendar size={18} />}
                                    title="Date"
                                    value={
                                        appointment.appointmentDateTime
                                            ? new Date(appointment.appointmentDateTime).toLocaleDateString("en-US", {
                                                  weekday: "short",
                                                  year: "numeric",
                                                  month: "long",
                                                  day: "numeric",
                                              })
                                            : "-"
                                    }
                                />

                                <InfoRow
                                    icon={<Clock size={18} />}
                                    title="Time"
                                    value={
                                        appointment.appointmentDateTime
                                            ? new Date(appointment.appointmentDateTime).toLocaleTimeString("en-US", {
                                                  hour: "2-digit",
                                                  minute: "2-digit",
                                              })
                                            : "-"
                                    }
                                />

                                <InfoRow
                                    icon={<Wallet size={18} />}
                                    title="Consultation Fee"
                                    value={`Rs. ${appointment.consultationFee || doctor.consultationFee || "500"}`}
                                />

                                <InfoRow
                                    icon={<User size={18} />}
                                    title="Consultation Type"
                                    value={
                                        <span className="capitalize">
                                            {appointment.consultationType || "In-Person"}
                                        </span>
                                    }
                                />

                                <InfoRow
                                    title="Status"
                                    value={<StatusBadge status={appointment.status} />}
                                />

                                <InfoRow
                                    title="Payment Status"
                                    value={<StatusBadge status={appointment.paymentStatus || "Unpaid"} />}
                                />
                            </div>
                        </div>

                        {/* Patient Notes */}
                        <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 sm:p-8 shadow-xl backdrop-blur-xl space-y-4">
                            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                                <FileText size={20} className="text-teal-600" /> Patient Notes
                            </h2>

                            <div className="rounded-2xl border border-teal-100 bg-teal-50/30 p-5 text-sm font-medium text-slate-700 leading-relaxed italic">
                                {appointment.notes ? `"${appointment.notes}"` : "No notes provided for this appointment."}
                            </div>

                            {appointment.cancellationReason && (
                                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-xs font-semibold text-rose-700 space-y-1">
                                    <p className="font-bold flex items-center gap-1.5 text-rose-800">
                                        <XCircle size={15} /> Cancellation / Rejection Reason:
                                    </p>
                                    <p className="italic">"{appointment.cancellationReason}"</p>
                                </div>
                            )}

                            {appointment.paymentStatus === "refunded" && (
                                <div className="rounded-2xl border border-purple-200 bg-purple-50/90 p-5 text-xs text-purple-900 space-y-2 text-left">
                                    <p className="font-bold flex items-center gap-1.5 text-purple-800 text-sm">
                                        <RefreshCw size={16} className="text-purple-600 animate-spin-slow" /> Automatic Refund Processed
                                    </p>
                                    <p className="text-purple-700 font-medium">
                                        A full refund of <span className="font-extrabold text-purple-900">Rs. {appointment.refundAmount || appointment.consultationFee}</span> was automatically processed and credited back to your card.
                                    </p>
                                    {appointment.refundId && (
                                        <p className="text-[11px] font-mono text-purple-600 bg-purple-100/60 px-2.5 py-1 rounded-md inline-block">
                                            Refund ID: {appointment.refundId}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Actions Card */}
                        <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 sm:p-8 shadow-xl backdrop-blur-xl space-y-4">
                            <h2 className="text-xl font-extrabold text-slate-900">
                                Actions
                            </h2>

                            <div className="flex flex-wrap items-center gap-3">
                                {/* Doctor Controls */}
                                {isDoctorRole && appointment.status === "pending" && (
                                    <>
                                        <button
                                            onClick={handleConfirm}
                                            className="flex items-center gap-1.5 px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 transition shadow-md shadow-teal-600/20 cursor-pointer"
                                        >
                                            <Check size={16} /> Confirm Appointment
                                        </button>

                                        <button
                                            onClick={() => setRejectModalOpen(true)}
                                            className="flex items-center gap-1.5 px-6 py-3 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition cursor-pointer"
                                        >
                                            <X size={16} /> Reject Appointment
                                        </button>
                                    </>
                                )}

                                {isDoctorRole && appointment.status === "confirmed" && (
                                    <button
                                        onClick={handleComplete}
                                        className="flex items-center gap-1.5 px-6 py-3 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 transition shadow-md cursor-pointer"
                                    >
                                        <CheckCircle2 size={16} /> Complete Appointment
                                    </button>
                                )}

                                {/* Patient Controls */}
                                {!isDoctorRole && (appointment.paymentStatus === "pending" || appointment.paymentStatus === "unpaid" || !appointment.paymentStatus) && appointment.status !== "cancelled" && appointment.status !== "rejected" && (
                                    <button
                                        onClick={() => navigate(`/payment/${appointment._id}`)}
                                        className="flex items-center gap-1.5 px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 transition shadow-md shadow-teal-600/20 cursor-pointer"
                                    >
                                        <CreditCard size={16} /> Pay Now (Rs. {appointment.consultationFee})
                                    </button>
                                )}

                                {!isDoctorRole && (appointment.status === "pending" || appointment.status === "confirmed") && (
                                    <button
                                        onClick={() => setCancelModalOpen(true)}
                                        className="flex items-center gap-1.5 px-6 py-3 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition cursor-pointer"
                                    >
                                        <XCircle size={16} /> Cancel Appointment
                                    </button>
                                )}

                                {appointment.status === "completed" && (
                                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                                        <CheckCircle2 size={16} /> This appointment has been completed.
                                    </span>
                                )}

                                {appointment.status === "cancelled" && (
                                    <span className="text-xs font-bold text-rose-700 bg-rose-50 px-4 py-2 rounded-xl border border-rose-200 flex items-center gap-1.5">
                                        <XCircle size={16} /> This appointment was cancelled.
                                    </span>
                                )}
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            {/* Reject Modal (Doctor) */}
            {rejectModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
                    <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl space-y-4 text-left border border-teal-100">
                        <div className="flex items-center gap-2 text-rose-600">
                            <XCircle size={22} />
                            <h3 className="text-lg font-bold text-slate-900">
                                Reject Appointment
                            </h3>
                        </div>

                        <p className="text-xs text-slate-500">
                            Are you sure you want to reject this appointment request?
                        </p>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700">
                                Reason for Rejection (Optional)
                            </label>
                            <textarea
                                rows={3}
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                                placeholder="State a reason..."
                                className="w-full rounded-xl border border-teal-100 bg-teal-50/20 p-3 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-teal-500 focus:bg-white transition shadow-xs resize-none"
                            />
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2">
                            <button
                                onClick={() => setRejectModalOpen(false)}
                                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                            >
                                Keep
                            </button>
                            <button
                                onClick={handleConfirmReject}
                                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition cursor-pointer shadow-xs"
                            >
                                Confirm Rejection
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Cancel Modal (Patient) */}
            {cancelModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
                    <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl space-y-4 text-left border border-teal-100">
                        <div className="flex items-center gap-2 text-rose-600">
                            <XCircle size={22} />
                            <h3 className="text-lg font-bold text-slate-900">
                                Cancel Appointment
                            </h3>
                        </div>

                        <p className="text-xs text-slate-500">
                            Are you sure you want to cancel this appointment? This action cannot be undone.
                        </p>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700">
                                Reason for Cancellation (Optional)
                            </label>
                            <textarea
                                rows={3}
                                value={cancelReason}
                                onChange={(e) => setCancelReason(e.target.value)}
                                placeholder="Please provide a reason..."
                                className="w-full rounded-xl border border-teal-100 bg-teal-50/20 p-3 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-teal-500 focus:bg-white transition shadow-xs resize-none"
                            />
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2">
                            <button
                                onClick={() => setCancelModalOpen(false)}
                                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                            >
                                Keep Appointment
                            </button>
                            <button
                                onClick={handleConfirmCancel}
                                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition cursor-pointer shadow-xs"
                            >
                                Confirm Cancellation
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentDetails;