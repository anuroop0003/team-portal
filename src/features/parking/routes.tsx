import { lazy } from "react";
import { type RouteObject } from "react-router-dom";
import { PATHS } from "@/routes/constants/paths";

const ParkingPage = lazy(() => import("./components/page"));

export const parkingRoutes: RouteObject[] = [
  {
    path: PATHS.PARKING,
    element: <ParkingPage />,
  },
];
