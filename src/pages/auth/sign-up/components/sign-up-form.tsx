import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Link } from "react-router-dom";
import { PATHS } from "@/routes/constants/paths";

const signUpSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export function SignUpForm() {
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
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <Card className="w-full max-w-md rounded-2xl bg-foreground text-background shadow-xl">
      <CardContent className="p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <p className="text-sm text-background/60">
            Enter your details to join us
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="gap-3">
            <Field data-invalid={!!errors.fullName}>
              <FieldLabel>Full Name*</FieldLabel>
              <Input
                placeholder="John Doe"
                className="bg-transparent rounded-sm"
                {...register("fullName")}
              />
              <FieldError errors={[errors.fullName]} />
            </Field>

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

            <Field data-invalid={!!errors.password}>
              <FieldLabel>Password*</FieldLabel>
              <Input
                type="password"
                placeholder="********"
                className="bg-transparent rounded-sm"
                {...register("password")}
              />
              <FieldError errors={[errors.password]} />
            </Field>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-sm cursor-pointer mt-4"
            >
              {isSubmitting ? "Creating account..." : "Sign Up"}
            </Button>

            <p className="text-center text-sm text-background/60 mt-4">
              Already have an account?{" "}
              <Link
                to={PATHS.AUTH.SIGN_IN}
                className="text-background font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
