import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import { Field, FieldError } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { TimeOffFormValues } from "@/features/time-attendance/validations/time-off.schema";

interface ReasonFieldProps {
  register: UseFormRegister<TimeOffFormValues>;
  errors: FieldErrors<TimeOffFormValues>;
  disabled?: boolean;
}

export function ReasonField({ register, errors, disabled }: ReasonFieldProps) {
  return (
    <Field className="gap-2!">
      <Label htmlFor="reason">Reason for Absence</Label>
      <Textarea
        {...register("reason")}
        id="reason"
        rows={3}
        placeholder="Write a brief explanation for leaves compliance..."
        className="resize-none"
        disabled={disabled}
      />
      <FieldError errors={[errors.reason]} />
    </Field>
  );
}
