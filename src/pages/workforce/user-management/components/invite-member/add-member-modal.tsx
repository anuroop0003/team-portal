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
} from "@/validations/member.schema";
import { InviteForm } from "./invite-form";
import { InviteSuccess } from "./invite-success";

export function AddMemberModal() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const formId = useId();

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
    setIsSubmitting(true);
    setSubmittedEmail(data.email);
    console.log("Creating workforce member with data:", data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
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
