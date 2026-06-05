import { z } from "zod";

export const assignParkingSchema = z.object({
  spotId: z.string().min(1, "Select a parking spot"),
  memberId: z.string().min(1, "Select a workforce member"),
  vehiclePlate: z.string().min(2, "Enter a valid license plate"),
  vehicleModel: z.string().min(2, "Enter a vehicle model and color"),
});

export type AssignParkingFormValues = z.infer<typeof assignParkingSchema>;

export const parkingSpotSchema = z.object({
  spotNumber: z.string().min(2, "Spot number must be at least 2 characters"),
  floor: z.string().min(2, "Floor must be at least 2 characters"),
  type: z.enum(["Standard", "EV Charging", "Reserved", "Compact", "Bike"], {
    message: "Select a spot type",
  }),
  status: z.enum(["Available", "Occupied", "Reserved", "Maintenance"], {
    message: "Select a status",
  }),
  locationName: z.string().optional(),
  locationMapUrl: z.string().optional(),
});

export type ParkingSpotFormValues = z.infer<typeof parkingSpotSchema>;
