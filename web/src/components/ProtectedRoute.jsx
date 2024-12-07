import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import VerifyEmail from "./VerifyEmail";

const ProtectedRoute = () => {
    const { user } = useSelector(state => state.user);

    if (user !== null && user.role !== "admin" && !user.isEmailVerified) {
        return <VerifyEmail />;
    }

    return user !== null ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
