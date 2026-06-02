import { useState, useId, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  holidaySchema,
  type HolidayFormValues,
} from "@/validations/holiday.schema";
import { ConfigureHolidayForm } from "./configure-holiday-form";

interface Holiday {
  id: string;
  name: string;
  date: string;
  type: "public" | "restricted" | "company-specific";
  locationScope: string;
  isPaid: boolean;
}

interface ConfigureHolidayModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitHoliday: (holiday: Omit<Holiday, "id">) => void;
  editingHoliday?: Holiday | null;
}

export function ConfigureHolidayModal({
  isOpen,
  onOpenChange,
  onSubmitHoliday,
  editingHoliday,
}: ConfigureHolidayModalProps) {
  const formId = useId();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<HolidayFormValues>({
    resolver: zodResolver(holidaySchema),
    defaultValues: {
      name: "",
      date: "",
      type: "public",
      locationScope: "",
      isPaid: true,
    },
  });

  // Pre-fill or reset form values when editingHoliday or isOpen changes
  useEffect(() => {
    if (isOpen) {
      if (editingHoliday) {
        reset({
          name: editingHoliday.name,
          date: editingHoliday.date,
          type: editingHoliday.type,
          locationScope: editingHoliday.locationScope,
          isPaid: editingHoliday.isPaid,
        });
      } else {
        reset({
          name: "",
          date: "",
          type: "public",
          locationScope: "",
          isPaid: true,
        });
      }
    }
  }, [editingHoliday, isOpen, reset]);

  const handleFormSubmit = async (data: HolidayFormValues) => {
    setIsSubmitting(true);
    try {
      onSubmitHoliday(data);
      reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to submit holiday event", error);
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
        <DialogContent showCloseButton={false} className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>
              {editingHoliday
                ? "Edit Holiday Event"
                : "Configure Holiday Event"}
            </DialogTitle>
            <DialogDescription>
              {editingHoliday
                ? "Modify official holiday information, paid status, or regional scopes."
                : "Establish official paid or optional calendar events across specific regional branches."}
            </DialogDescription>
          </DialogHeader>

          <ConfigureHolidayForm
            formId={formId}
            register={register}
            control={control}
            errors={errors}
            isSubmitting={isSubmitting}
            submitLabel={editingHoliday ? "Update Holiday" : "Save Holiday"}
          />
        </DialogContent>
      </form>
    </Dialog>
  );
}
