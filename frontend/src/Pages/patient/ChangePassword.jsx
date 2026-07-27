import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, KeyRound, ShieldCheck, ArrowLeft, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { changePassword } from "../../redux/feature/auth/authThunk";

const ChangePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleChange = (e) => {
        setPasswords({
            ...passwords,
            [e.target.name]: e.target.value,
        });
    };

    const isMinLength = passwords.newPassword.length >= 6;
    const isMatching = passwords.newPassword.length > 0 && passwords.newPassword === passwords.confirmPassword;
    const isDifferentFromCurrent = passwords.newPassword.length > 0 && passwords.newPassword !== passwords.currentPassword;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        if (!passwords.currentPassword) {
            setErrorMsg("Please enter your current password.");
            return;
        }

        if (!isMinLength) {
            setErrorMsg("New password must be at least 6 characters long.");
            return;
        }

        if (!isMatching) {
            setErrorMsg("New password and confirm password do not match.");
            return;
        }

        if (passwords.currentPassword === passwords.newPassword) {
            setErrorMsg("New password cannot be the same as your current password.");
            return;
        }

        setLoading(true);

        try {
            await dispatch(changePassword({
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword,
                confirmPassword: passwords.confirmPassword,
            })).unwrap();

            setSuccessMsg("Password changed successfully! Redirecting...");
            setPasswords({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

            setTimeout(() => {
                navigate("/profile");
            }, 1200);
        } catch (err) {
            setErrorMsg(typeof err === "string" ? err : err.message || "Failed to change password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative h-[calc(100vh-5rem)] min-h-[550px] bg-gradient-to-br from-slate-50 via-teal-50/60 to-emerald-50 px-4 py-6 text-slate-800 flex items-center justify-center overflow-hidden">
            {/* Pattern Accent & Ambient Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
            <div className="absolute top-10 left-1/4 h-80 w-80 rounded-full bg-teal-300/25 blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-1/4 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 w-full max-w-lg rounded-3xl border border-teal-100 bg-white/95 shadow-xl backdrop-blur-xl overflow-hidden text-slate-900 my-auto flex flex-col justify-between">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-teal-100 py-4 px-6 bg-teal-50/30">
                    <div className="flex items-center gap-2.5">
                        <div className="rounded-xl bg-teal-500/10 p-2 text-teal-700 border border-teal-200/50">
                            <KeyRound size={20} />
                        </div>
                        <div>
                            <h1 className="text-xl font-extrabold text-slate-900">Change Password</h1>
                            <p className="text-xs text-slate-500">
                                Update account security credentials
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate("/profile")}
                        className="flex items-center gap-1.5 rounded-xl border border-teal-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-teal-700 hover:bg-teal-50 transition shadow-xs cursor-pointer"
                    >
                        <ArrowLeft size={14} /> Back
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5 p-5 sm:p-6">
                    {/* Status Alerts */}
                    {errorMsg && (
                        <div className="flex items-center gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-600 font-semibold shadow-xs">
                            <AlertCircle size={16} className="shrink-0" />
                            <span>{errorMsg}</span>
                        </div>
                    )}

                    {successMsg && (
                        <div className="flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-2.5 text-xs text-emerald-700 font-semibold shadow-xs">
                            <CheckCircle size={16} className="shrink-0" />
                            <span>{successMsg}</span>
                        </div>
                    )}

                    {/* Current Password */}
                    <PasswordInput
                        icon={<Lock size={16} />}
                        label="Current Password"
                        name="currentPassword"
                        value={passwords.currentPassword}
                        onChange={handleChange}
                        show={showCurrent}
                        setShow={setShowCurrent}
                        placeholder="Enter current password"
                        required
                    />

                    {/* New Password */}
                    <PasswordInput
                        icon={<KeyRound size={16} />}
                        label="New Password"
                        name="newPassword"
                        value={passwords.newPassword}
                        onChange={handleChange}
                        show={showNew}
                        setShow={setShowNew}
                        placeholder="Enter new password (min. 6 chars)"
                        required
                    />

                    {/* Confirm New Password */}
                    <PasswordInput
                        icon={<ShieldCheck size={16} />}
                        label="Confirm New Password"
                        name="confirmPassword"
                        value={passwords.confirmPassword}
                        onChange={handleChange}
                        show={showConfirm}
                        setShow={setShowConfirm}
                        placeholder="Re-enter new password"
                        required
                    />

                    {/* Password Requirement Checks */}
                    {passwords.newPassword && (
                        <div className="rounded-xl border border-teal-100 bg-teal-50/30 p-3 space-y-1.5 text-xs">
                            <p className="font-semibold text-slate-700 mb-0.5">Password Requirements:</p>

                            <RequirementItem
                                satisfied={isMinLength}
                                label="At least 6 characters long"
                            />
                            <RequirementItem
                                satisfied={isDifferentFromCurrent}
                                label="Different from current password"
                            />
                            <RequirementItem
                                satisfied={isMatching}
                                label="New passwords match"
                            />
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 py-2.5 font-bold text-white transition-all duration-200 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-teal-600/20 cursor-pointer text-xs sm:text-sm"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={16} className="animate-spin text-white" />
                                <span>Updating Password...</span>
                            </>
                        ) : (
                            "Update Password"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

const PasswordInput = ({
    icon,
    label,
    name,
    value,
    onChange,
    show,
    setShow,
    placeholder,
    ...props
}) => (
    <div>
        <label className="mb-1 flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <span className="text-teal-600">{icon}</span>
            {label}
        </label>

        <div className="relative flex items-center">
            <input
                type={show ? "text" : "password"}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                {...props}
                className="w-full rounded-xl border border-teal-100 bg-teal-50/20 px-3 py-2 pr-10 text-slate-800 outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20 transition text-xs sm:text-sm"
            />
            <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 p-1 text-slate-400 hover:text-teal-600 transition cursor-pointer"
            >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
        </div>
    </div>
);

const RequirementItem = ({ satisfied, label }) => (
    <div className="flex items-center gap-2">
        <div className={`h-1.5 w-1.5 rounded-full ${satisfied ? "bg-teal-600" : "bg-slate-300"}`} />
        <span className={satisfied ? "text-teal-700 font-semibold" : "text-slate-500"}>
            {label}
        </span>
    </div>
);

export default ChangePassword;
