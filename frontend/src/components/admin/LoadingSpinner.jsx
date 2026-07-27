import React from "react";
import { Loader2 } from "lucide-react";

const LoadingSpinner = ({ message = "Loading..." }) => {
    return (
        <div className="rounded-3xl border border-teal-100 bg-white/95 p-12 text-center text-teal-700 font-semibold shadow-xs flex flex-col items-center justify-center gap-3">
            <Loader2 size={26} className="animate-spin text-teal-600" />
            <span className="text-xs">{message}</span>
        </div>
    );
};

export default LoadingSpinner;
