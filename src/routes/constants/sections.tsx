import { lazy } from "react";
import { Navigate, type RouteObject } from "react-router-dom";
import { PATHS } from "./paths";
import { PublicRoute } from "../guards/public-route";
import { PrivateRoute } from "../guards/private-route";

// Feature Routes
import { authRoutes } from "@/features/auth";
import { dashboardRoutes } from "@/features/dashboard";
import { rewardsRoutes } from "@/features/rewards";
import { workforceRoutes } from "@/features/workforce";
import { parkingRoutes } from "@/features/parking";
import { timeAttendanceRoutes } from "@/features/time-attendance";

// Layouts
const AuthLayout = lazy(() => import("@/layouts/auth-layout"));
const AppLayout = lazy(() => import("@/layouts/app-layout"));

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
        element: <AuthLayout />,
        children: authRoutes,
      },
    ],
  },
  // Private Routes
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          ...dashboardRoutes,
          ...rewardsRoutes,
          ...workforceRoutes,
          ...parkingRoutes,
          ...timeAttendanceRoutes,
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={PATHS.DASHBOARD} replace />,
  },
];
