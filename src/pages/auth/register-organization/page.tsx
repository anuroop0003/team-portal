import { RegisterOrganizationForm } from "./components/register-organization-form";
import { WelcomeCard } from "./components/welcome-card";

export default function RegisterOrganizationPage() {
  return (
    <div className="h-dvh lg:grid lg:grid-cols-2">
      <div className="flex h-full items-center justify-center space-y-6 sm:px-6 md:px-8">
        <RegisterOrganizationForm />
      </div>
      <div className="bg-muted h-screen p-5 max-lg:hidden">
        <WelcomeCard />
      </div>
    </div>
  );
}
