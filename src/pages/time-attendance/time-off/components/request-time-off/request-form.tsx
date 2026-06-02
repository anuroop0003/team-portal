import {
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import type { TimeOffBalance } from "@/services/query/time-attendance/time-attendance.types";
import type { TimeOffFormValues } from "@/validations/time-off.schema";

import { LeaveCategoryField } from "./fields/leave-category-field";
import { HalfDayFields } from "./fields/half-day-fields";
import { DatePickerFields } from "./fields/date-picker-fields";
import { ReasonField } from "./fields/reason-field";
import { OverlapAlert } from "./fields/overlap-alert";

interface RequestFormProps {
  formId: string;
  balances: TimeOffBalance[];
  register: UseFormRegister<TimeOffFormValues>;
  control: Control<TimeOffFormValues>;
  errors: FieldErrors<TimeOffFormValues>;
  isSubmitting: boolean;
  watchStartDate?: string;
  watchHalfDay?: boolean;
}

export function RequestForm({
  formId,
  balances,
  register,
  control,
  errors,
  isSubmitting,
  watchStartDate,
  watchHalfDay = false,
}: RequestFormProps) {
  return (
    <>
      <FieldGroup className="gap-4">
        <LeaveCategoryField
          control={control}
          errors={errors}
          balances={balances}
          disabled={isSubmitting}
        />

        <HalfDayFields
          control={control}
          errors={errors}
          watchHalfDay={watchHalfDay}
          disabled={isSubmitting}
        />

        <DatePickerFields
          control={control}
          errors={errors}
          watchHalfDay={watchHalfDay}
          disabled={isSubmitting}
        />

        <ReasonField
          register={register}
          errors={errors}
          disabled={isSubmitting}
        />

        <OverlapAlert isVisible={!!watchStartDate} />
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
          Submit Request
        </Button>
      </DialogFooter>
    </>
  );
}
