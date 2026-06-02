import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ActivityEvent {
  id: string;
  time: string;
  employeeName: string;
  action: string;
}

interface ActivityFeedProps {
  events: ActivityEvent[];
}

export function ActivityFeed({ events }: ActivityFeedProps) {
  return (
    <Card className="shadow-sm border border-border">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Activity Feed</CardTitle>
        <CardDescription className="text-sm">
          Continuous log of swipe actions and desk check-ins.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-border/60">
          {events.map((evt) => (
            <div key={evt.id} className="relative pl-7 flex flex-col gap-0.5">
              <div className="absolute left-[9.5px] top-1.5 w-2 h-2 rounded-full bg-indigo-500 shadow-sm ring-4 ring-background" />
              <div className="flex justify-between items-center text-xs text-muted-foreground font-semibold">
                <span>{evt.employeeName}</span>
                <span>{evt.time}</span>
              </div>
              <p className="text-xs font-bold text-foreground leading-snug">
                {evt.action}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
