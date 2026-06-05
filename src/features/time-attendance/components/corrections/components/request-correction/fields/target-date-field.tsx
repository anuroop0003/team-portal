import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldError } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import type { CorrectionFormValues } from "@/features/time-attendance/validations/correction.schema";

interface TargetDateFieldProps {
  control: Control<CorrectionFormValues>;
  errors: FieldErrors<CorrectionFormValues>;
  disabled?: boolean;
}

export function TargetDateField({
  control,
  errors,
  disabled,
}: TargetDateFieldProps) {
  return (
    <Field className="gap-2!">
      <Label htmlFor="date">Target Date</Label>
      <FieldContent>
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    variant="outline"
                    data-empty={!field.value}
                    className="w-full cursor-pointer justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                    disabled={disabled}
                  />
                }
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? (
                  format(new Date(field.value), "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  className="cursor-pointer"
                  classNames={{
                    day_button: "cursor-pointer",
                    day: "cursor-pointer",
                    button_next: "cursor-pointer",
                    button_previous: "cursor-pointer",
                  }}
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={(date) =>
                    field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                  }
                />
              </PopoverContent>
            </Popover>
          )}
        />
        <FieldError errors={[errors.date]} />
      </FieldContent>
    </Field>
  );
}
