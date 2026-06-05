import { lazy } from "react";
import { type RouteObject } from "react-router-dom";
import { PATHS } from "@/routes/constants/paths";

const DashboardPage = lazy(() => import("./components/page"));

export const dashboardRoutes: RouteObject[] = [
  {
    path: PATHS.DASHBOARD,
    element: <DashboardPage />,
  },
];
