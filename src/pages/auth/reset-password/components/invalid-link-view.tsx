import { Link } from "react-router-dom";
import { AuthAlert } from "../../components/auth-alert";
import ResetPasswordHeader from "./header";
import { PATHS } from "@/routes/constants/paths";
import { Button } from "@/components/ui/button";

export function InvalidLinkView() {
  return (
    <>
      <ResetPasswordHeader />
      <AuthAlert
        variant="destructive"
        description="No reset token found in the URL. Please request a new password reset link."
      />
      <Button
        type="button"
        render={<Link to={PATHS.AUTH.FORGOT_PASSWORD}>Request new link</Link>}
        nativeButton={false}
        className="w-full cursor-pointer"
      />
    </>
  );
}
