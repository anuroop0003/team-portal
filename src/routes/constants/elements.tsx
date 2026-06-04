import { lazy } from "react";

// Auth Pages
export const SignInPage = lazy(() => import("@/pages/auth/sign-in/page"));
export const RegisterOrganizationPage = lazy(
  () => import("@/pages/auth/register-organization/page"),
);
export const ForgotPasswordPage = lazy(
  () => import("@/pages/auth/forgot-password/page"),
);
export const ResetPasswordPage = lazy(
  () => import("@/pages/auth/reset-password/page"),
);
export const VerifyEmailPage = lazy(
  () => import("@/pages/auth/verify-email/page"),
);
export const AuthLayout = lazy(() => import("@/pages/auth/auth-layout"));

// Dashboard & Features
export const DashboardPage = lazy(() => import("@/pages/dashboard/page"));
export const AppLayout = lazy(() => import("@/layouts/app-layout"));

// Rewards
export const RewardsLayout = lazy(() => import("@/pages/rewards/layout"));
export const RewardsPage = lazy(() => import("@/pages/rewards/overview/page"));
export const MyRewardsPage = lazy(
  () => import("@/pages/rewards/my-rewards/page"),
);
export const PointsHistoryPage = lazy(
  () => import("@/pages/rewards/points-history/page"),
);
export const RedeemShopPage = lazy(
  () => import("@/pages/rewards/redeem-shop/page"),
);
export const GlobalLeaderboardPage = lazy(
  () => import("@/pages/rewards/global-leaderboard/page"),
);
export const AddRewardPage = lazy(
  () => import("@/pages/rewards/add-reward/page"),
);

// Workforce
export const WorkforceDirectoryPage = lazy(
  () => import("@/pages/workforce/directory/page"),
);
export const WorkforceOrganizationPage = lazy(
  () => import("@/pages/workforce/organization/page"),
);
export const WorkforceUserManagementPage = lazy(
  () => import("@/pages/workforce/user-management/page"),
);
export const ParkingPage = lazy(() => import("@/pages/parking/page"));

// Time & Attendance
export const TimesheetPage = lazy(
  () => import("@/pages/time-attendance/timesheet/page"),
);
export const TimeOffPage = lazy(
  () => import("@/pages/time-attendance/time-off/page"),
);
export const HolidaysPage = lazy(
  () => import("@/pages/time-attendance/holidays/page"),
);
export const CorrectionsPage = lazy(
  () => import("@/pages/time-attendance/corrections/page"),
);
export const ApprovalsPage = lazy(
  () => import("@/pages/time-attendance/approvals/page"),
);
export const OperationsTimesheetsPage = lazy(
  () => import("@/pages/time-attendance/operations-timesheets/page"),
);
export const OperationsCalendarPage = lazy(
  () => import("@/pages/time-attendance/calendar/page"),
);
export const ReportsPage = lazy(
  () => import("@/pages/time-attendance/reports/page"),
);
export const PoliciesPage = lazy(
  () => import("@/pages/time-attendance/policies/page"),
);
export const LeaveTypesPage = lazy(
  () => import("@/pages/time-attendance/leave-types/page"),
);
