import { Controller, type Control, type FieldErrors } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldContent,
  FieldTitle,
  FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { TimeOffFormValues } from "@/validations/time-off.schema";

interface HalfDayFieldsProps {
  control: Control<TimeOffFormValues>;
  errors: FieldErrors<TimeOffFormValues>;
  watchHalfDay: boolean;
  disabled?: boolean;
}

export function HalfDayFields({
  control,
  errors,
  watchHalfDay,
  disabled,
}: HalfDayFieldsProps) {
  return (
    <>
      {/* Half Day Switch Toggle */}
      <FieldLabel className="cursor-pointer">
        <Field orientation="horizontal" className="gap-2!">
          <FieldContent>
            <FieldTitle>Half Day Request</FieldTitle>
            <p className="text-xs text-muted-foreground">
              Request partial shift availability for a single calendar day.
            </p>
          </FieldContent>
          <Controller
            control={control}
            name="halfDay"
            render={({ field }) => (
              <Switch
                id="halfDay"
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={disabled}
              />
            )}
          />
        </Field>
      </FieldLabel>

      {/* Session selection */}
      {watchHalfDay && (
        <Field className="gap-2">
          <Controller
            control={control}
            name="halfDaySession"
            render={({ field }) => (
              <RadioGroup
                value={field.value || ""}
                onValueChange={field.onChange}
                className="grid grid-cols-2 gap-4"
                disabled={disabled}
              >
                <FieldLabel htmlFor="morning" className="cursor-pointer">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>First Half</FieldTitle>
                    </FieldContent>
                    <RadioGroupItem value="morning" id="morning" />
                  </Field>
                </FieldLabel>
                <FieldLabel htmlFor="afternoon" className="cursor-pointer">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Second Half</FieldTitle>
                    </FieldContent>
                    <RadioGroupItem value="afternoon" id="afternoon" />
                  </Field>
                </FieldLabel>
              </RadioGroup>
            )}
          />
          <FieldError errors={[errors.halfDaySession]} />
        </Field>
      )}
    </>
  );
}
