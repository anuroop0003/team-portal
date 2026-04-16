import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuthAlert } from "../../components/auth-alert";
import { Field } from "@/components/ui/field";
import { PATHS } from "@/routes/constants/paths";

export function ResetSuccessView() {
  return (
    <div className="space-y-6">
      <AuthAlert
        variant="success"
        description="Your password has been reset successfully. You can now log in with your new password."
      />
      <Field>
        <Button
          className="w-full rounded-sm cursor-pointer"
          render={<Link to={PATHS.AUTH.SIGN_IN}>Back to Login</Link>}
        />
      </Field>
    </div>
  );
}
