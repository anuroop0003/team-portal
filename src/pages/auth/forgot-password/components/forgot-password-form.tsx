import { useForm } from "react-hook-form";
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
import ForgotPasswordHeader from "./header";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/validations/forgot-password.schema";
import { Loader2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { PATHS } from "@/routes/constants/paths";
import { useForgotPassword } from "@/services/query/auth/auth.query";
import { AuthAlert } from "../../components/auth-alert";

export function ForgotPasswordForm() {
  const { mutateAsync, isPending, isSuccess, error } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    await mutateAsync(data);
  };

  return (
    <Card className="w-full max-w-md rounded-2xl shadow-xl bg-card/95 backdrop-blur-md border border-border/60">
      <CardContent className="p-8 space-y-6">
        <ForgotPasswordHeader />

        {error && (
          <AuthAlert
            variant="destructive"
            description={
              error?.message || "Something went wrong. Please try again."
            }
          />
        )}

        {isSuccess && (
          <AuthAlert
            variant="success"
            description="If an account exists with that email, you will receive a password reset link shortly."
          />
        )}

        {/* Form */}
        {!isSuccess && (
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

              {/* Submit */}
              <Field>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full rounded-sm cursor-pointer"
                >
                  {isPending && <Loader2Icon className="animate-spin" />}
                  {isPending ? "Sending link" : "Forgot password"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        )}

        {/* Footer Link */}
        <p className="text-center text-xs text-muted-foreground">
          Remember your password?{" "}
          <Button
            type="button"
            variant="link"
            render={<Link to={PATHS.AUTH.SIGN_IN}>Back to Login</Link>}
            className="rounded-sm cursor-pointer"
          />
        </p>
      </CardContent>
    </Card>
  );
}
