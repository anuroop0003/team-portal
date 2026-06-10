import { useState } from "react";
import { ConfirmDialog } from "@/components/confirm-dialog";
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
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Member"
      description={
        <>
          Are you sure you want to delete{" "}
          <strong className="text-foreground">{member.name}</strong>? This
          action cannot be undone and will remove all associated data.
        </>
      }
      confirmText="Delete"
      isLoading={isDeleting}
      onConfirm={handleDelete}
    />
  );
}
