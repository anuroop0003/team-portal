import { Globe, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Holiday {
  id: string;
  name: string;
  date: string;
  type: "public" | "restricted" | "company-specific";
  locationScope: string;
  isPaid: boolean;
}

interface HolidaysTableProps {
  holidays: Holiday[];
  onDeleteHoliday: (id: string) => void;
  getHolidayBadge: (type: Holiday["type"]) => React.ReactNode;
}

export function HolidaysTable({
  holidays,
  onDeleteHoliday,
  getHolidayBadge,
}: HolidaysTableProps) {
  return (
    <div className="overflow-x-auto border border-border rounded-lg">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-500/5 border-b border-border text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <th className="p-4">Holiday Title</th>
            <th className="p-4">Date</th>
            <th className="p-4">Category</th>
            <th className="p-4">Geographic Scope</th>
            <th className="p-4">Paid Status</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border text-sm font-medium">
          {holidays.map((holiday) => (
            <tr
              key={holiday.id}
              className="hover:bg-slate-500/5 transition-colors"
            >
              <td className="p-4 font-bold">{holiday.name}</td>
              <td className="p-4 text-muted-foreground">
                {new Date(holiday.date).toLocaleDateString([], {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
              <td className="p-4">{getHolidayBadge(holiday.type)}</td>
              <td className="p-4 flex items-center gap-1.5 text-muted-foreground">
                <Globe className="h-4 w-4 shrink-0" />
                <span>{holiday.locationScope}</span>
              </td>
              <td className="p-4">
                {holiday.isPaid ? (
                  <Badge
                    variant="outline"
                    className="border-emerald-500 text-emerald-500 bg-emerald-500/5 font-semibold"
                  >
                    Paid
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="font-semibold">
                    Unpaid
                  </Badge>
                )}
              </td>
              <td className="p-4 text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteHoliday(holiday.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-500/5 cursor-pointer h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
