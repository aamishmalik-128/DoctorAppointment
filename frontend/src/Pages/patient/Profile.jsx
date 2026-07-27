import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    User,
    Mail,
    Phone,
    Calendar,
    MapPin,
    Shield,
    KeyRound,
    Edit,
} from "lucide-react";

const Profile = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state?.auth || {});

    return (
        <div className="relative min-h-[calc(100vh-5rem)] bg-gradient-to-br from-slate-50 via-teal-50/60 to-emerald-50 text-slate-800 flex items-center justify-center py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
            {/* Pattern Accent & Ambient Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
            <div className="absolute top-10 left-1/4 h-80 w-80 rounded-full bg-teal-300/25 blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-1/4 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 w-full max-w-2xl rounded-3xl border border-teal-100 bg-white/95 shadow-xl backdrop-blur-xl overflow-hidden text-slate-900 flex flex-col justify-between max-h-[calc(100vh-6rem)] overflow-y-auto">

                {/* Header */}
                <div className="border-b border-teal-100 py-4 px-6 text-center bg-teal-50/30 flex flex-col items-center shrink-0">
                    {user?.avatar ? (
                        <img
                            src={user.avatar}
                            alt={user.fullName || "User Avatar"}
                            className="h-16 w-16 sm:h-18 sm:w-18 rounded-full border-3 border-teal-500 object-cover shadow-md ring-2 ring-teal-500/20"
                        />
                    ) : (
                        <div className="flex h-16 w-16 sm:h-18 sm:w-18 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 text-2xl font-extrabold text-white shadow-md ring-2 ring-teal-500/20">
                            {user?.fullName?.charAt(0).toUpperCase() || "U"}
                        </div>
                    )}

                    <h1 className="mt-2 font-heading text-lg sm:text-xl font-extrabold tracking-tight text-slate-900">
                        {user?.fullName || "User Profile"}
                    </h1>

                    <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-teal-100/80 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-800 border border-teal-200/80 shadow-xs">
                        {user?.role || "Patient"}
                    </span>
                </div>

                {/* Information Grid (2 Columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-4 sm:p-5 overflow-y-auto">
                    <InfoTile
                        icon={<User size={15} />}
                        label="Full Name"
                        value={user?.fullName}
                    />

                    <InfoTile
                        icon={<Mail size={15} />}
                        label="Email"
                        value={user?.email}
                    />

                    <InfoTile
                        icon={<Phone size={15} />}
                        label="Phone"
                        value={user?.phone || "Not Added"}
                    />

                    <InfoTile
                        icon={<Shield size={15} />}
                        label="Gender"
                        value={user?.gender || "Not Added"}
                    />

                    <InfoTile
                        icon={<Calendar size={15} />}
                        label="Date of Birth"
                        value={user?.dateOfBirth ? user.dateOfBirth.split("T")[0] : "Not Added"}
                    />

                    <InfoTile
                        icon={<MapPin size={15} />}
                        label="Address"
                        value={user?.address || "Not Added"}
                    />

                    <div className="sm:col-span-2">
                        <InfoTile
                            icon={<Calendar size={15} />}
                            label="Member Since"
                            value={
                                user?.createdAt
                                    ? new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                                    : "-"
                            }
                        />
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="border-t border-teal-100 p-3.5 sm:p-4 bg-teal-50/20 flex flex-row gap-3 shrink-0">
                    <button
                        onClick={() => navigate("/profile/edit")}
                        className="flex-1 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 py-2.5 px-4 font-bold text-white shadow-md shadow-teal-600/20 transition-all duration-200 active:scale-[0.99] cursor-pointer text-xs sm:text-sm flex items-center justify-center gap-1.5"
                    >
                        <Edit size={15} />
                        Edit Profile
                    </button>

                    <button
                        onClick={() => navigate("/profile/change-password")}
                        className="flex-1 rounded-xl border border-teal-200 bg-white py-2.5 px-4 font-bold text-teal-700 shadow-xs transition-all duration-200 hover:bg-teal-50 active:scale-[0.99] cursor-pointer text-xs sm:text-sm flex items-center justify-center gap-1.5"
                    >
                        <KeyRound size={15} className="text-teal-600" />
                        Change Password
                    </button>
                </div>

            </div>
        </div>
    );
};

const InfoTile = ({ icon, label, value }) => {
    return (
        <div className="flex items-center gap-2.5 rounded-xl border border-teal-100/80 bg-teal-50/30 p-2 sm:p-2.5 transition-colors hover:border-teal-300 hover:bg-white shadow-xs min-w-0">
            <div className="rounded-lg bg-teal-500/10 p-1.5 text-teal-700 shrink-0 border border-teal-200/50">
                {icon}
            </div>

            <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    {label}
                </p>
                <p className="mt-0.5 font-semibold text-slate-900 text-xs sm:text-sm truncate">
                    {value || "Not Provided"}
                </p>
            </div>
        </div>
    );
};

export default Profile;
