import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import ResetPasswordHeader from "./header";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/validations/reset-password.schema";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useResetPassword } from "@/services/query/auth/auth.query";
import { PATHS } from "@/routes/constants/paths";
import { AuthAlert } from "../../components/auth-alert";
import { InvalidLinkView } from "./invalid-link-view";
import { ResetSuccessView } from "./reset-success-view";
import { PasswordFormView } from "./password-form-view";

export function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const { mutateAsync, isPending, isSuccess, error } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!token) return;

    await mutateAsync({ token, data });
    setTimeout(() => {
      navigate(PATHS.AUTH.SIGN_IN);
    }, 3000);
  };

  const renderContent = () => {
    if (!token && !isSuccess) {
      return <InvalidLinkView />;
    }

    if (isSuccess) {
      return <ResetSuccessView />;
    }

    return (
      <>
        <ResetPasswordHeader />

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
            description="Password updated successfully. Redirecting to sign in..."
          />
        )}

        <PasswordFormView
          register={register}
          errors={errors}
          isPending={isPending}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
          onSubmit={handleSubmit(onSubmit)}
        />
      </>
    );
  };

  return (
    <Card className="w-full max-w-md rounded-2xl shadow-xl bg-card/95 backdrop-blur-md border border-border/60">
      <CardContent className="p-8 space-y-6">{renderContent()}</CardContent>
    </Card>
  );
}
