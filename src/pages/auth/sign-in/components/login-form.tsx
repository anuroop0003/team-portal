import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";

export function LoginForm() {
  return (
    <Card className="w-full max-w-md rounded-2xl bg-[#020817] text-white border border-white/10 shadow-xl">
      <CardContent className="p-8 space-y-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white" />
          <span className="text-lg font-semibold">shadcnspace.</span>
        </div>

        {/* Heading */}
        <div>
          <h2 className="text-2xl font-semibold">Login to Shadcnspace</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Don&apos;t have an account?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Sign up for free
            </a>
          </p>
        </div>

        {/* Form */}
        <form>
          <FieldGroup className="space-y-4">
            {/* Email */}
            <Field>
              <FieldLabel>Email*</FieldLabel>
              <Input
                type="email"
                placeholder="example@shadcnspace.com"
                className="bg-transparent border-white/20 focus-visible:ring-0"
              />
            </Field>

            {/* Password */}
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel>Password*</FieldLabel>
                <a href="#" className="text-sm hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                type="password"
                placeholder="Enter your password"
                className="bg-transparent border-white/20 focus-visible:ring-0"
              />
            </Field>

            {/* Remember */}
            <Field>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-white" />
                Remember this device
              </label>
            </Field>

            {/* Submit */}
            <Field>
              <Button
                type="submit"
                className="w-full bg-gray-300 text-black hover:bg-gray-200"
              >
                Log in
              </Button>
            </Field>

            {/* Divider */}
            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-[#020817]">
              or sign in with
            </FieldSeparator>

            {/* OAuth */}
            <Field>
              <Button
                variant="outline"
                type="button"
                className="w-full border-white/20 bg-transparent hover:bg-white/5"
              >
                {/* Google Icon */}
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />{" "}
                  <Field>
                    <Button
                      variant="outline"
                      type="button"
                      className="w-full border-white/20 bg-transparent hover:bg-white/5"
                    >
                      Sign in with Google
                    </Button>
                  </Field>
                  <Field>
                    <Button
                      variant="outline"
                      type="button"
                      className="w-full border-white/20 bg-transparent hover:bg-white/5"
                    >
                      Sign in with Github
                    </Button>
                  </Field>
                </svg>
                Sign in with Google
              </Button>
            </Field>

            <Field>
              <Button
                variant="outline"
                type="button"
                className="w-full border-white/20 bg-transparent hover:bg-white/5"
              >
                {/* Microsoft Icon */}
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path fill="#F25022" d="M1 1h10v10H1z" />
                  <path fill="#7FBA00" d="M13 1h10v10H13z" />
                  <path fill="#00A4EF" d="M1 13h10v10H1z" />
                  <path fill="#FFB900" d="M13 13h10v10H13z" />
                </svg>
                Sign in with Microsoft
              </Button>
            </Field>
          </FieldGroup>
        </form>

        {/* Footer */}
        <FieldDescription className="text-center text-xs">
          By clicking continue, you agree to our{" "}
          <a href="#" className="underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
          .
        </FieldDescription>
      </CardContent>
    </Card>
  );
}
