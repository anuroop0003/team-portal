import { lazy } from "react";

// Auth Pages
export const SignInPage = lazy(() => import("@/pages/auth/sign-in/page"));
export const SignUpPage = lazy(() => import("@/pages/auth/sign-up/page"));

// Dashboard & Features
export const DashboardPage = lazy(() => import("@/pages/dashboard/page"));
export const DashboardLayout = lazy(() => import("@/layouts/dashboard-layout"));

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
