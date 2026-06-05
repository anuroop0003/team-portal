import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CalendarHeaderProps {
  currentMonth: number;
  currentYear: number;
  months: string[];
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export function CalendarHeader({
  currentMonth,
  currentYear,
  months,
  onPrevMonth,
  onNextMonth,
}: CalendarHeaderProps) {
  return (
    <CardHeader className="flex flex-col md:flex-row md:items-center justify-between pb-6 space-y-4 md:space-y-0">
      <div>
        <CardTitle className="text-lg font-bold">
          Team Attendance Calendar
        </CardTitle>
        <CardDescription className="text-sm">
          Plan team staffing capacity, coordinate schedules, and track active
          leaves.
        </CardDescription>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={onPrevMonth}
          className="cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-1.5 font-bold text-sm min-w-[120px] justify-center">
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          <span>
            {months[currentMonth]} {currentYear}
          </span>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={onNextMonth}
          className="cursor-pointer"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
  );
}
