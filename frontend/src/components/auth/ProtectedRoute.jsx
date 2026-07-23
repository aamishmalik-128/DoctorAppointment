import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {

    const { isAuthenticated, loading } = useSelector(
        (state) => state.auth
    );

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;