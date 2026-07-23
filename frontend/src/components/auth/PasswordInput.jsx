import { useState, forwardRef } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

const PasswordInput = forwardRef(
    (
        {
            label = "Password",
            placeholder = "Enter your password",
            error,
            ...props
        },
        ref
    ) => {
        const [showPassword, setShowPassword] = useState(false);

        return (
            <div className="w-full">

                {/* Label */}
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                    {label}
                </label>

                {/* Input */}
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
                    <Lock
                        size={20}
                        className="shrink-0 text-slate-400"
                    />

                    <input
                        ref={ref}
                        type={showPassword ? "text" : "password"}
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

                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword(!showPassword)
                        }
                        className="
                            rounded-lg
                            p-1.5
                            text-slate-400
                            transition
                            hover:bg-slate-700
                            hover:text-teal-400
                        "
                    >
                        {showPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>
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

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;