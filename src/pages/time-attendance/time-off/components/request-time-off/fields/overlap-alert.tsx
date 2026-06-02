import { BadgeInfo } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface OverlapAlertProps {
  isVisible: boolean;
}

export function OverlapAlert({ isVisible }: OverlapAlertProps) {
  if (!isVisible) return null;

  return (
    <Alert className="bg-green-600/10 text-green-600 dark:bg-green-400/10 dark:text-green-400">
      <BadgeInfo />
      <AlertTitle>No team scheduling overlaps detected.</AlertTitle>
      <AlertDescription className="text-green-600/80 dark:text-green-400/80">
        Coverage is secure during this window.
      </AlertDescription>
    </Alert>
  );
}
