import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, Clock, Save, CheckCircle2, AlertCircle, Loader2, Plus, Trash2, Coffee } from "lucide-react";
import { getDoctorAvailability, updateDoctorAvailability } from "../../redux/feature/doctor/doctorThunk";
import { useNavigate } from "react-router-dom";

const ALL_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Availability = () => {
    const dispatch = useDispatch();
    const { availability, loading, error } = useSelector((state) => state.doctor || {});
    const navigate = useNavigate();
    // Local schedule array state: [{ day: "Monday", startTime: "09:00", endTime: "17:00", breakStart: "", breakEnd: "" }]
    const [schedule, setSchedule] = useState([]);
    const [statusMsg, setStatusMsg] = useState("");

    // 1. Fetch current availability on mount
    useEffect(() => {
        dispatch(getDoctorAvailability());
    }, [dispatch]);

    // 2. Load existing availability from Redux store
    useEffect(() => {
        if (availability && Array.isArray(availability)) {
            setSchedule(
                availability.map((item) => ({
                    day: item.day,
                    startTime: item.startTime || "09:00",
                    endTime: item.endTime || "17:00",
                    breakStart: item.breakStart || "",
                    breakEnd: item.breakEnd || "",
                }))
            );
        }
    }, [availability]);

    // Toggle a day on/off
    const toggleDay = (day) => {
        const exists = schedule.some((item) => item.day === day);
        if (exists) {
            setSchedule(schedule.filter((item) => item.day !== day));
        } else {
            setSchedule([
                ...schedule,
                {
                    day,
                    startTime: "09:00",
                    endTime: "17:00",
                    breakStart: "",
                    breakEnd: "",
                },
            ]);
        }
    };

    // Update field for a specific day
    const updateDayField = (day, field, value) => {
        setSchedule(
            schedule.map((item) => {
                if (item.day === day) {
                    return { ...item, [field]: value };
                }
                return item;
            })
        );
    };

    // Save schedule to backend API
    const handleSave = async () => {
        setStatusMsg("");

        try {
            // Sort by day order
            const sortedSchedule = ALL_DAYS.filter((d) =>
                schedule.some((item) => item.day === d)
            ).map((d) => schedule.find((item) => item.day === d));

            await dispatch(
                updateDoctorAvailability({ availability: sortedSchedule })
            ).unwrap();

            setStatusMsg("Doctor availability schedule updated successfully!");
            setTimeout(() => setStatusMsg(""), 4000);
        } catch (err) {
            console.error("Failed to save availability:", err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 text-left">
            {/* Header Card */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl border border-teal-100 bg-white/95 p-6 shadow-sm backdrop-blur-xl">
                <div>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-100/80 px-3 py-1 text-xs font-bold text-teal-800 border border-teal-200">
                        <Calendar size={14} className="text-teal-600" /> Practitioner Schedule
                    </div>
                    <h1 className="mt-2 text-2xl font-extrabold text-slate-900">
                        Manage Availability & Slots
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                        Set your active consulting days, office hours, and break periods for patient bookings.
                    </p>
                </div>

                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 px-5 py-2.5 font-bold text-white text-xs sm:text-sm shadow-md shadow-teal-600/20 transition cursor-pointer disabled:opacity-60 shrink-0"
                >
                    {loading ? (
                        <>
                            <Loader2 size={16} className="animate-spin text-white" />
                            <span>Saving...</span>
                        </>
                    ) : (
                        <>
                            <Save size={16} />
                            <span>Save Availability</span>
                        </>
                    )}
                </button>
            </div>

            {/* Status Alert Banners */}
            {statusMsg && (
                <div className="flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs sm:text-sm font-semibold text-emerald-700 shadow-xs">
                    <CheckCircle2 size={18} className="shrink-0" />
                    <span>{statusMsg}</span>
                </div>
            )}

            {error && (
                <div className="flex items-center gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs sm:text-sm font-semibold text-rose-600 shadow-xs">
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{typeof error === "string" ? error : error?.message || "Failed to update availability schedule."}</span>
                </div>
            )}

            {/* Days Selection Buttons */}
            <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 shadow-sm backdrop-blur-xl space-y-3">
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Select Active Working Days
                </h2>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                    {ALL_DAYS.map((day) => {
                        const isSelected = schedule.some((item) => item.day === day);
                        return (
                            <button
                                key={day}
                                onClick={() => toggleDay(day)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                                    isSelected
                                        ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white border-transparent shadow-sm"
                                        : "bg-teal-50/40 text-slate-600 border-teal-100 hover:bg-teal-100/60"
                                }`}
                            >
                                {day}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Configured Days List */}
            <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 shadow-sm backdrop-blur-xl space-y-4">
                <div className="flex items-center justify-between border-b border-teal-100/80 pb-3">
                    <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <Clock size={16} className="text-teal-600" />
                        Daily Hours & Break Configurations
                    </h2>
                    <span className="text-xs text-slate-500 font-semibold">
                        {schedule.length} Day(s) Selected
                    </span>
                </div>

                {schedule.length === 0 ? (
                    <div className="py-8 text-center text-slate-500 text-xs font-medium space-y-2">
                        <Calendar size={28} className="mx-auto text-teal-400 opacity-60" />
                        <p>No active days selected. Click on the days above to configure your consulting schedule.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {ALL_DAYS.filter((d) => schedule.some((item) => item.day === d)).map((day) => {
                            const item = schedule.find((s) => s.day === day);
                            if (!item) return null;

                            return (
                                <div
                                    key={day}
                                    className="rounded-2xl border border-teal-100/80 bg-teal-50/20 p-4 sm:p-5 space-y-3 transition-all hover:border-teal-200"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="h-2.5 w-2.5 rounded-full bg-teal-600" />
                                            <h3 className="font-extrabold text-slate-900 text-sm">{day}</h3>
                                        </div>

                                        <button
                                            onClick={() => toggleDay(day)}
                                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition cursor-pointer text-xs font-semibold flex items-center gap-1"
                                        >
                                            <Trash2 size={14} /> Remove
                                        </button>
                                    </div>

                                    {/* Hours Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
                                        {/* Start Time */}
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-600 mb-1">
                                                Start Time
                                            </label>
                                            <input
                                                type="time"
                                                value={item.startTime}
                                                onChange={(e) => updateDayField(day, "startTime", e.target.value)}
                                                className="w-full rounded-xl border border-teal-100 bg-white px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-teal-500 transition"
                                            />
                                        </div>

                                        {/* End Time */}
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-600 mb-1">
                                                End Time
                                            </label>
                                            <input
                                                type="time"
                                                value={item.endTime}
                                                onChange={(e) => updateDayField(day, "endTime", e.target.value)}
                                                className="w-full rounded-xl border border-teal-100 bg-white px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-teal-500 transition"
                                            />
                                        </div>

                                        {/* Break Start */}
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-600 mb-1 flex items-center gap-1">
                                                <Coffee size={12} className="text-teal-600" /> Break Start (Optional)
                                            </label>
                                            <input
                                                type="time"
                                                value={item.breakStart}
                                                onChange={(e) => updateDayField(day, "breakStart", e.target.value)}
                                                className="w-full rounded-xl border border-teal-100 bg-white px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-teal-500 transition"
                                            />
                                        </div>

                                        {/* Break End */}
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-600 mb-1 flex items-center gap-1">
                                                <Coffee size={12} className="text-teal-600" /> Break End (Optional)
                                            </label>
                                            <input
                                                type="time"
                                                value={item.breakEnd}
                                                onChange={(e) => updateDayField(day, "breakEnd", e.target.value)}
                                                className="w-full rounded-xl border border-teal-100 bg-white px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-teal-500 transition"
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Availability;