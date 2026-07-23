import { motion } from "framer-motion";

const AuthCard = ({
    title,
    subtitle,
    children,
}) => {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 40,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.6,
                ease: "easeOut",
            }}
            className="
                w-full
                max-w-md
                rounded-3xl
                border
                border-slate-700/80
                bg-slate-900/70
                backdrop-blur-xl
                p-8
                shadow-2xl
            "
        >
            {/* Header */}
            <div className="text-center">

                <h1 className="text-3xl font-extrabold text-white">
                    {title}
                </h1>

                {subtitle && (
                    <p className="mt-2 text-sm text-slate-400">
                        {subtitle}
                    </p>
                )}

            </div>

            {/* Body */}
            <div className="mt-8">
                {children}
            </div>

        </motion.div>
    );
};

export default AuthCard;