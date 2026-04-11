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
import {
  signInSchema,
  type SignInFormValues,
} from "@/validations/sign-in.schema";
import SSOGroup from "./sso-group";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Link } from "react-router-dom";
import { PATHS } from "@/routes/constants/paths";

export function SignInForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    console.log("Form submitted:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <Card className="w-full max-w-md rounded-2xl shadow-xl bg-card/95 backdrop-blur-md border border-border/60">
      <CardContent className="p-8 space-y-6">
        <Header />

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="gap-3">
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
                  className="text-sm hover:underline hover:underline-offset-4 text-primary"
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
            <Field
              orientation="horizontal"
              className="cursor-pointer select-none my-1"
            >
              <Checkbox id="remember-checkbox" {...register("remember")} />
              <Label htmlFor="remember-checkbox">Remember this device</Label>
            </Field>

            {/* Submit */}
            <Field>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-sm cursor-pointer"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
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
