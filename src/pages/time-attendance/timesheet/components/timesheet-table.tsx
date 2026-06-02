import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getAttendanceStatusVariant,
  getAttendanceStatusLabel,
} from "@/lib/time-attendance";
import type { TimesheetEntry } from "@/services/query/time-attendance/time-attendance.types";

interface TimesheetTableProps {
  history: TimesheetEntry[];
  formatMinutes: (totalMin: number) => string;
}

export function TimesheetTable({
  history,
  formatMinutes,
}: TimesheetTableProps) {
  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-background hover:bg-background">
            <TableHead className="h-12 px-4">Date</TableHead>
            <TableHead className="h-12 px-4">Clock In</TableHead>
            <TableHead className="h-12 px-4">Clock Out</TableHead>
            <TableHead className="h-12 px-4">Break Taken</TableHead>
            <TableHead className="h-12 px-4">Total Hours</TableHead>
            <TableHead className="h-12 px-4">Overtime</TableHead>
            <TableHead className="h-12 px-4 text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="py-3 px-4">
                {new Date(entry.date).toLocaleDateString([], {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell className="py-3 px-4">{entry.clockIn}</TableCell>
              <TableCell className="py-3 px-4">
                {entry.clockOut || "—"}
              </TableCell>
              <TableCell className="py-3 px-4">
                {entry.breaks[0]?.durationMinutes || 0}m
              </TableCell>
              <TableCell className="py-3 px-4">
                {formatMinutes(entry.workHoursMinutes)}
              </TableCell>
              <TableCell className="py-3 px-4">
                {entry.overtimeMinutes > 0
                  ? `+${formatMinutes(entry.overtimeMinutes)}`
                  : "0m"}
              </TableCell>
              <TableCell className="py-3 px-4 text-right">
                <Badge variant={getAttendanceStatusVariant(entry.status)}>
                  {getAttendanceStatusLabel(entry.status)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
