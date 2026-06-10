import { Coffee } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface TimesheetTimingsProps {
  liveElapsedMinutes: number;
  accumulatedWorkMinutes: number;
  accumulatedBreakMinutes: number;
  formatMinutes: (totalMin: number) => string;
}

export function TimesheetTimings({
  liveElapsedMinutes,
  accumulatedWorkMinutes,
  accumulatedBreakMinutes,
  formatMinutes,
}: TimesheetTimingsProps) {
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
    <Card size="sm">
      <CardHeader>
        <CardTitle>Timings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Days of Week */}
        <div className="flex items-center gap-2">
          {days.map((day, idx) => (
            <DayIndicator key={idx} label={day.label} active={day.active} />
          ))}
        </div>

        {/* Timing Progress info */}
        <TimingProgress
          activeMinutes={activeMinutes}
          accumulatedBreakMinutes={accumulatedBreakMinutes}
          formatMinutes={formatMinutes}
        />
      </CardContent>
    </Card>
  );
}

// Internal Sub-components

interface DayIndicatorProps {
  label: string;
  active: boolean;
}

function DayIndicator({ label, active }: DayIndicatorProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center size-7 rounded-full text-xs font-semibold select-none transition-colors",
        active
          ? "bg-primary text-primary-foreground font-bold shadow-xs"
          : "bg-muted text-muted-foreground hover:bg-muted/80",
      )}
    >
      {label}
    </div>
  );
}

interface TimingProgressProps {
  activeMinutes: number;
  accumulatedBreakMinutes: number;
  formatMinutes: (totalMin: number) => string;
}

function TimingProgress({
  activeMinutes,
  accumulatedBreakMinutes,
  formatMinutes,
}: TimingProgressProps) {
  return (
    <div className="space-y-2.5">
      <div className="flex justify-between items-center text-xs">
        <span className="text-muted-foreground">Today (Flexible Timings)</span>
        <span className="font-semibold tabular-nums">
          {formatMinutes(activeMinutes)}
        </span>
      </div>

      <Progress value={Math.min(100, (activeMinutes / 480) * 100)} />

      <div className="flex items-center justify-between text-xs">
        <span>
          Duration:{" "}
          <span className="text-foreground font-semibold">
            {formatMinutes(activeMinutes)}
          </span>
        </span>
        <span className="flex items-center gap-1">
          <Coffee className="size-3.5 text-amber-500" />
          <span className="text-foreground font-semibold">
            {accumulatedBreakMinutes} min
          </span>
        </span>
      </div>
    </div>
  );
}
