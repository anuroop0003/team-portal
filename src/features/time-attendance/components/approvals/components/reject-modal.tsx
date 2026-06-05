import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface RejectModalProps {
  isRejectModalOpen: boolean;
  setIsRejectModalOpen: (open: boolean) => void;
  rejectionComment: string;
  setRejectionComment: (comment: string) => void;
  handleRejectSubmit: (e: React.FormEvent) => void;
}

export function RejectModal({
  isRejectModalOpen,
  setIsRejectModalOpen,
  rejectionComment,
  setRejectionComment,
  handleRejectSubmit,
}: RejectModalProps) {
  return (
    <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Reject Application
          </DialogTitle>
          <DialogDescription className="text-sm">
            Provide clear comments detailing reason for rejecting this employee
            application.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleRejectSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label
              htmlFor="comment"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Disapproval Comments
            </Label>
            <Textarea
              id="comment"
              placeholder="Indicate instructions or missing requirements (e.g. medical certificates or lunch break deduction discrepancy details)..."
              value={rejectionComment}
              onChange={(e) => setRejectionComment(e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsRejectModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="cursor-pointer bg-red-600 text-white hover:bg-red-700 font-semibold"
            >
              Reject Application
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
