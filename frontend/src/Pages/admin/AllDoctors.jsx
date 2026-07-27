import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors, approveDoctor, rejectDoctor } from "../../redux/feature/admin/adminThunk";
import { formatDoctorName } from "../../utils/formatDoctorName";
import Table from "../../components/admin/Table";
import Pagination from "../../components/admin/Pagination";
import SearchBar from "../../components/admin/SearchBar";
import FilterDropdown from "../../components/admin/FilterDropdown";
import LoadingSpinner from "../../components/admin/LoadingSpinner";
import EmptyState from "../../components/admin/EmptyState";
import ConfirmationModal from "../../components/admin/ConfirmationModal";
import {
    Stethoscope,
    CheckCircle2,
    XCircle,
    Clock,
    Check,
    X,
    AlertCircle,
} from "lucide-react";

const AllDoctors = () => {
    const dispatch = useDispatch();

    const {
        doctors = [],
        totalDoctors = 0,
        currentDoctorPage = 1,
        totalDoctorPages = 1,
        loading,
        error,
    } = useSelector((state) => state.admin || {});

    const [statusFilter, setStatusFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [actionMsg, setActionMsg] = useState("");

    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        type: "approve",
        doctorId: null,
        doctorName: "",
    });

    const fetchDoctors = (pageNumber = 1, status = "all") => {
        const params = {
            page: pageNumber,
            limit: 10,
        };
        if (status && status !== "all") {
            params.status = status;
        }
        dispatch(getAllDoctors(params));
    };

    useEffect(() => {
        fetchDoctors(page, statusFilter);
    }, [dispatch, page, statusFilter]);

    const handleFilterChange = (val) => {
        setStatusFilter(val);
        setPage(1);
    };

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
                setActionMsg(`${doctorName} has been approved.`);
            } else {
                await dispatch(rejectDoctor(doctorId)).unwrap();
                setActionMsg(`${doctorName} has been rejected.`);
            }

            setModalConfig({ isOpen: false, type: "approve", doctorId: null, doctorName: "" });
            fetchDoctors(page, statusFilter);
            setTimeout(() => setActionMsg(""), 3500);
        } catch (err) {
            console.error(`Failed to ${type} doctor:`, err);
        }
    };

    const doctorList = Array.isArray(doctors) ? doctors : [];

    // Local search filter by doctor name or specialization
    const filteredDoctors = doctorList.filter((doc) => {
        const name = (doc?.user?.fullName || doc?.fullName || "").toLowerCase();
        const spec = (doc?.specialization || "").toLowerCase();
        const hosp = (doc?.hospital || "").toLowerCase();
        const q = searchQuery.toLowerCase().trim();

        return !q || name.includes(q) || spec.includes(q) || hosp.includes(q);
    });

    const getStatusBadge = (status) => {
        switch (status?.toLowerCase()) {
            case "approved":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100/90 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 border border-emerald-200">
                        <CheckCircle2 size={12} /> Approved
                    </span>
                );
            case "pending":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100/90 px-2.5 py-0.5 text-xs font-semibold text-amber-800 border border-amber-200">
                        <Clock size={12} /> Pending
                    </span>
                );
            case "rejected":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-100/90 px-2.5 py-0.5 text-xs font-semibold text-rose-800 border border-rose-200">
                        <XCircle size={12} /> Rejected
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
        <div className="space-y-6 text-left max-w-6xl mx-auto">
            {/* Header Banner */}
            <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 sm:p-8 shadow-xl backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-100">
                        <Stethoscope size={13} className="text-teal-600" /> Directory Management
                    </span>
                    <h1 className="mt-2 text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                        All Doctor Profiles
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        View registered medical practitioners, update status, or filter by approval state.
                    </p>
                </div>

                {/* Search & Filter Controls */}
                <div className="flex flex-wrap items-center gap-3">
                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search doctor or specialty..."
                    />

                    <FilterDropdown
                        label="Status"
                        value={statusFilter}
                        onChange={handleFilterChange}
                        options={[
                            { label: "All Statuses", value: "all" },
                            { label: "Approved", value: "approved" },
                            { label: "Pending", value: "pending" },
                            { label: "Rejected", value: "rejected" },
                        ]}
                    />
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
                    <span>{typeof error === "string" ? error : error?.message || "Failed to fetch doctors."}</span>
                </div>
            )}

            {/* Table or Loading */}
            {loading ? (
                <LoadingSpinner message="Fetching doctors..." />
            ) : filteredDoctors.length === 0 ? (
                <EmptyState
                    title="No Doctors Found"
                    description="No doctor records match your filter criteria or search query."
                    icon={Stethoscope}
                />
            ) : (
                <div className="space-y-4">
                    <Table headers={["Doctor", "Specialization", "Hospital / Clinic", "Fee", "Status", "Actions"]}>
                        {filteredDoctors.map((doc) => {
                            const name = formatDoctorName(doc?.user?.fullName || doc?.fullName);
                            const email = doc?.user?.email || "No email";
                            const spec = doc?.specialization || "General Practitioner";
                            const hosp = doc?.hospital || "Private Practice";
                            const fee = doc?.consultationFee || 50;

                            return (
                                <tr key={doc._id} className="hover:bg-teal-50/30 transition">
                                    <td className="p-3.5 px-4">
                                        <div className="flex items-center gap-3">
                                            {doc?.user?.avatar || doc?.profileImage ? (
                                                <img
                                                    src={doc?.user?.avatar || doc?.profileImage}
                                                    alt={name}
                                                    className="h-10 w-10 rounded-xl object-cover border border-teal-400 shadow-xs shrink-0"
                                                />
                                            ) : (
                                                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-sm font-bold text-white shadow-xs shrink-0">
                                                    {name.charAt(0)}
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-bold text-slate-900">{name}</p>
                                                <p className="text-[11px] text-slate-400 font-medium">{email}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="p-3.5 px-4 font-semibold text-slate-800">
                                        {spec}
                                    </td>

                                    <td className="p-3.5 px-4 font-medium text-slate-600">
                                        {hosp}
                                    </td>

                                    <td className="p-3.5 px-4 font-bold text-slate-800">
                                        ${fee}
                                    </td>

                                    <td className="p-3.5 px-4">
                                        {getStatusBadge(doc.status)}
                                    </td>

                                    <td className="p-3.5 px-4">
                                        <div className="flex items-center gap-2">
                                            {doc.status !== "approved" && (
                                                <button
                                                    onClick={() => handleOpenModal("approve", doc._id, name)}
                                                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition cursor-pointer"
                                                >
                                                    <Check size={13} /> Approve
                                                </button>
                                            )}

                                            {doc.status !== "rejected" && (
                                                <button
                                                    onClick={() => handleOpenModal("reject", doc._id, name)}
                                                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition cursor-pointer"
                                                >
                                                    <X size={13} /> Reject
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </Table>

                    {/* Pagination */}
                    <Pagination
                        currentPage={currentDoctorPage}
                        totalPages={totalDoctorPages}
                        onPageChange={(newPage) => setPage(newPage)}
                    />
                </div>
            )}

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
                onConfirm={handleConfirmAction}
                title={modalConfig.type === "approve" ? "Approve Doctor Account" : "Reject Doctor Account"}
                message={`Are you sure you want to ${modalConfig.type} ${modalConfig.doctorName}?`}
                confirmText={modalConfig.type === "approve" ? "Approve Doctor" : "Reject Doctor"}
                type={modalConfig.type === "approve" ? "success" : "danger"}
            />
        </div>
    );
};

export default AllDoctors;
