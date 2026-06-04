import { Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface AccrualPolicy {
  id: string;
  name: string;
  leaveType: string;
  accrualRate: number;
  frequency: "monthly" | "yearly" | "biweekly" | "accrued-front";
  carryoverLimit: number;
  probationDays: number;
  isActive: boolean;
  description: string;
}

interface PolicyCardProps {
  policy: AccrualPolicy;
  onToggleActive: (id: string) => void;
  onDeletePolicy: (id: string) => void;
}

export function PolicyCard({
  policy,
  onToggleActive,
  onDeletePolicy,
}: PolicyCardProps) {
  return (
    <Card
      className={`shadow-sm border transition-all duration-200 ${
        policy.isActive
          ? "border-border"
          : "border-muted/30 bg-slate-500/5 opacity-75"
      }`}
    >
      <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <CardTitle className="text-md font-bold">{policy.name}</CardTitle>
            {!policy.isActive && <Badge variant="secondary">Inactive</Badge>}
          </div>
          <Badge
            variant="outline"
            className="border-indigo-500 text-indigo-500 font-semibold bg-indigo-500/5"
          >
            {policy.leaveType}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={policy.isActive}
            onCheckedChange={() => onToggleActive(policy.id)}
            className="cursor-pointer"
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs text-muted-foreground leading-relaxed h-[36px] overflow-hidden line-clamp-2">
          {policy.description}
        </p>

        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border/60">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-muted-foreground">
              Accrual Increment
            </span>
            <p className="text-sm font-semibold">
              {policy.accrualRate} {policy.accrualRate === 1 ? "day" : "days"} /{" "}
              {policy.frequency}
            </p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-muted-foreground">
              Carryover Limit
            </span>
            <p className="text-sm font-semibold">
              {policy.carryoverLimit > 0
                ? `${policy.carryoverLimit} Days`
                : "No Carryover"}
            </p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-muted-foreground">
              Probation Period
            </span>
            <p className="text-sm font-semibold">
              {policy.probationDays > 0
                ? `${policy.probationDays} Days`
                : "Immediate"}
            </p>
          </div>
          <div className="space-y-0.5 flex justify-end items-end pb-0.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDeletePolicy(policy.id)}
              className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-500/5 cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
