// import { Navigate, Outlet } from "react-router-dom";
// import { PATHS } from "../constants/paths";
import { Outlet } from "react-router-dom";

export const PublicRoute = () => {
  // Mock authentication check
  // const isAuthenticated = false; // Replace with actual auth logic

  // if (isAuthenticated) {
  // return <Navigate to={PATHS.DASHBOARD} replace />;
  // }

  return <Outlet />;
};
