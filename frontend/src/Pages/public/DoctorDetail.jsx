import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPublicDoctorById } from "../../redux/feature/doctor/doctorThunk";
import { bookAppointment } from "../../redux/feature/appointment/appointmentThunk";
import { formatDoctorName } from "../../utils/formatDoctorName";
import api from "../../services/axios";
import {
    ArrowLeft,
    Stethoscope,
    Building,
    MapPin,
    DollarSign,
    Award,
    Calendar,
    Clock,
    Video,
    UserCheck,
    CheckCircle2,
    AlertCircle,
    Loader2,
    FileText,
    MessageSquare,
} from "lucide-react";

const DoctorDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { selectedDoctor, loading: doctorLoading, error: doctorError } = useSelector(
        (state) => state.doctor || {}
    );
    const { isAuthenticated, user } = useSelector(
        (state) => state.auth || {}
    );
    const { loading: bookingLoading, error: bookingError } = useSelector(
        (state) => state.appointment || {}
    );

    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const [consultationType, setConsultationType] = useState("in-person");
    const [notes, setNotes] = useState("");

    const [slotsLoading, setSlotsLoading] = useState(false);
    const [slotsError, setSlotsError] = useState("");
    const [validationError, setValidationError] = useState("");

    useEffect(() => {
        if (id) {
            dispatch(getPublicDoctorById(id));
        }
    }, [dispatch, id]);

    // Fetch available slots when doctor or selected date changes
    useEffect(() => {
        const fetchSlots = async () => {
            if (!id || !selectedDate) return;
            setSlotsLoading(true);
            setSlotsError("");
            try {
                const response = await api.get(`/doctors/${id}/available-slots`, {
                    params: { date: selectedDate },
                });
                setAvailableSlots(response.data.slots || []);
                setSelectedTimeSlot("");
            } catch (err) {
                setSlotsError(
                    err.response?.data?.message || "Failed to fetch available slots for this date."
                );
                setAvailableSlots([]);
            } finally {
                setSlotsLoading(false);
            }
        };

        fetchSlots();
    }, [id, selectedDate]);

    const handleBooking = async (e) => {
        e.preventDefault();
        setValidationError("");

        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        if (user?.role === "doctor") {
            setValidationError("Doctors cannot book appointments. Please log in as a patient.");
            return;
        }

        if (!selectedDate || !selectedTimeSlot) {
            setValidationError("Please select an available date and time slot.");
            return;
        }

        // Combine selectedDate and selectedTimeSlot into ISO string
        const appointmentDateTime = `${selectedDate}T${selectedTimeSlot}:00`;

        const payload = {
            doctorId: id,
            appointmentDateTime,
            consultationType,
            notes: notes.trim(),
        };

        try {
            await dispatch(bookAppointment(payload)).unwrap();
            navigate("/my-appointments");
        } catch (err) {
            console.error("Booking failed:", err);
        }
    };

    if (doctorLoading && !selectedDoctor) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/40 to-emerald-50/30 flex items-center justify-center p-8">
                <div className="rounded-3xl border border-teal-100 bg-white/95 p-10 text-center text-teal-700 font-semibold shadow-xl backdrop-blur-xl flex flex-col items-center justify-center gap-3">
                    <Loader2 size={28} className="animate-spin text-teal-600" />
                    <span className="text-sm">Loading doctor profile...</span>
                </div>
            </div>
        );
    }

    if (doctorError || !selectedDoctor) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/40 to-emerald-50/30 py-12 px-4 text-left">
                <div className="max-w-xl mx-auto rounded-3xl border border-teal-100 bg-white/95 p-8 text-center shadow-xl backdrop-blur-xl space-y-4">
                    <AlertCircle size={40} className="mx-auto text-rose-500" />
                    <h2 className="text-xl font-bold text-slate-900">
                        Doctor Profile Not Found
                    </h2>
                    <p className="text-xs text-slate-500">
                        {typeof doctorError === "string" ? doctorError : "The requested doctor profile is currently unavailable."}
                    </p>
                    <button
                        onClick={() => navigate("/doctors")}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 shadow-md transition cursor-pointer"
                    >
                        <ArrowLeft size={16} /> View All Doctors
                    </button>
                </div>
            </div>
        );
    }

    const doctorName = formatDoctorName(selectedDoctor?.user?.fullName || selectedDoctor?.fullName);
    const specialization = selectedDoctor?.specialization || "General Practitioner";
    const qualification = selectedDoctor?.qualification || "MD / MBBS";
    const experience = selectedDoctor?.experience || 5;
    const hospital = selectedDoctor?.hospital || "CarePoint Medical Center";
    const address = selectedDoctor?.clinicalAddress || "Main Medical Block";
    const fee = selectedDoctor?.consultationFee || 50;
    const bio = selectedDoctor?.bio || "Dedicated healthcare professional providing compassionate patient care.";

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/20 py-8 px-4 sm:px-6 lg:px-8 text-left">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Back Nav */}
                <button
                    onClick={() => navigate("/doctors")}
                    className="inline-flex items-center gap-2 rounded-xl border border-teal-200 bg-white/95 px-4 py-2 text-xs font-bold text-teal-700 hover:bg-teal-50 transition shadow-xs cursor-pointer"
                >
                    <ArrowLeft size={16} /> Back to Doctors
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column: Doctor Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 shadow-xl backdrop-blur-xl space-y-5">
                            <div className="flex flex-col items-center text-center space-y-3">
                                {selectedDoctor?.user?.avatar || selectedDoctor?.profileImage ? (
                                    <img
                                        src={selectedDoctor?.user?.avatar || selectedDoctor?.profileImage}
                                        alt={doctorName}
                                        className="h-28 w-28 rounded-3xl object-cover border-4 border-teal-500 shadow-md"
                                    />
                                ) : (
                                    <div className="h-28 w-28 rounded-3xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-4xl font-black text-white shadow-md">
                                        {doctorName.charAt(0)}
                                    </div>
                                )}

                                <div>
                                    <h1 className="text-xl font-extrabold text-slate-900">{doctorName}</h1>
                                    <p className="text-xs font-bold text-teal-700 mt-0.5">{specialization}</p>
                                    <p className="text-[11px] text-slate-500 mt-1 font-semibold">{qualification}</p>
                                </div>

                                <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
                                    <CheckCircle2 size={13} /> Verified Practitioner
                                </span>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-teal-100/80 text-xs">
                                <div className="flex items-center gap-3">
                                    <Building size={16} className="text-teal-600 shrink-0" />
                                    <div>
                                        <p className="text-[10px] font-bold uppercase text-slate-400">Hospital</p>
                                        <p className="font-bold text-slate-800">{hospital}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <MapPin size={16} className="text-teal-600 shrink-0" />
                                    <div>
                                        <p className="text-[10px] font-bold uppercase text-slate-400">Address</p>
                                        <p className="font-bold text-slate-800">{address}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Award size={16} className="text-teal-600 shrink-0" />
                                    <div>
                                        <p className="text-[10px] font-bold uppercase text-slate-400">Experience</p>
                                        <p className="font-bold text-slate-800">{experience} Years Clinical Practice</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <DollarSign size={16} className="text-teal-600 shrink-0" />
                                    <div>
                                        <p className="text-[10px] font-bold uppercase text-slate-400">Fee per Visit</p>
                                        <p className="text-base font-extrabold text-slate-900">${fee}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="pt-3 border-t border-teal-100/80 text-xs">
                                <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">About Doctor</p>
                                <p className="text-slate-600 font-medium leading-relaxed italic">{bio}</p>
                            </div>

                            {/* Direct Chat Action Button */}
                            <button
                                onClick={() => navigate(`/chat?doctorId=${selectedDoctor._id}`)}
                                className="w-full flex items-center justify-center gap-2 rounded-2xl border border-teal-200 bg-teal-50/70 hover:bg-teal-100 py-3 text-xs font-bold text-teal-800 transition shadow-xs cursor-pointer"
                            >
                                <MessageSquare size={16} />
                                <span>Chat with Doctor</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Appointment Booking Widget */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 sm:p-8 shadow-xl backdrop-blur-xl space-y-6">
                            <div>
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-100">
                                    <Calendar size={13} className="text-teal-600" /> Instant Booking
                                </span>
                                <h2 className="text-xl font-extrabold text-slate-900 mt-2">
                                    Schedule Consultation
                                </h2>
                                <p className="text-xs text-slate-500">
                                    Select your preferred date, available time slot, and consultation mode.
                                </p>
                            </div>

                            {(validationError || bookingError) && (
                                <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-600 shadow-xs">
                                    <AlertCircle size={18} className="shrink-0" />
                                    <span>{validationError || (typeof bookingError === "string" ? bookingError : bookingError?.message || "Booking failed.")}</span>
                                </div>
                            )}

                            <form onSubmit={handleBooking} className="space-y-6">

                                {/* Consultation Mode */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        1. Select Mode of Consultation
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setConsultationType("in-person")}
                                            className={`p-4 rounded-2xl border text-xs font-extrabold flex items-center justify-center gap-2 transition cursor-pointer ${
                                                consultationType === "in-person"
                                                    ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white border-transparent shadow-md"
                                                    : "bg-white text-slate-700 border-teal-100 hover:bg-teal-50"
                                            }`}
                                        >
                                            <Building size={16} /> In-Person Visit
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setConsultationType("video")}
                                            className={`p-4 rounded-2xl border text-xs font-extrabold flex items-center justify-center gap-2 transition cursor-pointer ${
                                                consultationType === "video"
                                                    ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white border-transparent shadow-md"
                                                    : "bg-white text-slate-700 border-teal-100 hover:bg-teal-50"
                                            }`}
                                        >
                                            <Video size={16} /> Video Consultation
                                        </button>
                                    </div>
                                </div>

                                {/* Date Selection */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        2. Choose Appointment Date
                                    </label>
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        min={new Date().toISOString().split("T")[0]}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        required
                                        className="w-full rounded-2xl border border-teal-100 bg-teal-50/20 p-3.5 text-xs font-bold text-slate-800 outline-none focus:border-teal-500 focus:bg-white transition shadow-xs cursor-pointer"
                                    />
                                </div>

                                {/* Available Time Slots */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                                        <span>3. Select Time Slot</span>
                                        {slotsLoading && <span className="text-[11px] text-teal-600 lowercase font-normal flex items-center gap-1"><Loader2 size={12} className="animate-spin" /> checking slots...</span>}
                                    </label>

                                    {slotsError ? (
                                        <p className="text-xs text-rose-600 font-semibold italic">{slotsError}</p>
                                    ) : availableSlots.length === 0 ? (
                                        <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50 text-amber-800 text-xs font-semibold">
                                            No available time slots for {selectedDate}. Please select another date.
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                            {availableSlots.map((slot) => (
                                                <button
                                                    key={slot}
                                                    type="button"
                                                    onClick={() => setSelectedTimeSlot(slot)}
                                                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1 transition cursor-pointer ${
                                                        selectedTimeSlot === slot
                                                            ? "bg-teal-700 text-white border-teal-700 shadow-sm"
                                                            : "bg-white text-slate-800 border-teal-100 hover:bg-teal-50"
                                                    }`}
                                                >
                                                    <Clock size={13} /> {slot}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Notes */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                        4. Health Notes / Symptoms (Optional)
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Describe your symptoms or reason for visit..."
                                        className="w-full rounded-2xl border border-teal-100 bg-teal-50/20 p-3.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-teal-500 focus:bg-white transition shadow-xs resize-none"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={bookingLoading || !selectedTimeSlot}
                                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-extrabold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 transition shadow-lg shadow-teal-600/25 cursor-pointer disabled:opacity-50"
                                >
                                    {bookingLoading ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" /> Confirming Booking...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 size={18} /> Confirm & Book Appointment (${fee})
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DoctorDetail;
