import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TimesheetAttendanceStats() {
  const member = {
    name: "Anuroop TM",
    avatar: "",
  };

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>Attendance Stats</CardTitle>
      </CardHeader>
      <CardContent>
        {/* User Row (Me) */}
        <StatRow
          avatar={
            <Avatar className="size-10">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
          }
          title="Me"
          subtitle="Last Week"
          avgHours="5h 7m"
          arrivalRate="100%"
        />

        <Separator orientation="horizontal" className="my-3" />

        {/* Team Row */}
        <StatRow
          avatar={
            <div className="flex items-center justify-center size-10 rounded-full bg-muted text-muted-foreground">
              <Users className="size-4" />
            </div>
          }
          title="My Team"
          subtitle="Last Week"
          avgHours="5h 7m"
          arrivalRate="100%"
        />
      </CardContent>
    </Card>
  );
}

// Internal Sub-components

interface StatRowProps {
  avatar: React.ReactNode;
  title: string;
  subtitle: string;
  avgHours: string;
  arrivalRate: string;
}

function StatRow({
  avatar,
  title,
  subtitle,
  avgHours,
  arrivalRate,
}: StatRowProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {avatar}
        <div>
          <span className="font-semibold text-sm">{title}</span>
          <div className="text-[10px] text-muted-foreground">{subtitle}</div>
        </div>
      </div>
      <div className="flex gap-6 text-right">
        <div>
          <div className="text-[10px] text-muted-foreground font-medium">
            Avg Hrs
          </div>
          <div className="text-xs font-bold">{avgHours}</div>
        </div>
        <div>
          <div className="text-[10px] text-muted-foreground font-medium">
            Arrival
          </div>
          <div className="text-xs font-bold text-emerald-500">
            {arrivalRate}
          </div>
        </div>
      </div>
    </div>
  );
}
