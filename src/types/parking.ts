export interface ParkingSpot {
  id: string;
  spotNumber: string;
  floor: string;
  type: "Standard" | "EV Charging" | "Reserved" | "Compact" | "Bike";
  status: "Available" | "Occupied" | "Reserved" | "Maintenance";
  assignedTo?: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
  vehiclePlate?: string;
  vehicleModel?: string;
  locationName?: string;
  locationMapUrl?: string;
}
