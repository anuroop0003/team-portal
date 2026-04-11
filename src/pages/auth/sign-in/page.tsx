import { SignInForm } from "./components/sign-in-form";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "@/components/theme-context";

export default function SignInPage() {
  const { mode, toggleMode } = useTheme();

  return (
    <div className="bg-[url('@/assets/login/login.webp')] bg-cover bg-center bg-no-repeat size-full min-h-screen relative">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMode}
          className="rounded-full bg-background/20 backdrop-blur-md hover:bg-background/40 cursor-pointer"
        >
          {mode === "light" ? (
            <MoonIcon className="size-5 text-foreground" />
          ) : (
            <SunIcon className="size-5 text-foreground" />
          )}
        </Button>
      </div>

      <div className="flex min-h-svh flex-col items-start justify-center gap-6 p-6 md:p-10">
        <SignInForm />
      </div>
    </div>
  );
}
