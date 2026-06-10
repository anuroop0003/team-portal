import { ArrowLeft, TrendingUp, TrendingDown, History } from "lucide-react";
import { DataTable } from "./components/data-table";
import { PointsHistoryInfo } from "./components/points-history-info";
import { MOCK_HISTORY, columns } from "../constants";
import { PATHS } from "@/routes/constants/paths";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { StatsCard } from "@/components/stats-card";

export default function PointsHistoryPage() {
  const totalEarned = MOCK_HISTORY.filter((h) => h.type === "Earned").reduce(
    (acc, h) => acc + h.amount,
    0,
  );

  const totalSpent = Math.abs(
    MOCK_HISTORY.filter((h) => h.type === "Redeemed").reduce(
      (acc, h) => acc + h.amount,
      0,
    ),
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="flex items-center gap-4">
        <Link
          to={PATHS.REWARDS.ROOT}
          className={buttonVariants({
            size: "icon",
            className: "rounded-full! cursor-pointer",
          })}
        >
          <ArrowLeft />
        </Link>
        <h2 className="text-lg font-bold tracking-tight">Points History</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatsCard
          label="Total Earned"
          value={`+${totalEarned.toLocaleString()}`}
          description="Points earned to date"
          icon={<TrendingUp className="size-4 text-emerald-500" />}
        />

        <StatsCard
          label="Total Spent"
          value={`-${totalSpent.toLocaleString()}`}
          description="Points redeemed to date"
          icon={<TrendingDown className="size-4 text-orange-500" />}
        />

        <StatsCard
          label="Transactions"
          value={MOCK_HISTORY.length.toString()}
          description="Total transaction records"
          icon={<History className="size-4 text-blue-500" />}
        />
      </div>

      <DataTable columns={columns} data={MOCK_HISTORY} />

      <PointsHistoryInfo />
    </div>
  );
}
