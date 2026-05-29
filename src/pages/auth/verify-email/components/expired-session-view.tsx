import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

interface ExpiredSessionViewProps {
  onReturn: () => void;
}

export function ExpiredSessionView({ onReturn }: ExpiredSessionViewProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Session Expired</h2>
      <Alert variant="destructive" className="bg-destructive/10 border-none">
        <TriangleAlert />
        <AlertTitle>Email not found</AlertTitle>
        <AlertDescription>
          We couldn't find your session info. Please return to the sign-up page
          to continue.
        </AlertDescription>
      </Alert>
      <Button className="w-full cursor-pointer" onClick={onReturn}>
        Return to Sign Up
      </Button>
    </div>
  );
}
