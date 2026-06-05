import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { PATHS } from "@/routes/constants/paths";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signInSchema,
  type SignInFormValues,
} from "@/features/auth/validations/sign-in.schema";
import { useSignIn } from "@/features/auth/api/auth.query";
import { toast } from "sonner";

export function SignInForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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

  const { mutate: signIn, isPending } = useSignIn();

  const onSubmit = (data: SignInFormValues) => {
    signIn(data, {
      onSuccess: ({ access_token }) => {
        toast.success("Signed in successfully.");
        localStorage.setItem("access-token", access_token);
        navigate(PATHS.DASHBOARD);
      },
      onError: (error) => {
        const errorCode = error.response?.data?.code;

        if (errorCode === "EMAIL_NOT_VERIFIED") {
          sessionStorage.setItem("verification_email", data.email);
          navigate(PATHS.AUTH.VERIFY_EMAIL);
          toast.error(
            "Please verify your email to continue. Check your inbox.",
          );
          return;
        }

        toast.error(
          error.message || "Invalid email or password. Please try again.",
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
        <span className="text-xl font-semibold">Team Portal</span>
      </div>
      <div>
        <h2 className="mb-1.5 text-2xl font-semibold">Welcome Back</h2>
        <p className="text-muted-foreground">
          Welcome back! Select method to login:
        </p>
      </div>
      <div className="flex flex-wrap gap-4 sm:gap-6">
        <Button variant="outline" className="grow cursor-pointer">
          Login with Google
        </Button>
        <Button variant="outline" className="grow cursor-pointer">
          Login with Microsoft
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Separator orientation="horizontal" className="flex-1" />
        <p>Or continue with Email</p>
        <Separator orientation="horizontal" className="flex-1" />
      </div>
      <div className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field className="gap-2" data-invalid={!!errors.email}>
              <FieldLabel htmlFor="email">Email address*</FieldLabel>
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
            <Field className="gap-2" data-invalid={!!errors.password}>
              <Label htmlFor="password">Password*</Label>
              <div className="relative">
                <Input
                  {...register("password")}
                  spellCheck={false}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  aria-invalid={!!errors.password}
                  placeholder="••••••••••••••••"
                  className="pr-9"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute inset-y-0 right-0 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>
              <FieldError errors={[errors.password]} />
            </Field>
            <FieldGroup className="flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-2">
                <Checkbox
                  id="rememberMe"
                  className="size-6 cursor-pointer"
                  onCheckedChange={(checked) => {
                    const event = {
                      target: {
                        name: "remember",
                        value: !!checked,
                      },
                    };
                    register("remember").onChange(event);
                  }}
                />
                <Label htmlFor="rememberMe" className="cursor-pointer">
                  Remember Me
                </Label>
              </div>
              <Link
                to={PATHS.AUTH.FORGOT_PASSWORD}
                className="text-sm font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </FieldGroup>
            <Button
              type="submit"
              disabled={isPending}
              className="cursor-pointer"
            >
              {isPending && <Loader className="animate-spin" />}
              Sign In
            </Button>
          </FieldGroup>
        </form>
        <p className="text-muted-foreground text-sm">
          New on our platform?{" "}
          <Link
            to={PATHS.AUTH.REGISTER_ORGANIZATION}
            className="text-foreground hover:underline px-1"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
