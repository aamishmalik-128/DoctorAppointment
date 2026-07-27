import React from "react";
import { FolderOpen } from "lucide-react";

const EmptyState = ({
    title = "No Records Found",
    description = "There are no data items available to display.",
    icon: Icon = FolderOpen,
}) => {
    return (
        <div className="rounded-3xl border border-teal-100 bg-white/95 p-12 text-center text-slate-500 shadow-xs space-y-3">
            <Icon size={38} className="mx-auto text-teal-400 opacity-60" />
            <h3 className="text-base font-extrabold text-slate-900">
                {title}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {description}
            </p>
        </div>
    );
};

export default EmptyState;
