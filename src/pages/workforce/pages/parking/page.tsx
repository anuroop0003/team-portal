import { useState } from "react";
import { MOCK_PARKING_SPOTS, type ParkingSpot } from "./constants";
import { ParkingHeader } from "./components/parking-header";
import { ParkingStats } from "./components/parking-stats";
import { ParkingSearch } from "./components/parking-search";
import { ParkingGrid } from "./components/parking-grid";
import { ParkingTable } from "./components/parking-table";
import { AssignModal } from "./components/assign-spot/assign-modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, List } from "lucide-react";
import { MOCK_WORKFORCE } from "../../constants";

export default function WorkforceParkingPage() {
  const [spots, setSpots] = useState<ParkingSpot[]>(MOCK_PARKING_SPOTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [isAssignOpen, setIsAssignOpen] = useState(false);

  // Stats calculation
  const totalSpots = spots.length;
  const totalCarSpots = spots.filter((s) => s.type !== "Bike").length;
  const totalBikeSpots = spots.filter((s) => s.type === "Bike").length;
  const occupiedCars = spots.filter(
    (s) => s.status === "Occupied" && s.type !== "Bike",
  ).length;
  const occupiedBikes = spots.filter(
    (s) => s.status === "Occupied" && s.type === "Bike",
  ).length;

  // Filter spots
  const filteredSpots = spots.filter((spot) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    return (
      spot.spotNumber.toLowerCase().includes(query) ||
      spot.floor.toLowerCase().includes(query) ||
      spot.type.toLowerCase().includes(query) ||
      spot.status.toLowerCase().includes(query) ||
      spot.assignedTo?.name.toLowerCase().includes(query) ||
      spot.assignedTo?.email.toLowerCase().includes(query) ||
      spot.vehiclePlate?.toLowerCase().includes(query) ||
      spot.vehicleModel?.toLowerCase().includes(query)
    );
  });

  // Assign Spot handler
  const handleAssignSpot = (
    spotId: string,
    memberId: string,
    vehiclePlate: string,
    vehicleModel: string,
  ) => {
    const member = MOCK_WORKFORCE.find((m) => m.id === memberId);
    if (!member) return;

    setSpots((prevSpots) =>
      prevSpots.map((s) => {
        // If the spot is being assigned
        if (s.id === spotId) {
          return {
            ...s,
            status: "Occupied",
            assignedTo: {
              id: member.id,
              name: member.name,
              email: member.email,
              avatar: member.avatar,
            },
            vehiclePlate,
            vehicleModel,
          };
        }
        // If it was previously assigned to this member, release that old spot
        if (s.assignedTo?.id === memberId && s.id !== spotId) {
          return {
            ...s,
            status: "Available",
            assignedTo: undefined,
            vehiclePlate: undefined,
            vehicleModel: undefined,
          };
        }
        return s;
      }),
    );

    setIsAssignOpen(false);
    setSelectedSpot(null);
  };

  // Release Spot handler
  const handleReleaseSpot = (spotId: string) => {
    setSpots((prevSpots) =>
      prevSpots.map((s) =>
        s.id === spotId
          ? {
              ...s,
              status: "Available",
              assignedTo: undefined,
              vehiclePlate: undefined,
              vehicleModel: undefined,
            }
          : s,
      ),
    );
  };

  const handleOpenAssignModal = (spot: ParkingSpot | null = null) => {
    setSelectedSpot(spot);
    setIsAssignOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Header */}
      <ParkingHeader onAssignClick={() => handleOpenAssignModal(null)} />

      {/* Stats Cards */}
      <ParkingStats
        totalSpots={totalSpots}
        totalCarSpots={totalCarSpots}
        totalBikeSpots={totalBikeSpots}
        occupiedCars={occupiedCars}
        occupiedBikes={occupiedBikes}
      />

      {/* Search Filter & View Switcher */}
      <Tabs defaultValue="grid" className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <ParkingSearch onSearch={setSearchQuery} />

          <TabsList className="grid grid-cols-2 self-start sm:self-auto">
            <TabsTrigger value="grid" className="cursor-pointer">
              <LayoutGrid />
            </TabsTrigger>
            <TabsTrigger value="table" className="cursor-pointer">
              <List />
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="grid">
          <ParkingGrid
            spots={filteredSpots}
            onAssignClick={handleOpenAssignModal}
            onReleaseClick={handleReleaseSpot}
          />
        </TabsContent>

        <TabsContent value="table">
          <ParkingTable
            spots={filteredSpots}
            onAssignClick={handleOpenAssignModal}
            onReleaseClick={handleReleaseSpot}
          />
        </TabsContent>
      </Tabs>

      {/* Modal Dialog */}
      <AssignModal
        open={isAssignOpen}
        onOpenChange={setIsAssignOpen}
        onAssign={handleAssignSpot}
        spots={spots}
        initialSpot={selectedSpot}
      />
    </div>
  );
}
