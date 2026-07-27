import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, AlertCircle, ArrowLeft } from "lucide-react";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/40 to-emerald-50/30 flex items-center justify-center p-4 text-left">
            <div className="max-w-md w-full rounded-3xl border border-teal-100 bg-white/95 p-8 text-center shadow-2xl backdrop-blur-xl space-y-5">
                <div className="h-16 w-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-sm">
                    <AlertCircle size={32} />
                </div>

                <div className="space-y-1">
                    <h1 className="text-4xl font-black text-slate-900">404</h1>
                    <h2 className="text-lg font-bold text-slate-800">Page Not Found</h2>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                        The page you are looking for might have been removed, renamed, or is temporarily unavailable.
                    </p>
                </div>

                <div className="pt-2 flex items-center justify-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
                    >
                        <ArrowLeft size={15} /> Go Back
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 transition shadow-md cursor-pointer"
                    >
                        <Home size={15} /> Return Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
