import { Navigate, Outlet } from "react-router-dom";
import { PATHS } from "../constants/paths";

export const PublicRoute = () => {
  // Mock authentication check
  const isAuthenticated = false; // Replace with actual auth logic

  if (isAuthenticated) {
    return <Navigate to={PATHS.DASHBOARD} replace />;
  }

  return <Outlet />;
};
