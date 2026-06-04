import { useState } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getLeaveTypeBadgeVariant } from "@/lib/time-attendance";
import { ApproveDialog } from "../common/approve-dialog";
import { RejectDialog } from "../common/reject-dialog";

interface PendingLeave {
  id: string;
  employeeName: string;
  leaveType: string;
  duration: string;
  dates: string;
  reason: string;
}

interface LeavesTableProps {
  leaves: PendingLeave[];
  handleApproveLeave: (id: string) => void;
  handleOpenReject: (id: string) => void;
}

export function LeavesTable({
  leaves,
  handleApproveLeave,
  handleOpenReject,
}: LeavesTableProps) {
  const [selectedLeave, setSelectedLeave] = useState<PendingLeave | null>(null);
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);

  if (leaves.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-slate-500/5 p-8 text-center text-muted-foreground text-sm font-semibold">
        No pending leave requests in inbox.
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-background hover:bg-background">
              <TableHead className="h-12 px-4">Employee</TableHead>
              <TableHead className="h-12 px-4">Leave Type</TableHead>
              <TableHead className="h-12 px-4">Dates & Duration</TableHead>
              <TableHead className="h-12 px-4">Reason</TableHead>
              <TableHead className="h-12 px-4 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaves.map((req) => (
              <TableRow key={req.id}>
                <TableCell className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9 border border-border/40">
                      <AvatarImage
                        src={req.employeeName}
                        alt={req.employeeName}
                      />
                      <AvatarFallback>
                        {req.employeeName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="font-semibold text-sm tracking-tight text-foreground truncate max-w-[180px]">
                        {req.employeeName}
                      </span>
                      <span className="text-xs text-muted-foreground truncate max-w-[180px]">
                        {req.employeeName.toLowerCase().replace(/\s+/g, ".")}
                        @example.com
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 px-4">
                  <Badge variant={getLeaveTypeBadgeVariant(req.leaveType)}>
                    {req.leaveType}
                  </Badge>
                </TableCell>
                <TableCell className="space-y-1 py-3 px-4">
                  <p>{req.dates} </p>
                  <p>{req.duration}</p>
                </TableCell>
                <TableCell className="min-w-60 whitespace-normal text-xs py-3 px-4">
                  {req.reason}
                </TableCell>
                <TableCell className="py-3 px-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedLeave(req);
                        setIsApproveOpen(true);
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        setSelectedLeave(req);
                        setIsRejectOpen(true);
                      }}
                      className="cursor-pointer"
                    >
                      Reject
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedLeave && (
        <>
          <ApproveDialog
            employeeName={selectedLeave.employeeName}
            open={isApproveOpen}
            onOpenChange={setIsApproveOpen}
            requestType="leave"
            onConfirm={() => handleApproveLeave(selectedLeave.id)}
          />
          <RejectDialog
            employeeName={selectedLeave.employeeName}
            open={isRejectOpen}
            onOpenChange={setIsRejectOpen}
            requestType="leave"
            onConfirm={() => handleOpenReject(selectedLeave.id)}
          />
        </>
      )}
    </>
  );
}
