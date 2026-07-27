import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
    const { isAuthenticated, user, loading } = useSelector(
        (state) => state.auth || {}
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/60 to-emerald-50 flex items-center justify-center font-bold text-teal-700">
                Loading...
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Role-based protection check
    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        // If a doctor tries to access patient routes, redirect to doctor dashboard
        if (user?.role === "doctor") {
            return <Navigate to="/doctor" replace />;
        }
        // If a patient tries to access doctor routes, redirect to patient home
        return <Navigate to="/" replace />;
    }

    // Fallback: If no allowedRoles specified, doctors can never access patient routes
    if (user?.role === "doctor" && !allowedRoles) {
        return <Navigate to="/doctor" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;