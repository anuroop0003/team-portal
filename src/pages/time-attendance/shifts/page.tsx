import { useState } from "react";
import { ShiftsHeader } from "./components/shifts-header";
import { ShiftCard } from "./components/shift-card";

interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  gracePeriodMinutes: number;
  breakDurationMinutes: number;
  halfDayThresholdHours: number;
  isActive: boolean;
  color: string;
}

export default function ShiftsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [shifts, setShifts] = useState<Shift[]>([
    {
      id: "s_1",
      name: "Standard Day Shift",
      startTime: "09:00 AM",
      endTime: "06:00 PM",
      gracePeriodMinutes: 15,
      breakDurationMinutes: 45,
      halfDayThresholdHours: 4,
      isActive: true,
      color: "bg-blue-500",
    },
    {
      id: "s_2",
      name: "Evening Support Shift",
      startTime: "02:00 PM",
      endTime: "11:00 PM",
      gracePeriodMinutes: 15,
      breakDurationMinutes: 60,
      halfDayThresholdHours: 4,
      isActive: true,
      color: "bg-purple-500",
    },
    {
      id: "s_3",
      name: "Night Operations Shift",
      startTime: "10:00 PM",
      endTime: "07:00 AM",
      gracePeriodMinutes: 10,
      breakDurationMinutes: 45,
      halfDayThresholdHours: 4.5,
      isActive: true,
      color: "bg-slate-900 dark:bg-slate-700",
    },
    {
      id: "s_4",
      name: "Flexible Hours",
      startTime: "Flexible",
      endTime: "Flexible",
      gracePeriodMinutes: 0,
      breakDurationMinutes: 60,
      halfDayThresholdHours: 4,
      isActive: false,
      color: "bg-amber-500",
    },
  ]);

  // Form states
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [gracePeriod, setGracePeriod] = useState("");
  const [breakDuration, setBreakDuration] = useState("");
  const [halfDayThreshold, setHalfDayThreshold] = useState("");

  const handleToggleActive = (id: string) => {
    setShifts((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s)),
    );
  };

  const handleDeleteShift = (id: string) => {
    setShifts((prev) => prev.filter((s) => s.id !== id));
  };

  const handleCreateShift = (e: React.FormEvent) => {
    e.preventDefault();
    const newShift: Shift = {
      id: `s_${shifts.length + 1}`,
      name,
      startTime,
      endTime,
      gracePeriodMinutes: parseInt(gracePeriod) || 0,
      breakDurationMinutes: parseInt(breakDuration) || 0,
      halfDayThresholdHours: parseFloat(halfDayThreshold) || 4,
      isActive: true,
      color: "bg-indigo-500",
    };

    setShifts([...shifts, newShift]);
    setIsAddModalOpen(false);

    // Reset Form
    setName("");
    setStartTime("");
    setEndTime("");
    setGracePeriod("");
    setBreakDuration("");
    setHalfDayThreshold("");
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Top action header */}
      <ShiftsHeader
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        name={name}
        setName={setName}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        gracePeriod={gracePeriod}
        setGracePeriod={setGracePeriod}
        breakDuration={breakDuration}
        setBreakDuration={setBreakDuration}
        halfDayThreshold={halfDayThreshold}
        setHalfDayThreshold={setHalfDayThreshold}
        handleCreateShift={handleCreateShift}
      />

      {/* Shifts grid list */}
      <div className="grid gap-6 md:grid-cols-3">
        {shifts.map((shift) => (
          <ShiftCard
            key={shift.id}
            shift={shift}
            onToggleActive={handleToggleActive}
            onDeleteShift={handleDeleteShift}
          />
        ))}
      </div>
    </div>
  );
}
