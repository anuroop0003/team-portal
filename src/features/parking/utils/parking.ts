import { type ParkingSpot } from "@/features/parking/types/parking";
import { Zap, Lock, Motorbike, Car } from "lucide-react";
import React from "react";

export const getParkingStatusVariant = (status: ParkingSpot["status"]) => {
  switch (status) {
    case "Available":
      return "success";
    case "Occupied":
      return "warning";
    case "Reserved":
      return "secondary";
    case "Maintenance":
      return "destructive";
    default:
      return "default";
  }
};

export const getSpotTypeVariant = (type: ParkingSpot["type"]) => {
  switch (type) {
    case "EV Charging":
      return "secondary";
    case "Reserved":
      return "outline";
    case "Compact":
      return "outline";
    default:
      return "default";
  }
};

export const getSpotTypeIcon = (type: ParkingSpot["type"]) => {
  switch (type) {
    case "EV Charging":
      return React.createElement(Zap, { className: "size-4 text-indigo-500" });
    case "Reserved":
      return React.createElement(Lock, { className: "size-4 text-amber-500" });
    case "Bike":
      return React.createElement(Motorbike, {
        className: "size-4 text-emerald-500",
      });
    default:
      return React.createElement(Car, { className: "size-4 text-sky-500" });
  }
};
