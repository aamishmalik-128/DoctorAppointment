import { useState } from "react";
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    CheckCircle2,
    MessageSquare,
} from "lucide-react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) return;
        setSubmitted(true);
        setTimeout(() => {
            setFormData({ name: "", email: "", subject: "", message: "" });
            setSubmitted(false);
        }, 4000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/20 py-8 px-4 sm:px-6 lg:px-8 text-left">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header Banner */}
                <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 sm:p-10 shadow-xl backdrop-blur-xl space-y-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-lg border border-teal-100">
                        <MessageSquare size={14} className="text-teal-600" /> Patient Support & Helpline
                    </span>
                    <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                        Get in Touch with Our Medical Care Team
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                        Have a question about booking an appointment, medical records, or doctor onboarding? We're here to help.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column: Contact Cards */}
                    <div className="space-y-4 lg:col-span-1">
                        <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 shadow-md space-y-5 text-xs">
                            <h2 className="text-sm font-extrabold text-slate-900 border-b border-teal-100/80 pb-3">
                                Contact Information
                            </h2>

                            <div className="flex items-start gap-3">
                                <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600 shrink-0">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-400 text-[10px] uppercase">Emergency Helpline</p>
                                    <p className="font-extrabold text-slate-900 text-sm">+1 (800) 555-CARE</p>
                                    <p className="text-slate-500 font-medium">24/7 Priority Support</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600 shrink-0">
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-400 text-[10px] uppercase">Support Email</p>
                                    <p className="font-extrabold text-slate-900">support@carepoint.com</p>
                                    <p className="text-slate-500 font-medium">Typical response within 2 hours</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600 shrink-0">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-400 text-[10px] uppercase">Headquarters</p>
                                    <p className="font-extrabold text-slate-900">CarePoint Medical Center</p>
                                    <p className="text-slate-500 font-medium">100 Healthcare Boulevard, Suite 400</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600 shrink-0">
                                    <Clock size={18} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-400 text-[10px] uppercase">Working Hours</p>
                                    <p className="font-extrabold text-slate-900">Monday - Sunday</p>
                                    <p className="text-slate-500 font-medium">8:00 AM - 10:00 PM EST</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="rounded-3xl border border-teal-100 bg-white/95 p-6 sm:p-8 shadow-xl backdrop-blur-xl space-y-4">
                            <h2 className="text-lg font-extrabold text-slate-900">
                                Send Us a Message
                            </h2>

                            {submitted && (
                                <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-700 shadow-xs">
                                    <CheckCircle2 size={18} className="shrink-0" />
                                    <span>Thank you! Your message has been received. Our team will contact you shortly.</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="font-bold text-slate-700">Full Name *</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Your full name..."
                                            required
                                            className="w-full rounded-xl border border-teal-100 bg-teal-50/20 p-3 text-xs text-slate-800 outline-none focus:border-teal-500 focus:bg-white transition shadow-xs"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="font-bold text-slate-700">Email Address *</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="your.email@example.com"
                                            required
                                            className="w-full rounded-xl border border-teal-100 bg-teal-50/20 p-3 text-xs text-slate-800 outline-none focus:border-teal-500 focus:bg-white transition shadow-xs"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="font-bold text-slate-700">Subject</label>
                                    <input
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        placeholder="e.g. Appointment assistance / Feedback"
                                        className="w-full rounded-xl border border-teal-100 bg-teal-50/20 p-3 text-xs text-slate-800 outline-none focus:border-teal-500 focus:bg-white transition shadow-xs"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="font-bold text-slate-700">Message *</label>
                                    <textarea
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Type your message details here..."
                                        required
                                        className="w-full rounded-xl border border-teal-100 bg-teal-50/20 p-3 text-xs text-slate-800 outline-none focus:border-teal-500 focus:bg-white transition shadow-xs resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 transition shadow-md shadow-teal-600/20 cursor-pointer"
                                >
                                    <Send size={15} /> Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
