import { useState } from "react";
import { Loader2, AlertTriangle } from "lucide-react";
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

interface DeleteMemberDialogProps {
  member: {
    name: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteMemberDialog({
  member,
  open,
  onOpenChange,
  onSuccess,
}: DeleteMemberDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    console.log("Deleting member:", member.name);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsDeleting(false);
    onSuccess?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-md rounded-md">
        <DialogHeader>
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/10 mb-2">
            <AlertTriangle className="size-6 text-destructive" />
          </div>
          <DialogTitle className="text-center">Delete Member</DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to delete <strong>{member.name}</strong>? This
            action cannot be undone and will remove all associated data.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-4 justify-end">
          <DialogClose
            render={
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            }
          />
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="cursor-pointer"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
