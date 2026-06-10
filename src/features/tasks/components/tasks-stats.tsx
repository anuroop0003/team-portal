import { CheckCircle, Clock, AlertCircle, ListTodo } from "lucide-react";
import { StatsCard } from "@/components/stats-card";

interface TasksStatsProps {
  totalTasks: number;
  inProgressTasks: number;
  overdueTasks: number;
  completedTasks: number;
}

export function TasksStats({
  totalTasks,
  inProgressTasks,
  overdueTasks,
  completedTasks,
}: TasksStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
      <StatsCard
        label="Total Tasks"
        value={totalTasks.toString()}
        description="Workspace backlog"
        icon={<ListTodo className="size-6 text-muted-foreground" />}
      />

      <StatsCard
        label="In Progress / Review"
        value={inProgressTasks.toString()}
        description="Currently being worked on"
        icon={<Clock className="size-6 text-amber-500" />}
      />

      <StatsCard
        label="Overdue Backlog"
        value={overdueTasks.toString()}
        description="Missed deadline dates"
        icon={<AlertCircle className="size-6 text-destructive" />}
      />

      <StatsCard
        label="Completed Tasks"
        value={completedTasks.toString()}
        description="Successfully delivered"
        icon={<CheckCircle className="size-6 text-emerald-500" />}
      />
    </div>
  );
}
