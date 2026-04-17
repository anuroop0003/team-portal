import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import Header from "./header";
import { registerOrganizationSchema } from "@/validations/register-organization.schema";
import type { RegisterOrganizationFormValues } from "@/validations/register-organization.schema";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/routes/constants/paths";
import { useRegisterOrganization } from "@/services/query/auth/auth.query";
import { AuthAlert } from "../../components/auth-alert";
import { AdminIdentityStep } from "./stepper/admin-identity-step";
import { SecurityStep } from "./stepper/security-step";
import { CompanyDetailsStep } from "./stepper/company-details-step";
import { WorkspacePreferencesStep } from "./stepper/workspace-preferences-step";

export function RegisterOrganizationForm() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const navigate = useNavigate();
  const { mutateAsync, error, isSuccess, isPending } =
    useRegisterOrganization();

  const methods = useForm<RegisterOrganizationFormValues>({
    resolver: zodResolver(registerOrganizationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      adminPhone: "",
      adminJobTitle: "",
      companyName: "",
      orgCode: "",
      orgWebsite: "",
      orgIndustry: "",
      orgCompanySize: "",
      termsAccepted: false,
    },
  });
  const { handleSubmit, trigger } = methods;

  const nextStep = async () => {
    let fieldsToValidate: (keyof RegisterOrganizationFormValues)[] = [];

    switch (step) {
      case 1:
        fieldsToValidate = ["fullName", "adminJobTitle", "email", "adminPhone"];
        break;
      case 2:
        fieldsToValidate = ["password", "confirmPassword"];
        break;
      case 3:
        fieldsToValidate = ["companyName", "orgCode", "orgWebsite"];
        break;
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
  };

  const onSubmit = async (data: RegisterOrganizationFormValues) => {
    await mutateAsync(data);
    setTimeout(() => {
      navigate(PATHS.AUTH.VERIFY_EMAIL);
    }, 3000);
  };

  return (
    <Card className="w-full max-w-md rounded-2xl shadow-xl bg-card/95 backdrop-blur-md border border-border/60">
      <CardContent className="p-8 space-y-6">
        <Header />

        {error && (
          <AuthAlert
            variant="destructive"
            description={
              error?.message || "Registration failed. Please try again."
            }
          />
        )}

        {isSuccess && (
          <AuthAlert
            variant="success"
            description="Your organization and admin account have been created. Please check your email to verify your account."
          />
        )}

        {/* Form */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && <AdminIdentityStep onNext={nextStep} />}
            {step === 2 && (
              <SecurityStep onNext={nextStep} onBack={() => setStep(1)} />
            )}
            {step === 3 && (
              <CompanyDetailsStep onNext={nextStep} onBack={() => setStep(2)} />
            )}
            {step === 4 && (
              <WorkspacePreferencesStep
                onBack={() => setStep(3)}
                isPending={isPending}
              />
            )}
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
