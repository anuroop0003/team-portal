import { Navigate, type RouteObject } from "react-router-dom";
import { PATHS } from "./paths";
import { PublicRoute } from "../guards/public-route";
import { PrivateRoute } from "../guards/private-route";
import { SignInPage, SignUpPage, DashboardPage, RewardsPage } from "./elements";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to={PATHS.DASHBOARD} replace />,
  },
  // Public Routes
  {
    element: <PublicRoute />,
    children: [
      {
        path: PATHS.AUTH.SIGN_IN,
        element: <SignInPage />,
      },
      {
        path: PATHS.AUTH.SIGN_UP,
        element: <SignUpPage />,
      },
    ],
  },
  // Private Routes
  {
    element: <PrivateRoute />,
    children: [
      {
        path: PATHS.DASHBOARD,
        element: <DashboardPage />,
      },
      {
        path: PATHS.REWARDS,
        element: <RewardsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={PATHS.DASHBOARD} replace />,
  },
];
