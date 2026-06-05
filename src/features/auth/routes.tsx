import { lazy } from "react";
import { type RouteObject } from "react-router-dom";
import { PATHS } from "@/routes/constants/paths";

const SignInPage = lazy(() => import("./components/sign-in/page"));
const RegisterOrganizationPage = lazy(
  () => import("./components/register-organization/page"),
);
const ForgotPasswordPage = lazy(
  () => import("./components/forgot-password/page"),
);
const ResetPasswordPage = lazy(
  () => import("./components/reset-password/page"),
);
const VerifyEmailPage = lazy(() => import("./components/verify-email/page"));

export const authRoutes: RouteObject[] = [
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
];
