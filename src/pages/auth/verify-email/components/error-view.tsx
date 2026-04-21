import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Loader, TriangleAlert } from "lucide-react";

interface ErrorViewProps {
  email: string;
  error: string;
  timer: number;
  isResending: boolean;
  onResend: () => void;
  onSignIn: () => void;
}

export function ErrorView({
  email,
  error,
  timer,
  isResending,
  onResend,
  onSignIn,
}: ErrorViewProps) {
  const resendDisabled = isResending || timer > 0 || !email;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Verification Failed</h2>
      <Alert className="bg-destructive/10 text-destructive border-none">
        <TriangleAlert />
        <AlertTitle>Verification link error</AlertTitle>
        <AlertDescription>
          {error ||
            "This link may have already been used, is invalid, or has expired."}
        </AlertDescription>
      </Alert>
      <FieldGroup className="gap-2!">
        <Button
          className="w-full cursor-pointer"
          onClick={onResend}
          disabled={resendDisabled}
        >
          {isResending && <Loader className="animate-spin" />}
          {timer > 0 ? `Resend in ${timer}s` : "Resend Verification Link"}
        </Button>
        <Button
          variant="ghost"
          className="w-full cursor-pointer"
          onClick={onSignIn}
        >
          Go to Sign In
        </Button>
      </FieldGroup>
    </div>
  );
}
