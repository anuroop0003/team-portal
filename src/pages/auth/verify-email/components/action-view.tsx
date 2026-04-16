import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionViewProps {
  isPending: boolean;
  onVerify: () => void;
}

export function ActionView({ isPending, onVerify }: ActionViewProps) {
  return (
    <Button onClick={onVerify} className="cursor-pointer" disabled={isPending}>
      {isPending && <Loader2Icon className="animate-spin" />}
      {isPending ? "Verifying" : "Verify Now"}
    </Button>
  );
}
