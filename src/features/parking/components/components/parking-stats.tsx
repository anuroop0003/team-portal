import { Car, CheckCircle, Motorbike } from "lucide-react";
import { StatsCard } from "@/components/stats-card";
import { Separator } from "@/components/ui/separator";

interface ParkingStatsProps {
  totalSpots: number;
  totalCarSpots: number;
  totalBikeSpots: number;
  occupiedCars: number;
  occupiedBikes: number;
}

export function ParkingStats({
  totalSpots,
  totalCarSpots,
  totalBikeSpots,
  occupiedCars,
  occupiedBikes,
}: ParkingStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
      <StatsCard
        label="Total Parking Spots"
        isLoading={false}
        value={totalSpots.toString()}
        description="Full corporate inventory"
        icon={<Car className="size-6 text-primary" />}
      />
      <StatsCard
        label="Car Parking Slots"
        value={totalCarSpots.toString()}
        isLoading={false}
        description="Standard, EV & Compact"
        icon={<Car className="size-6 text-indigo-500" />}
      />
      <StatsCard
        label="Bike Parking Slots"
        value={totalBikeSpots.toString()}
        isLoading={false}
        description="Dedicated two-wheelers"
        icon={<Motorbike className="size-6 text-emerald-500" />}
      />
      <StatsCard
        label="Occupied Spots"
        value={
          <div className="flex items-center justify-between w-full font-normal">
            <div className="flex flex-col items-center flex-1">
              <span className="text-2xl font-bold">{occupiedCars}</span>
              <span className="text-xs text-muted-foreground font-medium">
                Cars
              </span>
            </div>
            <Separator orientation="vertical" className="h-8" />
            <div className="flex flex-col items-center flex-1">
              <span className="text-2xl font-bold">{occupiedBikes}</span>
              <span className="text-xs text-muted-foreground font-medium">
                Bikes
              </span>
            </div>
          </div>
        }
        isLoading={false}
        icon={<CheckCircle className="size-6 text-amber-500" />}
      />
    </div>
  );
}
