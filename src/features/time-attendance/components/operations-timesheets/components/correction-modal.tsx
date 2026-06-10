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

interface CorrectionModalProps {
  isCorrectionModalOpen: boolean;
  setIsCorrectionModalOpen: (open: boolean) => void;
  correctionNote: string;
  setCorrectionNote: (note: string) => void;
  handleRequestCorrection: (e: React.FormEvent) => void;
}

export function CorrectionModal({
  isCorrectionModalOpen,
  setIsCorrectionModalOpen,
  correctionNote,
  setCorrectionNote,
  handleRequestCorrection,
}: CorrectionModalProps) {
  return (
    <Dialog
      open={isCorrectionModalOpen}
      onOpenChange={setIsCorrectionModalOpen}
    >
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Request Shift Correction
          </DialogTitle>
          <DialogDescription className="text-sm">
            Send this log back to the employee requesting a verified correction
            with comments.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleRequestCorrection} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label
              htmlFor="note"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Reason/Discrepancy Detail
            </Label>
            <Textarea
              id="note"
              placeholder="Describe clock entry discrepancy (e.g. Lunch break deduction missed or early signoff mismatch)..."
              value={correctionNote}
              onChange={(e) => setCorrectionNote(e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCorrectionModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="cursor-pointer bg-red-600 text-white hover:bg-red-700 font-semibold"
            >
              Request Adjustment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
