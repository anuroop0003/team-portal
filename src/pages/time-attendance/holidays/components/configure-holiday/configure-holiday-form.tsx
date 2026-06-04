import {
  type Control,
  type FieldErrors,
  type UseFormRegister,
  Controller,
} from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldContent,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import type { HolidayFormValues } from "@/validations/holiday.schema";

interface ConfigureHolidayFormProps {
  formId: string;
  register: UseFormRegister<HolidayFormValues>;
  control: Control<HolidayFormValues>;
  errors: FieldErrors<HolidayFormValues>;
  isSubmitting: boolean;
  submitLabel: string;
}

export function ConfigureHolidayForm({
  formId,
  register,
  control,
  errors,
  isSubmitting,
  submitLabel,
}: ConfigureHolidayFormProps) {
  return (
    <>
      <FieldGroup className="gap-4">
        {/* Holiday Title */}
        <Field className="gap-2!">
          <FieldLabel htmlFor="name">Holiday Title</FieldLabel>
          <Input
            id="name"
            placeholder="e.g. Labor Day"
            disabled={isSubmitting}
            {...register("name")}
          />
          <FieldError errors={[errors.name]} />
        </Field>

        {/* Date and Category Row */}
        <FieldGroup className="grid grid-cols-2">
          {/* Calendar Date */}
          <Field className="gap-2!">
            <FieldLabel htmlFor="date">Calendar Date</FieldLabel>
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
                          disabled={isSubmitting}
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
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        className="cursor-pointer"
                        classNames={{
                          day_button: "cursor-pointer",
                          day: "cursor-pointer",
                          button_next: "cursor-pointer",
                          button_previous: "cursor-pointer",
                        }}
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
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

          {/* Holiday Category */}
          <Field className="gap-2!">
            <FieldLabel htmlFor="type">Holiday Category</FieldLabel>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isSubmitting}
                >
                  <SelectTrigger id="type" className="cursor-pointer">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public" className="cursor-pointer">
                      National Public
                    </SelectItem>
                    <SelectItem value="restricted" className="cursor-pointer">
                      Restricted / Optional
                    </SelectItem>
                    <SelectItem
                      value="company-specific"
                      className="cursor-pointer"
                    >
                      Company Specific
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[errors.type]} />
          </Field>
        </FieldGroup>

        {/* Location Scope */}
        <Field className="gap-2!">
          <FieldLabel htmlFor="locationScope">Location Scope</FieldLabel>
          <Input
            id="locationScope"
            placeholder="e.g. US Region or All offices"
            disabled={isSubmitting}
            {...register("locationScope")}
          />
          <FieldError errors={[errors.locationScope]} />
        </Field>

        {/* Paid Holiday */}
        <FieldLabel className="cursor-pointer">
          <Field orientation="horizontal" className="gap-2!">
            <FieldContent>
              <FieldTitle>Paid Holiday</FieldTitle>
              <p className="text-xs text-muted-foreground">
                Are employees compensated during this holiday?
              </p>
            </FieldContent>
            <Controller
              control={control}
              name="isPaid"
              render={({ field }) => (
                <Switch
                  id="isPaid"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                />
              )}
            />
          </Field>
        </FieldLabel>
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
          {submitLabel}
        </Button>
      </DialogFooter>
    </>
  );
}
