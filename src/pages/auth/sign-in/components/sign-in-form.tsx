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
// import Footer from "./footer";

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
    <Card className="w-full max-w-md rounded-2xl bg-foreground text-background shadow-xl">
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
                <a href="#" className="text-sm hover:underline text-blue-500">
                  Forgot password?
                </a>
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
            <FieldSeparator className="my-2.5 *:data-[slot=field-separator-content]:bg-foreground">
              or sign in with
            </FieldSeparator>

            {/* OAuth */}
            <SSOGroup />
          </FieldGroup>
        </form>

        {/* Footer */}
        {/* <Footer /> */}
      </CardContent>
    </Card>
  );
}
