import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HolidaysHeader } from "./components/holidays-header";
import { HolidaysTable } from "./components/holidays-table";

interface Holiday {
  id: string;
  name: string;
  date: string;
  type: "public" | "restricted" | "company-specific";
  locationScope: string;
  isPaid: boolean;
}

export default function SetupHolidaysPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [holidays, setHolidays] = useState<Holiday[]>([
    {
      id: "h_1",
      name: "New Year's Day",
      date: "2026-01-01",
      type: "public",
      locationScope: "All regions",
      isPaid: true,
    },
    {
      id: "h_2",
      name: "Independence Day",
      date: "2026-07-04",
      type: "public",
      locationScope: "US Region",
      isPaid: true,
    },
    {
      id: "h_3",
      name: "Thanksgiving Day",
      date: "2026-11-26",
      type: "public",
      locationScope: "US Region",
      isPaid: true,
    },
    {
      id: "h_4",
      name: "Christmas Eve",
      date: "2026-12-24",
      type: "restricted",
      locationScope: "All regions",
      isPaid: true,
    },
    {
      id: "h_5",
      name: "Founder's Celebration",
      date: "2026-10-15",
      type: "company-specific",
      locationScope: "Corporate HQ",
      isPaid: false,
    },
  ]);

  // Form states
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState<Holiday["type"]>("public");
  const [locationScope, setLocationScope] = useState("");
  const [isPaid, setIsPaid] = useState(true);

  const handleDeleteHoliday = (id: string) => {
    setHolidays((prev) => prev.filter((h) => h.id !== id));
  };

  const handleCreateHoliday = (e: React.FormEvent) => {
    e.preventDefault();
    const newHoliday: Holiday = {
      id: `h_${holidays.length + 1}`,
      name,
      date,
      type,
      locationScope,
      isPaid,
    };

    setHolidays([...holidays, newHoliday]);
    setIsAddModalOpen(false);

    // Reset Form
    setName("");
    setDate("");
    setType("public");
    setLocationScope("");
    setIsPaid(true);
  };

  const getHolidayBadge = (type: Holiday["type"]) => {
    switch (type) {
      case "public":
        return (
          <Badge
            variant="outline"
            className="border-emerald-500 text-emerald-500 bg-emerald-500/5 font-semibold"
          >
            National Public
          </Badge>
        );
      case "restricted":
        return (
          <Badge
            variant="outline"
            className="border-amber-500 text-amber-500 bg-amber-500/5 font-semibold"
          >
            Restricted / Optional
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="border-blue-500 text-blue-500 bg-blue-500/5 font-semibold"
          >
            Company Specific
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Top action header */}
      <HolidaysHeader
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        name={name}
        setName={setName}
        date={date}
        setDate={setDate}
        type={type}
        setType={setType}
        locationScope={locationScope}
        setLocationScope={setLocationScope}
        isPaid={isPaid}
        setIsPaid={setIsPaid}
        handleCreateHoliday={handleCreateHoliday}
      />

      {/* Holiday list card */}
      <Card className="shadow-sm border border-border">
        <CardHeader>
          <CardTitle className="text-lg font-bold">
            Institutional Holidays Ledger
          </CardTitle>
          <CardDescription className="text-sm">
            Manage paid leaves and regional coverage overlays for payroll
            integration.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <HolidaysTable
            holidays={holidays}
            onDeleteHoliday={handleDeleteHoliday}
            getHolidayBadge={getHolidayBadge}
          />
        </CardContent>
      </Card>
    </div>
  );
}
