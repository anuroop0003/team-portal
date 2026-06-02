import { type ParkingSpot } from "../constants";
import { getParkingStatusVariant, getSpotTypeVariant } from "@/lib/parking";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit3, UserMinus } from "lucide-react";

interface ParkingTableProps {
  spots: ParkingSpot[];
  onAssignClick: (spot: ParkingSpot) => void;
  onReleaseClick: (spotId: string) => void;
}

export function ParkingTable({
  spots,
  onAssignClick,
  onReleaseClick,
}: ParkingTableProps) {
  if (spots.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-lg border border-dashed bg-card/50">
        <p className="text-sm text-muted-foreground font-medium">
          No parking slots matched your search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-background hover:bg-background">
            <TableHead className="h-12 px-4">Spot & Floor</TableHead>
            <TableHead className="h-12 px-4">Type</TableHead>
            <TableHead className="h-12 px-4">Assignee</TableHead>
            <TableHead className="h-12 px-4">Vehicle Details</TableHead>
            <TableHead className="h-12 px-4">Status</TableHead>
            <TableHead className="w-[100px] text-right h-12 px-4">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {spots.map((spot) => (
            <TableRow key={spot.id}>
              <TableCell className="py-3 px-4">
                <div className="flex flex-col gap-0.5">
                  <span>{spot.spotNumber}</span>
                  <span className="text-xs text-muted-foreground">
                    {spot.floor}
                  </span>
                </div>
              </TableCell>
              <TableCell className="py-3 px-4">
                <Badge variant={getSpotTypeVariant(spot.type)}>
                  {spot.type}
                </Badge>
              </TableCell>
              <TableCell className="py-3 px-4">
                {spot.assignedTo && (
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8">
                      <AvatarImage
                        src={spot.assignedTo.avatar}
                        alt={spot.assignedTo.name}
                      />
                      <AvatarFallback>
                        {spot.assignedTo.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium">
                        {spot.assignedTo.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {spot.assignedTo.email}
                      </span>
                    </div>
                  </div>
                )}
              </TableCell>
              <TableCell className="py-3 px-4">
                {spot.vehiclePlate && (
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium">{spot.vehiclePlate}</span>
                    <span className="text-xs text-muted-foreground">
                      {spot.vehicleModel}
                    </span>
                  </div>
                )}
              </TableCell>
              <TableCell className="py-3 px-4">
                <Badge variant={getParkingStatusVariant(spot.status)}>
                  {spot.status}
                </Badge>
              </TableCell>
              <TableCell className="py-3 px-4 text-right">
                <div className="flex items-center justify-end gap-1.5">
                  {spot.assignedTo ? (
                    <>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="cursor-pointer text-muted-foreground hover:text-foreground"
                        onClick={() => onAssignClick(spot)}
                      >
                        <Edit3 />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="cursor-pointer text-destructive/80 hover:text-destructive"
                        onClick={() => onReleaseClick(spot.id)}
                      >
                        <UserMinus />
                      </Button>
                    </>
                  ) : (
                    spot.status !== "Maintenance" && (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="cursor-pointer text-xs"
                        onClick={() => onAssignClick(spot)}
                      >
                        Assign Spot
                      </Button>
                    )
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
