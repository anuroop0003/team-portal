import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { TimeOffBalance as TimeOffBalanceType } from "@/features/time-attendance/api/time-attendance.types";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface TimeOffStatsProps {
  balances: TimeOffBalanceType[];
}

interface StatItemProps {
  label: string;
  value: number;
  valueClassName?: string;
}

function StatItem({ label, value, valueClassName }: StatItemProps) {
  return (
    <div className="flex-1 space-y-1">
      <p className="text-xs">{label}</p>
      <p className={cn("text-sm font-semibold", valueClassName)}>{value}d</p>
    </div>
  );
}

export function TimeOffStats({ balances }: TimeOffStatsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {balances.map((balance) => (
        <Card key={balance.leaveTypeId} size="sm">
          <CardHeader>
            <CardTitle>{balance.leaveTypeName}</CardTitle>
            <CardDescription>
              Annual Entitlement: {balance.allocated} days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">
                  Available Allowance
                </span>
                <span className="text-foreground">
                  {balance.remaining} / {balance.allocated} Days
                </span>
              </div>
              <Progress value={(balance.remaining / balance.allocated) * 100} />
            </div>
          </CardContent>

          <CardFooter className="flex items-stretch justify-between text-center">
            <StatItem label="Allocated" value={balance.allocated} />

            <Separator orientation="vertical" className="h-auto" />

            <StatItem label="Consumed" value={balance.consumed} />

            <Separator orientation="vertical" className="h-auto" />

            <StatItem label="Pending" value={balance.pendingApproval} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
