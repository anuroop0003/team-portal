import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { ArrowLeft, ArrowRight, EyeIcon, EyeOffIcon } from "lucide-react";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { RegisterOrganizationFormValues } from "@/validations/register-organization.schema";

interface SecurityStepProps {
  onNext: () => Promise<void>;
  onBack: () => void;
}

export function SecurityStep({ onNext, onBack }: SecurityStepProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegisterOrganizationFormValues>();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  return (
    <FieldGroup>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Account Security</h3>
        <Badge variant="outline" className="rounded-sm px-2 py-3">
          Step 2 of 4
        </Badge>
      </div>

      <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
        <Field data-invalid={!!errors.password}>
          <FieldLabel>Password*</FieldLabel>
          <InputGroup className="rounded-sm">
            <InputGroupInput
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
              {...register("password")}
            />
            <InputGroupAddon
              align="inline-end"
              className="cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </InputGroupAddon>
          </InputGroup>
          <FieldError errors={[errors.password]} />
        </Field>

        <Field data-invalid={!!errors.confirmPassword}>
          <FieldLabel>Confirm Password*</FieldLabel>
          <InputGroup className="rounded-sm">
            <InputGroupInput
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Repeat password"
              {...register("confirmPassword")}
            />
            <InputGroupAddon
              align="inline-end"
              className="cursor-pointer"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />}
            </InputGroupAddon>
          </InputGroup>
          <FieldError errors={[errors.confirmPassword]} />
        </Field>
      </FieldGroup>

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
