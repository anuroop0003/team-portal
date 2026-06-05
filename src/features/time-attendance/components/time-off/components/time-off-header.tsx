import type { TimeOffBalance } from "@/features/time-attendance/api/time-attendance.types";
import type { TimeOffFormValues } from "@/features/time-attendance/validations/time-off.schema";
import { RequestModal } from "./request-time-off/request-modal";

interface TimeOffHeaderProps {
  balances: TimeOffBalance[];
  onRequestSubmit: (data: TimeOffFormValues) => void;
  isRequestModalOpen: boolean;
  setIsRequestModalOpen: (open: boolean) => void;
}

export function TimeOffHeader({
  balances,
  onRequestSubmit,
  isRequestModalOpen,
  setIsRequestModalOpen,
}: TimeOffHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold tracking-tight">
          Leave Balance & Planner
        </h2>
        <p className="text-sm text-muted-foreground">
          Request upcoming time off, monitor leaves metrics, and plan schedules.
        </p>
      </div>

      <RequestModal
        balances={balances}
        onSubmit={onRequestSubmit}
        isOpen={isRequestModalOpen}
        onOpenChange={setIsRequestModalOpen}
      />
    </div>
  );
}
