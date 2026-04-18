import { useFormContext } from "react-hook-form";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { LogoUploader } from "../logo-uploader";

interface AccountStepProps {
  onPrev: () => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

export function AccountStep({
  onPrev,
  showPassword,
  setShowPassword,
}: AccountStepProps) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <FieldGroup className="gap-4">
      <Field className="gap-1">
        <FieldLabel htmlFor="userName">Name*</FieldLabel>
        <Input
          {...register("userName")}
          spellCheck={false}
          type="text"
          id="userName"
          placeholder="Enter your name"
        />
        <FieldError errors={[errors.userName]} />
      </Field>

      <Field className="gap-1">
        <FieldLabel htmlFor="userEmail">Email address*</FieldLabel>
        <Input
          {...register("userEmail")}
          spellCheck={false}
          type="email"
          id="userEmail"
          placeholder="Enter your email address"
        />
        <FieldError errors={[errors.userEmail]} />
      </Field>

      <FieldGroup className="flex-row gap-4">
        <Field className="gap-1">
          <FieldLabel htmlFor="password">Password*</FieldLabel>
          <div className="relative">
            <Input
              {...register("password")}
              spellCheck={false}
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              className="pr-9"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute inset-y-0 right-0"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </Button>
          </div>
          <FieldError errors={[errors.password]} />
        </Field>
        <Field className="gap-1">
          <FieldLabel htmlFor="confirmPassword">Confirm Password*</FieldLabel>
          <div className="relative">
            <Input
              {...register("confirmPassword")}
              spellCheck={false}
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="••••••••"
              className="pr-9"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute inset-y-0 right-0"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
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
        <Button type="button" variant="outline" onClick={onPrev}>
          <ArrowLeft />
          Back
        </Button>
        <Button type="submit" className="flex-1">
          Sign up to Shadcn Studio
        </Button>
      </FieldGroup>
    </FieldGroup>
  );
}
