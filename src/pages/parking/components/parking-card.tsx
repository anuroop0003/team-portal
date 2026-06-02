import { type ParkingSpot } from "../constants";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Wrench, UserMinus, Edit3, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { getParkingStatusVariant, getSpotTypeIcon } from "@/lib/parking";

interface ParkingCardProps {
  spot: ParkingSpot;
  onAssignClick: (spot: ParkingSpot) => void;
  onReleaseClick: (spotId: string) => void;
}

export function ParkingCard({
  spot,
  onAssignClick,
  onReleaseClick,
}: ParkingCardProps) {
  return (
    <Card size="sm">
      <CardHeader className="gap-0">
        <CardDescription>{spot.type}</CardDescription>
        <CardTitle>{spot.spotNumber}</CardTitle>
        <CardAction className="flex justify-self-center gap-2">
          {getSpotTypeIcon(spot.type)}
          {spot.status === "Maintenance" && (
            <Wrench className="size-4 text-destructive animate-pulse" />
          )}
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col h-full">
        {spot.assignedTo ? (
          <div className="flex items-center gap-4 w-full">
            <Avatar className="size-8 shrink-0">
              <AvatarImage
                src={spot.assignedTo.avatar}
                alt={spot.assignedTo.name}
              />
              <AvatarFallback>{spot.assignedTo.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-sm text-foreground">
                {spot.assignedTo.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {spot.vehiclePlate} • {spot.vehicleModel}
              </span>
            </div>
          </div>
        ) : (
          <div className="my-auto flex items-center justify-center gap-1.5 text-xs text-muted-foreground font-medium">
            {spot.status === "Maintenance" ? (
              <span className="text-destructive">Under maintenance</span>
            ) : spot.status === "Reserved" ? (
              <span>Reserved for VIPs</span>
            ) : (
              <span className="text-emerald-500 font-semibold">
                Available for Booking
              </span>
            )}
          </div>
        )}
        <div className="mt-auto pt-4 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5 min-w-0">
            <MapPin className="size-3.5 shrink-0 text-primary" />
            <span className="truncate">{spot.locationName || spot.floor}</span>
          </div>
          {spot.locationMapUrl && (
            <a
              href={spot.locationMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-semibold text-primary hover:underline hover:text-primary/80 shrink-0 flex items-center gap-0.5 cursor-pointer"
            >
              View Map
              <ExternalLink className="size-3" />
            </a>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <Badge variant={getParkingStatusVariant(spot.status)}>
          {spot.status}
        </Badge>

        <div className="flex items-center gap-1">
          {spot.assignedTo ? (
            <>
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-muted-foreground hover:text-foreground cursor-pointer"
                onClick={() => onAssignClick(spot)}
              >
                <Edit3 />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-destructive/80 hover:text-destructive cursor-pointer"
                onClick={() => onReleaseClick(spot.id)}
              >
                <UserMinus />
              </Button>
            </>
          ) : (
            spot.status !== "Maintenance" && (
              <Button
                variant="outline"
                size="xs"
                className="text-xs font-medium cursor-pointer"
                onClick={() => onAssignClick(spot)}
              >
                Assign
              </Button>
            )
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
