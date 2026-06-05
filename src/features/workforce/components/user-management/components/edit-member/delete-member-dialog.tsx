import { useState } from "react";
import { AlertTriangle } from "lucide-react";
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

import { useUserStore } from "@/features/auth/stores/use-user-store";
import { useDeleteUser } from "@/features/workforce/api/user-management.query";

interface DeleteMemberDialogProps {
  member: {
    id: string;
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
  const userStore = useUserStore((state) => state.user);
  const deleteUser = useDeleteUser();

  const handleDelete = async () => {
    if (!userStore?.organization_id) return;
    setIsDeleting(true);
    console.log("Deleting member:", member.name);

    try {
      await deleteUser.mutateAsync({
        userId: member.id,
        orgId: userStore.organization_id,
      });
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to delete member:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/10 mb-2">
            <AlertTriangle className="size-6 text-destructive" />
          </div>
          <DialogTitle className="text-center">Delete Member</DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to delete{" "}
            <strong className="text-foreground">{member.name}</strong>? This
            action cannot be undone and will remove all associated data.
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
            variant="destructive"
            className="cursor-pointer"
            disabled={isDeleting}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
