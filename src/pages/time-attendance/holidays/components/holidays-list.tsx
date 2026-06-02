import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PersonalHoliday {
  id: string;
  name: string;
  date: string;
  dayOfWeek: string;
  daysRemaining: number;
  type: "mandatory" | "optional";
  isPaid: boolean;
}

interface HolidaysListProps {
  holidays: PersonalHoliday[];
}

export function HolidaysList({ holidays }: HolidaysListProps) {
  return (
    <div className="md:col-span-2 space-y-4">
      <h3 className="text-md font-bold text-muted-foreground uppercase tracking-wider">
        Upcoming Holiday Schedule
      </h3>

      <div className="grid gap-4">
        {holidays.map((h) => (
          <Card
            key={h.id}
            className="shadow-sm border border-border overflow-hidden"
          >
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4">
                <div className="flex items-center gap-4">
                  {/* Visual date block */}
                  <div className="w-12 h-14 rounded-lg bg-indigo-500/10 border border-indigo-500/25 text-indigo-600 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider leading-none">
                      {new Date(h.date).toLocaleDateString([], {
                        month: "short",
                      })}
                    </span>
                    <span className="text-xl font-bold font-mono leading-none pt-0.5">
                      {new Date(h.date).toLocaleDateString([], {
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold leading-tight">
                      {h.name}
                    </h4>
                    <p className="text-xs text-muted-foreground font-medium leading-none">
                      {h.dayOfWeek} •{" "}
                      {new Date(h.date).toLocaleDateString([], {
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5 items-center shrink-0 self-end sm:self-auto">
                  <Badge
                    variant="outline"
                    className={
                      h.type === "mandatory"
                        ? "border-emerald-500 text-emerald-500 bg-emerald-500/5 font-semibold"
                        : "font-semibold"
                    }
                  >
                    {h.type === "mandatory"
                      ? "Mandatory Paid Off"
                      : "Restricted / Optional"}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="font-semibold text-xs py-0.5"
                  >
                    In {h.daysRemaining} Days
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
