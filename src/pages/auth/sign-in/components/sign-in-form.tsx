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
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "./header";
import { signInSchema } from "@/validations/sign-in.schema";
import type { SignInFormValues } from "@/validations/sign-in.schema";
import SSOGroup from "./sso-group";
import { useState } from "react";
import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "@/routes/constants/paths";
import { useSignIn } from "@/services/query/auth/auth.query";
import { AuthAlert } from "../../components/auth-alert";

export function SignInForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();
  const { mutateAsync, isPending, error, isSuccess } = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    try {
      const response = await mutateAsync(data);
      localStorage.setItem("token", response.access_token);
      setTimeout(() => {
        navigate(PATHS.DASHBOARD);
      }, 3000);
    } catch (err) {
      // Error is handled by useSignIn
    }
  };

  return (
    <Card className="w-full max-w-md rounded-2xl shadow-xl bg-card/95 backdrop-blur-md border border-border/60">
      <CardContent className="p-8 space-y-6">
        <Header />

        {error && (
          <AuthAlert
            variant="destructive"
            description={error?.message || "Invalid email or password"}
          />
        )}

        {isSuccess && (
          <AuthAlert
            variant="success"
            description="Welcome back. Redirecting to your dashboard..."
          />
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
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
              <div className="flex items-center justify-between">
                <FieldLabel>Password*</FieldLabel>
                <Link
                  to={PATHS.AUTH.FORGOT_PASSWORD}
                  className="text-xs hover:underline hover:underline-offset-4 text-primary"
                >
                  Forgot password?
                </Link>
              </div>
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

            {/* Remember */}
            <Field orientation="horizontal">
              <Checkbox
                id="remember-checkbox"
                className="cursor-pointer"
                {...register("remember")}
              />
              <Label htmlFor="remember-checkbox" className="cursor-pointer">
                Remember this device
              </Label>
            </Field>

            {/* Submit */}
            <Field>
              <Button
                type="submit"
                disabled={isPending || isSuccess}
                className="w-full rounded-sm cursor-pointer"
              >
                {isPending && <Loader2Icon className="animate-spin" />}
                Sign in
              </Button>
            </Field>

            {/* Divider */}
            <FieldSeparator className="my-2.5 *:data-[slot=field-separator-content]:bg-card">
              or sign in with
            </FieldSeparator>

            {/* OAuth */}
            <SSOGroup />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
