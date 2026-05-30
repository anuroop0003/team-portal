import { z } from "zod";

export const assignParkingSchema = z.object({
  spotId: z.string().min(1, "Select a parking spot"),
  memberId: z.string().min(1, "Select a workforce member"),
  vehiclePlate: z.string().min(2, "Enter a valid license plate"),
  vehicleModel: z.string().min(2, "Enter a vehicle model and color"),
});

export type AssignParkingFormValues = z.infer<typeof assignParkingSchema>;
