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
import {
  signUpSchema,
  type SignUpFormValues,
} from "@/validations/sign-up.schema";
import SSOGroup from "./sso-group";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    console.log("Sign up data:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <Card className="w-full max-w-md rounded-2xl shadow-xl">
      <CardContent className="p-8 space-y-6">
        <Header />

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
                disabled={isSubmitting}
                className="w-full rounded-sm cursor-pointer mt-2"
              >
                {isSubmitting ? "Creating account..." : "Sign up"}
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
