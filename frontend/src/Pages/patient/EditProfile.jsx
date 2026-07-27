import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { User, Phone, Calendar, MapPin, Upload, Loader2, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { deleteAvatar, updateUserProfile, updateUserAvatar } from "../../redux/feature/auth/authThunk";

const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        gender: "",
        dateOfBirth: "",
        address: "",
    });

    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName || "",
                phone: user.phone || "",
                gender: user.gender || "",
                dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
                address: user.address || "",
            });

            setPreview(user.avatar || "");
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setAvatar(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");
        setSuccessMsg("");

        try {
            if (avatar) {
                await dispatch(updateUserAvatar(avatar)).unwrap();
            }

            await dispatch(updateUserProfile(formData)).unwrap();

            setSuccessMsg("Profile updated successfully!");
            setTimeout(() => {
                navigate("/profile");
            }, 1000);
        } catch (err) {
            setErrorMsg(typeof err === "string" ? err : err.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAvatar = async () => {
        setLoading(true);
        setErrorMsg("");
        setSuccessMsg("");
        try {
            await dispatch(deleteAvatar()).unwrap();
            setPreview("");
            setAvatar(null);
            setSuccessMsg("Avatar removed successfully!");
        } catch (err) {
            setErrorMsg(typeof err === "string" ? err : err.message || "Failed to remove avatar");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-[calc(100vh-5rem)] bg-gradient-to-br from-slate-50 via-teal-50/60 to-emerald-50 text-slate-800 flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
            {/* Pattern Accent & Ambient Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
            <div className="absolute top-10 left-1/4 h-80 w-80 rounded-full bg-teal-300/25 blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-1/4 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 mx-auto w-full max-w-2xl rounded-3xl border border-teal-100 bg-white/95 shadow-xl backdrop-blur-xl overflow-hidden text-slate-900 flex flex-col justify-between max-h-[calc(100vh-6rem)] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-teal-100 py-3.5 px-6 bg-teal-50/30 shrink-0">
                    <div>
                        <h1 className="text-lg sm:text-xl font-extrabold text-slate-900">Edit Profile</h1>
                        <p className="text-[11px] text-slate-500">
                            Update your personal information and profile picture.
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/profile")}
                        className="flex items-center gap-1.5 rounded-xl border border-teal-200 bg-white px-3 py-1.5 text-xs font-semibold text-teal-700 hover:bg-teal-50 transition shadow-xs cursor-pointer"
                    >
                        <ArrowLeft size={14} /> Back
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 p-4 sm:p-5 overflow-y-auto">
                    {/* Status Feedback Messages */}
                    {errorMsg && (
                        <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-600 font-semibold">
                            <AlertCircle size={16} className="shrink-0" />
                            <span>{errorMsg}</span>
                        </div>
                    )}

                    {successMsg && (
                        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-2.5 text-xs text-emerald-700 font-semibold">
                            <CheckCircle size={16} className="shrink-0" />
                            <span>{successMsg}</span>
                        </div>
                    )}

                    {/* Avatar Upload Header Row */}
                    <div className="flex items-center justify-center gap-3 py-1">
                        {preview ? (
                            <img
                                src={preview}
                                alt="avatar preview"
                                className="h-14 w-14 rounded-full border-2 border-teal-500 object-cover shadow-sm"
                            />
                        ) : (
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 text-xl font-extrabold text-white shadow-sm">
                                {user?.fullName?.charAt(0).toUpperCase() || "U"}
                            </div>
                        )}

                        <div className="flex items-center gap-2">
                            <label className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-teal-200 bg-teal-50/50 px-3 py-1.5 text-xs font-semibold text-teal-700 hover:bg-teal-100 transition shadow-xs">
                                <Upload size={14} className="text-teal-600" />
                                <span>Change Photo</span>
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleImage}
                                />
                            </label>
                            {preview && (
                                <button
                                    type="button"
                                    onClick={handleDeleteAvatar}
                                    className="rounded-xl bg-rose-50 border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-600 hover:text-white transition cursor-pointer"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    </div>

                    {/* 2 Column Form Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {/* Full Name */}
                        <Input
                            icon={<User size={14} />}
                            label="Full Name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />

                        {/* Phone */}
                        <Input
                            icon={<Phone size={14} />}
                            label="Phone Number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+92 300 1234567"
                        />

                        {/* Gender */}
                        <div>
                            <label className="mb-1 block text-[11px] font-bold text-slate-700">
                                Gender
                            </label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-teal-100 bg-teal-50/20 px-3 py-1.5 text-xs text-slate-800 outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20 transition"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* DOB */}
                        <Input
                            icon={<Calendar size={14} />}
                            label="Date of Birth"
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                        />

                        {/* Address */}
                        <div className="sm:col-span-2">
                            <label className="mb-1 flex items-center gap-1 text-[11px] font-bold text-slate-700">
                                <MapPin size={14} className="text-teal-600" />
                                Address
                            </label>
                            <textarea
                                rows={2}
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter your current address"
                                className="w-full rounded-xl border border-teal-100 bg-teal-50/20 px-3 py-1.5 text-xs text-slate-800 outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20 transition resize-none"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 py-2.5 font-bold text-white shadow-md shadow-teal-600/20 transition-all duration-200 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-xs sm:text-sm"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={16} className="animate-spin text-white" />
                                <span>Saving Changes...</span>
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

const Input = ({ icon, label, type = "text", ...props }) => (
    <div>
        <label className="mb-1 flex items-center gap-1 text-[11px] font-bold text-slate-700">
            <span className="text-teal-600">{icon}</span>
            {label}
        </label>
        <input
            type={type}
            {...props}
            className="w-full rounded-xl border border-teal-100 bg-teal-50/20 px-3 py-1.5 text-xs text-slate-800 outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20 transition"
        />
    </div>
);

export default EditProfile;