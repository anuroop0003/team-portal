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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PoliciesHeaderProps {
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
  name: string;
  setName: (name: string) => void;
  leaveType: string;
  setLeaveType: (type: string) => void;
  accrualRate: string;
  setAccrualRate: (rate: string) => void;
  frequency: "monthly" | "yearly" | "biweekly" | "accrued-front";
  setFrequency: (freq: any) => void;
  carryoverLimit: string;
  setCarryoverLimit: (limit: string) => void;
  probationDays: string;
  setProbationDays: (days: string) => void;
  description: string;
  setDescription: (desc: string) => void;
  handleCreatePolicy: (e: React.FormEvent) => void;
}

export function PoliciesHeader({
  isAddModalOpen,
  setIsAddModalOpen,
  name,
  setName,
  leaveType,
  setLeaveType,
  accrualRate,
  setAccrualRate,
  frequency,
  setFrequency,
  carryoverLimit,
  setCarryoverLimit,
  probationDays,
  setProbationDays,
  description,
  setDescription,
  handleCreatePolicy,
}: PoliciesHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Accrual Policies</h2>
        <p className="text-sm text-muted-foreground">
          Configure entitlement accumulation schedules, carryover rules, and
          rollover definitions.
        </p>
      </div>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogTrigger
          render={
            <Button className="cursor-pointer">
              <Plus />
              Create Accrual Policy
            </Button>
          }
        />
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              New Accrual Policy
            </DialogTitle>
            <DialogDescription className="text-sm">
              Establish leave accrual frequency, grace periods, and carryover
              ceilings.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreatePolicy} className="space-y-5 pt-2">
            <div className="space-y-1.5">
              <Label
                htmlFor="name"
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                Policy Name
              </Label>
              <Input
                id="name"
                placeholder="e.g. Standard Annual Accrual"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="leaveType"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Leave Category
                </Label>
                <Select
                  value={leaveType}
                  onValueChange={(val) => val && setLeaveType(val)}
                  required
                >
                  <SelectTrigger id="leaveType" className="cursor-pointer">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Annual Leave" className="cursor-pointer">
                      Annual Leave
                    </SelectItem>
                    <SelectItem value="Sick Leave" className="cursor-pointer">
                      Sick Leave
                    </SelectItem>
                    <SelectItem value="Casual Leave" className="cursor-pointer">
                      Casual Leave
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="frequency"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Accrual Interval
                </Label>
                <Select
                  value={frequency}
                  onValueChange={(val: any) => setFrequency(val)}
                  required
                >
                  <SelectTrigger id="frequency" className="cursor-pointer">
                    <SelectValue placeholder="Select Frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly" className="cursor-pointer">
                      Monthly
                    </SelectItem>
                    <SelectItem value="yearly" className="cursor-pointer">
                      Yearly
                    </SelectItem>
                    <SelectItem
                      value="accrued-front"
                      className="cursor-pointer"
                    >
                      Frontload / Grant
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="rate"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Accrual Rate
                </Label>
                <Input
                  id="rate"
                  type="number"
                  step="0.01"
                  placeholder="e.g. 1.25"
                  value={accrualRate}
                  onChange={(e) => setAccrualRate(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="carryover"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Rollover Limit
                </Label>
                <Input
                  id="carryover"
                  type="number"
                  placeholder="e.g. 5"
                  value={carryoverLimit}
                  onChange={(e) => setCarryoverLimit(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="probation"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Probation (Days)
                </Label>
                <Input
                  id="probation"
                  type="number"
                  placeholder="e.g. 90"
                  value={probationDays}
                  onChange={(e) => setProbationDays(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="desc"
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                Policy Description
              </Label>
              <Input
                id="desc"
                placeholder="Brief summary of policy target group..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
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
                Save Policy
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
