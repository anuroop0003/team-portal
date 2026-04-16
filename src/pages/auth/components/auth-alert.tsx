import { Alert, AlertDescription } from "@/components/ui/alert";

interface AuthAlertProps {
  variant?: "destructive" | "success" | "warning" | "default";
  description: string;
}

export function AuthAlert({
  variant = "default",
  description,
}: AuthAlertProps) {
  return (
    <Alert variant={variant} className="px-4 py-3">
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
