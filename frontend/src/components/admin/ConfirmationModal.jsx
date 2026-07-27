import React from "react";
import { AlertCircle, CheckCircle2, X } from "lucide-react";

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm Action",
    message = "Are you sure you want to proceed?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    type = "danger",
    loading = false,
}) => {
    if (!isOpen) return null;

    const isDanger = type === "danger";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl space-y-4 text-left border border-teal-100 relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 rounded-xl transition cursor-pointer"
                >
                    <X size={18} />
                </button>

                <div className="flex items-center gap-3">
                    <div
                        className={`p-2.5 rounded-2xl ${
                            isDanger
                                ? "bg-rose-100 text-rose-600"
                                : "bg-emerald-100 text-emerald-600"
                        }`}
                    >
                        {isDanger ? <AlertCircle size={22} /> : <CheckCircle2 size={22} />}
                    </div>

                    <div>
                        <h3 className="text-base font-extrabold text-slate-900">
                            {title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                            {message}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-teal-100/60">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className={`px-4 py-2 rounded-xl text-xs font-bold text-white transition shadow-md cursor-pointer disabled:opacity-50 ${
                            isDanger
                                ? "bg-rose-600 hover:bg-rose-700 shadow-rose-600/20"
                                : "bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 shadow-teal-600/20"
                        }`}
                    >
                        {loading ? "Processing..." : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
