import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { RewardCard } from "../../components/reward-card";
import { MOCK_MY_REWARDS } from "../../constants";
import { Link } from "react-router-dom";
import { PATHS } from "@/routes/constants/paths";

export default function MyRewardsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
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
        <h2 className="text-lg font-bold tracking-tight">My Rewards</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {MOCK_MY_REWARDS.map((reward) => (
          <RewardCard key={reward.id} reward={reward} />
        ))}
      </div>
    </div>
  );
}
