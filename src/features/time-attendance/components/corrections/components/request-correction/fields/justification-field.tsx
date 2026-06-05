import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import type { CorrectionFormValues } from "@/features/time-attendance/validations/correction.schema";

interface JustificationFieldProps {
  register: UseFormRegister<CorrectionFormValues>;
  errors: FieldErrors<CorrectionFormValues>;
  disabled?: boolean;
}

export function JustificationField({
  register,
  errors,
  disabled,
}: JustificationFieldProps) {
  return (
    <Field className="gap-2!">
      <FieldLabel htmlFor="reason">Justification Comment</FieldLabel>
      <FieldContent>
        <Textarea
          id="reason"
          placeholder="Explain the entry swipe discrepancy detail (e.g. out of office client meeting)..."
          disabled={disabled}
          rows={3}
          {...register("reason")}
        />
        <FieldError errors={[errors.reason]} />
      </FieldContent>
    </Field>
  );
}
