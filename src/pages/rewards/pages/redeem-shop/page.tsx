import { ArrowLeft } from "lucide-react";
import { TicketCard } from "../../components/ticket-card";
import { MOCK_SHOP_REWARDS } from "../../constants";
import { PATHS } from "@/routes/constants/paths";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function RedeemShopPage() {
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
        <h2 className="text-lg font-bold tracking-tight">Redeem Shop</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {MOCK_SHOP_REWARDS.map((reward) => (
          <TicketCard key={reward.id} reward={reward} />
        ))}
      </div>
    </div>
  );
}
