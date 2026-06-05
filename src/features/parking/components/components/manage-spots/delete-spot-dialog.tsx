import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteSpotDialogProps {
  spot: {
    spotNumber: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DeleteSpotDialog({
  spot,
  open,
  onOpenChange,
  onConfirm,
}: DeleteSpotDialogProps) {
  const handleDelete = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/10 mb-2">
            <AlertTriangle className="size-6 text-destructive" />
          </div>
          <DialogTitle className="text-center">Delete Parking Spot</DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to delete parking spot{" "}
            <strong className="text-foreground">{spot.spotNumber}</strong>? This
            action cannot be undone and will permanently remove this spot
            configuration.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 justify-end">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={handleDelete}
          >
            Delete Spot
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
