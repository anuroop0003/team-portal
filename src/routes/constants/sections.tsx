import { Navigate, type RouteObject } from "react-router-dom";
import { PATHS } from "./paths";
import { PublicRoute } from "../guards/public-route";
import { PrivateRoute } from "../guards/private-route";
import {
  SignInPage,
  RegisterOrganizationPage,
  DashboardPage,
  RewardsLayout,
  RewardsPage,
  MyRewardsPage,
  PointsHistoryPage,
  RedeemShopPage,
  GlobalLeaderboardPage,
  AppLayout,
  AddRewardPage,
  WorkforceDirectoryPage,
  WorkforceOrganizationPage,
  WorkforceUserManagementPage,
  WorkforceParkingPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  VerifyEmailPage,
  AuthLayout,
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
        element: <AuthLayout />,
        children: [
          {
            path: PATHS.AUTH.SIGN_IN,
            element: <SignInPage />,
          },
          {
            path: PATHS.AUTH.REGISTER_ORGANIZATION,
            element: <RegisterOrganizationPage />,
          },
          {
            path: PATHS.AUTH.FORGOT_PASSWORD,
            element: <ForgotPasswordPage />,
          },
          {
            path: PATHS.AUTH.RESET_PASSWORD,
            element: <ResetPasswordPage />,
          },
          {
            path: PATHS.AUTH.VERIFY_EMAIL,
            element: <VerifyEmailPage />,
          },
        ],
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
              {
                path: PATHS.WORKFORCE.USER_MANAGEMENT,
                element: <WorkforceUserManagementPage />,
              },
            ],
          },
          {
            path: PATHS.PARKING,
            element: <WorkforceParkingPage />,
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
