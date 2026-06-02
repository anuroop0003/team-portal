import {
  Hourglass,
  Coffee,
  Clock,
  User,
  Users,
  Info,
  ChevronDown,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface TimesheetStatsProps {
  liveElapsedMinutes: number;
  accumulatedWorkMinutes: number;
  accumulatedBreakMinutes: number;
  formatMinutes: (totalMin: number) => string;
}

export function TimesheetStats({
  liveElapsedMinutes,
  accumulatedWorkMinutes,
  accumulatedBreakMinutes,
  formatMinutes,
}: TimesheetStatsProps) {
  // Live display for duration
  const activeMinutes = liveElapsedMinutes || accumulatedWorkMinutes;

  // Days of the week (June 1, 2026 is Monday)
  const days = [
    { label: "M", active: true },
    { label: "T", active: false },
    { label: "W", active: false },
    { label: "T", active: false },
    { label: "F", active: false },
    { label: "S", active: false },
    { label: "S", active: false },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      {/* Attendance Stats Card */}
      <Card size="sm">
        <CardContent className="space-y-5">
          {/* User Row (Me) */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-9 rounded-full bg-primary/10 text-primary">
                <User className="size-4" />
              </div>
              <div>
                <span className="font-semibold text-sm">Me</span>
                <div className="text-[10px] text-muted-foreground">
                  Last Week
                </div>
              </div>
            </div>
            <div className="flex gap-6 text-right">
              <div>
                <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                  Avg Hrs
                </div>
                <div className="text-xs font-bold">5h 7m</div>
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                  Arrival
                </div>
                <div className="text-xs font-bold text-emerald-500">100%</div>
              </div>
            </div>
          </div>

          <div className="border-t border-border/50 my-2" />

          {/* Team Row */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-9 rounded-full bg-muted text-muted-foreground">
                <Users className="size-4" />
              </div>
              <div>
                <span className="font-semibold text-sm">My Team</span>
                <div className="text-[10px] text-muted-foreground">
                  Last Week
                </div>
              </div>
            </div>
            <div className="flex gap-6 text-right">
              <div>
                <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                  Avg Hrs
                </div>
                <div className="text-xs font-bold">6h 42m</div>
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                  Arrival
                </div>
                <div className="text-xs font-bold text-emerald-500">96%</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timings Card */}
      <Card size="sm" className="h-full flex flex-col justify-between">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-muted-foreground">
            Timings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Days of Week */}
          <div className="flex items-center gap-1.5">
            {days.map((day, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex items-center justify-center size-7 rounded-full text-xs font-semibold select-none transition-colors",
                  day.active
                    ? "bg-primary text-primary-foreground font-bold shadow-xs"
                    : "bg-muted text-muted-foreground hover:bg-muted/80",
                )}
              >
                {day.label}
              </div>
            ))}
          </div>

          {/* Timing Progress info */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">
                Today (Flexible Timings)
              </span>
              <span className="font-semibold tabular-nums">
                {formatMinutes(activeMinutes)}
              </span>
            </div>

            <Progress
              value={Math.min(100, (activeMinutes / 480) * 100)}
              className="h-2"
            />

            <div className="flex items-center justify-between text-xs pt-1 border-t border-border/40 mt-1">
              <span className="text-muted-foreground">
                Duration:{" "}
                <span className="text-foreground font-semibold">
                  {formatMinutes(activeMinutes)}
                </span>
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Coffee className="size-3.5 text-amber-500 fill-amber-500/10" />
                <span className="text-foreground font-semibold">
                  {accumulatedBreakMinutes} min
                </span>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
