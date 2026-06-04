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
import type { TimeOffBalance } from "@/services/query/time-attendance/time-attendance.types";
import {
  timeOffSchema,
  type TimeOffFormValues,
} from "@/validations/time-off.schema";
import { RequestForm } from "./request-form";

interface RequestModalProps {
  balances: TimeOffBalance[];
  onSubmit: (data: TimeOffFormValues) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RequestModal({
  balances,
  onSubmit,
  isOpen,
  onOpenChange,
}: RequestModalProps) {
  const formId = useId();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm<TimeOffFormValues>({
    resolver: zodResolver(timeOffSchema),
    defaultValues: {
      leaveTypeId: "",
      startDate: "",
      endDate: "",
      halfDay: false,
      reason: "",
    },
  });

  const watchStartDate = watch("startDate");
  const watchHalfDay = watch("halfDay");

  const handleFormSubmit = async (data: TimeOffFormValues) => {
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
              Request Leave
            </Button>
          }
        />
        <DialogContent showCloseButton={false} className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Request Time Off</DialogTitle>
            <DialogDescription>
              Submit your time off request. Accrual rules apply automatically.
            </DialogDescription>
          </DialogHeader>

          <RequestForm
            formId={formId}
            balances={balances}
            register={register}
            control={control}
            errors={errors}
            isSubmitting={isSubmitting}
            watchStartDate={watchStartDate}
            watchHalfDay={watchHalfDay}
          />
        </DialogContent>
      </form>
    </Dialog>
  );
}
