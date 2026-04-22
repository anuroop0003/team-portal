import { Navigate, Outlet } from "react-router-dom";
import { PATHS } from "../constants/paths";

export const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("access-token");

  if (!isAuthenticated) {
    return <Navigate to={PATHS.AUTH.SIGN_IN} replace />;
  }

  return <Outlet />;
};
