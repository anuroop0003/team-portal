import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { CorrectionFormValues } from "@/validations/correction.schema";

interface OriginalTimesFieldsProps {
  register: UseFormRegister<CorrectionFormValues>;
  errors: FieldErrors<CorrectionFormValues>;
  disabled?: boolean;
}

export function OriginalTimesFields({
  register,
  errors,
  disabled,
}: OriginalTimesFieldsProps) {
  return (
    <FieldGroup className="grid grid-cols-2">
      <Field className="gap-2!">
        <FieldLabel htmlFor="origIn">Original In</FieldLabel>
        <FieldContent>
          <Input
            id="origIn"
            placeholder="09:35 AM"
            disabled={disabled}
            {...register("origIn")}
          />
          <FieldError errors={[errors.origIn]} />
        </FieldContent>
      </Field>

      <Field className="gap-2!">
        <FieldLabel htmlFor="origOut">Original Out</FieldLabel>
        <FieldContent>
          <Input
            id="origOut"
            placeholder="06:00 PM"
            disabled={disabled}
            {...register("origOut")}
          />
          <FieldError errors={[errors.origOut]} />
        </FieldContent>
      </Field>
    </FieldGroup>
  );
}
