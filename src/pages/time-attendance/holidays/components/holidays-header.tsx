import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HolidaysHeaderProps {
  onConfigureClick: () => void;
}

export function HolidaysHeader({ onConfigureClick }: HolidaysHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Holidays Calendar</h2>
        <p className="text-sm text-muted-foreground">
          Stay up to date with national, regional, and company-designated paid
          holidays.
        </p>
      </div>

      <Button className="cursor-pointer" onClick={onConfigureClick}>
        <Plus />
        Configure Holiday
      </Button>
    </div>
  );
}
