import { lazy } from "react";

// Auth Pages
export const SignInPage = lazy(() => import("@/pages/auth/sign-in/page"));
export const SignUpPage = lazy(() => import("@/pages/auth/sign-up/page"));

// Dashboard & Features
export const DashboardPage = lazy(() => import("@/pages/dashboard/page"));
export const RewardsPage = lazy(() => import("@/pages/rewards/page"));
export const DashboardLayout = lazy(() => import("@/layouts/dashboard-layout"));
