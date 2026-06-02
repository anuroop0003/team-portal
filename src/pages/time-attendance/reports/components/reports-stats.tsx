import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function ReportsStats() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="border border-border shadow-sm">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Average Attendance Rate
            </span>
            <Badge
              variant="outline"
              className="border-emerald-500 text-emerald-500 bg-emerald-500/5 font-semibold"
            >
              Healthy
            </Badge>
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-bold font-mono">94.2%</h2>
            <p className="text-xs text-muted-foreground font-semibold">
              June Target: 95%
            </p>
          </div>
          <Progress value={94.2} className="h-2" />
        </CardContent>
      </Card>

      <Card className="border border-border shadow-sm">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Leaves Consumption Ratio
            </span>
            <Badge
              variant="outline"
              className="border-blue-500 text-blue-500 bg-blue-500/5 font-semibold"
            >
              Planned
            </Badge>
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-bold font-mono">12.5%</h2>
            <p className="text-xs text-muted-foreground font-semibold">
              Average of 1.4 days per member this month
            </p>
          </div>
          <Progress value={12.5} className="h-2 bg-slate-500/10" />
        </CardContent>
      </Card>

      <Card className="border border-border shadow-sm">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Overtime Accumulation
            </span>
            <Badge
              variant="outline"
              className="border-amber-500 text-amber-500 bg-amber-500/5 font-semibold"
            >
              Optimal
            </Badge>
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-bold font-mono">18.4 hrs</h2>
            <p className="text-xs text-muted-foreground font-semibold">
              Total overtime clocked across the team
            </p>
          </div>
          <Progress value={35} className="h-2 bg-slate-500/10" />
        </CardContent>
      </Card>
    </div>
  );
}
