import { type ParkingSpot } from "../constants";
import { Badge } from "@/components/ui/badge";
import { ParkingCard } from "./parking-card";

interface ParkingGridProps {
  spots: ParkingSpot[];
  onAssignClick: (spot: ParkingSpot) => void;
  onReleaseClick: (spotId: string) => void;
}

export function ParkingGrid({
  spots,
  onAssignClick,
  onReleaseClick,
}: ParkingGridProps) {
  // Group spots by floor
  const floors = Array.from(new Set(spots.map((spot) => spot.floor)));

  return (
    <div className="space-y-8">
      {floors.map((floor) => {
        const floorSpots = spots.filter((spot) => spot.floor === floor);

        return (
          <div key={floor} className="space-y-4">
            <div className="flex items-center gap-2 border-b pb-2">
              <h3 className="font-semibold text-lg">{floor}</h3>
              <Badge variant="outline">{floorSpots.length} Spots</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {floorSpots.map((spot) => (
                <ParkingCard
                  key={spot.id}
                  spot={spot}
                  onAssignClick={onAssignClick}
                  onReleaseClick={onReleaseClick}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
