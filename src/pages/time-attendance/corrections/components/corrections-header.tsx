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
import { Textarea } from "@/components/ui/textarea";

interface CorrectionsHeaderProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  date: string;
  setDate: (date: string) => void;
  origIn: string;
  setOrigIn: (time: string) => void;
  origOut: string;
  setOrigOut: (time: string) => void;
  reqIn: string;
  setReqIn: (time: string) => void;
  reqOut: string;
  setReqOut: (time: string) => void;
  reason: string;
  setReason: (reason: string) => void;
  handleSubmitRequest: (e: React.FormEvent) => void;
}

export function CorrectionsHeader({
  isModalOpen,
  setIsModalOpen,
  date,
  setDate,
  origIn,
  setOrigIn,
  origOut,
  setOrigOut,
  reqIn,
  setReqIn,
  reqOut,
  setReqOut,
  reason,
  setReason,
  handleSubmitRequest,
}: CorrectionsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold tracking-tight">
          Timesheet Adjustment Portal
        </h2>
        <p className="text-sm text-muted-foreground">
          Request retroactive adjustments for swipe card entry errors or device
          registration failure.
        </p>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer gap-2 bg-primary text-primary-foreground hover:bg-primary/95 font-semibold">
            <Plus className="h-4 w-4" />
            Request Correction
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              Request Time correction
            </DialogTitle>
            <DialogDescription className="text-sm">
              Submit corrected clock times along with justification comments for
              manager signature.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitRequest} className="space-y-5 pt-2">
            <div className="space-y-1.5">
              <Label
                htmlFor="date"
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                Target Date
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="origIn"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Original In
                </Label>
                <Input
                  id="origIn"
                  placeholder="09:35 AM"
                  value={origIn}
                  onChange={(e) => setOrigIn(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="origOut"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Original Out
                </Label>
                <Input
                  id="origOut"
                  placeholder="06:00 PM"
                  value={origOut}
                  onChange={(e) => setOrigOut(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="reqIn"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Corrected In
                </Label>
                <Input
                  id="reqIn"
                  placeholder="09:00 AM"
                  value={reqIn}
                  onChange={(e) => setReqIn(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="reqOut"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Corrected Out
                </Label>
                <Input
                  id="reqOut"
                  placeholder="06:00 PM"
                  value={reqOut}
                  onChange={(e) => setReqOut(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="reason"
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                Justification Comment
              </Label>
              <Textarea
                id="reason"
                placeholder="Explain the entry swipe discrepancy detail (e.g. out of office client meeting)..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="cursor-pointer bg-primary text-primary-foreground font-semibold"
              >
                Submit Adjustment
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
