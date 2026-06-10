import { useState, useEffect } from "react";
import { MOCK_HISTORY } from "./constants";
import { TimesheetClock } from "./components/timesheet-clock";
import { TimesheetAttendanceStats } from "./components/timesheet-attendance-stats";
import { TimesheetTimings } from "./components/timesheet-timings";
import { TimesheetTable } from "./components/timesheet-table";
import type { TimesheetEntry } from "@/features/time-attendance/api/time-attendance.types";

export default function TimesheetPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Shift state simulation
  const [clockStatus, setClockStatus] = useState<"idle" | "active" | "break">(
    "idle",
  );
  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [breakStartTime, setBreakStartTime] = useState<Date | null>(null);
  const [accumulatedWorkMinutes, setAccumulatedWorkMinutes] = useState(0);
  const [accumulatedBreakMinutes, setAccumulatedBreakMinutes] = useState(0);

  // Live timer state
  const [liveElapsedMinutes, setLiveElapsedMinutes] = useState(0);

  // Weekly history data initialized with MOCK_HISTORY
  const [history, setHistory] = useState<TimesheetEntry[]>(MOCK_HISTORY);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Update live elapsed time
  useEffect(() => {
    if (clockStatus === "idle") {
      setLiveElapsedMinutes(0);
      return;
    }

    const interval = setInterval(() => {
      if (clockStatus === "active" && clockInTime) {
        const diffMs = new Date().getTime() - clockInTime.getTime();
        const minutes = Math.floor(diffMs / 60000);
        setLiveElapsedMinutes(accumulatedWorkMinutes + minutes);
      } else if (clockStatus === "break" && breakStartTime) {
        // Just track current work hours as fixed during break
        setLiveElapsedMinutes(accumulatedWorkMinutes);
      }
    }, 10000); // update live every 10 seconds

    return () => clearInterval(interval);
  }, [clockStatus, clockInTime, breakStartTime, accumulatedWorkMinutes]);

  const handleClockIn = () => {
    setClockInTime(new Date());
    setClockStatus("active");
  };

  const handleStartBreak = () => {
    if (clockInTime) {
      const diffMs = new Date().getTime() - clockInTime.getTime();
      const minutes = Math.floor(diffMs / 60000);
      setAccumulatedWorkMinutes(accumulatedWorkMinutes + minutes);
    }
    setBreakStartTime(new Date());
    setClockStatus("break");
  };

  const handleEndBreak = () => {
    if (breakStartTime) {
      const diffMs = new Date().getTime() - breakStartTime.getTime();
      const minutes = Math.floor(diffMs / 60000);
      setAccumulatedBreakMinutes(accumulatedBreakMinutes + minutes);
    }
    setClockInTime(new Date()); // reset reference to current start of work period
    setClockStatus("active");
  };

  const handleClockOut = () => {
    let finalWork = accumulatedWorkMinutes;
    if (clockStatus === "active" && clockInTime) {
      const diffMs = new Date().getTime() - clockInTime.getTime();
      finalWork += Math.floor(diffMs / 60000);
    }

    const todayStr = new Date().toISOString().split("T")[0];
    const clockInStr = clockInTime
      ? clockInTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "09:00 AM";
    const clockOutStr = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newEntry: TimesheetEntry = {
      id: String(history.length + 1),
      employeeId: "emp_1",
      employeeName: "Anuroop TM",
      date: todayStr,
      clockIn: clockInStr,
      clockOut: clockOutStr,
      breaks: [
        {
          id: "b_today",
          breakStart: "01:00 PM",
          breakEnd: "01:45 PM",
          durationMinutes: accumulatedBreakMinutes,
        },
      ],
      status: "present",
      workHoursMinutes: finalWork,
      overtimeMinutes: Math.max(0, finalWork - 480),
      regularized: false,
    };

    setHistory([newEntry, ...history]);
    setClockStatus("idle");
    setClockInTime(null);
    setBreakStartTime(null);
    setAccumulatedWorkMinutes(0);
    setAccumulatedBreakMinutes(0);
  };

  // Convert minutes to clean visual hours/minutes
  const formatMinutes = (totalMin: number) => {
    const hours = Math.floor(totalMin / 60);
    const mins = totalMin % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Timesheet</h1>
        <p className="text-sm text-muted-foreground font-medium">
          Track your working hours, manage active breaks, and view weekly
          attendance logs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <TimesheetClock
          currentTime={currentTime}
          clockStatus={clockStatus}
          liveElapsedMinutes={liveElapsedMinutes}
          accumulatedBreakMinutes={accumulatedBreakMinutes}
          onClockIn={handleClockIn}
          onStartBreak={handleStartBreak}
          onEndBreak={handleEndBreak}
          onClockOut={handleClockOut}
          formatMinutes={formatMinutes}
        />
        <TimesheetAttendanceStats />
        <TimesheetTimings
          liveElapsedMinutes={liveElapsedMinutes}
          accumulatedWorkMinutes={accumulatedWorkMinutes}
          accumulatedBreakMinutes={accumulatedBreakMinutes}
          formatMinutes={formatMinutes}
        />
      </div>

      <TimesheetTable history={history} formatMinutes={formatMinutes} />
    </div>
  );
}
