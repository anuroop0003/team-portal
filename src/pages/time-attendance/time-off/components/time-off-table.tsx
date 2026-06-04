import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TimeOffRequest } from "@/services/query/time-attendance/time-attendance.types";
import {
  getTimeOffStatusLabel,
  getTimeOffStatusVariant,
} from "@/lib/time-attendance";

interface TimeOffTableProps {
  requests: TimeOffRequest[];
  onCancelRequest: (id: string) => void;
}

export function TimeOffTable({ requests, onCancelRequest }: TimeOffTableProps) {
  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-background hover:bg-background">
            <TableHead className="h-12 px-4">Requested Period</TableHead>
            <TableHead className="h-12 px-4">Category</TableHead>
            <TableHead className="h-12 px-4">Type</TableHead>
            <TableHead className="h-12 px-4">Submitted Date</TableHead>
            <TableHead className="h-12 px-4">Reason</TableHead>
            <TableHead className="h-12 px-4">Status</TableHead>
            <TableHead className="h-12 px-4 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((req) => {
            const totalDays = req.halfDay
              ? 0.5
              : Math.ceil(
                  (new Date(req.endDate).getTime() -
                    new Date(req.startDate).getTime()) /
                    86400000,
                ) + 1;
            return (
              <TableRow key={req.id}>
                <TableCell className="py-3 px-4">
                  {req.halfDay ? (
                    <span>
                      {new Date(req.startDate).toLocaleDateString([], {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      (Half-Day)
                    </span>
                  ) : (
                    <span>
                      {new Date(req.startDate).toLocaleDateString([], {
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      –{" "}
                      {new Date(req.endDate).toLocaleDateString([], {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </TableCell>
                <TableCell className="py-3 px-4">{req.leaveTypeName}</TableCell>
                <TableCell className="py-3 px-4">
                  <Badge variant="secondary" className="font-medium text-xs">
                    {totalDays} {totalDays === 1 ? "Day" : "Days"}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 px-4">
                  {new Date(req.createdAt).toLocaleDateString([], {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="py-3 px-4" title={req.reason}>
                  {req.reason}
                </TableCell>
                <TableCell className="py-3 px-4">
                  <Badge variant={getTimeOffStatusVariant(req.status)}>
                    {getTimeOffStatusLabel(req.status)}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 px-4 text-right">
                  {req.status === "pending" && (
                    <Button
                      variant="destructive"
                      size="xs"
                      onClick={() => onCancelRequest(req.id)}
                    >
                      Cancel
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
