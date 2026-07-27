const ProfileInput = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    icon,
    placeholder,
    required = false,
}) => {
    return (
        <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                {icon && <span className="text-teal-600">{icon}</span>}
                {label}
            </label>

            <div className="relative">
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className="w-full rounded-xl border border-teal-100 bg-teal-50/20 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20 transition-all shadow-xs"
                />
            </div>
        </div>
    );
};

export default ProfileInput;