import { useState } from "react";
import { Settings as SettingsIcon, User, Lock, Bell, Save, CheckCircle2 } from "lucide-react";
import { useSelector } from "react-redux";

const Settings = () => {
    const { user } = useSelector((state) => state.auth || {});

    const [formData, setFormData] = useState({
        fullName: user?.fullName || "",
        phone: user?.phone || "",
        specialization: user?.specialization || "General Practitioner",
        fee: user?.fee || 50,
        emailNotifications: true,
        smsNotifications: false,
    });

    const [savedMsg, setSavedMsg] = useState("");

    const handleChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        setSavedMsg("Doctor settings updated successfully!");
        setTimeout(() => setSavedMsg(""), 2500);
    };

    return (
        <div className="space-y-6 text-left max-w-4xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl border border-teal-100 bg-white/95 p-6 shadow-sm backdrop-blur-xl">
                <div>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-100/80 px-3 py-1 text-xs font-bold text-teal-800 border border-teal-200">
                        <SettingsIcon size={14} className="text-teal-600" /> Account Preferences
                    </div>
                    <h1 className="mt-2 text-2xl font-extrabold text-slate-900">
                        Doctor Settings
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                        Manage your professional details, notifications, and account credentials.
                    </p>
                </div>

                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 px-5 py-2.5 font-bold text-white text-xs sm:text-sm shadow-md shadow-teal-600/20 transition cursor-pointer"
                >
                    <Save size={16} />
                    Save Settings
                </button>
            </div>

            {savedMsg && (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 size={16} />
                    <span>{savedMsg}</span>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSave} className="space-y-6">
                {/* Practice Settings */}
                <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 shadow-sm backdrop-blur-xl space-y-4">
                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <User size={16} className="text-teal-600" />
                        Clinical Profile Details
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                                Doctor Name
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-teal-100 bg-teal-50/20 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-teal-500 focus:bg-white transition"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-teal-100 bg-teal-50/20 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-teal-500 focus:bg-white transition"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                                Primary Specialization
                            </label>
                            <input
                                type="text"
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-teal-100 bg-teal-50/20 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-teal-500 focus:bg-white transition"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                                Consultation Fee ($)
                            </label>
                            <input
                                type="number"
                                name="fee"
                                value={formData.fee}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-teal-100 bg-teal-50/20 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-teal-500 focus:bg-white transition"
                            />
                        </div>
                    </div>
                </div>

                {/* Notifications Settings */}
                <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 shadow-sm backdrop-blur-xl space-y-4">
                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <Bell size={16} className="text-teal-600" />
                        Appointment Notifications
                    </h2>

                    <div className="space-y-3">
                        <label className="flex items-center justify-between p-3 rounded-xl border border-teal-100/80 bg-teal-50/20 cursor-pointer">
                            <span className="text-xs font-semibold text-slate-700">Email alerts for new bookings</span>
                            <input
                                type="checkbox"
                                name="emailNotifications"
                                checked={formData.emailNotifications}
                                onChange={handleChange}
                                className="h-4 w-4 rounded text-teal-600 accent-teal-600 cursor-pointer"
                            />
                        </label>

                        <label className="flex items-center justify-between p-3 rounded-xl border border-teal-100/80 bg-teal-50/20 cursor-pointer">
                            <span className="text-xs font-semibold text-slate-700">SMS alerts for cancellations</span>
                            <input
                                type="checkbox"
                                name="smsNotifications"
                                checked={formData.smsNotifications}
                                onChange={handleChange}
                                className="h-4 w-4 rounded text-teal-600 accent-teal-600 cursor-pointer"
                            />
                        </label>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Settings;