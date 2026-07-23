import {
    Mail,
    Phone,
    MapPin,
    HeartPulse,
} from "lucide-react";

import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="relative bg-slate-950 text-slate-200 border-t border-teal-500/20">

            {/* Glowing Accent Top Border for Visual Contrast & Separation */}
            <div className="h-1 w-full bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-500 opacity-80" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">

                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Company Info */}
                    <div className="space-y-4">

                        <div className="flex items-center gap-3">

                            <div className="rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 p-2.5 shadow-md text-slate-950">

                                <HeartPulse size={22} className="text-slate-950" />

                            </div>

                            <h2 className="font-heading font-extrabold text-2xl text-white tracking-tight">

                                Care<span className="text-teal-400">Point</span>

                            </h2>

                        </div>

                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm font-normal">

                            CarePoint connects patients with trusted, verified healthcare professionals through a secure and modern appointment booking platform.

                        </p>

                        {/* Social Icons (Inline SVGs to prevent Lucide-React export errors) */}
                        <div className="flex gap-2.5 pt-2">

                            <a
                                href="#"
                                aria-label="Facebook"
                                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-teal-500 hover:text-slate-950 hover:border-teal-500 transition-all flex items-center justify-center shadow-xs"
                            >
                                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            </a>

                            <a
                                href="#"
                                aria-label="Instagram"
                                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-teal-500 hover:text-slate-950 hover:border-teal-500 transition-all flex items-center justify-center shadow-xs"
                            >
                                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                            </a>

                            <a
                                href="#"
                                aria-label="Twitter"
                                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-teal-500 hover:text-slate-950 hover:border-teal-500 transition-all flex items-center justify-center shadow-xs"
                            >
                                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            </a>

                            <a
                                href="#"
                                aria-label="LinkedIn"
                                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-teal-500 hover:text-slate-950 hover:border-teal-500 transition-all flex items-center justify-center shadow-xs"
                            >
                                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.762-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                            </a>

                        </div>

                    </div>

                    {/* Quick Links */}
                    <div>

                        <h3 className="font-heading font-extrabold text-white text-base tracking-tight mb-4">

                            Quick Links

                        </h3>

                        <div className="space-y-2.5 text-xs sm:text-sm font-medium">

                            <Link
                                to="/"
                                className="block text-slate-300 hover:text-teal-400 transition-colors"
                            >
                                Home
                            </Link>

                            <Link
                                to="/doctors"
                                className="block text-slate-300 hover:text-teal-400 transition-colors"
                            >
                                Find Doctors
                            </Link>

                            <Link
                                to="/patient/dashboard"
                                className="block text-slate-300 hover:text-teal-400 transition-colors"
                            >
                                Patient Portal
                            </Link>

                            <Link
                                to="/doctor/dashboard"
                                className="block text-slate-300 hover:text-teal-400 transition-colors"
                            >
                                Doctor Portal
                            </Link>

                        </div>

                    </div>

                    {/* Services */}
                    <div>

                        <h3 className="font-heading font-extrabold text-white text-base tracking-tight mb-4">

                            Services

                        </h3>

                        <div className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-normal">

                            <p className="hover:text-teal-400 transition-colors cursor-pointer">Online Consultation</p>

                            <p className="hover:text-teal-400 transition-colors cursor-pointer">Appointment Booking</p>

                            <p className="hover:text-teal-400 transition-colors cursor-pointer">Digital Prescriptions</p>

                            <p className="hover:text-teal-400 transition-colors cursor-pointer">Encrypted Medical Records</p>

                            <p className="hover:text-teal-400 transition-colors cursor-pointer">Specialist Verification</p>

                        </div>

                    </div>

                    {/* Contact Us */}
                    <div>

                        <h3 className="font-heading font-extrabold text-white text-base tracking-tight mb-4">

                            Contact Us

                        </h3>

                        <div className="space-y-3.5 text-xs sm:text-sm">

                            <div className="flex items-start gap-3 text-slate-200">

                                <MapPin size={16} className="mt-0.5 text-teal-400 shrink-0" />

                                <span>

                                    Islamabad, Pakistan

                                </span>

                            </div>

                            <div className="flex items-center gap-3 text-slate-200">

                                <Phone size={16} className="text-teal-400 shrink-0" />

                                <span>

                                    +92 300 1234567

                                </span>

                            </div>

                            <div className="flex items-center gap-3 text-slate-200">

                                <Mail size={16} className="text-teal-400 shrink-0" />

                                <span>

                                    support@carepoint.com

                                </span>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="mt-14 border-t border-slate-800/80 pt-8 text-xs text-slate-400">

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

                        <p>

                            © {new Date().getFullYear()} CarePoint.
                            All Rights Reserved.

                        </p>

                        <div className="flex gap-6">

                            <Link
                                to="/privacy-policy"
                                className="hover:text-teal-400 transition-colors"
                            >
                                Privacy Policy
                            </Link>

                            <Link
                                to="/terms"
                                className="hover:text-teal-400 transition-colors"
                            >
                                Terms & Conditions
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </footer>
    );
};

export default Footer;
