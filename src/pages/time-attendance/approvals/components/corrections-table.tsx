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

interface PendingCorrection {
  id: string;
  employeeName: string;
  date: string;
  original: string;
  requested: string;
  reason: string;
}

interface CorrectionsTableProps {
  corrections: PendingCorrection[];
  handleApproveCorrection: (id: string) => void;
  handleOpenReject: (id: string) => void;
}

export function CorrectionsTable({
  corrections,
  handleApproveCorrection,
  handleOpenReject,
}: CorrectionsTableProps) {
  if (corrections.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-slate-500/5 p-8 text-center text-muted-foreground text-sm font-semibold">
        No pending timesheet adjustment applications.
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="bg-background hover:bg-background">
            <TableHead className="h-12 px-4">Employee</TableHead>
            <TableHead className="h-12 px-4">Date</TableHead>
            <TableHead className="h-12 px-4">Original Entry</TableHead>
            <TableHead className="h-12 px-4">Requested Correction</TableHead>
            <TableHead className="h-12 px-4">Reason</TableHead>
            <TableHead className="h-12 px-4 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {corrections.map((req) => (
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
              <TableCell className="py-3 px-4">{req.date}</TableCell>
              <TableCell className="py-3 px-4">{req.original}</TableCell>
              <TableCell className="py-3 px-4">{req.requested}</TableCell>
              <TableCell className="min-w-90 whitespace-normal text-xs py-3 px-4">
                {req.reason}
              </TableCell>
              <TableCell className="py-3 px-4 text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    size="xs"
                    onClick={() => handleApproveCorrection(req.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                  >
                    Approve
                  </Button>
                  <Button
                    size="xs"
                    variant="destructive"
                    onClick={() => handleOpenReject(req.id)}
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
  );
}
