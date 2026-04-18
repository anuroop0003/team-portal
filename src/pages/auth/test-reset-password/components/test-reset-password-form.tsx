import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldGroup } from "@/components/ui/field";
import { useState } from "react";
import { PATHS } from "@/routes/constants/paths";

export function TestResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        <h2 className="mb-1.5 text-2xl font-semibold">Set new password</h2>
        <p className="text-muted-foreground">Must be at least 8 characters.</p>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <FieldGroup>
          <Field className="gap-1">
            <Label htmlFor="password">New Password*</Label>
            <div className="relative">
              <Input
                spellCheck={false}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••••••••••"
                className="pr-9"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent text-muted-foreground hover:text-accent-foreground"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </Field>
          <Field className="gap-1">
            <Label htmlFor="confirmPassword">Confirm Password*</Label>
            <div className="relative">
              <Input
                spellCheck={false}
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="••••••••••••••••"
                className="pr-9"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent text-muted-foreground hover:text-accent-foreground"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                type="button"
              >
                {showConfirmPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
                <span className="sr-only">
                  {showConfirmPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </Field>
          <Button type="submit" className="w-full">
            Reset Password
          </Button>
          <Button
            variant="ghost"
            render={<Link to={PATHS.AUTH.TEST_LOGIN} />}
            nativeButton={false}
            className="w-full"
          >
            Back to login
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
