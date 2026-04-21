import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";

interface SuccessViewProps {
  onSignIn: () => void;
}

export function SuccessView({ onSignIn }: SuccessViewProps) {
  return (
    <div className="space-y-1.5">
      <h2 className="text-2xl font-semibold">Account Verified</h2>
      <Alert className="border-none bg-green-600/10 text-green-600 dark:bg-green-400/10 dark:text-green-400">
        <CheckCheck />
        <AlertTitle>Verification successful</AlertTitle>
        <AlertDescription>
          Success! Your email has been successfully verified. You can now sign
          in to access your account.
        </AlertDescription>
      </Alert>
      <Button className="w-full cursor-pointer" onClick={onSignIn}>
        Go to Sign In
      </Button>
    </div>
  );
}
