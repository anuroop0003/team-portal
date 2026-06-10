import { useState } from "react";
import { HolidaysHeader } from "./components/holidays-header";
import { HolidaysGrid } from "./components/holidays-grid";
import { ConfigureHolidayModal } from "./components/configure-holiday/configure-holiday-modal";
import { type Holiday, INITIAL_HOLIDAYS } from "./constants";

export default function HolidaysPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingHoliday, setEditingHoliday] = useState<Holiday | null>(null);
  const [holidays, setHolidays] = useState<Holiday[]>(INITIAL_HOLIDAYS);

  const handleOpenAdd = () => {
    setEditingHoliday(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (holiday: Holiday) => {
    setEditingHoliday(holiday);
    setIsAddModalOpen(true);
  };

  const handleSubmitHoliday = (data: Omit<Holiday, "id">) => {
    if (editingHoliday) {
      setHolidays((prev) =>
        prev.map((h) => (h.id === editingHoliday.id ? { ...h, ...data } : h)),
      );
    } else {
      const newHoliday: Holiday = {
        id: `h_${Date.now()}`,
        ...data,
      };
      setHolidays((prev) => [...prev, newHoliday]);
    }
    setIsAddModalOpen(false);
    setEditingHoliday(null);
  };

  const handleDeleteHoliday = (id: string) => {
    setHolidays((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <HolidaysHeader onConfigureClick={handleOpenAdd} />

      <HolidaysGrid
        holidays={holidays}
        onEditHoliday={handleOpenEdit}
        onDeleteHoliday={handleDeleteHoliday}
      />

      <ConfigureHolidayModal
        isOpen={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSubmitHoliday={handleSubmitHoliday}
        editingHoliday={editingHoliday}
      />
    </div>
  );
}
