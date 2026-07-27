import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    getDoctorAppointments,
    confirmAppointment,
    rejectAppointment,
    completeAppointment,
} from "../../redux/feature/appointment/appointmentThunk";
import {
    Calendar,
    Clock,
    User,
    DollarSign,
    CheckCircle2,
    XCircle,
    Check,
    X,
    Loader2,
    Filter,
    FileText,
    Stethoscope,
    AlertCircle,
    Search,
    ChevronRight,
    Eye,
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

const DoctorAppointments = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { appointments = [], loading, error } = useSelector(
        (state) => state.appointment || {}
    );

    const [activeFilter, setActiveFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [actionMsg, setActionMsg] = useState("");
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
    const [rejectReason, setRejectReason] = useState("");

    useEffect(() => {
        dispatch(getDoctorAppointments());
    }, [dispatch]);

    const handleConfirm = async (e, id) => {
        e.stopPropagation();
        try {
            await dispatch(confirmAppointment(id)).unwrap();
            setActionMsg("Appointment confirmed successfully.");
            dispatch(getDoctorAppointments());
            setTimeout(() => setActionMsg(""), 3000);
        } catch (err) {
            console.error("Failed to confirm appointment:", err);
        }
    };

    const handleComplete = async (e, id) => {
        e.stopPropagation();
        try {
            await dispatch(completeAppointment(id)).unwrap();
            setActionMsg("Appointment marked as completed.");
            dispatch(getDoctorAppointments());
            setTimeout(() => setActionMsg(""), 3000);
        } catch (err) {
            console.error("Failed to complete appointment:", err);
        }
    };

    const handleOpenRejectModal = (e, id) => {
        e.stopPropagation();
        setSelectedAppointmentId(id);
        setRejectReason("");
        setRejectModalOpen(true);
    };

    const handleConfirmReject = async () => {
        if (!selectedAppointmentId) return;

        try {
            await dispatch(
                rejectAppointment({
                    appointmentId: selectedAppointmentId,
                    reason: rejectReason,
                })
            ).unwrap();

            setActionMsg("Appointment rejected.");
            setRejectModalOpen(false);
            dispatch(getDoctorAppointments());
            setTimeout(() => setActionMsg(""), 3000);
        } catch (err) {
            console.error("Failed to reject appointment:", err);
        }
    };

    const appointmentList = Array.isArray(appointments) ? appointments : [];

    // Filter appointments by status & search query
    const filteredAppointments = appointmentList.filter((item) => {
        const matchesStatus =
            activeFilter === "all" ||
            item?.status?.toLowerCase() === activeFilter.toLowerCase();

        const patientName = (item?.patient?.fullName || item?.patient?.name || "").toLowerCase();
        const patientEmail = (item?.patient?.email || "").toLowerCase();
        const query = searchQuery.toLowerCase().trim();

        const matchesSearch =
            !query || patientName.includes(query) || patientEmail.includes(query);

        return matchesStatus && matchesSearch;
    });

    const statusCounts = {
        all: appointmentList.length,
        pending: appointmentList.filter((a) => a.status === "pending").length,
        confirmed: appointmentList.filter((a) => a.status === "confirmed").length,
        completed: appointmentList.filter((a) => a.status === "completed").length,
        cancelled: appointmentList.filter((a) => a.status === "cancelled").length,
    };

    const getStatusBadge = (status) => {
        switch (status?.toLowerCase()) {
            case "confirmed":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100/90 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 border border-emerald-200">
                        <CheckCircle2 size={12} /> Confirmed
                    </span>
                );
            case "pending":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100/90 px-2.5 py-0.5 text-xs font-semibold text-amber-800 border border-amber-200">
                        <Clock size={12} /> Pending
                    </span>
                );
            case "completed":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-teal-100/90 px-2.5 py-0.5 text-xs font-semibold text-teal-800 border border-teal-200">
                        <CheckCircle2 size={12} /> Completed
                    </span>
                );
            case "cancelled":
            case "rejected":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-100/90 px-2.5 py-0.5 text-xs font-semibold text-rose-800 border border-rose-200">
                        <XCircle size={12} /> {status}
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                        {status}
                    </span>
                );
        }
    };

    return (
        <div className="space-y-5 text-left max-w-5xl mx-auto">
            {/* Compact Header */}
            <div className="rounded-2xl border border-teal-100 bg-white/95 px-5 py-4 shadow-sm backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-100">
                        <Stethoscope size={12} /> Clinical Management
                    </span>
                    <h1 className="mt-1 text-lg sm:text-xl font-bold text-slate-800 tracking-tight">
                        Patient Appointments
                    </h1>
                    <p className="text-xs text-slate-500">
                        Review upcoming consultations, confirm requests, or complete finished sessions.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full sm:w-64">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search patient name..."
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-teal-100 bg-teal-50/20 text-slate-800 placeholder-slate-400 outline-none focus:border-teal-500 focus:bg-white transition shadow-xs"
                    />
                </div>
            </div>

            {/* Notification Banners */}
            {actionMsg && (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-700 shadow-xs">
                    <CheckCircle2 size={16} className="shrink-0" />
                    <span>{actionMsg}</span>
                </div>
            )}

            {error && (
                <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-medium text-rose-600 shadow-xs">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{typeof error === "string" ? error : error?.message || "Error loading appointments."}</span>
                </div>
            )}

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatCard title="Total Appointments" value={statusCounts.all} icon={<Calendar size={18} />} />
                <StatCard title="Pending" value={statusCounts.pending} icon={<Clock size={18} />} />
                <StatCard title="Confirmed" value={statusCounts.confirmed} icon={<CheckCircle2 size={18} />} />
                <StatCard title="Completed" value={statusCounts.completed} icon={<Stethoscope size={18} />} />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
                {["all", "pending", "confirmed", "completed", "cancelled"].map((status) => (
                    <button
                        key={status}
                        onClick={() => setActiveFilter(status)}
                        className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition-all cursor-pointer border ${
                            activeFilter === status
                                ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-xs border-transparent"
                                : "bg-white text-slate-600 border-teal-100 hover:bg-teal-50"
                        }`}
                    >
                        {status} ({statusCounts[status] || 0})
                    </button>
                ))}
            </div>

            {/* Appointments List */}
            {loading ? (
                <div className="rounded-2xl border border-teal-100 bg-white/95 p-10 text-center text-teal-700 font-semibold shadow-xs flex flex-col items-center justify-center gap-2">
                    <Loader2 size={22} className="animate-spin text-teal-600" />
                    <span className="text-xs">Fetching appointments...</span>
                </div>
            ) : filteredAppointments.length === 0 ? (
                <div className="rounded-2xl border border-teal-100 bg-white/95 p-10 text-center text-slate-500 shadow-xs space-y-2">
                    <Calendar size={32} className="mx-auto text-teal-400 opacity-60" />
                    <h3 className="text-sm font-bold text-slate-800">
                        No Appointments Found
                    </h3>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                        No appointment matches your search query or status filter.
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredAppointments.map((item) => {
                        const patientName =
                            item?.patient?.fullName || item?.patient?.name || "Patient";
                        const patientEmail = item?.patient?.email || "No email provided";
                        const appointmentDate = item?.appointmentDateTime
                            ? new Date(item.appointmentDateTime).toLocaleDateString("en-US", {
                                  weekday: "short",
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                              })
                            : "N/A";
                        const appointmentTime = item?.appointmentDateTime
                            ? new Date(item.appointmentDateTime).toLocaleTimeString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                              })
                            : "N/A";

                        return (
                            <div
                                key={item._id}
                                onClick={() => navigate(`/doctor/appointments/${item._id}`)}
                                className="rounded-2xl border border-teal-100/90 bg-white/95 p-5 shadow-xs hover:border-teal-300 hover:shadow-md transition-all space-y-3 text-left cursor-pointer group"
                            >
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-teal-100/80 pb-3">
                                    <div className="flex items-center gap-3">
                                        {item?.patient?.avatar ? (
                                            <img
                                                src={item.patient.avatar}
                                                alt={patientName}
                                                className="h-11 w-11 rounded-xl object-cover border border-teal-400 shadow-xs shrink-0"
                                            />
                                        ) : (
                                            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-base font-bold text-white shadow-xs shrink-0">
                                                {patientName.charAt(0).toUpperCase()}
                                            </div>
                                        )}

                                        <div>
                                            <h2 className="text-base font-bold text-slate-800 group-hover:text-teal-700 transition">
                                                {patientName}
                                            </h2>
                                            <p className="text-[11px] text-slate-500 font-medium">
                                                {patientEmail}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 self-end sm:self-center">
                                        {getStatusBadge(item.status)}
                                    </div>
                                </div>

                                {/* Appointment Details Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-teal-50/30 p-3 rounded-xl border border-teal-100/60 text-xs">
                                    <div className="flex items-center gap-2 text-slate-700">
                                        <Calendar size={14} className="text-teal-600 shrink-0" />
                                        <div>
                                            <p className="text-[10px] font-semibold text-slate-400 uppercase">Scheduled Date</p>
                                            <p className="font-bold text-slate-800">{appointmentDate}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-slate-700">
                                        <Clock size={14} className="text-teal-600 shrink-0" />
                                        <div>
                                            <p className="text-[10px] font-semibold text-slate-400 uppercase">Slot Time</p>
                                            <p className="font-bold text-slate-800">{appointmentTime}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-slate-700">
                                        <DollarSign size={14} className="text-teal-600 shrink-0" />
                                        <div>
                                            <p className="text-[10px] font-semibold text-slate-400 uppercase">Consultation Fee</p>
                                            <p className="font-bold text-slate-800">${item.consultationFee || "50"}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Notes & Action Buttons */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-0.5">
                                    {item.notes ? (
                                        <p className="text-xs text-slate-500 italic flex items-center gap-1">
                                            <FileText size={13} className="text-teal-600 shrink-0" />
                                            "{item.notes}"
                                        </p>
                                    ) : (
                                        <div />
                                    )}

                                    <div className="flex items-center gap-2 self-end sm:self-auto">
                                        {item.status === "pending" && (
                                            <>
                                                <button
                                                    onClick={(e) => handleConfirm(e, item._id)}
                                                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 transition cursor-pointer shadow-xs"
                                                >
                                                    <Check size={13} /> Confirm
                                                </button>
                                                <button
                                                    onClick={(e) => handleOpenRejectModal(e, item._id)}
                                                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition cursor-pointer"
                                                >
                                                    <X size={13} /> Reject
                                                </button>
                                            </>
                                        )}

                                        {item.status === "confirmed" && (
                                            <button
                                                onClick={(e) => handleComplete(e, item._id)}
                                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 transition cursor-pointer shadow-xs"
                                            >
                                                <CheckCircle2 size={13} /> Mark Completed
                                            </button>
                                        )}

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/doctor/appointments/${item._id}`);
                                            }}
                                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200/80 hover:bg-teal-100 transition cursor-pointer shadow-xs"
                                        >
                                            <Eye size={13} /> View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Reject Modal */}
            {rejectModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl space-y-3 text-left border border-teal-100">
                        <div className="flex items-center gap-2 text-rose-600">
                            <XCircle size={20} />
                            <h3 className="text-base font-bold text-slate-800">
                                Reject Appointment
                            </h3>
                        </div>

                        <p className="text-xs text-slate-500">
                            Are you sure you want to reject this appointment request?
                        </p>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-700">
                                Reason for Rejection (Optional)
                            </label>
                            <textarea
                                rows={3}
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                                placeholder="State a reason..."
                                className="w-full rounded-xl border border-teal-100 bg-teal-50/20 p-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-teal-500 focus:bg-white transition shadow-xs resize-none"
                            />
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-1">
                            <button
                                onClick={() => setRejectModalOpen(false)}
                                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmReject}
                                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition cursor-pointer shadow-xs"
                            >
                                Confirm Rejection
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorAppointments;