import { ConfirmDialog } from "@/components/confirm-dialog";

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
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Parking Spot"
      description={
        <>
          Are you sure you want to delete parking spot{" "}
          <strong className="text-foreground">{spot.spotNumber}</strong>? This
          action cannot be undone and will permanently remove this spot
          configuration.
        </>
      }
      confirmText="Delete Spot"
      onConfirm={onConfirm}
    />
  );
}
