import { Link } from "react-router-dom";
import { PATHS } from "@/routes/constants/paths";

export default function Header() {
  return (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="size-8 rounded-full bg-white" />
        <span className="text-lg font-semibold">shadcnspace.</span>
      </div>

      {/* Heading */}
      <div>
        <h2 className="text-2xl font-semibold">Create an account</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Already have an account?{" "}
          <Link
            to={PATHS.AUTH.SIGN_IN}
            className="text-primary hover:underline hover:underline-offset-4"
          >
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
}
