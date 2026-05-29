import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

interface InviteSuccessProps {
  email: string;
}

export function InviteSuccess({ email }: InviteSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
        <CheckCircle2 className="h-10 w-10 text-emerald-500" />
      </div>
      <h3 className="text-xl font-bold tracking-tight">Invitation Sent!</h3>
      <p className="text-sm text-muted-foreground mt-2 max-w-[240px]">
        We've sent an onboarding invitation to <strong>{email}</strong>.
      </p>
      <DialogClose
        render={
          <Button variant="outline" className="mt-8 cursor-pointer">
            Close Window
          </Button>
        }
      />
    </div>
  );
}
