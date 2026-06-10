import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";

interface ParkingHeaderProps {
  activeTab: string;
  onAssignClick: () => void;
  onAddSpotClick: () => void;
}

export function ParkingHeader({
  activeTab,
  onAssignClick,
  onAddSpotClick,
}: ParkingHeaderProps) {
  const isManageTab = activeTab === "manage";

  return (
    <PageHeader
      title="Parking Management"
      description="Manage corporate parking allocations, monitor EV charging stations, register vehicle information, and track active spot utilization."
    >
      {isManageTab ? (
        <Button onClick={onAddSpotClick} className="cursor-pointer">
          <Plus />
          Add Spot
        </Button>
      ) : (
        <Button onClick={onAssignClick} className="cursor-pointer">
          <Plus />
          Assign Spot
        </Button>
      )}
    </PageHeader>
  );
}
