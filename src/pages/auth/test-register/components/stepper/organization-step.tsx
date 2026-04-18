import { useEffect } from "react";
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

interface OrganizationStepProps {
  onNext: () => void;
}

export function OrganizationStep({ onNext }: OrganizationStepProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const organizationName = watch("organizationName");

  // Auto-generate slug from organization name
  useEffect(() => {
    if (organizationName) {
      const generatedSlug = organizationName
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
      setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [organizationName, setValue]);

  return (
    <FieldGroup className="gap-4">
      <Field className="gap-1">
        <FieldLabel htmlFor="organizationName">Organization Name*</FieldLabel>
        <Input
          {...register("organizationName")}
          spellCheck={false}
          type="text"
          id="organizationName"
          placeholder="e.g. Acme Corp"
        />
        <FieldError errors={[errors.organizationName]} />
      </Field>

      <Field className="gap-1">
        <FieldLabel htmlFor="slug">Slug*</FieldLabel>
        <Input
          {...register("slug")}
          spellCheck={false}
          type="text"
          id="slug"
          placeholder="e.g. acme-corp"
        />
        <FieldError errors={[errors.slug]} />
      </Field>

      <Field className="gap-1">
        <FieldLabel>Organization Logo (Optional)</FieldLabel>
        <LogoUploader
          label="logo"
          onFilesChange={(files) => setValue("logo", files)}
        />
      </Field>

      <Button type="button" onClick={onNext}>
        Continue
        <ArrowRight />
      </Button>
    </FieldGroup>
  );
}
