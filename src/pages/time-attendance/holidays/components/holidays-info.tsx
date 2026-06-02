import { CheckCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function HolidaysInfo() {
  return (
    <Card className="shadow-sm border border-border h-fit">
      <CardHeader>
        <CardTitle className="text-lg font-bold">
          Holiday Compliance Notes
        </CardTitle>
        <CardDescription className="text-sm">
          Summary of company holiday policies and guidelines.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-xs font-semibold leading-relaxed text-muted-foreground">
        <div className="flex items-start gap-2">
          <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
          <span>
            All mandatory holidays are fully paid and do not count toward your
            leave allowance balances.
          </span>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
          <span>
            For restricted or optional holidays, submit requests through the
            planner dashboard for supervisor signature.
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
