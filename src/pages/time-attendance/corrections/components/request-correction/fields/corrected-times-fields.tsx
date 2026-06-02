import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { CorrectionFormValues } from "@/validations/correction.schema";
import { Label } from "@/components/ui/label";

interface CorrectedTimesFieldsProps {
  register: UseFormRegister<CorrectionFormValues>;
  errors: FieldErrors<CorrectionFormValues>;
  disabled?: boolean;
}

export function CorrectedTimesFields({
  register,
  errors,
  disabled,
}: CorrectedTimesFieldsProps) {
  return (
    <FieldGroup className="grid grid-cols-2">
      <Field className="gap-2!">
        <Label htmlFor="reqIn">Corrected In</Label>
        <FieldContent>
          <Input
            id="reqIn"
            placeholder="09:00 AM"
            disabled={disabled}
            {...register("reqIn")}
          />
          <FieldError errors={[errors.reqIn]} />
        </FieldContent>
      </Field>

      <Field className="gap-2!">
        <Label htmlFor="reqOut">Corrected Out</Label>
        <FieldContent>
          <Input
            id="reqOut"
            placeholder="06:00 PM"
            disabled={disabled}
            {...register("reqOut")}
          />
          <FieldError errors={[errors.reqOut]} />
        </FieldContent>
      </Field>
    </FieldGroup>
  );
}
