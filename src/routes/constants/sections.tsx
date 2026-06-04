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
  ParkingPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  VerifyEmailPage,
  AuthLayout,
  TimesheetPage,
  TimeOffPage,
  HolidaysPage,
  CorrectionsPage,
  ApprovalsPage,
  OperationsTimesheetsPage,
  OperationsCalendarPage,
  ReportsPage,
  PoliciesPage,
  LeaveTypesPage,
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
            element: <ParkingPage />,
          },
          {
            path: PATHS.TIME_ATTENDANCE.ROOT,
            children: [
              {
                index: true,
                element: <TimesheetPage />,
              },
              {
                path: PATHS.TIME_ATTENDANCE.TIME_OFF,
                element: <TimeOffPage />,
              },
              {
                path: PATHS.TIME_ATTENDANCE.HOLIDAYS,
                element: <HolidaysPage />,
              },
              {
                path: PATHS.TIME_ATTENDANCE.CORRECTIONS,
                element: <CorrectionsPage />,
              },
              {
                path: PATHS.TIME_ATTENDANCE.APPROVALS,
                element: <ApprovalsPage />,
              },
              {
                path: PATHS.TIME_ATTENDANCE.OPERATIONS_TIMESHEETS,
                element: <OperationsTimesheetsPage />,
              },
              {
                path: PATHS.TIME_ATTENDANCE.CALENDAR,
                element: <OperationsCalendarPage />,
              },
              {
                path: PATHS.TIME_ATTENDANCE.REPORTS,
                element: <ReportsPage />,
              },
              {
                path: PATHS.TIME_ATTENDANCE.POLICIES,
                element: <PoliciesPage />,
              },
              {
                path: PATHS.TIME_ATTENDANCE.LEAVE_TYPES,
                element: <LeaveTypesPage />,
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
