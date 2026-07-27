import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, blockUser, unblockUser } from "../../redux/feature/admin/adminThunk";
import Table from "../../components/admin/Table";
import Pagination from "../../components/admin/Pagination";
import SearchBar from "../../components/admin/SearchBar";
import FilterDropdown from "../../components/admin/FilterDropdown";
import LoadingSpinner from "../../components/admin/LoadingSpinner";
import EmptyState from "../../components/admin/EmptyState";
import ConfirmationModal from "../../components/admin/ConfirmationModal";
import {
    Users,
    UserCheck,
    UserX,
    Lock,
    Unlock,
    CheckCircle2,
    AlertCircle,
    Shield,
} from "lucide-react";

const AllUsers = () => {
    const dispatch = useDispatch();

    const {
        users = [],
        totalUsers = 0,
        currentUserPage = 1,
        totalUserPages = 1,
        loading,
        error,
    } = useSelector((state) => state.admin || {});

    const { user: currentUser } = useSelector((state) => state.auth || {});

    const [roleFilter, setRoleFilter] = useState("all");
    const [blockedFilter, setBlockedFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [actionMsg, setActionMsg] = useState("");

    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        type: "block", // 'block' or 'unblock'
        userId: null,
        userName: "",
    });

    const fetchUsers = (pageNumber = 1, role = "all", isBlocked = "all") => {
        const params = {
            page: pageNumber,
            limit: 10,
        };
        if (role && role !== "all") {
            params.role = role;
        }
        if (isBlocked && isBlocked !== "all") {
            params.isBlocked = isBlocked === "blocked" ? "true" : "false";
        }
        dispatch(getAllUsers(params));
    };

    useEffect(() => {
        fetchUsers(page, roleFilter, blockedFilter);
    }, [dispatch, page, roleFilter, blockedFilter]);

    const handleRoleFilterChange = (val) => {
        setRoleFilter(val);
        setPage(1);
    };

    const handleBlockedFilterChange = (val) => {
        setBlockedFilter(val);
        setPage(1);
    };

    const handleOpenModal = (type, userId, userName) => {
        setModalConfig({
            isOpen: true,
            type,
            userId,
            userName,
        });
    };

    const handleConfirmAction = async () => {
        const { type, userId, userName } = modalConfig;
        if (!userId) return;

        try {
            if (type === "block") {
                await dispatch(blockUser(userId)).unwrap();
                setActionMsg(`${userName} has been blocked.`);
            } else {
                await dispatch(unblockUser(userId)).unwrap();
                setActionMsg(`${userName} has been unblocked.`);
            }

            setModalConfig({ isOpen: false, type: "block", userId: null, userName: "" });
            fetchUsers(page, roleFilter, blockedFilter);
            setTimeout(() => setActionMsg(""), 3500);
        } catch (err) {
            console.error(`Failed to ${type} user:`, err);
        }
    };

    const userList = Array.isArray(users) ? users : [];

    // Local search filter by name or email
    const filteredUsers = userList.filter((u) => {
        const name = (u?.fullName || "").toLowerCase();
        const email = (u?.email || "").toLowerCase();
        const q = searchQuery.toLowerCase().trim();

        return !q || name.includes(q) || email.includes(q);
    });

    const getRoleBadge = (role) => {
        switch (role?.toLowerCase()) {
            case "admin":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-bold text-purple-800 border border-purple-200">
                        <Shield size={12} /> Admin
                    </span>
                );
            case "doctor":
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-bold text-teal-800 border border-teal-200">
                        Doctor
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-700">
                        Patient
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
                        <Users size={13} className="text-teal-600" /> Account Management
                    </span>
                    <h1 className="mt-2 text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                        User Accounts Management
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        View registered patient & doctor user accounts, update role permissions, or block/unblock access.
                    </p>
                </div>

                {/* Controls */}
                <div className="flex flex-wrap items-center gap-3">
                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search name or email..."
                    />

                    <FilterDropdown
                        label="Role"
                        value={roleFilter}
                        onChange={handleRoleFilterChange}
                        options={[
                            { label: "All Roles", value: "all" },
                            { label: "Patient", value: "patient" },
                            { label: "Doctor", value: "doctor" },
                            { label: "Admin", value: "admin" },
                        ]}
                    />

                    <FilterDropdown
                        label="Status"
                        value={blockedFilter}
                        onChange={handleBlockedFilterChange}
                        options={[
                            { label: "All Statuses", value: "all" },
                            { label: "Active", value: "active" },
                            { label: "Blocked", value: "blocked" },
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
                    <span>{typeof error === "string" ? error : error?.message || "Failed to fetch users."}</span>
                </div>
            )}

            {/* Table or Loading */}
            {loading ? (
                <LoadingSpinner message="Fetching user accounts..." />
            ) : filteredUsers.length === 0 ? (
                <EmptyState
                    title="No Users Found"
                    description="No user accounts match your filter criteria or search query."
                    icon={Users}
                />
            ) : (
                <div className="space-y-4">
                    <Table headers={["User Profile", "Email Address", "Role", "Account Status", "Actions"]}>
                        {filteredUsers.map((u) => {
                            const isSelf = u._id === currentUser?._id;
                            const isBlocked = u.isBlocked;

                            return (
                                <tr key={u._id} className="hover:bg-teal-50/30 transition">
                                    <td className="p-3.5 px-4">
                                        <div className="flex items-center gap-3">
                                            {u.avatar ? (
                                                <img
                                                    src={u.avatar}
                                                    alt={u.fullName}
                                                    className="h-10 w-10 rounded-xl object-cover border border-teal-400 shadow-xs shrink-0"
                                                />
                                            ) : (
                                                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-sm font-bold text-white shadow-xs shrink-0">
                                                    {(u.fullName || "U").charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-bold text-slate-900 flex items-center gap-1.5">
                                                    {u.fullName}
                                                    {isSelf && (
                                                        <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.2 rounded font-bold">You</span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="p-3.5 px-4 font-medium text-slate-600">
                                        {u.email}
                                    </td>

                                    <td className="p-3.5 px-4">
                                        {getRoleBadge(u.role)}
                                    </td>

                                    <td className="p-3.5 px-4">
                                        {isBlocked ? (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-semibold text-rose-800 border border-rose-200">
                                                <UserX size={12} /> Blocked
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 border border-emerald-200">
                                                <UserCheck size={12} /> Active
                                            </span>
                                        )}
                                    </td>

                                    <td className="p-3.5 px-4">
                                        {isSelf || u.role === "admin" ? (
                                            <span className="text-xs text-slate-400 font-semibold italic">Protected</span>
                                        ) : isBlocked ? (
                                            <button
                                                onClick={() => handleOpenModal("unblock", u._id, u.fullName)}
                                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition cursor-pointer"
                                            >
                                                <Unlock size={13} /> Unblock
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleOpenModal("block", u._id, u.fullName)}
                                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition cursor-pointer"
                                            >
                                                <Lock size={13} /> Block User
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </Table>

                    {/* Pagination */}
                    <Pagination
                        currentPage={currentUserPage}
                        totalPages={totalUserPages}
                        onPageChange={(newPage) => setPage(newPage)}
                    />
                </div>
            )}

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
                onConfirm={handleConfirmAction}
                title={modalConfig.type === "block" ? "Block User Account" : "Unblock User Account"}
                message={`Are you sure you want to ${modalConfig.type} ${modalConfig.userName}?`}
                confirmText={modalConfig.type === "block" ? "Block Account" : "Unblock Account"}
                type={modalConfig.type === "block" ? "danger" : "success"}
            />
        </div>
    );
};

export default AllUsers;
