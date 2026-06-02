import { useState } from "react";
import { HolidaysHeader } from "./components/holidays-header";
import { HolidaysList } from "./components/holidays-list";
import { HolidaysInfo } from "./components/holidays-info";

interface PersonalHoliday {
  id: string;
  name: string;
  date: string;
  dayOfWeek: string;
  daysRemaining: number;
  type: "mandatory" | "optional";
  isPaid: boolean;
}

export default function HolidaysPage() {
  const [holidays, setHolidays] = useState<PersonalHoliday[]>(
    [
      {
        id: "h_1",
        name: "Independence Day",
        date: "2026-07-04",
        dayOfWeek: "Saturday",
        daysRemaining: 33,
        type: "mandatory",
        isPaid: true,
      },
      {
        id: "h_2",
        name: "Thanksgiving Day",
        date: "2026-11-26",
        dayOfWeek: "Thursday",
        daysRemaining: 178,
        type: "mandatory",
        isPaid: true,
      },
      {
        id: "h_3",
        name: "Christmas Eve",
        date: "2026-12-24",
        dayOfWeek: "Thursday",
        daysRemaining: 206,
        type: "optional",
        isPaid: true,
      },
      {
        id: "h_4",
        name: "New Year's Day",
        date: "2027-01-01",
        dayOfWeek: "Friday",
        daysRemaining: 214,
        type: "mandatory",
        isPaid: true,
      },
    ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Top Header Card */}
      <HolidaysHeader />

      {/* Grid of personal holiday list */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Upcoming Holidays List */}
        <HolidaysList holidays={holidays} />

        {/* Informative Side Card */}
        <HolidaysInfo />
      </div>
    </div>
  );
}
