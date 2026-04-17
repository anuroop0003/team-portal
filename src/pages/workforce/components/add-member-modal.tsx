import { useState } from "react";
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
import { type AddMemberFormValues } from "@/validations/member.schema";
import { InviteForm } from "./invite-form";
import { InviteSuccess } from "./invite-success";

export function AddMemberModal() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const onSubmit = async (data: AddMemberFormValues) => {
    setIsSubmitting(true);
    setSubmittedEmail(data.email);
    console.log("Creating workforce member with data:", data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      if (isSuccess) {
        setIsSuccess(false);
        setSubmittedEmail("");
      }
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button className="cursor-pointer">
            <Plus />
            Invite Member
          </Button>
        }
      />
      <DialogContent showCloseButton={false} className="sm:max-w-md rounded-md">
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
            <InviteForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
