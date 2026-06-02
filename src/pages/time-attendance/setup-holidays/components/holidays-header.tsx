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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HolidaysHeaderProps {
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
  name: string;
  setName: (name: string) => void;
  date: string;
  setDate: (date: string) => void;
  type: "public" | "restricted" | "company-specific";
  setType: (type: any) => void;
  locationScope: string;
  setLocationScope: (scope: string) => void;
  isPaid: boolean;
  setIsPaid: (paid: boolean) => void;
  handleCreateHoliday: (e: React.FormEvent) => void;
}

export function HolidaysHeader({
  isAddModalOpen,
  setIsAddModalOpen,
  name,
  setName,
  date,
  setDate,
  type,
  setType,
  locationScope,
  setLocationScope,
  isPaid,
  setIsPaid,
  handleCreateHoliday,
}: HolidaysHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold tracking-tight">
          Holidays Calendar Configuration
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage and set up official holidays, mandatory public closures, and
          custom corporate events.
        </p>
      </div>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer gap-2 bg-primary text-primary-foreground hover:bg-primary/95 font-semibold">
            <Plus className="h-4 w-4" />
            Configure Holiday
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              Configure Holiday Event
            </DialogTitle>
            <DialogDescription className="text-sm">
              Establish official paid or optional calendar events across
              specific regional branches.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateHoliday} className="space-y-5 pt-2">
            <div className="space-y-1.5">
              <Label
                htmlFor="name"
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                Holiday Title
              </Label>
              <Input
                id="name"
                placeholder="e.g. Labor Day"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="date"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Calendar Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="type"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Holiday Category
                </Label>
                <Select
                  value={type}
                  onValueChange={(val: any) => setType(val)}
                  required
                >
                  <SelectTrigger id="type" className="cursor-pointer">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public" className="cursor-pointer">
                      National Public
                    </SelectItem>
                    <SelectItem value="restricted" className="cursor-pointer">
                      Restricted / Optional
                    </SelectItem>
                    <SelectItem
                      value="company-specific"
                      className="cursor-pointer"
                    >
                      Company Specific
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="scope"
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                Location Scope
              </Label>
              <Input
                id="scope"
                placeholder="e.g. US Region or All offices"
                value={locationScope}
                onChange={(e) => setLocationScope(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-slate-500/5">
              <div className="space-y-0.5">
                <Label
                  htmlFor="isPaid"
                  className="text-sm font-semibold cursor-pointer"
                >
                  Paid Holiday
                </Label>
                <p className="text-xs text-muted-foreground">
                  Are employees compensated during this holiday?
                </p>
              </div>
              <Switch
                id="isPaid"
                checked={isPaid}
                onCheckedChange={setIsPaid}
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
                Save Holiday
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
