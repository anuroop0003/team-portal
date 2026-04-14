import { Navigate, type RouteObject } from "react-router-dom";
import { PATHS } from "./paths";
import { PublicRoute } from "../guards/public-route";
import { PrivateRoute } from "../guards/private-route";
import {
  SignInPage,
  SignUpPage,
  DashboardPage,
  RewardsLayout,
  RewardsPage,
  MyRewardsPage,
  PointsHistoryPage,
  RedeemShopPage,
  GlobalLeaderboardPage,
  DashboardLayout,
  AddRewardPage,
  WorkforceDirectoryPage,
  WorkforceOrganizationPage,
} from "./elements";

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
        element: <DashboardLayout />,
        children: [
          {
            path: PATHS.DASHBOARD,
            element: <DashboardPage />,
          },
          {
            path: PATHS.REWARDS.ROOT,
            element: <RewardsLayout />,
            children: [
              {
                index: true,
                element: <RewardsPage />,
              },
              {
                path: PATHS.REWARDS.MY_REWARDS,
                element: <MyRewardsPage />,
              },
              {
                path: PATHS.REWARDS.POINTS_HISTORY,
                element: <PointsHistoryPage />,
              },
              {
                path: PATHS.REWARDS.REDEEM_SHOP,
                element: <RedeemShopPage />,
              },
              {
                path: PATHS.REWARDS.GLOBAL_LEADERBOARD,
                element: <GlobalLeaderboardPage />,
              },
              {
                path: PATHS.REWARDS.ADD_REWARD,
                element: <AddRewardPage />,
              },
            ],
          },
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
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={PATHS.DASHBOARD} replace />,
  },
];
