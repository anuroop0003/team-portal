import { useState } from "react";
import type {
  TimeOffRequest,
  TimeOffBalance,
} from "@/services/query/time-attendance/time-attendance.types";
import type { TimeOffFormValues } from "@/validations/time-off.schema";
import { INITIAL_BALANCES, INITIAL_REQUESTS } from "./constants";
import { TimeOffHeader } from "./components/time-off-header";
import { TimeOffStats } from "./components/time-off-stats";
import { TimeOffTable } from "./components/time-off-table";

export default function TimeOffPage() {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [balances, setBalances] = useState<TimeOffBalance[]>(INITIAL_BALANCES);
  const [requests, setRequests] = useState<TimeOffRequest[]>(INITIAL_REQUESTS);

  const handleApplyLeave = (data: TimeOffFormValues) => {
    const selectedType = balances.find(
      (b) => b.leaveTypeId === data.leaveTypeId,
    );
    if (!selectedType) return;

    const resolvedEndDate = data.halfDay
      ? data.startDate
      : data.endDate || data.startDate;

    const newRequest: TimeOffRequest = {
      id: `req_${requests.length + 1}`,
      employeeId: "emp_1",
      employeeName: "Anuroop TM",
      leaveTypeId: data.leaveTypeId,
      leaveTypeName: selectedType.leaveTypeName,
      startDate: data.startDate,
      endDate: resolvedEndDate,
      halfDay: data.halfDay,
      halfDaySession: data.halfDaySession,
      reason: data.reason,
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setRequests([newRequest, ...requests]);

    // Update balances: increment pendingApproval, decrement remaining
    const totalDays = data.halfDay
      ? 0.5
      : Math.ceil(
          (new Date(resolvedEndDate).getTime() -
            new Date(data.startDate).getTime()) /
            86400000,
        ) + 1;

    setBalances((prev) =>
      prev.map((b) =>
        b.leaveTypeId === data.leaveTypeId
          ? {
              ...b,
              pendingApproval: b.pendingApproval + totalDays,
              remaining: b.remaining - totalDays,
            }
          : b,
      ),
    );
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

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <TimeOffHeader
        balances={balances}
        onRequestSubmit={handleApplyLeave}
        isRequestModalOpen={isRequestModalOpen}
        setIsRequestModalOpen={setIsRequestModalOpen}
      />

      <TimeOffStats balances={balances} />

      <TimeOffTable requests={requests} onCancelRequest={handleCancelRequest} />
    </div>
  );
}
