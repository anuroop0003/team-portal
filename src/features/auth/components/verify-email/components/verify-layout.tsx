import { Logo } from "./logo";

interface VerifyLayoutProps {
  children: React.ReactNode;
}

export function VerifyLayout({ children }: VerifyLayoutProps) {
  return (
    <div className="flex w-full flex-col gap-6 p-6 sm:max-w-lg">
      <div className="flex items-center gap-3">
        <Logo />
        <span className="text-xl font-semibold">Team Portal</span>
      </div>
      {children}
    </div>
  );
}
