import { useFormContext } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { LogoUploader } from "../logo-uploader";
import { useRegistrationStore } from "@/store/use-registration-store";

export function OrganizationStep() {
  const setStep = useRegistrationStore((state) => state.setStep);
  const {
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();

  const handleNext = async () => {
    const isValid = await trigger(["organizationName", "companyCode"]);
    if (isValid) {
      setStep(2);
    }
  };

  return (
    <FieldGroup className="gap-4">
      <Field className="gap-1" data-invalid={!!errors.organizationName}>
        <FieldLabel htmlFor="organizationName">Organization Name*</FieldLabel>
        <Input
          {...register("organizationName")}
          aria-invalid={!!errors.organizationName}
          id="organizationName"
          placeholder="e.g. Acme Corp"
        />
        <FieldError errors={[errors.organizationName]} />
      </Field>

      <Field className="gap-1" data-invalid={!!errors.companyCode}>
        <FieldLabel htmlFor="companyCode">Company Code*</FieldLabel>
        <Input
          {...register("companyCode")}
          aria-invalid={!!errors.companyCode}
          id="companyCode"
          placeholder="e.g. ACME"
          onChange={(e) => {
            setValue("companyCode", e.target.value.toUpperCase(), {
              shouldValidate: true,
            });
          }}
        />
        <FieldError errors={[errors.companyCode]} />
      </Field>

      <Field className="gap-1">
        <FieldLabel>Organization Logo (Optional)</FieldLabel>
        <LogoUploader
          label="logo"
          onFilesChange={(files) => setValue("logo", files)}
        />
      </Field>

      <Button onClick={handleNext} className="cursor-pointer">
        Continue
        <ArrowRight />
      </Button>
    </FieldGroup>
  );
}
