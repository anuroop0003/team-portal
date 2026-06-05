import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface ApproveDialogProps {
  employeeName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  requestType?: string;
}

export function ApproveDialog({
  employeeName,
  open,
  onOpenChange,
  onConfirm,
  requestType = "timesheet correction",
}: ApproveDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-500/10 mb-2">
            <CheckCircle2 className="size-6 text-emerald-600" />
          </div>
          <DialogTitle className="text-center">Approve Request</DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to approve the {requestType} request for{" "}
            <strong className="text-foreground">{employeeName}</strong>? This
            action will update their attendance records.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose
            render={
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            }
          />
          <Button
            className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white"
            disabled={isSubmitting}
            onClick={handleConfirm}
          >
            {isSubmitting ? "Approving..." : "Approve"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
