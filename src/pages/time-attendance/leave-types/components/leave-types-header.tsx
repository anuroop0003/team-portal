import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface LeaveTypesHeaderProps {
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
  name: string;
  setName: (name: string) => void;
  allowance: string;
  setAllowance: (allowance: string) => void;
  isPaid: boolean;
  setIsPaid: (paid: boolean) => void;
  requiresCertificate: boolean;
  setRequiresCertificate: (req: boolean) => void;
  halfDayAllowed: boolean;
  setHalfDayAllowed: (allowed: boolean) => void;
  handleCreateLeaveType: (e: React.FormEvent) => void;
}

export function LeaveTypesHeader({
  isAddModalOpen,
  setIsAddModalOpen,
  name,
  setName,
  allowance,
  setAllowance,
  isPaid,
  setIsPaid,
  requiresCertificate,
  setRequiresCertificate,
  halfDayAllowed,
  setHalfDayAllowed,
  handleCreateLeaveType,
}: LeaveTypesHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Leave Categories</h2>
        <p className="text-sm text-muted-foreground">
          Define custom time-off categories like Sick Leave, Annual Leave,
          Casual Leave, or Comp-off.
        </p>
      </div>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer gap-2 bg-primary text-primary-foreground hover:bg-primary/95 font-semibold">
            <Plus className="h-4 w-4" />
            Add Leave Type
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              Add Custom Leave Type
            </DialogTitle>
            <DialogDescription className="text-sm">
              Configure standard or custom legal leave entitlements for staff
              members.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateLeaveType} className="space-y-5 pt-2">
            <div className="space-y-1.5">
              <Label
                htmlFor="name"
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                Leave Category Name
              </Label>
              <Input
                id="name"
                placeholder="e.g. Parental Leave"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="allowance"
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                Annual Allowance (Days)
              </Label>
              <Input
                id="allowance"
                type="number"
                placeholder="e.g. 15"
                value={allowance}
                onChange={(e) => setAllowance(e.target.value)}
                required
              />
            </div>

            <div className="space-y-3.5 pt-1">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-slate-500/5">
                <div className="space-y-0.5">
                  <Label
                    htmlFor="isPaid"
                    className="text-sm font-semibold cursor-pointer"
                  >
                    Paid Leave Type
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Is the employee compensated during this time off?
                  </p>
                </div>
                <Switch
                  id="isPaid"
                  checked={isPaid}
                  onCheckedChange={setIsPaid}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-slate-500/5">
                <div className="space-y-0.5">
                  <Label
                    htmlFor="reqCert"
                    className="text-sm font-semibold cursor-pointer"
                  >
                    Requires Medical/Legal Attachment
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Mandatory uploads/proof required to justify requests.
                  </p>
                </div>
                <Switch
                  id="reqCert"
                  checked={requiresCertificate}
                  onCheckedChange={setRequiresCertificate}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-slate-500/5">
                <div className="space-y-0.5">
                  <Label
                    htmlFor="halfDay"
                    className="text-sm font-semibold cursor-pointer"
                  >
                    Half-Day Allowance
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Can staff submit partial-day requests for this category?
                  </p>
                </div>
                <Switch
                  id="halfDay"
                  checked={halfDayAllowed}
                  onCheckedChange={setHalfDayAllowed}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="cursor-pointer bg-primary text-primary-foreground font-semibold"
              >
                Save Leave Type
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
