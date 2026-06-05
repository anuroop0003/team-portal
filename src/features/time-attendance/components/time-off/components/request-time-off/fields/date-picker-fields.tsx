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
import { Field, FieldGroup, FieldError } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import type { TimeOffFormValues } from "@/features/time-attendance/validations/time-off.schema";

interface DatePickerFieldsProps {
  control: Control<TimeOffFormValues>;
  errors: FieldErrors<TimeOffFormValues>;
  watchHalfDay: boolean;
  disabled?: boolean;
}

export function DatePickerFields({
  control,
  errors,
  watchHalfDay,
  disabled,
}: DatePickerFieldsProps) {
  return (
    <FieldGroup className="grid grid-cols-2">
      <Field className="gap-2!">
        <Label htmlFor="startDate">Start Date</Label>
        <Controller
          control={control}
          name="startDate"
          render={({ field }) => (
            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    variant="outline"
                    data-empty={!field.value}
                    className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground w-full cursor-pointer"
                    disabled={disabled}
                  />
                }
              >
                <CalendarIcon />
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
        <FieldError errors={[errors.startDate]} />
      </Field>

      {!watchHalfDay && (
        <Field className="gap-2!">
          <Label htmlFor="endDate">End Date</Label>
          <Controller
            control={control}
            name="endDate"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      variant="outline"
                      data-empty={!field.value}
                      className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground w-full cursor-pointer"
                      disabled={disabled}
                    />
                  }
                >
                  <CalendarIcon />
                  {field.value ? (
                    format(new Date(field.value), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) =>
                      field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                    }
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          <FieldError errors={[errors.endDate]} />
        </Field>
      )}
    </FieldGroup>
  );
}
