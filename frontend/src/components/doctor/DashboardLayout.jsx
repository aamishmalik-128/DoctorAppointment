import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/60 to-emerald-50 text-slate-800 flex flex-col font-sans">
            <Navbar
                isMobileMenuOpen={isMobileMenuOpen}
                onToggleMobileMenu={toggleMobileMenu}
            />

            <div className="flex flex-1 overflow-hidden relative">
                <Sidebar
                    isMobileOpen={isMobileMenuOpen}
                    onCloseMobile={closeMobileMenu}
                />

                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-transparent relative w-full">
                    {/* Background Pattern Accent */}
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

                    <div className="relative z-10 max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;