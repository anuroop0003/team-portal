import { Outlet } from "react-router-dom";
import { CreateRewardDrawer } from "../components/create-reward-drawer";
import { RewardStats } from "../components/reward-stats";

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

        <CreateRewardDrawer />
      </div>

      <RewardStats />

      <Outlet />
    </div>
  );
}
