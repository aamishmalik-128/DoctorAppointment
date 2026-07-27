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
        if (user?.role === "doctor") {
            return <Navigate to="/doctor" replace />;
        }
        if (user?.role === "admin") {
            return <Navigate to="/admin" replace />;
        }
        return <Navigate to="/" replace />;
    }

    // Fallbacks
    if (user?.role === "doctor" && !allowedRoles) {
        return <Navigate to="/doctor" replace />;
    }
    if (user?.role === "admin" && !allowedRoles) {
        return <Navigate to="/admin" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;