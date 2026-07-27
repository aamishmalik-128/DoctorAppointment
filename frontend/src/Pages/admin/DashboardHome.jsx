import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardStats } from "../../redux/feature/admin/adminThunk";
import StatCard from "../../components/admin/StatCard";
import LoadingSpinner from "../../components/admin/LoadingSpinner";
import {
    Users,
    Stethoscope,
    UserCheck,
    CheckCircle2,
    XCircle,
    UserX,
    ShieldAlert,
    AlertCircle,
} from "lucide-react";

const DashboardHome = () => {
    const dispatch = useDispatch();
    const { dashboardStats, loading, error } = useSelector(
        (state) => state.admin || {}
    );

    useEffect(() => {
        dispatch(getDashboardStats());
    }, [dispatch]);

    if (loading && !dashboardStats) {
        return <LoadingSpinner message="Fetching admin dashboard statistics..." />;
    }

    const stats = dashboardStats || {};

    return (
        <div className="space-y-6 text-left max-w-6xl mx-auto">
            {/* Header Banner */}
            <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 sm:p-8 shadow-xl backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-100">
                        <ShieldAlert size={13} className="text-teal-600" /> Platform Metrics
                    </span>
                    <h1 className="mt-2 text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                        Admin Overview Dashboard
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Monitor overall platform users, doctor approvals, and account statuses.
                    </p>
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-600 shadow-xs">
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{typeof error === "string" ? error : error?.message || "Failed to load dashboard metrics."}</span>
                </div>
            )}

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard
                    title="Total Registered Users"
                    value={stats.totalUsers ?? 0}
                    icon={<Users size={22} />}
                    subtitle="Includes patients, doctors & admins"
                />

                <StatCard
                    title="Total Doctors"
                    value={stats.totalDoctors ?? 0}
                    icon={<Stethoscope size={22} />}
                    subtitle="All doctor accounts"
                />

                <StatCard
                    title="Pending Doctors"
                    value={stats.pendingDoctors ?? 0}
                    icon={<UserCheck size={22} />}
                    subtitle="Awaiting admin verification"
                />

                <StatCard
                    title="Approved Doctors"
                    value={stats.approvedDoctors ?? 0}
                    icon={<CheckCircle2 size={22} />}
                    subtitle="Active verified medical providers"
                />

                <StatCard
                    title="Rejected Doctors"
                    value={stats.rejectedDoctors ?? 0}
                    icon={<XCircle size={22} />}
                    subtitle="Declined doctor registrations"
                />

                <StatCard
                    title="Blocked Users"
                    value={stats.blockedUsers ?? 0}
                    icon={<UserX size={22} />}
                    subtitle="Accounts restricted by admin"
                />
            </div>
        </div>
    );
};

export default DashboardHome;
