import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { Link } from "react-router-dom";
import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import type { ResetPasswordFormValues } from "@/validations/reset-password.schema";
import { PATHS } from "@/routes/constants/paths";

interface PasswordFormViewProps {
  register: UseFormRegister<ResetPasswordFormValues>;
  errors: FieldErrors<ResetPasswordFormValues>;
  isPending: boolean;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (show: boolean) => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export function PasswordFormView({
  register,
  errors,
  isPending,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  onSubmit,
}: PasswordFormViewProps) {
  return (
    <form onSubmit={onSubmit}>
      <FieldGroup>
        {/* New Password */}
        <Field data-invalid={!!errors.password}>
          <FieldLabel>New Password*</FieldLabel>
          <InputGroup className="rounded-sm">
            <InputGroupInput
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              {...register("password")}
            />
            <InputGroupAddon
              align="inline-end"
              className="cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </InputGroupAddon>
          </InputGroup>
          <FieldError errors={[errors.password]} />
        </Field>

        {/* Confirm Password */}
        <Field data-invalid={!!errors.confirmPassword}>
          <FieldLabel>Confirm Password*</FieldLabel>
          <InputGroup className="rounded-sm">
            <InputGroupInput
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              {...register("confirmPassword")}
            />
            <InputGroupAddon
              align="inline-end"
              className="cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />}
            </InputGroupAddon>
          </InputGroup>
          <FieldError errors={[errors.confirmPassword]} />
        </Field>

        {/* Submit */}
        <Field>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full rounded-sm cursor-pointer"
          >
            {isPending && <Loader2Icon className="animate-spin" />}
            Reset Password
          </Button>
        </Field>

        {/* Back to Login */}
        <Field>
          <p className="text-center text-xs text-muted-foreground">
            Remember your password?{" "}
            <Button
              type="button"
              variant="link"
              render={<Link to={PATHS.AUTH.SIGN_IN}>Back to Login</Link>}
              nativeButton={false}
              className="rounded-sm cursor-pointer"
            />
          </p>
        </Field>
      </FieldGroup>
    </form>
  );
}
