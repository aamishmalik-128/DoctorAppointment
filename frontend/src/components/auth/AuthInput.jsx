import { forwardRef } from "react";

const AuthInput = forwardRef(
    (
        {
            label,
            type = "text",
            placeholder,
            icon: Icon,
            error,
            ...props
        },
        ref
    ) => {
        return (
            <div className="w-full">

                {/* Label */}
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                    {label}
                </label>

                {/* Input Container */}
                <div
                    className={`
                        flex items-center gap-3
                        rounded-2xl
                        border
                        bg-slate-800/80
                        px-4
                        py-3
                        transition-all
                        duration-200

                        ${
                            error
                                ? "border-red-500"
                                : "border-slate-700 focus-within:border-teal-500"
                        }

                        focus-within:ring-4
                        focus-within:ring-teal-500/20
                    `}
                >
                    {Icon && (
                        <Icon
                            size={20}
                            className="text-slate-400 shrink-0"
                        />
                    )}

                    <input
                        ref={ref}
                        type={type}
                        placeholder={placeholder}
                        className="
                            w-full
                            bg-transparent
                            text-white
                            placeholder:text-slate-500
                            outline-none
                        "
                        {...props}
                    />
                </div>

                {error && (
                    <p className="mt-2 text-sm text-red-400">
                        {error}
                    </p>
                )}

            </div>
        );
    }
);

AuthInput.displayName = "AuthInput";

export default AuthInput;