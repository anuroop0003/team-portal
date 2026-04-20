import { useFormContext } from "react-hook-form";
import { Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { LogoUploader } from "../logo-uploader";
import { useRegistrationStore } from "@/store/use-registration-store";

interface AccountStepProps {
  isSubmitting?: boolean;
}

export function AccountStep({ isSubmitting }: AccountStepProps) {
  const {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    setStep,
  } = useRegistrationStore();

  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <FieldGroup className="gap-4">
      <Field className="gap-1" data-invalid={!!errors.userName}>
        <FieldLabel htmlFor="userName">Name*</FieldLabel>
        <Input
          {...register("userName")}
          aria-invalid={!!errors.userName}
          spellCheck={false}
          id="userName"
          placeholder="Enter your name"
        />
        <FieldError errors={[errors.userName]} />
      </Field>

      <Field className="gap-1" data-invalid={!!errors.userEmail}>
        <FieldLabel htmlFor="userEmail">Email address*</FieldLabel>
        <Input
          {...register("userEmail")}
          aria-invalid={!!errors.userEmail}
          type="email"
          id="userEmail"
          placeholder="Enter your email address"
        />
        <FieldError errors={[errors.userEmail]} />
      </Field>

      <FieldGroup className="flex-row gap-4">
        <Field className="gap-1" data-invalid={!!errors.password}>
          <FieldLabel htmlFor="password">Password*</FieldLabel>
          <div className="relative">
            <Input
              {...register("password")}
              aria-invalid={!!errors.password}
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              className="pr-9"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute inset-y-0 right-0 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </Button>
          </div>
          <FieldError errors={[errors.password]} />
        </Field>
        <Field className="gap-1" data-invalid={!!errors.confirmPassword}>
          <FieldLabel htmlFor="confirmPassword">Confirm Password*</FieldLabel>
          <div className="relative">
            <Input
              {...register("confirmPassword")}
              aria-invalid={!!errors.confirmPassword}
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="••••••••"
              className="pr-9"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute inset-y-0 right-0 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </Button>
          </div>
          <FieldError errors={[errors.confirmPassword]} />
        </Field>
      </FieldGroup>

      <Field className="gap-1">
        <FieldLabel>Profile Avatar (Optional)</FieldLabel>
        <LogoUploader
          label="avatar"
          onFilesChange={(files) => setValue("avatar", files)}
        />
      </Field>

      <FieldGroup className="flex-row gap-4">
        <Button
          variant="outline"
          onClick={() => setStep(1)}
          className="cursor-pointer"
        >
          <ArrowLeft />
          Back
        </Button>
        <Button
          type="submit"
          className="flex-1 cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="animate-spin" />}
          Sign up to Team Portal
        </Button>
      </FieldGroup>
    </FieldGroup>
  );
}
