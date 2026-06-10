import { lazy } from "react";
import { type RouteObject } from "react-router-dom";
import { PATHS } from "@/routes/constants/paths";

const WorkforceDirectoryPage = lazy(
  () => import("./components/directory/page"),
);
const WorkforceOrganizationPage = lazy(
  () => import("./components/organization/page"),
);
const WorkforceUserManagementPage = lazy(
  () => import("./components/user-management/page"),
);

export const workforceRoutes: RouteObject[] = [
  {
    path: PATHS.WORKFORCE.ROOT,
    children: [
      {
        index: true,
        element: <WorkforceDirectoryPage />,
      },
      {
        path: PATHS.WORKFORCE.ORGANIZATION,
        element: <WorkforceOrganizationPage />,
      },
      {
        path: PATHS.WORKFORCE.USER_MANAGEMENT,
        element: <WorkforceUserManagementPage />,
      },
    ],
  },
];
