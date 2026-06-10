import { useState, useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  addMemberSchema,
  type AddMemberFormValues,
} from "@/features/workforce/validations/member.schema";
import { InviteForm } from "./invite-form";
import { InviteSuccess } from "./invite-success";

import { useUserStore } from "@/features/auth/stores/use-user-store";
import {
  useCreateUser,
  useCreateAdmin,
} from "@/features/workforce/api/user-management.query";

export function AddMemberModal() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const formId = useId();

  const userStore = useUserStore((state) => state.user);
  const createUser = useCreateUser();
  const createAdmin = useCreateAdmin();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<AddMemberFormValues>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: {
      name: "",
      email: "",
      position: "",
      role: undefined,
    },
  });

  const onSubmit = async (data: AddMemberFormValues) => {
    if (!userStore?.organization_id) return;
    setIsSubmitting(true);
    setSubmittedEmail(data.email);
    console.log("Creating workforce member with data:", data);

    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: "TempPassword123!", // temporary password
        role: data.role.value,
        organization_id: userStore.organization_id,
        designation: data.position,
      };

      if (data.role.value === "admin") {
        await createAdmin.mutateAsync(payload);
      } else {
        await createUser.mutateAsync(payload);
      }

      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error("Failed to create user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      if (isSuccess) {
        setIsSuccess(false);
        setSubmittedEmail("");
      }
      reset();
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <form id={formId} onSubmit={handleSubmit(onSubmit)}>
        <DialogTrigger
          render={
            <Button className="cursor-pointer">
              <Plus />
              Invite Member
            </Button>
          }
        />
        <DialogContent
          showCloseButton={false}
          className="sm:max-w-md rounded-md"
        >
          {isSuccess ? (
            <InviteSuccess email={submittedEmail} />
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Invite New Member</DialogTitle>
                <DialogDescription>
                  Invite a new member to join the workforce. Fill in their basic
                  details below.
                </DialogDescription>
              </DialogHeader>
              <InviteForm
                formId={formId}
                register={register}
                control={control}
                errors={errors}
                isSubmitting={isSubmitting}
              />
            </>
          )}
        </DialogContent>
      </form>
    </Dialog>
  );
}
