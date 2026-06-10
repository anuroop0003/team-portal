import { Outlet, Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RewardStats } from "./components/reward-stats";
import { PATHS } from "@/routes/constants/paths";

export default function RewardsLayout() {
  return (
    <div className="flex-1 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">
            Rewards & Recognition
          </h1>
          <p className="text-sm text-muted-foreground font-medium">
            Manage employee rewards, monitor achievements, and track your
            progress.
          </p>
        </div>

        <Link to={PATHS.REWARDS.ADD_REWARD}>
          <Button className="cursor-pointer">
            <Plus />
            Add New Reward
          </Button>
        </Link>
      </div>

      <RewardStats />

      <Outlet />
    </div>
  );
}
