import { useState } from "react";
import {
  Plus,
  Calendar,
  AlertCircle,
  FileText,
  Check,
  X,
  ShieldAlert,
  BadgeInfo,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type {
  TimeOffRequest,
  TimeOffBalance,
} from "@/services/query/time-attendance/time-attendance.types";

export default function TimeOffPage() {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  // MOCK entitlement balances
  const [balances, setBalances] = useState<TimeOffBalance[]>([
    {
      leaveTypeId: "lt_1",
      leaveTypeName: "Annual Leave",
      allocated: 15,
      consumed: 4,
      pendingApproval: 2,
      remaining: 9,
    },
    {
      leaveTypeId: "lt_2",
      leaveTypeName: "Sick Leave",
      allocated: 10,
      consumed: 2,
      pendingApproval: 0,
      remaining: 8,
    },
    {
      leaveTypeId: "lt_3",
      leaveTypeName: "Casual Leave",
      allocated: 7,
      consumed: 1,
      pendingApproval: 1,
      remaining: 5,
    },
  ]);

  // MOCK past request logs
  const [requests, setRequests] = useState<TimeOffRequest[]>([
    {
      id: "req_1",
      employeeId: "emp_1",
      employeeName: "Anuroop TM",
      leaveTypeId: "lt_1",
      leaveTypeName: "Annual Leave",
      startDate: "2026-06-15",
      endDate: "2026-06-18",
      halfDay: false,
      reason: "Family vacation trip",
      status: "pending",
      createdAt: "2026-06-01",
    },
    {
      id: "req_2",
      employeeId: "emp_1",
      employeeName: "Anuroop TM",
      leaveTypeId: "lt_2",
      leaveTypeName: "Sick Leave",
      startDate: "2026-05-12",
      endDate: "2026-05-12",
      halfDay: true,
      halfDaySession: "morning",
      reason: "Dental checkup and extraction",
      status: "approved",
      approvedBy: "m_1",
      approvedByName: "Supervisor Jane",
      approvedAt: "2026-05-12",
      createdAt: "2026-05-11",
    },
    {
      id: "req_3",
      employeeId: "emp_1",
      employeeName: "Anuroop TM",
      leaveTypeId: "lt_3",
      leaveTypeName: "Casual Leave",
      startDate: "2026-04-05",
      endDate: "2026-04-06",
      halfDay: false,
      reason: "Personal urgent matters",
      status: "approved",
      approvedBy: "m_1",
      approvedByName: "Supervisor Jane",
      approvedAt: "2026-04-04",
      createdAt: "2026-04-03",
    },
  ]);

  // Form Fields State
  const [leaveTypeId, setLeaveTypeId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isHalfDay, setIsHalfDay] = useState(false);
  const [reason, setReason] = useState("");

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedType = balances.find((b) => b.leaveTypeId === leaveTypeId);
    if (!selectedType) return;

    const newRequest: TimeOffRequest = {
      id: `req_${requests.length + 1}`,
      employeeId: "emp_1",
      employeeName: "Anuroop TM",
      leaveTypeId,
      leaveTypeName: selectedType.leaveTypeName,
      startDate,
      endDate: isHalfDay ? startDate : endDate,
      halfDay: isHalfDay,
      reason,
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setRequests([newRequest, ...requests]);

    // Update balances: increment pendingApproval, decrement remaining
    const totalDays = isHalfDay
      ? 0.5
      : Math.ceil(
          (new Date(endDate).getTime() - new Date(startDate).getTime()) /
            86400000,
        ) + 1;
    setBalances((prev) =>
      prev.map((b) =>
        b.leaveTypeId === leaveTypeId
          ? {
              ...b,
              pendingApproval: b.pendingApproval + totalDays,
              remaining: b.remaining - totalDays,
            }
          : b,
      ),
    );

    // Reset Form
    setLeaveTypeId("");
    setStartDate("");
    setEndDate("");
    setIsHalfDay(false);
    setReason("");
    setIsRequestModalOpen(false);
  };

  const handleCancelRequest = (requestId: string) => {
    const target = requests.find((r) => r.id === requestId);
    if (!target) return;

    // Refund balances
    const totalDays = target.halfDay
      ? 0.5
      : Math.ceil(
          (new Date(target.endDate).getTime() -
            new Date(target.startDate).getTime()) /
            86400000,
        ) + 1;
    setBalances((prev) =>
      prev.map((b) =>
        b.leaveTypeId === target.leaveTypeId
          ? {
              ...b,
              pendingApproval: Math.max(0, b.pendingApproval - totalDays),
              remaining: b.remaining + totalDays,
            }
          : b,
      ),
    );

    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: "cancelled" } : r)),
    );
  };

  const getStatusBadge = (status: TimeOffRequest["status"]) => {
    switch (status) {
      case "approved":
        return (
          <Badge
            variant="outline"
            className="border-emerald-500 text-emerald-500 font-semibold bg-emerald-500/5 gap-1"
          >
            <Check className="h-3.5 w-3.5" /> Approved
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="outline"
            className="border-amber-500 text-amber-500 font-semibold bg-amber-500/5 gap-1"
          >
            <AlertCircle className="h-3.5 w-3.5 animate-pulse" /> Pending
          </Badge>
        );
      case "rejected":
        return (
          <Badge
            variant="outline"
            className="border-red-500 text-red-500 font-semibold bg-red-500/5 gap-1"
          >
            <X className="h-3.5 w-3.5" /> Rejected
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="font-semibold gap-1">
            <X className="h-3.5 w-3.5" /> Cancelled
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">
            Leave Balance & Planner
          </h2>
          <p className="text-sm text-muted-foreground">
            Request upcoming time off, monitor leaves metrics, and plan
            schedules.
          </p>
        </div>

        {/* Request Time Off Modal */}
        <Dialog open={isRequestModalOpen} onOpenChange={setIsRequestModalOpen}>
          <DialogTrigger asChild>
            <Button className="cursor-pointer gap-2 bg-primary text-primary-foreground hover:bg-primary/95 font-semibold">
              <Plus className="h-4 w-4" />
              Request Time Off
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">
                Request Time Off
              </DialogTitle>
              <DialogDescription className="text-sm">
                Submit your time off request. Accrual rules apply automatically.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleApplyLeave} className="space-y-5 pt-2">
              <div className="space-y-1.5">
                <Label
                  htmlFor="leaveType"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Leave Category
                </Label>
                <Select
                  value={leaveTypeId}
                  onValueChange={setLeaveTypeId}
                  required
                >
                  <SelectTrigger id="leaveType" className="cursor-pointer">
                    <SelectValue placeholder="Select Leave Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {balances.map((b) => (
                      <SelectItem
                        key={b.leaveTypeId}
                        value={b.leaveTypeId}
                        className="cursor-pointer"
                      >
                        {b.leaveTypeName} ({b.remaining} remaining)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Half Day Toggles */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-slate-500/5">
                <div className="space-y-0.5">
                  <Label
                    htmlFor="halfDay"
                    className="text-sm font-semibold cursor-pointer"
                  >
                    Half Day Request
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Request partial shift availability
                  </p>
                </div>
                <Switch
                  id="halfDay"
                  checked={isHalfDay}
                  onCheckedChange={setIsHalfDay}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="startDate"
                    className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                  >
                    Start Date
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>
                {!isHalfDay && (
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="endDate"
                      className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      End Date
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                    />
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="reason"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Reason for Absence
                </Label>
                <Textarea
                  id="reason"
                  placeholder="Write a brief explanation for leaves compliance..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  required
                />
              </div>

              {/* Conflict warning block simulation */}
              {startDate && (
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-medium">
                  <BadgeInfo className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>
                    No team scheduling overlaps detected. Coverage is secure
                    during this window.
                  </span>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsRequestModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="cursor-pointer bg-primary text-primary-foreground font-semibold"
                >
                  Submit Request
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Balance Entitlement Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {balances.map((balance) => (
          <Card
            key={balance.leaveTypeId}
            className="shadow-sm overflow-hidden border border-border"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-bold">
                {balance.leaveTypeName}
              </CardTitle>
              <CardDescription className="text-xs">
                Annual Entitlement: {balance.allocated} days
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-muted-foreground">
                    Available Allowance
                  </span>
                  <span className="text-foreground">
                    {balance.remaining} / {balance.allocated} Days
                  </span>
                </div>
                <Progress
                  value={(balance.remaining / balance.allocated) * 100}
                  className="h-2"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/60 text-center">
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">
                    Allocated
                  </p>
                  <p className="text-sm font-semibold">{balance.allocated}d</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-emerald-600">
                    Consumed
                  </p>
                  <p className="text-sm font-semibold text-emerald-600">
                    {balance.consumed}d
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-amber-600">
                    Pending
                  </p>
                  <p className="text-sm font-semibold text-amber-600">
                    {balance.pendingApproval}d
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Leave Request Logs */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold">
            Leave Requests Ledger
          </CardTitle>
          <CardDescription className="text-sm">
            Comprehensive record of recent applications, approvals, and dynamic
            status actions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-background hover:bg-background">
                <TableHead>Requested Period</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Submitted Date</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                    <TableCell className="font-semibold text-sm">
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
                    <TableCell className="text-sm font-semibold">
                      {req.leaveTypeName}
                    </TableCell>
                    <TableCell className="text-sm">
                      <Badge
                        variant="secondary"
                        className="font-medium text-xs"
                      >
                        {totalDays} {totalDays === 1 ? "Day" : "Days"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(req.createdAt).toLocaleDateString([], {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell
                      className="text-sm text-muted-foreground max-w-[200px] truncate"
                      title={req.reason}
                    >
                      {req.reason}
                    </TableCell>
                    <TableCell>{getStatusBadge(req.status)}</TableCell>
                    <TableCell className="text-right">
                      {req.status === "pending" ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCancelRequest(req.id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-500/5 font-semibold cursor-pointer"
                        >
                          Cancel
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground font-semibold">
                          —
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
