import { User } from "lucide-react";

const UserDropdown = ({ user }) => {
    return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold">
            <User size={16} className="text-teal-400" />
            <span>{user?.name || "Account"}</span>
        </div>
    );
};

export default UserDropdown;
