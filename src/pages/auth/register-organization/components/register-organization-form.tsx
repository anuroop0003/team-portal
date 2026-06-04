import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PATHS } from "@/routes/constants/paths";
import { RegisterHeader } from "./stepper/register-header";
import { OrganizationStep } from "./stepper/organization-step";
import { AccountStep } from "./stepper/account-step";
import {
  registerOrganizationSchema,
  type RegisterOrganizationFormValues,
} from "@/validations/register-organization.schema";
import { useRegisterOrganization } from "@/services/query/auth/auth.query";
import { toast } from "sonner";
import { useRegistrationStore } from "@/store/use-registration-store";

export function RegisterOrganizationForm() {
  const navigate = useNavigate();

  const { step, reset } = useRegistrationStore();

  useEffect(() => {
    return () => reset();
  }, [reset]);

  const methods = useForm<RegisterOrganizationFormValues>({
    resolver: zodResolver(registerOrganizationSchema),
    defaultValues: {
      organizationName: "",
      companyCode: "",
      userName: "",
      userEmail: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const { mutate: registerOrg, isPending } = useRegisterOrganization();

  const onSubmit = (data: RegisterOrganizationFormValues) => {
    registerOrg(data, {
      onSuccess: (response) => {
        if (response.verification_link) {
          console.log("VERIFICATION LINK:", response.verification_link);
        }
        toast.success(
          "Account created successfully. Redirecting to sign in...",
        );
        setTimeout(() => {
          sessionStorage.setItem("verification_email", data.userEmail);
          navigate(PATHS.AUTH.VERIFY_EMAIL);
        }, 1500);
      },
      onError: (error) => {
        toast.error(
          error.message ||
            "We couldn’t complete this action. Please try again.",
        );
      },
    });
  };

  console.log("errors", methods.formState.errors);

  return (
    <div className="flex w-full flex-col gap-6 p-6 sm:max-w-lg">
      <RegisterHeader />

      <div className="space-y-4">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {step === 1 ? (
              <OrganizationStep />
            ) : (
              <AccountStep isSubmitting={isPending} />
            )}
          </form>
        </FormProvider>

        <p className="text-muted-foreground text-sm">
          Already have an account?{" "}
          <Link
            to={PATHS.AUTH.SIGN_IN}
            className="text-foreground hover:underline px-1"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
