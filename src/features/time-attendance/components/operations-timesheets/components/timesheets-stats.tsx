import { HelpCircle, CheckCircle2, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function TimesheetsStats() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="border border-border shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Unverified Timesheets
            </p>
            <p className="text-2xl font-bold">2 logs</p>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-600 rounded-full">
            <HelpCircle className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Approved Logs
            </p>
            <p className="text-2xl font-bold">1 log</p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-full">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Pending Correction
            </p>
            <p className="text-2xl font-bold">1 log</p>
          </div>
          <div className="p-3 bg-red-500/10 text-red-600 rounded-full">
            <AlertTriangle className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
