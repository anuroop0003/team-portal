import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type AddMemberFormValues } from "@/features/workforce/validations/member.schema";
import { EditMemberForm } from "./edit-member-form";
import { DeleteMemberDialog } from "./delete-member-dialog";

import { useUserStore } from "@/features/auth/stores/use-user-store";
import { useUpdateUser } from "@/features/workforce/api/user-management.query";

interface EditMemberModalProps {
  member: {
    id: string;
    name: string;
    email: string;
    position: string;
    role: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function EditMemberModal({
  member,
  open,
  onOpenChange,
  onSuccess,
}: EditMemberModalProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

  const userStore = useUserStore((state) => state.user);
  const updateUser = useUpdateUser();

  // Map member role string to schema object
  const initialValues: AddMemberFormValues = {
    name: member.name,
    email: member.email,
    position: member.position,
    role: {
      label: member.role.charAt(0).toUpperCase() + member.role.slice(1),
      value: member.role.toLowerCase() as "user" | "manager" | "admin",
    },
  };

  const onSubmit = async (data: AddMemberFormValues) => {
    if (!userStore?.organization_id) return;
    setIsSubmitting(true);
    console.log("Updating member data:", data);

    try {
      await updateUser.mutateAsync({
        userId: member.id,
        orgId: userStore.organization_id,
        data: {
          name: data.name,
          designation: data.position,
          role: data.role.value,
        },
      });

      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error("Failed to update user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteSuccess = () => {
    setIsDeleteDialogOpen(false);
    onOpenChange(false); // Close edit modal too
    onSuccess?.();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent showCloseButton={false} className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Member Profile</DialogTitle>
            <DialogDescription>
              Update professional details for {member.name}.
            </DialogDescription>
          </DialogHeader>
          <EditMemberForm
            initialValues={initialValues}
            onSubmit={onSubmit}
            onDelete={handleOpenDeleteDialog}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      <DeleteMemberDialog
        member={member}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onSuccess={handleDeleteSuccess}
      />
    </>
  );
}
