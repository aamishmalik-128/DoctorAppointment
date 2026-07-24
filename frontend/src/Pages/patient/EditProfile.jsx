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
            // 1. Upload avatar if selected
            if (avatar) {
                await dispatch(updateUserAvatar(avatar)).unwrap();
            }

            // 2. Update text profile fields
            await dispatch(updateUserProfile(formData)).unwrap();

            setSuccessMsg("Profile updated successfully!");
            setTimeout(() => {
                navigate("/profile");
            }, 1200);
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
        <div className="min-h-screen bg-slate-950 px-4 py-10 text-white">
            <div className="mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 shadow-xl overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-800 p-6 sm:p-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold">Edit Profile</h1>
                        <p className="mt-1 text-sm text-slate-400">
                            Update your personal information and profile picture.
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/profile")}
                        className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-700 transition"
                    >
                        <ArrowLeft size={16} /> Back
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
                    {/* Status Feedback Messages */}
                    {errorMsg && (
                        <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                            <AlertCircle size={20} className="shrink-0" />
                            <span>{errorMsg}</span>
                        </div>
                    )}

                    {successMsg && (
                        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-400">
                            <CheckCircle size={20} className="shrink-0" />
                            <span>{successMsg}</span>
                        </div>
                    )}

                    {/* Avatar Upload */}
                    <div className="flex flex-col items-center">
                        {preview ? (
                            <img
                                src={preview}
                                alt="avatar preview"
                                className="h-28 w-28 rounded-full border-4 border-teal-500 object-cover shadow-lg"
                            />
                        ) : (
                            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-5xl font-bold text-slate-950 shadow-lg">
                                {user?.fullName?.charAt(0).toUpperCase() || "U"}
                            </div>
                        )}

                        <label className="mt-4 flex cursor-pointer items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-medium hover:bg-slate-700 transition">
                            <Upload size={18} className="text-teal-400" />
                            <span>Change Profile Picture</span>
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
                                    className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm hover:bg-red-700"
                                >
                                    Remove Avatar
                                </button>

                            )}
                    </div>

                    {/* Full Name */}
                    <Input
                        icon={<User size={18} />}
                        label="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />

                    {/* Phone */}
                    <Input
                        icon={<Phone size={18} />}
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 234 567 890"
                    />

                    {/* Gender */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-400">
                            Gender
                        </label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-teal-500 transition"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* DOB */}
                    <Input
                        icon={<Calendar size={18} />}
                        label="Date of Birth"
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                    />

                    {/* Address */}
                    <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-400">
                            <MapPin size={18} />
                            Address
                        </label>
                        <textarea
                            rows={3}
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter your current address"
                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-teal-500 transition"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 py-3.5 font-bold text-slate-950 transition hover:bg-teal-400 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
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
        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-400">
            {icon}
            {label}
        </label>
        <input
            type={type}
            {...props}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-teal-500 transition"
        />
    </div>
);

export default EditProfile;