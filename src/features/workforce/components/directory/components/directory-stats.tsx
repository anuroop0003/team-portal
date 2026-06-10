import { Users } from "lucide-react";
import { StatsCard } from "@/components/stats-card";

interface DirectoryStatsProps {
  totalMembers: number;
  isLoading?: boolean;
}

export function DirectoryStats({
  totalMembers,
  isLoading,
}: DirectoryStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <StatsCard
        label="Total Members"
        value={totalMembers.toString()}
        isLoading={isLoading}
        description="Integrated platform workforce"
        icon={<Users className="size-6 text-primary" />}
      />
      {/* <StatsCard
        label="Global Team Points"
        value={totalPoints.toLocaleString()}
        description="Cumulative points earned"
        icon={<Trophy className="size-4 text-amber-500" />}
      />
      <StatsCard
        label="Avg. Performance"
        value={avgPoints.toLocaleString()}
        description="Average points per member"
        icon={<TrendingUp className="size-4 text-emerald-500" />}
      /> */}
    </div>
  );
}
