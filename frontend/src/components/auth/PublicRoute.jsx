import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
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

    if (isAuthenticated) {
        if (user?.role === "doctor") {
            return <Navigate to="/doctor" replace />;
        }
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;