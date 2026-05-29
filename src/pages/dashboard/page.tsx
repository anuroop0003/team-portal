import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ActivityIcon,
  AwardIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Members",
      value: "128",
      description: "+4 from last month",
      icon: UsersIcon,
      color: "text-blue-500",
    },
    {
      title: "Active Projects",
      value: "12",
      description: "2 nearing completion",
      icon: ActivityIcon,
      color: "text-emerald-500",
    },
    {
      title: "Reward Points",
      value: "8,450",
      description: "Top 5% performer",
      icon: AwardIcon,
      color: "text-amber-500",
    },
    {
      title: "Team Efficiency",
      value: "94%",
      description: "+2.5% this week",
      icon: TrendingUpIcon,
      color: "text-indigo-500",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Welcome back. Here's what's happening across your team today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`size-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
              No recent activity found.
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="size-9 rounded-full bg-muted flex items-center justify-center font-bold text-xs">
                    RT
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Reward Target {i}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Complete project milestone {i}
                    </p>
                  </div>
                  <div className="font-medium text-xs text-amber-500">
                    +100 pts
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
