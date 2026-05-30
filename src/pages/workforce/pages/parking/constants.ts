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

export const MOCK_PARKING_SPOTS: ParkingSpot[] = [
  {
    id: "spot-1",
    spotNumber: "P-101",
    floor: "Ground Floor",
    type: "Reserved",
    status: "Occupied",
    assignedTo: {
      id: "1",
      name: "Alex Thompson",
      email: "alex.t@company.com",
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Alex",
    },
    vehiclePlate: "CA-99X88",
    vehicleModel: "Tesla Model S (Deep Blue)",
    locationName: "Main Entrance (Gate A)",
    locationMapUrl:
      "https://maps.google.com/?q=1600+Amphitheatre+Parkway+Mountain+View+CA",
  },
  {
    id: "spot-2",
    spotNumber: "P-102",
    floor: "Ground Floor",
    type: "Reserved",
    status: "Occupied",
    assignedTo: {
      id: "2",
      name: "Sarah Chen",
      email: "sarah.c@company.com",
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Sarah",
    },
    vehiclePlate: "TX-44B12",
    vehicleModel: "BMW i4 (Mineral White)",
    locationName: "Main Entrance (Gate A)",
    locationMapUrl:
      "https://maps.google.com/?q=1600+Amphitheatre+Parkway+Mountain+View+CA",
  },
  {
    id: "spot-3",
    spotNumber: "P-103",
    floor: "Ground Floor",
    type: "EV Charging",
    status: "Available",
    locationName: "East Parking Lot",
    locationMapUrl:
      "https://maps.google.com/?q=1600+Amphitheatre+Parkway+Mountain+View+CA",
  },
  {
    id: "spot-4",
    spotNumber: "P-104",
    floor: "Ground Floor",
    type: "Standard",
    status: "Maintenance",
    locationName: "East Parking Lot",
    locationMapUrl:
      "https://maps.google.com/?q=1600+Amphitheatre+Parkway+Mountain+View+CA",
  },
  {
    id: "spot-5",
    spotNumber: "P-105",
    floor: "Basement 1",
    type: "Standard",
    status: "Occupied",
    assignedTo: {
      id: "5",
      name: "David Wilson",
      email: "david.w@company.com",
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=David",
    },
    vehiclePlate: "NY-77K90",
    vehicleModel: "Toyota RAV4 (Midnight Black)",
    locationName: "Underground Garage A",
    locationMapUrl:
      "https://maps.google.com/?q=1600+Amphitheatre+Parkway+Mountain+View+CA",
  },
  {
    id: "spot-6",
    spotNumber: "P-106",
    floor: "Basement 1",
    type: "Compact",
    status: "Available",
    locationName: "Underground Garage A",
    locationMapUrl:
      "https://maps.google.com/?q=1600+Amphitheatre+Parkway+Mountain+View+CA",
  },
  {
    id: "spot-7",
    spotNumber: "P-107",
    floor: "Basement 1",
    type: "Standard",
    status: "Available",
    locationName: "Underground Garage A",
    locationMapUrl:
      "https://maps.google.com/?q=1600+Amphitheatre+Parkway+Mountain+View+CA",
  },
  {
    id: "spot-8",
    spotNumber: "P-108",
    floor: "Basement 1",
    type: "EV Charging",
    status: "Occupied",
    assignedTo: {
      id: "4",
      name: "Emily Davis",
      email: "emily.d@company.com",
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Emily",
    },
    vehiclePlate: "WA-88M11",
    vehicleModel: "Hyundai Ioniq 5 (Cyber Gray)",
    locationName: "Underground Garage A",
    locationMapUrl:
      "https://maps.google.com/?q=1600+Amphitheatre+Parkway+Mountain+View+CA",
  },
  {
    id: "spot-9",
    spotNumber: "P-109",
    floor: "Basement 2",
    type: "Compact",
    status: "Available",
    locationName: "Underground Garage B",
    locationMapUrl:
      "https://maps.google.com/?q=1600+Amphitheatre+Parkway+Mountain+View+CA",
  },
  {
    id: "spot-10",
    spotNumber: "P-110",
    floor: "Basement 2",
    type: "Standard",
    status: "Available",
    locationName: "Underground Garage B",
    locationMapUrl:
      "https://maps.google.com/?q=1600+Amphitheatre+Parkway+Mountain+View+CA",
  },
  {
    id: "spot-11",
    spotNumber: "P-111",
    floor: "Basement 2",
    type: "Standard",
    status: "Available",
    locationName: "Underground Garage B",
    locationMapUrl:
      "https://maps.google.com/?q=1600+Amphitheatre+Parkway+Mountain+View+CA",
  },
  {
    id: "spot-12",
    spotNumber: "P-112",
    floor: "Basement 2",
    type: "Reserved",
    status: "Reserved",
    locationName: "Underground Garage B",
    locationMapUrl:
      "https://maps.google.com/?q=1600+Amphitheatre+Parkway+Mountain+View+CA",
  },
  {
    id: "spot-13",
    spotNumber: "P-113",
    floor: "Basement 2",
    type: "Bike",
    status: "Available",
    locationName: "Bicycle Zone A",
    locationMapUrl:
      "https://maps.google.com/?q=1600+Amphitheatre+Parkway+Mountain+View+CA",
  },
  {
    id: "spot-14",
    spotNumber: "P-114",
    floor: "Basement 2",
    type: "Bike",
    status: "Available",
    locationName: "Bicycle Zone A",
    locationMapUrl:
      "https://maps.google.com/?q=1600+Amphitheatre+Parkway+Mountain+View+CA",
  },
];
