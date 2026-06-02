import { Users, Clock, Coffee, ShieldAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function LiveStats() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="border border-border shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Present Ratio
            </p>
            <p className="text-2xl font-bold">75.0%</p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-full">
            <Users className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Late Arrivals Today
            </p>
            <p className="text-2xl font-bold">1 Member</p>
          </div>
          <div className="p-3 bg-orange-500/10 text-orange-600 rounded-full">
            <Clock className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Currently On Break
            </p>
            <p className="text-2xl font-bold">1 Member</p>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-600 rounded-full">
            <Coffee className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Absent / Off
            </p>
            <p className="text-2xl font-bold">1 Member</p>
          </div>
          <div className="p-3 bg-red-500/10 text-red-600 rounded-full">
            <ShieldAlert className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
