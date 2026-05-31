import { Crown, ChevronsUp, ChevronsDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MOCK_LEADERBOARD } from "../../../constants";

export function Leaderboard() {
  return (
    <div className="space-y-3">
      {MOCK_LEADERBOARD.map((person) => (
        <div
          key={person.id}
          className={cn(
            "flex items-center justify-between p-4 rounded-xl transition-all duration-300 group",
            "bg-card border shadow-sm hover:shadow-md hover:border-primary/20",
            person.isUser && "bg-primary/3 border-primary/30",
          )}
        >
          {/* Left: Rank and User Info */}
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center size-10">
              {person.rank === 1 ? (
                <Crown className="size-8 text-yellow-400 fill-yellow-400" />
              ) : person.rank === 2 ? (
                <Crown className="size-8 text-gray-300 fill-gray-300" />
              ) : person.rank === 3 ? (
                <Crown className="size-8 text-amber-600 fill-amber-600" />
              ) : (
                <div className="size-8 flex items-center justify-center text-sm text-foreground">
                  {person.rank}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <Avatar className="size-10 border shadow-sm">
                <AvatarImage src={person.avatar} alt={person.name} />
                <AvatarFallback>{person.avatar}</AvatarFallback>
              </Avatar>

              <div>
                <p
                  className={cn(
                    "text-sm font-bold tracking-tight text-foreground",
                    person.isUser && "text-primary",
                  )}
                >
                  {person.name}
                </p>
                <p className="text-[11px] text-muted-foreground font-medium">
                  {person.email}
                </p>
              </div>
            </div>
          </div>

          {/* Middle: Achievement Pill (Hidden on mobile) */}
          <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/50 border shadow-xs">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Achievement
            </span>
            <div className="flex items-center gap-2 border-l border-border pl-3 ml-1">
              <div className="size-3.5 bg-sky-500 rounded-xs flex items-center justify-center">
                <span className="text-[5px] font-black text-white italic">
                  P
                </span>
              </div>
            </div>
          </div>

          {/* Right: Points */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-lg font-bold text-foreground tabular-nums tracking-tighter">
                {person.points.toLocaleString()}
                <span className="text-muted-foreground text-[10px] ml-1 font-bold">
                  pts
                </span>
              </div>
              <div className="text-[10px] font-bold text-muted-foreground text-right leading-none">
                Total
              </div>
            </div>
            {person.change === "up" ? (
              <ChevronsUp className="text-emerald-500" />
            ) : person.change === "down" ? (
              <ChevronsDown className="text-rose-500" />
            ) : (
              <div className="size-6" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
