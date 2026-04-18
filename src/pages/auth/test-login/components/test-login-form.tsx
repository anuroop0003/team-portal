import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Field, FieldGroup } from "@/components/ui/field";

export function TestLoginForm() {
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
            stroke-width="20"
            className="dark:stroke-black"
          ></path>
          <path
            d="M166.627 265.241L166.627 204.771C166.627 184.889 182.744 168.771 202.627 168.771L261.416 168.771"
            stroke="white"
            stroke-width="20"
            className="dark:stroke-black"
          ></path>
          <line
            x1="238.136"
            y1="98.8184"
            x2="196.76"
            y2="139.707"
            stroke="white"
            stroke-width="20"
            className="dark:stroke-black"
          ></line>
          <line
            x1="135.688"
            y1="200.957"
            x2="94.3128"
            y2="241.845"
            stroke="white"
            stroke-width="20"
            className="dark:stroke-black"
          ></line>
          <line
            x1="133.689"
            y1="137.524"
            x2="92.5566"
            y2="96.3914"
            stroke="white"
            stroke-width="20"
            className="dark:stroke-black"
          ></line>
          <line
            x1="237.679"
            y1="241.803"
            x2="196.547"
            y2="200.671"
            stroke="white"
            stroke-width="20"
            className="dark:stroke-black"
          ></line>
        </svg>
        <span className="text-xl font-semibold">shadcn/studio</span>
      </div>
      <div>
        <h2 className="mb-1.5 text-2xl font-semibold">Welcome Back</h2>
        <p className="text-muted-foreground">
          Welcome back! Select method to login:
        </p>
      </div>
      <div className="flex flex-wrap gap-4 sm:gap-6">
        <Button variant="outline" className="grow">
          Login with Google
        </Button>
        <Button variant="outline" className="grow">
          Login with Facebook
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Separator orientation="horizontal" className="flex-1" />
        <p>Or continue with Email</p>
        <Separator orientation="horizontal" className="flex-1" />
      </div>
      <div className="space-y-4">
        <form>
          <FieldGroup>
            <Field className="gap-1">
              <Label htmlFor="userEmail">Email address*</Label>
              <Input
                spellCheck={false}
                type="email"
                id="userEmail"
                placeholder="Enter your email address"
              />
            </Field>
            <Field className="gap-1">
              <Label htmlFor="password">Password*</Label>
              <div className="relative">
                <Input
                  spellCheck={false}
                  type="password"
                  id="password"
                  placeholder="••••••••••••••••"
                  className="pr-9"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent text-muted-foreground hover:text-accent-foreground"
                >
                  <Eye className="size-4" />
                  <span className="sr-only">Show password</span>
                </Button>
              </div>
            </Field>
            <FieldGroup className="flex-row gap-2">
              <Checkbox id="rememberMe" className="size-6 rounded-[4px]" />
              <Label
                htmlFor="rememberMe"
                className="text-muted-foreground font-medium"
              >
                Remember Me
              </Label>
            </FieldGroup>
            <Button type="submit" className="w-full">
              Sign in to Shadcn Studio
            </Button>
          </FieldGroup>
        </form>
        <p className="text-muted-foreground">
          New on our platform?{" "}
          <Link to="#" className="text-foreground hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
