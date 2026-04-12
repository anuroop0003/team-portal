import { RewardCard } from "../../components/reward-card";
import { TicketCard } from "../../components/ticket-card";
import { CompactLeaderboard } from "../global-leaderboard/components/compact-leaderboard";
import { SectionHeader } from "../../components/section-header";
import { RecentHistory } from "./components/recent-history";
import {
  MOCK_MY_REWARDS,
  MOCK_SHOP_REWARDS,
  MOCK_RECENT_HISTORY,
} from "../../constants";
import { PATHS } from "@/routes/constants/paths";

export default function RewardsPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 animate-in fade-in duration-700">
      {/* Left Column (Overview Content) */}
      <div className="lg:col-span-7 space-y-10">
        {/* Available Rewards Preview */}
        <section>
          <SectionHeader
            title="My Rewards"
            description="The rewards and achievements you have collected."
            href={PATHS.REWARDS.MY_REWARDS}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {MOCK_MY_REWARDS.map((reward) => (
              <RewardCard key={reward.id} reward={reward} />
            ))}
          </div>
        </section>

        {/* Redeem Shop Preview */}
        <section>
          <SectionHeader
            title="Redeem Shop"
            description="Spend your hard-earned points on premium perks."
            href={PATHS.REWARDS.REDEEM_SHOP}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {MOCK_SHOP_REWARDS.map((reward) => (
              <TicketCard key={reward.id} reward={reward} />
            ))}
          </div>
        </section>
      </div>

      <div className="lg:col-span-3 space-y-10">
        <section>
          <SectionHeader
            title="Global Leaderboard"
            description="Top contributors."
            href={PATHS.REWARDS.GLOBAL_LEADERBOARD}
          />
          <CompactLeaderboard />
        </section>
        <section>
          <SectionHeader
            title="Points History"
            description="Latest activity."
            href={PATHS.REWARDS.POINTS_HISTORY}
          />
          <RecentHistory items={MOCK_RECENT_HISTORY} />
        </section>
      </div>
    </div>
  );
}
