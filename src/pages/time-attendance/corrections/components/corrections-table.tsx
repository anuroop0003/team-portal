import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CorrectionRequest {
  id: string;
  date: string;
  originalClockIn: string;
  originalClockOut: string;
  requestedClockIn: string;
  requestedClockOut: string;
  reason: string;
  status: "approved" | "pending" | "rejected";
  approvedByName?: string;
}

interface CorrectionsTableProps {
  requests: CorrectionRequest[];
  getStatusBadge: (status: CorrectionRequest["status"]) => React.ReactNode;
}

export function CorrectionsTable({
  requests,
  getStatusBadge,
}: CorrectionsTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-background hover:bg-background">
            <TableHead>Target Date</TableHead>
            <TableHead>Original Entries</TableHead>
            <TableHead>Requested Adjustments</TableHead>
            <TableHead>Justification Comments</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((req) => (
            <TableRow key={req.id}>
              <TableCell className="font-semibold text-sm">
                {new Date(req.date).toLocaleDateString([], {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </TableCell>
              <td className="p-4 text-xs font-medium text-muted-foreground">
                In: {req.originalClockIn} <br />
                Out: {req.originalClockOut}
              </td>
              <td className="p-4 text-xs font-bold text-foreground">
                In: {req.requestedClockIn} <br />
                Out: {req.requestedClockOut}
              </td>
              <td
                className="p-4 text-xs font-medium text-muted-foreground max-w-[240px] truncate"
                title={req.reason}
              >
                {req.reason}
              </td>
              <TableCell>{getStatusBadge(req.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
