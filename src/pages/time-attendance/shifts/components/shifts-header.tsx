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

interface ShiftsHeaderProps {
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
  name: string;
  setName: (name: string) => void;
  startTime: string;
  setStartTime: (time: string) => void;
  endTime: string;
  setEndTime: (time: string) => void;
  gracePeriod: string;
  setGracePeriod: (period: string) => void;
  breakDuration: string;
  setBreakDuration: (duration: string) => void;
  halfDayThreshold: string;
  setHalfDayThreshold: (threshold: string) => void;
  handleCreateShift: (e: React.FormEvent) => void;
}

export function ShiftsHeader({
  isAddModalOpen,
  setIsAddModalOpen,
  name,
  setName,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  gracePeriod,
  setGracePeriod,
  breakDuration,
  setBreakDuration,
  halfDayThreshold,
  setHalfDayThreshold,
  handleCreateShift,
}: ShiftsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Shift Schedules</h2>
        <p className="text-sm text-muted-foreground">
          Build daily/weekly work schedules, set grace period durations, and
          configure overnight shift logic.
        </p>
      </div>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer gap-2 bg-primary text-primary-foreground hover:bg-primary/95 font-semibold">
            <Plus className="h-4 w-4" />
            Create Shift
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              Create New Shift Schedule
            </DialogTitle>
            <DialogDescription className="text-sm">
              Define working hours boundaries, lunch break windows, and arrival
              late tolerances.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateShift} className="space-y-5 pt-2">
            <div className="space-y-1.5">
              <Label
                htmlFor="name"
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                Shift Code Name
              </Label>
              <Input
                id="name"
                placeholder="e.g. Asia-Pacific Support"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="start"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Clock In Time
                </Label>
                <Input
                  id="start"
                  placeholder="e.g. 09:00 AM"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="end"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Clock Out Time
                </Label>
                <Input
                  id="end"
                  placeholder="e.g. 06:00 PM"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="grace"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Late Grace (min)
                </Label>
                <Input
                  id="grace"
                  type="number"
                  placeholder="15"
                  value={gracePeriod}
                  onChange={(e) => setGracePeriod(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="break"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Lunch Break (min)
                </Label>
                <Input
                  id="break"
                  type="number"
                  placeholder="45"
                  value={breakDuration}
                  onChange={(e) => setBreakDuration(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="half"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Half-Day (hr)
                </Label>
                <Input
                  id="half"
                  type="number"
                  step="0.5"
                  placeholder="4.0"
                  value={halfDayThreshold}
                  onChange={(e) => setHalfDayThreshold(e.target.value)}
                  required
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
                Save Shift
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
