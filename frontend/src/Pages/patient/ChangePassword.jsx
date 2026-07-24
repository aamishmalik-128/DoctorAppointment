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
            }, 1500);
        } catch (err) {
            setErrorMsg(typeof err === "string" ? err : err.message || "Failed to change password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-[calc(100vh-5rem)] bg-slate-950 px-4 py-10 text-white flex items-center justify-center overflow-hidden">
            {/* Ambient Glows */}
            <div className="absolute top-1/4 left-1/3 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800 p-6 sm:p-8">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-teal-500/15 p-2.5 text-teal-400 border border-teal-500/20">
                            <KeyRound size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-extrabold text-white">Change Password</h1>
                            <p className="mt-0.5 text-xs sm:text-sm text-slate-400">
                                Update your account security credentials
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate("/profile")}
                        className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition"
                    >
                        <ArrowLeft size={16} /> Back
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-8">
                    {/* Status Alerts */}
                    {errorMsg && (
                        <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400 shadow-sm">
                            <AlertCircle size={20} className="shrink-0" />
                            <span>{errorMsg}</span>
                        </div>
                    )}

                    {successMsg && (
                        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-400 shadow-sm">
                            <CheckCircle size={20} className="shrink-0" />
                            <span>{successMsg}</span>
                        </div>
                    )}

                    {/* Current Password */}
                    <PasswordInput
                        icon={<Lock size={18} />}
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
                        icon={<KeyRound size={18} />}
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
                        icon={<ShieldCheck size={18} />}
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
                        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2 text-xs">
                            <p className="font-semibold text-slate-400 mb-1">Password Requirements:</p>

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
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 py-3.5 font-bold text-slate-950 transition-all duration-200 hover:bg-teal-400 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-teal-500/20 cursor-pointer"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
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
        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-400">
            {icon}
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
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 pr-11 text-white outline-none focus:border-teal-500 transition text-sm"
            />
            <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3.5 p-1 text-slate-400 hover:text-white transition"
            >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </div>
    </div>
);

const RequirementItem = ({ satisfied, label }) => (
    <div className="flex items-center gap-2">
        <div className={`h-2 w-2 rounded-full ${satisfied ? "bg-teal-400" : "bg-slate-700"}`} />
        <span className={satisfied ? "text-teal-400 font-medium" : "text-slate-500"}>
            {label}
        </span>
    </div>
);

export default ChangePassword;
