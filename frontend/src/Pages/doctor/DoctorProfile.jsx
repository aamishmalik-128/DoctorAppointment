import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDoctorProfile } from "../../redux/feature/doctor/doctorThunk";
import {
    Stethoscope,
    Mail,
    Phone,
    Award,
    Clock,
    DollarSign,
    MapPin,
    ShieldCheck,
    Edit,
    Building,
    Calendar,
    FileText,
} from "lucide-react";
import { formatDoctorName } from "../../utils/formatDoctorName";

const DoctorProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth || {});
    const { doctorProfile, profileCompleted, loading } = useSelector(
        (state) => state.doctor || {}
    );

    useEffect(() => {
        dispatch(getDoctorProfile());
    }, [dispatch]);

    return (
        <div className="space-y-6 text-left max-w-4xl mx-auto">
            {/* Header Card */}
            <div className="relative overflow-hidden rounded-3xl border border-teal-100 bg-white/95 p-6 sm:p-8 shadow-xl backdrop-blur-xl">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    {user?.avatar ? (
                        <img
                            src={user.avatar}
                            alt={user.fullName}
                            className="h-24 w-24 sm:h-28 sm:w-28 rounded-full border-4 border-teal-500 object-cover shadow-lg shadow-teal-600/10 ring-4 ring-teal-500/20 shrink-0"
                        />
                    ) : (
                        <div className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-4xl font-extrabold text-white shadow-lg shadow-teal-600/20 ring-4 ring-teal-500/20 shrink-0">
                            {user?.fullName?.charAt(0).toUpperCase() || "D"}
                        </div>
                    )}

                    <div className="flex-1 text-center sm:text-left space-y-2">
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-100/80 px-3 py-1 text-xs font-bold text-teal-800 border border-teal-200">
                                <Stethoscope size={14} className="text-teal-600" />
                                {doctorProfile?.specialization || "General Practitioner"}
                            </span>

                            <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold border ${
                                profileCompleted
                                    ? "bg-emerald-100/80 text-emerald-800 border-emerald-200"
                                    : "bg-amber-100/80 text-amber-800 border-amber-200"
                            }`}>
                                <ShieldCheck size={14} />
                                {profileCompleted ? "Profile Complete" : "Profile Pending"}
                            </span>
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                            {formatDoctorName(user?.fullName || doctorProfile?.fullName)}
                        </h1>

                        <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
                            {doctorProfile?.bio || "Professional medical practitioner dedicated to providing compassionate patient care and expert clinical diagnostics."}
                        </p>
                    </div>

                    <div className="flex sm:flex-col gap-2 shrink-0 w-full sm:w-auto">
                        <button
                            onClick={() => navigate("/doctor/profile/edit")}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-teal-600/20 transition-all cursor-pointer"
                        >
                            <Edit size={15} />
                            Edit Profile
                        </button>
                        <button
                            onClick={() => navigate("/doctor/availability")}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl border border-teal-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-teal-700 hover:bg-teal-50 transition shadow-xs cursor-pointer"
                        >
                            <Calendar size={15} className="text-teal-600" />
                            Availability
                        </button>
                    </div>
                </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoTile
                    icon={<Mail size={18} />}
                    label="Email Address"
                    value={user?.email}
                />
                <InfoTile
                    icon={<Phone size={18} />}
                    label="Phone Number"
                    value={user?.phone || "Not Provided"}
                />
                <InfoTile
                    icon={<Award size={18} />}
                    label="Qualifications"
                    value={doctorProfile?.qualification || "Not Added"}
                />
                <InfoTile
                    icon={<Clock size={18} />}
                    label="Experience"
                    value={doctorProfile?.experience ? `${doctorProfile.experience} Years` : "Not Added"}
                />
                <InfoTile
                    icon={<DollarSign size={18} />}
                    label="Consultation Fee"
                    value={doctorProfile?.consultationFee || doctorProfile?.fee ? `$${doctorProfile.consultationFee || doctorProfile.fee}` : "Not Added"}
                />
                <InfoTile
                    icon={<Building size={18} />}
                    label="Hospital / Clinic"
                    value={doctorProfile?.hospital || "Not Added"}
                />
                <div className="md:col-span-2">
                    <InfoTile
                        icon={<MapPin size={18} />}
                        label="Clinical Address"
                        value={doctorProfile?.clinicalAddress || doctorProfile?.address || "Not Added"}
                    />
                </div>
            </div>
        </div>
    );
};

const InfoTile = ({ icon, label, value }) => (
    <div className="flex items-center gap-3.5 rounded-2xl border border-teal-100/80 bg-white/95 p-4 shadow-sm backdrop-blur-md hover:border-teal-300 transition-all">
        <div className="rounded-xl bg-teal-500/10 p-2.5 text-teal-700 shrink-0 border border-teal-200/50">
            {icon}
        </div>
        <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                {label}
            </p>
            <p className="mt-0.5 font-semibold text-slate-900 text-sm truncate">
                {value || "Not Provided"}
            </p>
        </div>
    </div>
);

export default DoctorProfile;