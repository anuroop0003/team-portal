import { lazy } from "react";
import { type RouteObject } from "react-router-dom";
import { PATHS } from "@/routes/constants/paths";

const TasksPage = lazy(() => import("./components/page"));

export const tasksRoutes: RouteObject[] = [
  {
    path: PATHS.TASKS,
    element: <TasksPage />,
  },
];
