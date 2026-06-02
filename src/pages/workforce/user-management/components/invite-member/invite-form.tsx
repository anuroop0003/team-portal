import {
  type Control,
  type FieldErrors,
  type UseFormRegister,
  Controller,
} from "react-hook-form";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type AddMemberFormValues } from "@/validations/member.schema";

interface InviteFormProps {
  formId: string;
  register: UseFormRegister<AddMemberFormValues>;
  control: Control<AddMemberFormValues>;
  errors: FieldErrors<AddMemberFormValues>;
  isSubmitting: boolean;
}

const ROLE_OPTIONS = [
  { label: "Select a role", value: null },
  { label: "User", value: "user" },
  { label: "Manager", value: "manager" },
  { label: "Admin", value: "admin" },
];

export function InviteForm({
  formId,
  register,
  control,
  errors,
  isSubmitting,
}: InviteFormProps) {
  return (
    <>
      <FieldGroup className="gap-4">
        <Field className="gap-2!">
          <Label htmlFor="name">Full Name</Label>
          <Input
            {...register("name")}
            id="name"
            placeholder="John Doe"
            disabled={isSubmitting}
          />
          <FieldError errors={[errors.name]} />
        </Field>

        <Field className="gap-2!">
          <Label htmlFor="email">Email Address</Label>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="john.doe@company.com"
            disabled={isSubmitting}
          />
          <FieldError errors={[errors.email]} />
        </Field>

        <Field className="gap-2!">
          <Label htmlFor="position">Position</Label>
          <Input
            {...register("position")}
            id="position"
            placeholder="Senior Developer"
            disabled={isSubmitting}
          />
          <FieldError errors={[errors.position]} />
        </Field>

        <Field className="gap-2!">
          <Label htmlFor="role">Access Role</Label>
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <Select
                value={field.value?.label ?? null}
                onValueChange={(val) => {
                  const selectedOption = ROLE_OPTIONS.find(
                    (o) => o.value === val,
                  );
                  field.onChange(selectedOption);
                }}
                disabled={isSubmitting}
              >
                <SelectTrigger className="cursor-pointer">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {ROLE_OPTIONS.map((option) => (
                    <SelectItem
                      key={option.value}
                      className="cursor-pointer"
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={[errors.role]} />
        </Field>
      </FieldGroup>
      <DialogFooter>
        <DialogClose
          render={
            <Button variant="outline" className="cursor-pointer">
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
          <Plus />
          Invite Member
        </Button>
      </DialogFooter>
    </>
  );
}
