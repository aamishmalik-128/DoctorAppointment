import React from "react";

const StatCard = ({ title, value, icon, color = "teal", subtitle }) => {
    return (
        <div className="rounded-2xl bg-white/95 p-5 shadow-sm border border-teal-100/80 hover:border-teal-300 transition-all text-left backdrop-blur-md flex items-center justify-between">
            <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {title}
                </p>
                <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {value ?? 0}
                </h2>
                {subtitle && (
                    <p className="text-[11px] font-medium text-slate-500 mt-1">
                        {subtitle}
                    </p>
                )}
            </div>
            {icon && (
                <div className="rounded-2xl bg-teal-500/10 p-3 text-teal-700 border border-teal-200/50 shrink-0">
                    {icon}
                </div>
            )}
        </div>
    );
};

export default StatCard;
