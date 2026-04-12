import { Info } from "lucide-react";

export function PointsHistoryInfo() {
  return (
    <div className="flex items-center gap-4 p-4 rounded-md bg-muted/20 border border-border/10 backdrop-blur-sm">
      <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
        <Info className="size-4 text-primary" />
      </div>
      <p className="text-xs text-muted-foreground font-medium leading-relaxed">
        Your points history is updated in real-time. If you notice any
        discrepancies or have questions about a specific transaction, please
        reach out to the rewards department.
      </p>
    </div>
  );
}
