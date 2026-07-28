import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    CardElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { confirmPayment } from "../../redux/feature/payment/paymentThunk";
import { Lock, ShieldCheck, AlertCircle, Loader2, CreditCard } from "lucide-react";

const CheckoutForm = ({ appointmentId, consultationFee, onPaymentSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const { clientSecret, confirming } = useSelector((state) => state.payment || {});

    const [loading, setLoading] = useState(false);
    const [cardError, setCardError] = useState("");
    const [cardComplete, setCardComplete] = useState(false);

    const handleCardChange = (e) => {
        setCardError(e.error ? e.error.message : "");
        setCardComplete(e.complete);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        if (!clientSecret) {
            setCardError("Payment initialization incomplete. Please reload the page.");
            return;
        }

        setLoading(true);
        setCardError("");

        try {
            // Confirm card payment with Stripe
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                setCardError(result.error.message);
                setLoading(false);
                return;
            }

            if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
                // Confirm in backend via Redux action
                await dispatch(
                    confirmPayment({
                        appointmentId,
                        paymentIntentId: result.paymentIntent.id,
                    })
                ).unwrap();

                if (onPaymentSuccess) {
                    onPaymentSuccess(result.paymentIntent);
                }
            }
        } catch (err) {
            setCardError(
                typeof err === "string" ? err : err?.message || "Payment processing failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const isProcessing = loading || confirming;

    return (
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
            {/* Accepted Cards Header */}
            <div className="flex items-center justify-between border-b border-teal-100/80 pb-4">
                <div>
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        <CreditCard size={18} className="text-teal-600" />
                        Credit or Debit Card
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                        All major card providers supported
                    </p>
                </div>
                <div className="flex items-center gap-1.5 opacity-80">
                    <span className="text-[10px] font-extrabold tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                        VISA
                    </span>
                    <span className="text-[10px] font-extrabold tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                        MC
                    </span>
                    <span className="text-[10px] font-extrabold tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                        AMEX
                    </span>
                </div>
            </div>

            {/* Card Element Box */}
            <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Card Details
                </label>
                <div className="p-4 rounded-2xl border border-teal-200/90 bg-white/90 shadow-sm focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500 transition-all">
                    <CardElement
                        onChange={handleCardChange}
                        options={{
                            style: {
                                base: {
                                    fontSize: "15px",
                                    color: "#0f172a",
                                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                                    fontWeight: "500",
                                    "::placeholder": {
                                        color: "#94a3b8",
                                    },
                                },
                                invalid: {
                                    color: "#e11d48",
                                    iconColor: "#e11d48",
                                },
                            },
                            hidePostalCode: true,
                        }}
                    />
                </div>
            </div>

            {/* Error Message Alert */}
            {cardError && (
                <div className="rounded-xl border border-rose-200 bg-rose-50/90 p-3.5 text-xs text-rose-700 flex items-start gap-2.5 shadow-xs animate-fadeIn">
                    <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-600" />
                    <span className="font-medium">{cardError}</span>
                </div>
            )}

            {/* Security Guarantee Notice */}
            <div className="rounded-xl bg-teal-50/50 p-3 border border-teal-100 flex items-center gap-2.5 text-xs text-teal-800">
                <ShieldCheck size={18} className="text-teal-600 shrink-0" />
                <span>
                    Your payment information is encrypted and securely processed by Stripe.
                </span>
            </div>

            {/* Pay Button */}
            <button
                type="submit"
                disabled={isProcessing || !stripe || !cardComplete}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-sm text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isProcessing || !stripe || !cardComplete
                        ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                        : "bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 active:scale-[0.99] shadow-teal-600/25 hover:shadow-teal-600/40"
                }`}
            >
                {isProcessing ? (
                    <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Processing Payment...</span>
                    </>
                ) : (
                    <>
                        <Lock size={16} />
                        <span>Pay Rs. {consultationFee || 0} Securely</span>
                    </>
                )}
            </button>
        </form>
    );
};

export default CheckoutForm;