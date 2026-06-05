import {
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import type { CorrectionFormValues } from "@/features/time-attendance/validations/correction.schema";

import { TargetDateField } from "./fields/target-date-field";
import { OriginalTimesFields } from "./fields/original-times-fields";
import { CorrectedTimesFields } from "./fields/corrected-times-fields";
import { JustificationField } from "./fields/justification-field";

interface CorrectionFormProps {
  formId: string;
  register: UseFormRegister<CorrectionFormValues>;
  control: Control<CorrectionFormValues>;
  errors: FieldErrors<CorrectionFormValues>;
  isSubmitting: boolean;
}

export function CorrectionForm({
  formId,
  register,
  control,
  errors,
  isSubmitting,
}: CorrectionFormProps) {
  return (
    <>
      <FieldGroup className="gap-4">
        <TargetDateField
          control={control}
          errors={errors}
          disabled={isSubmitting}
        />

        <OriginalTimesFields
          register={register}
          errors={errors}
          disabled={isSubmitting}
        />

        <CorrectedTimesFields
          register={register}
          errors={errors}
          disabled={isSubmitting}
        />

        <JustificationField
          register={register}
          errors={errors}
          disabled={isSubmitting}
        />
      </FieldGroup>

      <DialogFooter>
        <DialogClose
          render={
            <Button type="button" variant="outline" className="cursor-pointer">
              Cancel
            </Button>
          }
        />
        <Button
          form={formId}
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer"
        >
          Submit Adjustment
        </Button>
      </DialogFooter>
    </>
  );
}
