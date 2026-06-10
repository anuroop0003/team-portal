import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { Field, FieldError } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TimeOffBalance } from "@/features/time-attendance/api/time-attendance.types";
import type { TimeOffFormValues } from "@/features/time-attendance/validations/time-off.schema";

interface LeaveCategoryFieldProps {
  control: Control<TimeOffFormValues>;
  errors: FieldErrors<TimeOffFormValues>;
  balances: TimeOffBalance[];
  disabled?: boolean;
}

export function LeaveCategoryField({
  control,
  errors,
  balances,
  disabled,
}: LeaveCategoryFieldProps) {
  return (
    <Field className="gap-2!">
      <Label htmlFor="leaveType">Leave Category</Label>
      <Controller
        control={control}
        name="leaveTypeId"
        render={({ field }) => (
          <Select
            value={field.value}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <SelectTrigger id="leaveType" className="cursor-pointer">
              <SelectValue placeholder="Select Leave Type" />
            </SelectTrigger>
            <SelectContent>
              {balances.map((b) => (
                <SelectItem
                  key={b.leaveTypeId}
                  value={b.leaveTypeId}
                  className="cursor-pointer"
                >
                  {b.leaveTypeName} ({b.remaining} remaining)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      <FieldError errors={[errors.leaveTypeId]} />
    </Field>
  );
}
