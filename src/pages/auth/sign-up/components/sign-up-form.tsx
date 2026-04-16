import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldError,
} from "@/components/ui/field";
import Header from "./header";
import { signUpSchema } from "@/validations/sign-up.schema";
import type { SignUpFormValues } from "@/validations/sign-up.schema";
import SSOGroup from "./sso-group";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/routes/constants/paths";
import { useSignUp } from "@/services/query/auth/auth.query";
import { AuthAlert } from "../../components/auth-alert";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const { mutateAsync, error, isSuccess, isPending } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      companyName: "",
      orgInitial: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    await mutateAsync(data);
    setTimeout(() => {
      navigate(PATHS.AUTH.VERIFY_EMAIL);
    }, 3000);
  };

  return (
    <Card className="w-full max-w-md rounded-2xl shadow-xl bg-card/95 backdrop-blur-md border border-border/60">
      <CardContent className="p-8 space-y-6">
        <Header />

        {error && (
          <AuthAlert
            variant="destructive"
            description={
              error?.message || "Registration failed. Please try again."
            }
          />
        )}

        {isSuccess && (
          <AuthAlert
            variant="success"
            description="Your organization and admin account have been created. Please check your email to verify your account."
          />
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="gap-3">
            {/* Full Name */}
            <Field data-invalid={!!errors.fullName}>
              <FieldLabel>Full Name*</FieldLabel>
              <Input
                placeholder="John Doe"
                className="rounded-sm"
                {...register("fullName")}
              />
              <FieldError errors={[errors.fullName]} />
            </Field>

            {/* Company Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Field
                data-invalid={!!errors.companyName}
                className="md:col-span-2"
              >
                <FieldLabel>Company Name*</FieldLabel>
                <Input
                  placeholder="Acme Inc."
                  className="rounded-sm"
                  {...register("companyName")}
                />
                <FieldError errors={[errors.companyName]} />
              </Field>

              <Field data-invalid={!!errors.orgInitial}>
                <FieldLabel>Initials*</FieldLabel>
                <Input
                  placeholder="ACME"
                  className="rounded-sm uppercase"
                  {...register("orgInitial")}
                />
                <FieldError errors={[errors.orgInitial]} />
              </Field>
            </div>

            {/* Email */}
            <Field data-invalid={!!errors.email}>
              <FieldLabel>Email*</FieldLabel>
              <Input
                type="email"
                placeholder="example@shadcnspace.com"
                className="rounded-sm"
                {...register("email")}
              />
              <FieldError errors={[errors.email]} />
            </Field>

            {/* Password */}
            <Field data-invalid={!!errors.password}>
              <FieldLabel>Password*</FieldLabel>
              <InputGroup className="rounded-sm">
                <InputGroupInput
                  id="inline-end-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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

            {/* Submit */}
            <Field>
              <Button
                type="submit"
                disabled={isPending}
                className="w-full rounded-sm cursor-pointer"
              >
                {isPending ? "Setting up workspace" : "Create Workspace"}
              </Button>
            </Field>

            {/* Divider */}
            <FieldSeparator className="my-2.5 *:data-[slot=field-separator-content]:bg-card">
              or sign up with
            </FieldSeparator>

            {/* OAuth */}
            <SSOGroup />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
