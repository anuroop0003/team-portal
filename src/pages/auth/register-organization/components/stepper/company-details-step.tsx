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
import type { RegisterOrganizationFormValues } from "@/validations/register-organization.schema";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface CompanyDetailsStepProps {
  onNext: () => Promise<void>;
  onBack: () => void;
}

export function CompanyDetailsStep({
  onNext,
  onBack,
}: CompanyDetailsStepProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegisterOrganizationFormValues>();

  return (
    <FieldGroup>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Workspace Details</h3>
        <Badge variant="outline" className="rounded-sm px-2 py-3">
          Step 3 of 4
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Field data-invalid={!!errors.companyName} className="md:col-span-2">
          <FieldLabel>Company Name*</FieldLabel>
          <Input
            placeholder="Acme Inc."
            className="rounded-sm"
            {...register("companyName")}
          />
          <FieldError errors={[errors.companyName]} />
        </Field>

        <Field data-invalid={!!errors.orgCode}>
          <FieldLabel>Company Code*</FieldLabel>
          <Input
            placeholder="ACME"
            className="rounded-sm uppercase"
            {...register("orgCode")}
          />
          <FieldError errors={[errors.orgCode]} />
        </Field>
      </div>

      <Field data-invalid={!!errors.orgWebsite}>
        <FieldLabel>Company Website (Optional)</FieldLabel>
        <Input
          placeholder="https://acme.com"
          className="rounded-sm"
          {...register("orgWebsite")}
        />
        <FieldError errors={[errors.orgWebsite]} />
      </Field>

      <FieldGroup className="flex flex-row justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="rounded-sm cursor-pointer"
        >
          <ArrowLeft />
          Back
        </Button>
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
  );
}
