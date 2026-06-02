import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Holiday } from "../constants";
import {
  getDayOfWeek,
  getHolidayBadgeVariant,
  getHolidayBadgeLabel,
  getMonthColor,
} from "@/lib/time-attendance";

interface HolidaysGridProps {
  holidays: Holiday[];
  onEditHoliday: (holiday: Holiday) => void;
  onDeleteHoliday: (id: string) => void;
}

export function HolidaysGrid({
  holidays,
  onEditHoliday,
  onDeleteHoliday,
}: HolidaysGridProps) {
  const sortedHolidays = [...holidays].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  if (sortedHolidays.length === 0)
    return (
      <div className="col-span-full py-12 text-center text-muted-foreground font-semibold">
        No holidays registered. Click "Configure Holiday" to add one.
      </div>
    );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {sortedHolidays.map((h) => {
        const dayOfWeek = getDayOfWeek(h.date);
        const mColor = getMonthColor(h.date);

        return (
          <Card key={h.id} size="sm">
            <CardHeader className="gap-0">
              <CardTitle>{h.name}</CardTitle>
              <CardDescription>
                {dayOfWeek} • {new Date(h.date).getFullYear()}
              </CardDescription>
              <CardAction className="relative size-12">
                <Calendar className="size-full text-secondary fill-secondary" />
                <div
                  className="size-9 absolute left-1/2 bottom-1 -translate-x-1/2 z-20 flex flex-col items-center justify-center rounded-sm"
                  style={{
                    backgroundColor: mColor.bg,
                    color: mColor.text,
                  }}
                >
                  <span className="text-[10px] font-bold uppercase leading-none">
                    {new Date(h.date).toLocaleDateString([], {
                      month: "short",
                    })}
                  </span>
                  <span className="text-base font-bold mt-0.5 leading-none">
                    {new Date(h.date).toLocaleDateString([], {
                      day: "numeric",
                    })}
                  </span>
                </div>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex items-center justify-between">
              <Badge variant={getHolidayBadgeVariant(h.type)}>
                {getHolidayBadgeLabel(h.type)}
              </Badge>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="cursor-pointer text-muted-foreground hover:text-foreground"
                  onClick={() => onEditHoliday(h)}
                >
                  <Pencil />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="cursor-pointer text-destructive/80 hover:text-destructive"
                  onClick={() => onDeleteHoliday(h.id)}
                >
                  <Trash2 />
                </Button>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
