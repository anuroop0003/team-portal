import { Car, CheckCircle, Motorbike } from "lucide-react";
import { StatsCard } from "@/pages/rewards/components/stats-card";
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
        value={totalSpots.toString()}
        description="Full corporate inventory"
        icon={<Car className="size-6 text-primary" />}
      />
      <CardStatsWrapper
        label="Car Parking Slots"
        value={totalCarSpots.toString()}
        description="Standard, EV & Compact"
        icon={<Car className="size-6 text-indigo-500" />}
      />
      <CardStatsWrapper
        label="Bike Parking Slots"
        value={totalBikeSpots.toString()}
        description="Dedicated two-wheelers"
        icon={<Motorbike className="size-6 text-emerald-500" />}
      />
      <CardStatsWrapper
        label="Occupied Spots"
        value={
          <div className="flex items-center justify-between w-full mt-1 font-normal">
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
        icon={<CheckCircle className="size-6 text-amber-500" />}
      />
    </div>
  );
}

// Private local wrapper to map StatsCard if named StatsCard in project
function CardStatsWrapper({
  label,
  value,
  description,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  description?: string;
  icon: React.ReactNode;
}) {
  return (
    <StatsCard
      label={label}
      value={value}
      description={description}
      icon={icon}
    />
  );
}
