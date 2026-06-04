import type { CorrectionFormValues } from "@/validations/correction.schema";
import { CorrectionModal } from "./request-correction/correction-modal";

interface CorrectionsHeaderProps {
  onRequestSubmit: (data: CorrectionFormValues) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export function CorrectionsHeader({
  onRequestSubmit,
  isModalOpen,
  setIsModalOpen,
}: CorrectionsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold tracking-tight">
          Timesheet Adjustment Portal
        </h2>
        <p className="text-sm text-muted-foreground">
          Request retroactive adjustments for swipe card entry errors or device
          registration failure.
        </p>
      </div>

      <CorrectionModal
        onSubmit={onRequestSubmit}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}
