import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TimesheetClockProps {
  currentTime: Date;
  clockStatus: "idle" | "active" | "break";
  liveElapsedMinutes: number;
  accumulatedBreakMinutes: number;
  onClockIn: () => void;
  onStartBreak: () => void;
  onEndBreak: () => void;
  onClockOut: () => void;
  formatMinutes: (totalMin: number) => string;
}

export function TimesheetClock({
  currentTime,
  clockStatus,
  liveElapsedMinutes,
  accumulatedBreakMinutes,
  onClockIn,
  onStartBreak,
  onEndBreak,
  onClockOut,
  formatMinutes,
}: TimesheetClockProps) {
  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = currentTime.toLocaleDateString([], {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Calculations for Effective vs Gross
  // Effective: active worked time
  // Gross: active worked time + break time
  const effectiveMinutes = liveElapsedMinutes;
  const grossMinutes = liveElapsedMinutes + accumulatedBreakMinutes;

  return (
    <Card size="sm">
      <CardContent className="space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tabular-nums tracking-wider text-foreground">
              {formattedTime}
            </h2>
            <p>{formattedDate}</p>
          </div>
          <div className="flex items-center gap-2">
            {clockStatus === "idle" && (
              <Button
                size="sm"
                onClick={onClockIn}
                className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Clock In
              </Button>
            )}

            {clockStatus === "active" && (
              <>
                <Button
                  size="sm"
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={onClockOut}
                >
                  Clock Out
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="cursor-pointer bg-amber-600 hover:bg-amber-700 text-white"
                  onClick={onStartBreak}
                >
                  Break
                </Button>
              </>
            )}

            {clockStatus === "break" && (
              <>
                <Button
                  size="sm"
                  onClick={onEndBreak}
                  className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Resume
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={onClockOut}
                  className="cursor-pointer"
                >
                  Clock Out
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2">
        <p className="text-xs font-medium">Total Hours</p>
        <div className="space-y-1">
          <div className="text-xs font-medium text-muted-foreground">
            Effective:{" "}
            <span className="text-foreground font-semibold">
              {formatMinutes(effectiveMinutes)}
            </span>
          </div>
          <div className="text-xs font-medium text-muted-foreground">
            Gross:{" "}
            <span className="text-foreground font-semibold">
              {formatMinutes(grossMinutes)}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
