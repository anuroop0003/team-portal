import { Navigate, Outlet } from "react-router-dom";
import { PATHS } from "../constants/paths";

export const PublicRoute = () => {
  const isAuthenticated = localStorage.getItem("token");

  if (isAuthenticated) {
    return <Navigate to={PATHS.DASHBOARD} replace />;
  }

  return <Outlet />;
};
