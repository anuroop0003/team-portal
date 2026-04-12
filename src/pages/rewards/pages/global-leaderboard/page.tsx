import { ArrowLeft } from "lucide-react";
import { Leaderboard } from "./components/leaderboard";
import { PATHS } from "@/routes/constants/paths";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function GlobalLeaderboardPage() {
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
        <h2 className="text-lg font-bold tracking-tight">Global Leaderboard</h2>
      </div>

      <Leaderboard />
    </div>
  );
}
