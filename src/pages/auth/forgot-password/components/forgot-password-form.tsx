import { Link } from "react-router-dom";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { PATHS } from "@/routes/constants/paths";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/validations/forgot-password.schema";
import { useForgotPassword } from "@/services/query/auth/auth.query";
import { toast } from "sonner";

export function ForgotPasswordForm() {
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

  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const onSubmit = (data: ForgotPasswordFormValues) => {
    forgotPassword(data, {
      onSuccess: (response) => {
        if (response.link) {
          console.log("RESET LINK:", response.link);
        }
        toast.success(
          "If an account exists with this email, you'll receive reset instructions shortly. Please check your inbox and spam folder.",
        );
      },
      onError: (error) => {
        toast.error(
          error.message ||
            "We couldn't process your request. Please try again in a moment.",
        );
      },
    });
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
        <span className="text-xl font-semibold">shadcn/studio</span>
      </div>
      <div>
        <h2 className="mb-1.5 text-2xl font-semibold">Forgot Password?</h2>
        <p className="text-muted-foreground">
          No worries, we'll send you reset instructions.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Field className="gap-1" data-invalid={!!errors.email}>
            <Label htmlFor="email">Email address*</Label>
            <Input
              {...register("email")}
              spellCheck={false}
              type="email"
              id="email"
              aria-invalid={!!errors.email}
              placeholder="Enter your email address"
            />
            <FieldError errors={[errors.email]} />
          </Field>
          <FieldGroup className="gap-2!">
            <Button
              type="submit"
              disabled={isPending}
              className="cursor-pointer"
            >
              {isPending && <Loader className="animate-spin" />}
              Send Reset Link
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
