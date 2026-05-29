import { Toaster as SonnerToaster } from "sonner";
import { useTheme } from "@/components/theme-context";

export function ToasterProvider() {
  const { mode } = useTheme();

  return (
    <SonnerToaster
      position="top-right"
      theme={mode as "light" | "dark" | "system"}
    />
  );
}
