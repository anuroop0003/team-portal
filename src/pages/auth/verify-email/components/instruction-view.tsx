import { MailOpenIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { PATHS } from "@/routes/constants/paths";

export function InstructionView() {
  return (
    <>
      <Field>
        <div className="flex flex-col items-center justify-center p-6 bg-muted/30 rounded-lg border border-dashed border-border/60 w-full">
          <MailOpenIcon className="size-10 text-muted-foreground/50 mb-3" />
          <p className="text-xs text-muted-foreground text-center">
            Check your spam folder if you don't see it.
          </p>
        </div>
      </Field>

      <Field>
        <Button
          render={<Link to={PATHS.AUTH.SIGN_IN}>Back to Login</Link>}
          className="cursor-pointer"
        />
      </Field>
      <Field>
        <p className="text-center text-xs text-muted-foreground">
          Didn't get the email?{" "}
          <Button type="button" variant="link" className="cursor-pointer">
            Resend
          </Button>
        </p>
      </Field>
    </>
  );
}
