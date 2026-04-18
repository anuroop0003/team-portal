import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PATHS } from "@/routes/constants/paths";
import { RegisterHeader } from "./stepper/register-header";
import { OrganizationStep } from "./stepper/organization-step";
import { AccountStep } from "./stepper/account-step";

const registrationSchema = z
  .object({
    // Step 1
    organizationName: z
      .string()
      .min(2, "Organization name must be at least 2 characters"),
    slug: z.string().min(2, "Workspace URL must be at least 2 characters"),
    logo: z.any().optional(),

    // Step 2
    userName: z.string().min(2, "Name must be at least 2 characters"),
    userEmail: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    avatar: z.any().optional(),
    terms: z
      .boolean()
      .refine((val) => val === true, "You must agree to the terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegistrationData = z.infer<typeof registrationSchema>;

export function TestRegisterForm() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      terms: false,
    },
    mode: "onChange",
  });

  const handleNext = async () => {
    const isValid = await methods.trigger(["organizationName", "slug"]);
    if (isValid) {
      setStep(2);
    }
  };

  const handlePrev = () => {
    setStep(1);
  };

  const onSubmit = (data: RegistrationData) => {
    console.log("Form Submitted:", data);
    // Handle registration logic here
  };

  return (
    <div className="flex w-full flex-col gap-6 p-6 sm:max-w-lg">
      <RegisterHeader step={step} />

      <div className="space-y-4">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {step === 1 ? (
              <OrganizationStep onNext={handleNext} />
            ) : (
              <AccountStep
                onPrev={handlePrev}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            )}
          </form>
        </FormProvider>

        <p className="text-muted-foreground text-sm">
          Already have an account?{" "}
          <Link
            to={PATHS.AUTH.TEST_LOGIN}
            className="text-foreground font-semibold hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
