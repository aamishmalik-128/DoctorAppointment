import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import stripePromise from "../../utils/stripe";
import CheckoutForm from "../../components/payment/CheckoutForm";
import { createPaymentIntent } from "../../redux/payment/paymentThunk";
import { resetPaymentState } from "../../redux/payment/paymentSlice";
import api from "../../services/axios";
import { formatDoctorName } from "../../utils/formatDoctorName";
import {
    ShieldCheck,
    CheckCircle2,
    Calendar,
    Clock,
    User,
    Building,
    MapPin,
    ArrowLeft,
    Loader2,
    AlertCircle,
    Receipt,
    CreditCard,
    Stethoscope,
    Sparkles,
    HeartPulse,
} from "lucide-react";

const Payment = () => {
    const { appointmentId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [appointment, setAppointment] = useState(null);
    const [fetchingAppointment, setFetchingAppointment] = useState(true);
    const [fetchError, setFetchError] = useState("");

    const { clientSecret, loading: intentLoading, error: intentError, paymentSuccess } = useSelector(
        (state) => state.payment || {}
    );

    // Fetch appointment details
    useEffect(() => {
        const fetchAppointmentDetails = async () => {
            if (!appointmentId) {
                setFetchError("Invalid appointment reference.");
                setFetchingAppointment(false);
                return;
            }

            try {
                setFetchingAppointment(true);
                const { data } = await api.get(`/appointment/${appointmentId}`);
                const apptData = data.appointment || data;
                setAppointment(apptData);

                if (apptData.paymentStatus === "paid") {
                    // Already paid
                    setFetchingAppointment(false);
                    return;
                }

                // Initialize payment intent
                dispatch(createPaymentIntent(appointmentId));
            } catch (err) {
                setFetchError(err.response?.data?.message || "Failed to load appointment details.");
            } finally {
                setFetchingAppointment(false);
            }
        };

        dispatch(resetPaymentState());
        fetchAppointmentDetails();

        return () => {
            dispatch(resetPaymentState());
        };
    }, [appointmentId, dispatch]);

    const doctor = appointment?.doctor || {};
    const doctorUser = doctor?.user || {};
    const doctorName = formatDoctorName(doctorUser.fullName || doctor.name || "Doctor");
    const consultationFee = appointment?.consultationFee || doctor?.consultationFee || 500;

    const appointmentDate = appointment?.appointmentDateTime
        ? new Date(appointment.appointmentDateTime).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
          })
        : "-";

    const appointmentTime = appointment?.appointmentDateTime
        ? new Date(appointment.appointmentDateTime).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
          })
        : "-";

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50/60 via-slate-50 to-emerald-50/40 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Back Button */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-teal-700 bg-white/80 px-4 py-2 rounded-xl border border-teal-100 shadow-xs hover:border-teal-300 transition-all cursor-pointer"
                    >
                        <ArrowLeft size={16} /> Back to Appointments
                    </button>

                    <div className="flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-100/60 px-3 py-1.5 rounded-full border border-teal-200">
                        <ShieldCheck size={16} className="text-teal-600" />
                        <span>256-Bit Secure Checkout</span>
                    </div>
                </div>

                {/* Loading State */}
                {fetchingAppointment && (
                    <div className="rounded-3xl border border-teal-100 bg-white/90 p-12 text-center shadow-xl backdrop-blur-md space-y-4">
                        <Loader2 size={40} className="animate-spin text-teal-600 mx-auto" />
                        <p className="text-sm font-semibold text-slate-600">
                            Loading appointment & payment gateway...
                        </p>
                    </div>
                )}

                {/* Error State */}
                {fetchError && (
                    <div className="rounded-3xl border border-rose-200 bg-white/90 p-8 text-center shadow-xl backdrop-blur-md space-y-4">
                        <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                            <AlertCircle size={28} />
                        </div>
                        <h3 className="text-lg font-extrabold text-slate-900">
                            Unable to Proceed with Payment
                        </h3>
                        <p className="text-xs text-slate-600 max-w-md mx-auto">
                            {fetchError}
                        </p>
                        <button
                            onClick={() => navigate("/my-appointments")}
                            className="px-6 py-2.5 rounded-xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-700 transition"
                        >
                            Return to My Appointments
                        </button>
                    </div>
                )}

                {/* Already Paid View */}
                {!fetchingAppointment && !fetchError && appointment?.paymentStatus === "paid" && (
                    <div className="rounded-3xl border border-emerald-200 bg-white/95 p-8 sm:p-10 text-center shadow-2xl backdrop-blur-xl space-y-6">
                        {/* CarePoint Brand Logo */}
                        <div className="flex items-center justify-center gap-3 mx-auto pb-2 border-b border-teal-100/60 max-w-xs">
                            <div className="rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 p-2.5 shadow-md shadow-teal-500/20">
                                <HeartPulse size={26} className="text-white" />
                            </div>
                            <div className="text-left">
                                <h1 className="text-2xl font-black tracking-tight text-slate-900 leading-tight">
                                    Care<span className="text-teal-600">Point</span>
                                </h1>
                                <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                                    Healthcare Platform
                                </p>
                            </div>
                        </div>

                        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                            <CheckCircle2 size={40} />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black text-slate-900">
                                Payment Already Completed!
                            </h2>
                            <p className="text-xs text-slate-600 max-w-md mx-auto">
                                This appointment has already been paid for. Your consultation with {doctorName} is confirmed.
                            </p>
                        </div>

                        <div className="pt-4 flex items-center justify-center gap-3">
                            <Link
                                to={`/appointments/${appointmentId}`}
                                className="px-6 py-3 rounded-xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-700 transition shadow-md"
                            >
                                View Appointment Details
                            </Link>
                            <Link
                                to="/my-appointments"
                                className="px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition"
                            >
                                Back to All Appointments
                            </Link>
                        </div>
                    </div>
                )}

                {/* Successful Payment Confirmation State */}
                {paymentSuccess && (
                    <div className="rounded-3xl border border-emerald-200 bg-white/95 p-8 sm:p-10 text-center shadow-2xl backdrop-blur-xl space-y-6 animate-fadeIn">
                        
                        {/* CarePoint Brand Logo */}
                        <div className="flex items-center justify-center gap-3 mx-auto pb-2 border-b border-teal-100/60 max-w-xs">
                            <div className="rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 p-2.5 shadow-md shadow-teal-500/20">
                                <HeartPulse size={26} className="text-white" />
                            </div>
                            <div className="text-left">
                                <h1 className="text-2xl font-black tracking-tight text-slate-900 leading-tight">
                                    Care<span className="text-teal-600">Point</span>
                                </h1>
                                <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                                    Healthcare Platform
                                </p>
                            </div>
                        </div>


                        <div className="space-y-2">
                            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold tracking-wider uppercase">
                                Payment Confirmed
                            </span>
                            <h2 className="text-3xl font-black text-slate-900">
                                Thank You! Your Payment Received
                            </h2>
                            <p className="text-xs text-slate-600 max-w-md mx-auto">
                                Your payment of <span className="font-extrabold text-emerald-700">Rs. {consultationFee}</span> was processed successfully.
                            </p>
                        </div>

                        {/* Summary Box */}
                        <div className="max-w-md mx-auto rounded-2xl bg-teal-50/40 p-5 border border-teal-100 text-left space-y-3 text-xs">
                            <div className="flex justify-between items-center pb-2 border-b border-teal-100">
                                <span className="text-slate-500">Doctor:</span>
                                <span className="font-bold text-slate-800">{doctorName}</span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-teal-100">
                                <span className="text-slate-500">Date & Time:</span>
                                <span className="font-semibold text-slate-800">{appointmentDate} at {appointmentTime}</span>
                            </div>
                            <div className="flex justify-between items-center pt-1 font-extrabold text-sm text-teal-900">
                                <span>Amount Paid:</span>
                                <span>Rs. {consultationFee}</span>
                            </div>
                        </div>

                        <div className="pt-2 flex items-center justify-center gap-3">
                            <Link
                                to={`/appointments/${appointmentId}`}
                                className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold text-xs hover:from-teal-700 hover:to-emerald-700 transition shadow-md shadow-teal-600/20"
                            >
                                View Appointment Details
                            </Link>
                            <Link
                                to="/my-appointments"
                                className="px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition"
                            >
                                My Appointments
                            </Link>
                        </div>
                    </div>
                )}

                {/* Main Payment Checkout Grid */}
                {!fetchingAppointment && !fetchError && appointment?.paymentStatus !== "paid" && !paymentSuccess && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* Left Column: Order & Doctor Summary */}
                        <div className="lg:col-span-5 space-y-6">

                            {/* Doctor Card */}
                            <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 shadow-xl backdrop-blur-xl text-left space-y-5">
                                <div className="flex items-center gap-2 text-teal-700 font-extrabold text-xs tracking-wider uppercase">
                                    <Stethoscope size={16} /> Appointment Details
                                </div>

                                <div className="flex items-center gap-4">
                                    <img
                                        src={
                                            doctorUser.avatar ||
                                            doctor.profileImage ||
                                            "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150"
                                        }
                                        alt={doctorName}
                                        className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-200 shadow-xs"
                                    />
                                    <div>
                                        <h3 className="font-extrabold text-slate-900 text-lg">
                                            {doctorName}
                                        </h3>
                                        <p className="text-xs font-semibold text-teal-600">
                                            {doctor.specialization || "General Physician"}
                                        </p>
                                        <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                                            <Building size={12} />
                                            {doctor.hospital || "Medical Healthcare Clinic"}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-3 border-t border-teal-100/80 text-xs font-medium text-slate-700">
                                    <div className="flex items-center gap-2.5">
                                        <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
                                            <Calendar size={16} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-slate-400">Date</p>
                                            <p className="font-bold text-slate-800">{appointmentDate}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2.5">
                                        <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
                                            <Clock size={16} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-slate-400">Time Slot</p>
                                            <p className="font-bold text-slate-800">{appointmentTime}</p>
                                        </div>
                                    </div>

                                    {doctor.clinicalAddress && (
                                        <div className="flex items-start gap-2.5">
                                            <div className="p-2 rounded-xl bg-teal-50 text-teal-600 mt-0.5">
                                                <MapPin size={16} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase font-bold text-slate-400">Location</p>
                                                <p className="font-semibold text-slate-800">{doctor.clinicalAddress}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Fee Breakdown Card */}
                            <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 shadow-xl backdrop-blur-xl text-left space-y-4">
                                <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
                                    <Receipt size={18} className="text-teal-600" />
                                    Fee Breakdown
                                </div>

                                <div className="space-y-3 text-xs">
                                    <div className="flex justify-between items-center text-slate-600">
                                        <span>Consultation Fee</span>
                                        <span className="font-bold text-slate-800">Rs. {consultationFee}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-slate-600">
                                        <span>Booking & Platform Fee</span>
                                        <span className="font-bold text-emerald-600 uppercase text-[10px] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                            FREE
                                        </span>
                                    </div>

                                    <div className="pt-3 border-t border-teal-100 flex justify-between items-center text-sm font-extrabold text-slate-900">
                                        <span>Total Amount Due</span>
                                        <span className="text-xl text-teal-700 font-black">
                                            Rs. {consultationFee}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Stripe Payment Form */}
                        <div className="lg:col-span-7">
                            <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl text-left space-y-6">

                                <div className="space-y-1">
                                    <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                                        <CreditCard className="text-teal-600" size={22} />
                                        Complete Payment
                                    </h2>
                                    <p className="text-xs text-slate-500">
                                        Enter your card details to finalize your appointment booking.
                                    </p>
                                </div>

                                {/* Intent Initialization Loading */}
                                {intentLoading && (
                                    <div className="py-12 text-center space-y-3">
                                        <Loader2 size={32} className="animate-spin text-teal-600 mx-auto" />
                                        <p className="text-xs font-semibold text-slate-600">
                                            Connecting to secure payment gateway...
                                        </p>
                                    </div>
                                )}

                                {/* Intent Error */}
                                {intentError && !intentLoading && (
                                    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-700 flex items-start gap-3">
                                        <AlertCircle size={18} className="shrink-0 text-rose-600 mt-0.5" />
                                        <div>
                                            <p className="font-bold text-rose-800">Gateway Error</p>
                                            <p>{intentError}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Stripe Elements Form */}
                                {clientSecret && !intentLoading && (
                                    <Elements
                                        stripe={stripePromise}
                                        options={{
                                            clientSecret,
                                            appearance: {
                                                theme: "stripe",
                                                variables: {
                                                    colorPrimary: "#0d9488",
                                                },
                                            },
                                        }}
                                    >
                                        <CheckoutForm
                                            appointmentId={appointmentId}
                                            consultationFee={consultationFee}
                                        />
                                    </Elements>
                                )}
                            </div>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
};

export default Payment;