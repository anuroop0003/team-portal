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
// import Footer from "./footer";
import Header from "./header";
import {
  loginSchema,
  type LoginFormValues,
} from "@/validations/sign-in.schema";
import SSOGroup from "./sso-group";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
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
                className="bg-transparent rounded-sm"
                {...register("email")}
              />
              <FieldError errors={[errors.email]} />
            </Field>

            {/* Password */}
            <Field data-invalid={!!errors.password}>
              <div className="flex items-center justify-between">
                <FieldLabel>Password*</FieldLabel>
                <a href="#" className="text-sm hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                type="password"
                placeholder="Enter your password"
                className="bg-transparent rounded-sm"
                {...register("password")}
              />
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
                {isSubmitting ? "Logging in..." : "Log in"}
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
