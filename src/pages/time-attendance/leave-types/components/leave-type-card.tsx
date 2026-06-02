import { Check, X, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface LeaveType {
  id: string;
  name: string;
  allowance: number;
  isPaid: boolean;
  requiresCertificate: boolean;
  halfDayAllowed: boolean;
  isActive: boolean;
}

interface LeaveTypeCardProps {
  type: LeaveType;
  onToggleActive: (id: string) => void;
  onDeleteLeaveType: (id: string) => void;
}

export function LeaveTypeCard({
  type,
  onToggleActive,
  onDeleteLeaveType,
}: LeaveTypeCardProps) {
  return (
    <Card
      className={`shadow-sm border transition-all duration-200 ${
        type.isActive
          ? "border-border"
          : "border-muted/30 bg-slate-500/5 opacity-75"
      }`}
    >
      <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-md font-bold">{type.name}</CardTitle>
          <Badge
            variant={type.isPaid ? "outline" : "secondary"}
            className={
              type.isPaid
                ? "border-emerald-500 text-emerald-500 bg-emerald-500/5 font-semibold"
                : "font-semibold"
            }
          >
            {type.isPaid ? "Paid Leave" : "Unpaid"}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={type.isActive}
            onCheckedChange={() => onToggleActive(type.id)}
            className="cursor-pointer"
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-muted-foreground">Standard Allowance:</span>
            <span className="text-foreground font-bold">
              {type.allowance} Days / Year
            </span>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-border/50 text-xs font-medium">
            <div className="flex items-center gap-2 text-muted-foreground">
              {type.requiresCertificate ? (
                <Check className="h-4 w-4 text-amber-500" />
              ) : (
                <X className="h-4 w-4 text-muted-foreground/45" />
              )}
              <span>Requires Supporting Documents</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              {type.halfDayAllowed ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : (
                <X className="h-4 w-4 text-muted-foreground/45" />
              )}
              <span>Half-Day Request Allowed</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDeleteLeaveType(type.id)}
            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-500/5 cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
