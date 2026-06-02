import { Calendar, Clock, Check, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PendingLeave {
  id: string;
  employeeName: string;
  leaveType: string;
  duration: string;
  dates: string;
  reason: string;
}

interface PendingCorrection {
  id: string;
  employeeName: string;
  date: string;
  original: string;
  requested: string;
  reason: string;
}

interface ApprovalsTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  leaves: PendingLeave[];
  corrections: PendingCorrection[];
  handleApproveLeave: (id: string) => void;
  handleApproveCorrection: (id: string) => void;
  handleOpenReject: (id: string) => void;
}

export function ApprovalsTabs({
  activeTab,
  setActiveTab,
  leaves,
  corrections,
  handleApproveLeave,
  handleApproveCorrection,
  handleOpenReject,
}: ApprovalsTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-5">
      <TabsList className="grid grid-cols-2 w-[360px] bg-slate-500/5">
        <TabsTrigger
          value="leaves"
          className="cursor-pointer font-semibold text-xs py-2"
        >
          Leave Requests ({leaves.length})
        </TabsTrigger>
        <TabsTrigger
          value="corrections"
          className="cursor-pointer font-semibold text-xs py-2"
        >
          Timesheet Corrections ({corrections.length})
        </TabsTrigger>
      </TabsList>

      {/* Tab 1: Leave Requests */}
      <TabsContent value="leaves" className="space-y-4">
        {leaves.length === 0 ? (
          <Card className="border border-dashed border-border bg-slate-500/5">
            <CardContent className="p-8 text-center text-muted-foreground text-sm font-semibold">
              No pending leave requests in inbox.
            </CardContent>
          </Card>
        ) : (
          leaves.map((req) => (
            <Card
              key={req.id}
              className="shadow-sm border border-border overflow-hidden"
            >
              <CardContent className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                    {req.employeeName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-sm">
                        {req.employeeName}
                      </span>
                      <Badge
                        variant="outline"
                        className="border-indigo-500 text-indigo-500 bg-indigo-500/5 font-semibold"
                      >
                        {req.leaveType}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        {req.dates} ({req.duration})
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed italic max-w-[500px]">
                      "{req.reason}"
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 self-end md:self-auto shrink-0">
                  <Button
                    size="sm"
                    onClick={() => handleApproveLeave(req.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold cursor-pointer gap-1.5"
                  >
                    <Check className="h-3.5 w-3.5" /> Approve
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenReject(req.id)}
                    className="text-red-500 border-red-200 hover:bg-red-500/5 cursor-pointer gap-1.5"
                  >
                    <X className="h-3.5 w-3.5" /> Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </TabsContent>

      {/* Tab 2: Timesheet Corrections */}
      <TabsContent value="corrections" className="space-y-4">
        {corrections.length === 0 ? (
          <Card className="border border-dashed border-border bg-slate-500/5">
            <CardContent className="p-8 text-center text-muted-foreground text-sm font-semibold">
              No pending timesheet adjustment applications.
            </CardContent>
          </Card>
        ) : (
          corrections.map((req) => (
            <Card
              key={req.id}
              className="shadow-sm border border-border overflow-hidden"
            >
              <CardContent className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                    {req.employeeName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">
                        {req.employeeName}
                      </span>
                      <Badge
                        variant="outline"
                        className="border-amber-500 text-amber-500 bg-amber-500/5 font-semibold gap-1"
                      >
                        <Clock className="h-3.5 w-3.5" /> Adjustment Req.
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs font-semibold text-muted-foreground bg-slate-500/5 p-2 rounded-lg border border-border/60">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-muted-foreground">
                          Original Entry:
                        </span>
                        <p className="text-foreground">{req.original}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase text-indigo-500">
                          Requested Correction:
                        </span>
                        <p className="text-indigo-600 font-bold">
                          {req.requested}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed italic max-w-[500px]">
                      "{req.reason}"
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 self-end md:self-auto shrink-0">
                  <Button
                    size="sm"
                    onClick={() => handleApproveCorrection(req.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold cursor-pointer gap-1.5"
                  >
                    <Check className="h-3.5 w-3.5" /> Approve
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenReject(req.id)}
                    className="text-red-500 border-red-200 hover:bg-red-500/5 cursor-pointer gap-1.5"
                  >
                    <X className="h-3.5 w-3.5" /> Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </TabsContent>
    </Tabs>
  );
}
