import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {

    const { isAuthenticated, loading } = useSelector(
        (state) => state.auth
    );

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;