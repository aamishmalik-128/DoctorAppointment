import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    createDoctorProfile,
    getDoctorProfile,
    updateDoctorProfile,
} from "../../redux/feature/doctor/doctorThunk";
import ProfileInput from "../../components/doctor/ProfileInput";
import {
    Stethoscope,
    Award,
    Clock,
    DollarSign,
    Building,
    MapPin,
    FileText,
    Save,
    Loader2,
    Sparkles,
    CheckCircle2,
    AlertCircle,
    ArrowLeft,
} from "lucide-react";
import { formatDoctorName } from "../../utils/formatDoctorName";

const DoctorEditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth || {});
    const {
        doctorProfile,
        profileCompleted,
        loading,
        error,
    } = useSelector((state) => state.doctor || {});

    const [formData, setFormData] = useState({
        specialization: "",
        qualification: "",
        experience: "",
        consultationFee: "",
        hospital: "",
        clinicalAddress: "",
        bio: "",
    });

    const [statusMsg, setStatusMsg] = useState("");

    useEffect(() => {
        dispatch(getDoctorProfile());
    }, [dispatch]);

    useEffect(() => {
        if (doctorProfile) {
            setFormData({
                specialization: doctorProfile.specialization || "",
                qualification: doctorProfile.qualification || "",
                experience: doctorProfile.experience || "",
                consultationFee: doctorProfile.consultationFee || doctorProfile.fee || "",
                hospital: doctorProfile.hospital || "",
                clinicalAddress: doctorProfile.clinicalAddress || doctorProfile.address || "",
                bio: doctorProfile.bio || "",
            });
        }
    }, [doctorProfile]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMsg("");

        try {
            if (profileCompleted) {
                await dispatch(updateDoctorProfile(formData)).unwrap();
                setStatusMsg("Doctor profile updated successfully!");
            } else {
                await dispatch(createDoctorProfile(formData)).unwrap();
                setStatusMsg("Doctor profile created successfully!");
            }

            await dispatch(getDoctorProfile()).unwrap();
            setTimeout(() => {
                navigate("/doctor/profile");
            }, 1200);
        } catch (err) {
            console.error("Profile submission error:", err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 text-left">
            {/* Header Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl border border-teal-100 bg-white/95 p-6 shadow-sm backdrop-blur-xl">
                <div>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-100/80 px-3 py-1 text-xs font-bold text-teal-800 border border-teal-200">
                        <Stethoscope size={14} className="text-teal-600" />
                        {profileCompleted ? "Edit Doctor Credentials" : "Setup Doctor Profile"}
                    </div>
                    <h1 className="mt-2 text-2xl font-extrabold text-slate-900">
                        {profileCompleted ? `Edit Profile - ${formatDoctorName(user?.fullName)}` : "Create Professional Profile"}
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                        Update your clinical details, qualifications, pricing, and hospital affiliations.
                    </p>
                </div>

                <button
                    onClick={() => navigate("/doctor/profile")}
                    className="flex items-center gap-1.5 rounded-xl border border-teal-200 bg-white px-4 py-2 text-xs font-semibold text-teal-700 hover:bg-teal-50 transition shadow-xs cursor-pointer"
                >
                    <ArrowLeft size={16} /> Back to Profile
                </button>
            </div>

            {/* Alert Messages */}
            {statusMsg && (
                <div className="flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs sm:text-sm font-semibold text-emerald-700 shadow-xs">
                    <CheckCircle2 size={18} className="shrink-0" />
                    <span>{statusMsg}</span>
                </div>
            )}

            {error && (
                <div className="flex items-center gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs sm:text-sm font-semibold text-rose-600 shadow-xs">
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{typeof error === "string" ? error : error?.message || "Failed to save profile."}</span>
                </div>
            )}

            {/* Form Container */}
            <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 sm:p-8 shadow-xl backdrop-blur-xl">
                <div className="flex items-center gap-2 border-b border-teal-100/80 pb-4 mb-6">
                    <Sparkles size={18} className="text-teal-600" />
                    <h2 className="text-lg font-extrabold text-slate-900">
                        Practitioner Information
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                        <ProfileInput
                            icon={<Stethoscope size={15} />}
                            label="Specialization"
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleChange}
                            placeholder="e.g. Cardiology, Pediatrics"
                            required
                        />

                        <ProfileInput
                            icon={<Award size={15} />}
                            label="Qualification"
                            name="qualification"
                            value={formData.qualification}
                            onChange={handleChange}
                            placeholder="e.g. MBBS, MD, FCPS"
                            required
                        />

                        <ProfileInput
                            icon={<Clock size={15} />}
                            label="Experience (Years)"
                            name="experience"
                            type="number"
                            value={formData.experience}
                            onChange={handleChange}
                            placeholder="e.g. 8"
                            required
                        />

                        <ProfileInput
                            icon={<DollarSign size={15} />}
                            label="Consultation Fee ($)"
                            name="consultationFee"
                            type="number"
                            value={formData.consultationFee}
                            onChange={handleChange}
                            placeholder="e.g. 50"
                            required
                        />

                        <ProfileInput
                            icon={<Building size={15} />}
                            label="Hospital / Clinic Name"
                            name="hospital"
                            value={formData.hospital}
                            onChange={handleChange}
                            placeholder="e.g. CarePoint Medical Center"
                        />

                        <ProfileInput
                            icon={<MapPin size={15} />}
                            label="Clinical Address"
                            name="clinicalAddress"
                            value={formData.clinicalAddress}
                            onChange={handleChange}
                            placeholder="e.g. Suite 402, Medical Complex"
                        />
                    </div>

                    {/* Bio Field */}
                    <div className="space-y-1.5 text-left pt-2">
                        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                            <FileText size={15} className="text-teal-600" />
                            Professional Bio
                        </label>
                        <textarea
                            rows={4}
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Write a brief overview of your clinical background, medical expertise, and patient care philosophy..."
                            className="w-full rounded-xl border border-teal-100 bg-teal-50/20 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20 transition-all shadow-xs resize-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 py-3.5 px-6 font-bold text-white shadow-lg shadow-teal-600/20 transition-all duration-200 active:scale-[0.99] disabled:opacity-60 cursor-pointer text-xs sm:text-sm mt-4"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={18} className="animate-spin text-white" />
                                <span>Saving Doctor Profile...</span>
                            </>
                        ) : (
                            <>
                                <Save size={18} />
                                <span>{profileCompleted ? "Update Doctor Profile" : "Create Doctor Profile"}</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DoctorEditProfile;