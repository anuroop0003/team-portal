import { RegisterOrganizationForm } from "./components/register-organization-form";

export default function RegisterOrganizationPage() {
  return (
    <div className="bg-[url('@/assets/login/login.webp')] bg-cover bg-center bg-no-repeat size-full min-h-screen">
      <div className="flex min-h-svh flex-col items-start justify-center gap-6 p-6 md:p-10">
        <RegisterOrganizationForm />
      </div>
    </div>
  );
}
