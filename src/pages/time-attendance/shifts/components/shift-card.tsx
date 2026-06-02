import { Clock, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

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

interface ShiftCardProps {
  shift: Shift;
  onToggleActive: (id: string) => void;
  onDeleteShift: (id: string) => void;
}

export function ShiftCard({
  shift,
  onToggleActive,
  onDeleteShift,
}: ShiftCardProps) {
  return (
    <Card
      className={`shadow-sm border transition-all duration-200 ${
        shift.isActive
          ? "border-border"
          : "border-muted/30 bg-slate-500/5 opacity-75"
      }`}
    >
      <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <CardTitle className="text-md font-bold">{shift.name}</CardTitle>
            {!shift.isActive && <Badge variant="secondary">Inactive</Badge>}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>
              {shift.startTime} – {shift.endTime}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={shift.isActive}
            onCheckedChange={() => onToggleActive(shift.id)}
            className="cursor-pointer"
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {shift.startTime !== "Flexible" && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
              <span>Timeline Map</span>
              <span>9 Hours Window</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-500/10 overflow-hidden flex">
              <div className="w-[15%] h-full bg-slate-500/20" />
              <div className={`flex-1 h-full ${shift.color} opacity-85`} />
              <div className="w-[20%] h-full bg-slate-500/20" />
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border/60 text-center">
          <div>
            <p className="text-[10px] uppercase font-bold text-muted-foreground">
              Grace Period
            </p>
            <p className="text-sm font-semibold">
              {shift.gracePeriodMinutes} mins
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-muted-foreground">
              Break Allowance
            </p>
            <p className="text-sm font-semibold">
              {shift.breakDurationMinutes} mins
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-muted-foreground">
              Half-Day limit
            </p>
            <p className="text-sm font-semibold">
              {shift.halfDayThresholdHours} hrs
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDeleteShift(shift.id)}
            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-500/5 cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
