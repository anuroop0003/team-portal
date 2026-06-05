import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-[url('/src/assets/auth/login-illustration-bg.svg')] bg-cover bg-center p-4">
      <div className="w-full max-w-lg rounded-lg border bg-card shadow-lg">
        <Outlet />
      </div>
    </div>
  );
}
