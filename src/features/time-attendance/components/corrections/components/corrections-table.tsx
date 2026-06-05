import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AttendanceCorrectionRequest } from "@/features/time-attendance/api/time-attendance.types";
import {
  getCorrectionStatusLabel,
  getCorrectionStatusVariant,
} from "@/features/time-attendance";

interface CorrectionsTableProps {
  requests: AttendanceCorrectionRequest[];
}

export function CorrectionsTable({ requests }: CorrectionsTableProps) {
  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-background hover:bg-background">
            <TableHead className="h-12 px-4">Target Date</TableHead>
            <TableHead className="h-12 px-4">Original Entries</TableHead>
            <TableHead className="h-12 px-4">Requested Adjustments</TableHead>
            <TableHead className="h-12 px-4">Justification Comments</TableHead>
            <TableHead className="h-12 px-4 text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((req) => (
            <TableRow key={req.id}>
              <TableCell className="py-3 px-4">
                {new Date(req.date).toLocaleDateString([], {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell className="space-y-1 text-xs py-3 px-4">
                <p>In: {req.originalClockIn || "—"} </p>
                <p>Out: {req.originalClockOut || "—"}</p>
              </TableCell>
              <TableCell className="space-y-1 text-xs py-3 px-4">
                <p>In: {req.requestedClockIn} </p>
                <p>Out: {req.requestedClockOut}</p>
              </TableCell>
              <TableCell className="text-xs py-3 px-4">{req.reason}</TableCell>
              <TableCell className="py-3 px-4 text-right">
                <Badge variant={getCorrectionStatusVariant(req.status)}>
                  {getCorrectionStatusLabel(req.status)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
