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
  correctionSchema,
  type CorrectionFormValues,
} from "@/validations/correction.schema";
import { CorrectionForm } from "./correction-form";

interface CorrectionModalProps {
  onSubmit: (data: CorrectionFormValues) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CorrectionModal({
  onSubmit,
  isOpen,
  onOpenChange,
}: CorrectionModalProps) {
  const formId = useId();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<CorrectionFormValues>({
    resolver: zodResolver(correctionSchema),
    defaultValues: {
      date: "",
      origIn: "",
      origOut: "",
      reqIn: "",
      reqOut: "",
      reason: "",
    },
  });

  const handleFormSubmit = async (data: CorrectionFormValues) => {
    setIsSubmitting(true);
    try {
      onSubmit(data);
      reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to submit request", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      reset();
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <form id={formId} onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogTrigger
          render={
            <Button className="cursor-pointer">
              <Plus />
              Request Correction
            </Button>
          }
        />
        <DialogContent showCloseButton={false} className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Request Time correction</DialogTitle>
            <DialogDescription>
              Submit corrected clock times along with justification comments for
              manager signature.
            </DialogDescription>
          </DialogHeader>

          <CorrectionForm
            formId={formId}
            register={register}
            control={control}
            errors={errors}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </form>
    </Dialog>
  );
}
