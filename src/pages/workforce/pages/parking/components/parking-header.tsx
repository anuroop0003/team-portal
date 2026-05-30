import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ParkingHeaderProps {
  onAssignClick: () => void;
}

export function ParkingHeader({ onAssignClick }: ParkingHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex-1 flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">
          Parking Management
        </h1>
        <p className="text-sm text-muted-foreground font-medium">
          Manage corporate parking allocations, monitor EV charging stations,
          register vehicle information, and track active spot utilization.
        </p>
      </div>
      <Button onClick={onAssignClick} className="cursor-pointer">
        <Plus />
        Assign Spot
      </Button>
    </div>
  );
}
