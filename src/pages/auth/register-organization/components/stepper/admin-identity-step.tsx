import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import type { RegisterOrganizationFormValues } from "@/validations/register-organization.schema";

interface AdminIdentityStepProps {
  onNext: () => Promise<void>;
}

export function AdminIdentityStep({ onNext }: AdminIdentityStepProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegisterOrganizationFormValues>();

  return (
    <FieldGroup>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Administrator Profile</h3>
        <Badge variant="outline" className="rounded-sm px-2 py-3">
          Step 1 of 4
        </Badge>
      </div>

      <FieldGroup>
        <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
          <Field data-invalid={!!errors.fullName}>
            <FieldLabel>Full Name*</FieldLabel>
            <Input
              placeholder="John Doe"
              className="rounded-sm"
              {...register("fullName")}
            />
            <FieldError errors={[errors.fullName]} />
          </Field>

          <Field data-invalid={!!errors.adminJobTitle}>
            <FieldLabel>Job Title*</FieldLabel>
            <Input
              placeholder="HR Manager"
              className="rounded-sm"
              {...register("adminJobTitle")}
            />
            <FieldError errors={[errors.adminJobTitle]} />
          </Field>
        </FieldGroup>

        <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
          <Field data-invalid={!!errors.email}>
            <FieldLabel>Work Email*</FieldLabel>
            <Input
              type="email"
              placeholder="example@company.com"
              className="rounded-sm"
              {...register("email")}
            />
            <FieldError errors={[errors.email]} />
          </Field>

          <Field data-invalid={!!errors.adminPhone}>
            <FieldLabel>Phone Number*</FieldLabel>
            <Input
              placeholder="+1 234 567 890"
              className="rounded-sm"
              {...register("adminPhone")}
            />
            <FieldError errors={[errors.adminPhone]} />
          </Field>
        </FieldGroup>

        <FieldGroup className="flex flex-row justify-end">
          <Button
            type="button"
            onClick={onNext}
            className="rounded-sm cursor-pointer"
          >
            Continue
            <ArrowRight />
          </Button>
        </FieldGroup>
      </FieldGroup>
    </FieldGroup>
  );
}
