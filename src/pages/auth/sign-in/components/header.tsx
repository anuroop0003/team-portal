import { Link } from "react-router-dom";
import { PATHS } from "@/routes/constants/paths";

export default function Header() {
  return (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="size-8 rounded-full bg-foreground" />
        <span className="text-lg font-semibold">shadcnspace.</span>
      </div>

      {/* Heading */}
      <div>
        <h2 className="text-2xl font-semibold">Sign in to Shadcnspace</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Don't have a workspace?{" "}
          <Link
            to={PATHS.AUTH.REGISTER_ORGANIZATION}
            className="text-primary hover:underline hover:underline-offset-4"
          >
            Create one
          </Link>
        </p>
      </div>
    </>
  );
}
