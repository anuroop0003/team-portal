import { Navigate, Outlet } from "react-router-dom";
import { PATHS } from "../constants/paths";

export const PublicRoute = () => {
  // const isAuthenticated = localStorage.getItem("access-token");
  const isAuthenticated = false;

  if (isAuthenticated) {
    return <Navigate to={PATHS.DASHBOARD} replace />;
  }

  return <Outlet />;
};
