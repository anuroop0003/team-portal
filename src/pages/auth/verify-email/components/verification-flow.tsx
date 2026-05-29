import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Loader } from "lucide-react";

interface VerificationFlowProps {
  email: string;
  token: string | null;
  timer: number;
  isVerifying: boolean;
  isResending: boolean;
  onVerify: () => void;
  onResend: () => void;
  onSignIn: () => void;
}

export function VerificationFlow({
  email,
  token,
  timer,
  isVerifying,
  isResending,
  onVerify,
  onResend,
  onSignIn,
}: VerificationFlowProps) {
  const isInitialSend = !token && !!email;
  const resendDisabled = isResending || timer > 0 || !email;

  return (
    <div className="space-y-1.5">
      <h2 className="text-2xl font-semibold">Verify your email</h2>

      <FieldGroup>
        <p className="text-muted-foreground">
          {isInitialSend ? (
            <>
              To complete your account setup, please verify your email address.
              A secure verification link will be sent to{" "}
              {email ? (
                <strong className="text-foreground">{email}</strong>
              ) : (
                "your registered email address"
              )}
              .
            </>
          ) : (
            <>
              You're almost done. Click below to verify your email address
              {email && (
                <>
                  {" "}
                  for <strong className="text-foreground">{email}</strong>
                </>
              )}
              .
            </>
          )}
        </p>

        <FieldGroup className="gap-2!">
          {!!token && (
            <Button
              className="cursor-pointer"
              onClick={onVerify}
              disabled={isVerifying}
            >
              {isVerifying ? (
                <Loader className="animate-spin" />
              ) : (
                "Verify Email"
              )}
            </Button>
          )}

          {!token && (
            <Button
              variant="default"
              className="cursor-pointer"
              onClick={onResend}
              disabled={resendDisabled || isVerifying}
            >
              {isResending && <Loader className="animate-spin" />}
              {timer > 0
                ? `Resend in ${timer}s`
                : isInitialSend
                  ? "Send Verification Email"
                  : "Resend email"}
            </Button>
          )}

          <Button variant="ghost" className="cursor-pointer" onClick={onSignIn}>
            Go to Sign In
          </Button>
        </FieldGroup>
      </FieldGroup>
    </div>
  );
}
