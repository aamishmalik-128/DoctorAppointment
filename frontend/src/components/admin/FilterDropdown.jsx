import React from "react";
import { Filter } from "lucide-react";

const FilterDropdown = ({ value, onChange, options = [], label = "Filter" }) => {
    return (
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-teal-100 shadow-xs">
            <Filter size={14} className="text-teal-600 shrink-0" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:inline">
                {label}:
            </span>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer capitalize"
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value} className="capitalize">
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FilterDropdown;
