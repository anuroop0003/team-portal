import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useVerifyEmail } from "@/services/query/auth/auth.query";
import { AuthAlert } from "../../components/auth-alert";
import VerifyEmailHeader from "./header";
import { PATHS } from "@/routes/constants/paths";
import { Field, FieldGroup } from "@/components/ui/field";
import { Card, CardContent } from "@/components/ui/card";
import { InstructionView } from "./instruction-view";
import { ActionView } from "./action-view";

export function VerifyEmailContent() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { mutate, isPending, isError, isSuccess, error, data } =
    useVerifyEmail();

  const handleVerify = async () => {
    if (!token) return;
    mutate(token);
  };

  // Automatically trigger verification if token is present
  useEffect(() => {
    if (token && !isSuccess && !isError && !isPending) {
      handleVerify();
    }
  }, [token]);

  const errorMessage = error?.message || "An unexpected error occurred.";

  return (
    <Card className="w-full max-w-md rounded-2xl shadow-xl bg-card/95 backdrop-blur-md border border-border/60">
      <CardContent className="p-8 space-y-6">
        <VerifyEmailHeader isVerifying={!!token} />

        {isError && (
          <AuthAlert variant="destructive" description={errorMessage} />
        )}

        {isSuccess && (
          <AuthAlert
            variant="success"
            description={data?.message || "Email verified successfully!"}
          />
        )}

        <FieldGroup className="gap-3">
          {isSuccess ? (
            <Field>
              <Button
                variant="default"
                render={<Link to={PATHS.AUTH.SIGN_IN}>Back to Sign In</Link>}
                className="cursor-pointer"
              />
            </Field>
          ) : (
            <>
              {!token ? (
                <InstructionView />
              ) : (
                <ActionView isPending={isPending} onVerify={handleVerify} />
              )}
            </>
          )}
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
