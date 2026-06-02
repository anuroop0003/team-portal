import { Wifi } from "lucide-react";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function LiveHeader() {
  return (
    <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0 pb-4 p-0">
      <div>
        <CardTitle className="text-lg font-bold">Live Status Monitor</CardTitle>
        <CardDescription className="text-sm">
          Real-time status check and active workstation details across branches.
        </CardDescription>
      </div>
      <div className="flex items-center gap-1.5 text-emerald-500 text-xs font-bold uppercase tracking-wider animate-pulse">
        <Wifi className="h-4 w-4" /> Live Streaming
      </div>
    </CardHeader>
  );
}
