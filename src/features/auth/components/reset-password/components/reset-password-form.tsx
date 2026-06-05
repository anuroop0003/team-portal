import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { useState } from "react";
import { PATHS } from "@/routes/constants/paths";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/features/auth/validations/reset-password.schema";
import { useResetPassword } from "@/features/auth/api/auth.query";
import { toast } from "sonner";

export function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") || "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const { mutate: resetPassword, isPending } = useResetPassword();

  const onSubmit = (data: ResetPasswordFormValues) => {
    if (!token) {
      toast.error("Invalid token", {
        description: "Password reset token is missing or invalid.",
      });
      return;
    }

    resetPassword(
      { token, data },
      {
        onSuccess: () => {
          toast.success("Password reset successfully", {
            description: "You can now log in with your new password.",
          });
          navigate(PATHS.AUTH.SIGN_IN);
        },
        onError: (error) => {
          toast.error("Reset failed", {
            description: error.message || "Something went wrong.",
          });
        },
      },
    );
  };

  return (
    <div className="flex w-full flex-col gap-6 p-6 sm:max-w-lg">
      <div className="flex items-center gap-3">
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 328 329"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-8.5"
        >
          <rect
            y="0.5"
            width="328"
            height="328"
            rx="164"
            fill="black"
            className="dark:fill-white"
          ></rect>
          <path
            d="M165.018 72.3008V132.771C165.018 152.653 148.9 168.771 129.018 168.771H70.2288"
            stroke="white"
            strokeWidth="20"
            className="dark:stroke-black"
          ></path>
          <path
            d="M166.627 265.241L166.627 204.771C166.627 184.889 182.744 168.771 202.627 168.771L261.416 168.771"
            stroke="white"
            strokeWidth="20"
            className="dark:stroke-black"
          ></path>
          <line
            x1="238.136"
            y1="98.8184"
            x2="196.76"
            y2="139.707"
            stroke="white"
            strokeWidth="20"
            className="dark:stroke-black"
          ></line>
          <line
            x1="135.688"
            y1="200.957"
            x2="94.3128"
            y2="241.845"
            stroke="white"
            strokeWidth="20"
            className="dark:stroke-black"
          ></line>
          <line
            x1="133.689"
            y1="137.524"
            x2="92.5566"
            y2="96.3914"
            stroke="white"
            strokeWidth="20"
            className="dark:stroke-black"
          ></line>
          <line
            x1="237.679"
            y1="241.803"
            x2="196.547"
            y2="200.671"
            stroke="white"
            strokeWidth="20"
            className="dark:stroke-black"
          ></line>
        </svg>
        <span className="text-xl font-semibold">Team Portal</span>
      </div>
      <div>
        <h2 className="mb-1.5 text-2xl font-semibold">Set new password</h2>
        <p className="text-muted-foreground">Must be at least 8 characters.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Field className="gap-2" data-invalid={!!errors.password}>
            <Label htmlFor="password">New Password*</Label>
            <div className="relative">
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                id="password"
                aria-invalid={!!errors.password}
                placeholder="••••••••••••••••"
                className="pr-9"
              />
              <Button
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
          <Field className="gap-2" data-invalid={!!errors.confirmPassword}>
            <Label htmlFor="confirmPassword">Confirm Password*</Label>
            <div className="relative">
              <Input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                aria-invalid={!!errors.confirmPassword}
                placeholder="••••••••••••••••"
                className="pr-9"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute inset-y-0 right-0"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>
            <FieldError errors={[errors.confirmPassword]} />
          </Field>
          <FieldGroup className="gap-2!">
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isPending}
            >
              {isPending && <Loader className="animate-spin" />}
              Reset Password
            </Button>
            <Button
              variant="ghost"
              render={<Link to={PATHS.AUTH.SIGN_IN} />}
              nativeButton={false}
            >
              Back to login
            </Button>
          </FieldGroup>
        </FieldGroup>
      </form>
    </div>
  );
}
