import { Star, Trophy, ChartColumn } from "lucide-react";
import { StatsCard } from "@/components/stats-card";
import { MOCK_STATS } from "../constants";

export function RewardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatsCard
        label="Points Balance"
        value={MOCK_STATS.totalPoints.toLocaleString()}
        icon={<Star className="size-4 text-amber-500" />}
        description="+12% from last month"
      />
      <StatsCard
        label="Badges Earned"
        value={MOCK_STATS.badgesEarned.toString()}
        icon={<Trophy className="size-4 text-indigo-500" />}
        description="Next badge: Top Collaborator"
      />
      <StatsCard
        label="Global Rank"
        value={`#${MOCK_STATS.globalRank}`}
        icon={<ChartColumn className="size-4 text-emerald-500" />}
        description="Top 1% of the company"
      />
    </div>
  );
}
