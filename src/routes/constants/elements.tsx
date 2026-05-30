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
export const RewardsLayout = lazy(() => import("@/pages/rewards/pages/layout"));
export const RewardsPage = lazy(
  () => import("@/pages/rewards/pages/overview/page"),
);
export const MyRewardsPage = lazy(
  () => import("@/pages/rewards/pages/my-rewards/page"),
);
export const PointsHistoryPage = lazy(
  () => import("@/pages/rewards/pages/points-history/page"),
);
export const RedeemShopPage = lazy(
  () => import("@/pages/rewards/pages/redeem-shop/page"),
);
export const GlobalLeaderboardPage = lazy(
  () => import("@/pages/rewards/pages/global-leaderboard/page"),
);
export const AddRewardPage = lazy(
  () => import("@/pages/rewards/pages/add-reward/page"),
);

// Workforce
export const WorkforceDirectoryPage = lazy(
  () => import("@/pages/workforce/pages/directory/page"),
);
export const WorkforceOrganizationPage = lazy(
  () => import("@/pages/workforce/pages/organization/page"),
);
export const WorkforceUserManagementPage = lazy(
  () => import("@/pages/workforce/pages/user-management/page"),
);
