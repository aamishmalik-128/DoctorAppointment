import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    User,
    Mail,
    Phone,
    Calendar,
    MapPin,
    Shield,
} from "lucide-react";

const Profile = () => {
    const navigate = useNavigate();

    const { user } = useSelector((state) => state?.auth || {});

    return (
        <div className="relative min-h-[calc(100vh-5rem)] bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white flex items-center justify-center py-10 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">

            {/* Ambient Background Accents */}
            <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 w-full max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-xl overflow-hidden my-auto">

                {/* Header */}
                <div className="border-b border-slate-800/80 p-8 text-center bg-slate-900/50">

                    {user?.avatar ? (
                        <img
                            src={user.avatar}
                            alt={user.fullName || "User Avatar"}
                            className="mx-auto h-28 w-28 rounded-full border-4 border-teal-500 object-cover shadow-lg shadow-teal-500/20 ring-4 ring-teal-500/20"
                        />
                    ) : (
                        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-5xl font-extrabold text-slate-950 shadow-lg shadow-teal-500/20 ring-4 ring-teal-500/20">
                            {user?.fullName?.charAt(0).toUpperCase() || "U"}
                        </div>
                    )}

                    <h1 className="mt-5 font-heading text-3xl font-extrabold tracking-tight text-white">
                        {user?.fullName || "User Profile"}
                    </h1>

                    <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-teal-500/20 px-4 py-1 text-xs font-bold uppercase tracking-wider text-teal-300 border border-teal-500/30 shadow-sm">
                        {user?.role || "Patient"}
                    </span>

                </div>

                {/* Information */}
                <div className="space-y-4 p-6 sm:p-8">

                    <InfoRow
                        icon={<User size={20} />}
                        label="Full Name"
                        value={user?.fullName}
                    />

                    <InfoRow
                        icon={<Mail size={20} />}
                        label="Email"
                        value={user?.email}
                    />

                    <InfoRow
                        icon={<Phone size={20} />}
                        label="Phone"
                        value={user?.phone || "Not Added"}
                    />

                    <InfoRow
                        icon={<Shield size={20} />}
                        label="Gender"
                        value={user?.gender || "Not Added"}
                    />

                    <InfoRow
                        icon={<Calendar size={20} />}
                        label="Date of Birth"
                        value={user?.dateOfBirth || "Not Added"}
                    />

                    <InfoRow
                        icon={<MapPin size={20} />}
                        label="Address"
                        value={user?.address || "Not Added"}
                    />

                    <InfoRow
                        icon={<Calendar size={20} />}
                        label="Member Since"
                        value={
                            user?.createdAt
                                ? new Date(user.createdAt).toLocaleDateString()
                                : "-"
                        }
                    />

                </div>

                {/* Footer */}
                <div className="border-t border-slate-800/80 p-6 sm:p-8 bg-slate-900/40">

                    <button
                        onClick={() => navigate("/profile/edit")}
                        className="w-full rounded-xl bg-teal-500 py-3.5 font-bold text-slate-950 shadow-md transition-all duration-200 hover:bg-teal-400 active:scale-[0.99] cursor-pointer text-sm sm:text-base flex items-center justify-center gap-2"
                    >
                        Edit Profile
                    </button>

                </div>

            </div>

        </div>
    );
};

const InfoRow = ({ icon, label, value }) => {
    return (
        <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 transition-colors hover:border-teal-500/40 hover:bg-slate-950 shadow-sm">

            <div className="rounded-xl bg-teal-500/15 p-2.5 text-teal-400 shrink-0 border border-teal-500/20">
                {icon}
            </div>

            <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {label}
                </p>

                <p className="mt-0.5 font-medium text-white text-sm sm:text-base">
                    {value}
                </p>
            </div>

        </div>
    );
};

export default Profile;
