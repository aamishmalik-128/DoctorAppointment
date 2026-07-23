import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const MobileMenu = ({ isOpen, setIsOpen, navLinks, isAuthenticated }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden bg-slate-950 border-b border-slate-800/80 px-4 py-4 space-y-3"
            >
                <div className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className="px-3 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {!isAuthenticated && (
                    <div className="border-t border-slate-800/80 pt-3 flex flex-col gap-2">
                        <Link
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className="w-full text-center py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-200 text-sm font-semibold hover:bg-slate-800"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            onClick={() => setIsOpen(false)}
                            className="w-full text-center py-2.5 rounded-xl bg-teal-500 text-slate-950 text-sm font-semibold hover:bg-teal-400"
                        >
                            Register
                        </Link>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
};

export default MobileMenu;
