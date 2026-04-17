import { useFormContext, Controller } from "react-hook-form";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Loader2 } from "lucide-react";
import type { RegisterOrganizationFormValues } from "@/validations/register-organization.schema";

interface WorkspacePreferencesStepProps {
  onBack: () => void;
  isPending: boolean;
}

const COMPANY_SIZES = [
  { value: null, label: "Select Size" },
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501-1000", label: "501-1000 employees" },
  { value: "1000+", label: "1000+ employees" },
];

const INDUSTRIES = [
  { value: null, label: "Select Industry" },
  { value: "Technology", label: "Technology" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Finance", label: "Finance" },
  { value: "Education", label: "Education" },
  { value: "Manufacturing", label: "Manufacturing" },
  { value: "Retail", label: "Retail" },
  { value: "Other", label: "Other" },
];

export function WorkspacePreferencesStep({
  onBack,
  isPending,
}: WorkspacePreferencesStepProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<RegisterOrganizationFormValues>();

  return (
    <FieldGroup>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Workspace Context</h3>
        <Badge variant="outline" className="rounded-sm px-2 py-3">
          Step 4 of 4
        </Badge>
      </div>

      <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
        <Field data-invalid={!!errors.orgIndustry}>
          <FieldLabel>Industry*</FieldLabel>
          <Controller
            name="orgIndustry"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="rounded-sm">
                  <SelectValue
                    placeholder="Select Industry"
                    className="cursor-pointer"
                  />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((item) => (
                    <SelectItem
                      key={item.value}
                      value={item.value}
                      className="cursor-pointer"
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={[errors.orgIndustry]} />
        </Field>

        <Field data-invalid={!!errors.orgCompanySize}>
          <FieldLabel>Company Size*</FieldLabel>
          <Controller
            name="orgCompanySize"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="rounded-sm">
                  <SelectValue
                    placeholder="Select Size"
                    className="cursor-pointer"
                  />
                </SelectTrigger>
                <SelectContent>
                  {COMPANY_SIZES.map((size) => (
                    <SelectItem
                      key={size.value}
                      value={size.value}
                      className="cursor-pointer"
                    >
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={[errors.orgCompanySize]} />
        </Field>
      </FieldGroup>

      {/* Terms and Conditions */}
      <Field orientation="horizontal" data-invalid={!!errors.termsAccepted}>
        <Controller
          name="termsAccepted"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="terms"
              checked={field.value}
              onCheckedChange={field.onChange}
              className="cursor-pointer"
              aria-invalid={!!errors.termsAccepted}
            />
          )}
        />
        <Label htmlFor="terms" className="cursor-pointer">
          Accept terms and conditions
        </Label>
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
          type="submit"
          disabled={isPending}
          className="rounded-sm cursor-pointer"
        >
          {isPending && <Loader2 className="animate-spin" />}
          Create Workspace
        </Button>
      </FieldGroup>
    </FieldGroup>
  );
}
