import {
  UserCheck,
  Calendar as CalendarIcon,
  ShieldAlert,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function CalendarStats() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="border border-border shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Today's Staffing
            </p>
            <p className="text-2xl font-bold">92%</p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-full">
            <UserCheck className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Active Leaves Today
            </p>
            <p className="text-2xl font-bold">1 Member</p>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-600 rounded-full">
            <CalendarIcon className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Pending Leaves
            </p>
            <p className="text-2xl font-bold">2 Requests</p>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-600 rounded-full">
            <ShieldAlert className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Total Managed Strength
            </p>
            <p className="text-2xl font-bold">4 Members</p>
          </div>
          <div className="p-3 bg-indigo-500/10 text-indigo-600 rounded-full">
            <Users className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
