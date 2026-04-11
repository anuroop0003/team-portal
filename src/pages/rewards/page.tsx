import * as React from "react";
import {
  TrendingUp,
  TrendingDown,
  Trophy,
  Star,
  ShoppingBag,
  Plus,
  Target,
  Award,
  ChevronRight,
  Clock,
  Briefcase,
  Gift,
  CheckCircle2,
} from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DataTable } from "./components/data-table";

// --- Mock Data ---

const MOCK_STATS = {
  totalPoints: 12450,
  badgesEarned: 12,
  globalRank: 4,
  nextMilestone: 75, // percentage
  nextMilestoneLabel: "Platinum Elite",
};

const MOCK_LEADERBOARD = [
  {
    id: 1,
    name: "Sarah Jenkins",
    points: 28400,
    rank: 1,
    change: "up",
    avatar: "SJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    points: 25150,
    rank: 2,
    change: "down",
    avatar: "MC",
  },
  {
    id: 3,
    name: "Jessica Wong",
    points: 22900,
    rank: 3,
    change: "stable",
    avatar: "JW",
  },
  {
    id: 4,
    name: "You",
    points: 12450,
    rank: 4,
    change: "up",
    avatar: "ME",
    isUser: true,
  },
  {
    id: 5,
    name: "David Miller",
    points: 11200,
    rank: 5,
    change: "down",
    avatar: "DM",
  },
];

const MOCK_REWARDS = [
  {
    id: "r1",
    title: "Extra Day Off",
    points: 5000,
    description: "Get an additional paid day off to recharge and relax.",
    department: ["All"],
    type: "One-time",
    icon: <Clock className="size-5" />,
    color: "indigo",
  },
  {
    id: "r2",
    title: "Innovation Badge",
    points: 1200,
    description: "awarded for submitting a groundbreaking process improvement.",
    department: ["Engineering", "Product"],
    type: "Achievement Badge",
    icon: <Target className="size-5" />,
    color: "amber",
  },
  {
    id: "r3",
    title: "Performance Bonus",
    points: 15000,
    description: "A quarterly performance incentive for top achievers.",
    department: ["Sales", "Marketing"],
    type: "Recurring",
    icon: <TrendingUp className="size-5" />,
    color: "emerald",
  },
  {
    id: "r4",
    title: "Amazon Gift Card ($50)",
    points: 2500,
    description: "Redeem your points for a digital Amazon gift card.",
    department: ["All"],
    type: "One-time",
    icon: <Gift className="size-5" />,
    color: "indigo",
  },
  {
    id: "r5",
    title: "Leads Mastery",
    points: 800,
    description: "Consistent lead conversion over a 3-month period.",
    department: ["Sales"],
    type: "Achievement Badge",
    icon: <Award className="size-5" />,
    color: "amber",
  },
  {
    id: "r6",
    title: "Team Lunch Host",
    points: 3000,
    description: "Host the next monthly team lunch on the company's dime.",
    department: ["All"],
    type: "Recurring",
    icon: <ShoppingBag className="size-5" />,
    color: "emerald",
  },
];

const MOCK_HISTORY = [
  {
    id: "TX-9012",
    date: "2024-03-15",
    type: "Earned",
    amount: 1200,
    reason: "Project Beta Completion",
  },
  {
    id: "TX-8945",
    date: "2024-03-10",
    type: "Redeemed",
    amount: -2500,
    reason: "Amazon Gift Card",
  },
  {
    id: "TX-8821",
    date: "2024-03-05",
    type: "Earned",
    amount: 500,
    reason: "Peer Recognition",
  },
  {
    id: "TX-8756",
    date: "2024-02-28",
    type: "Earned",
    amount: 3000,
    reason: "Quarterly Performance Bonus",
  },
  {
    id: "TX-8643",
    date: "2024-02-20",
    type: "Redeemed",
    amount: -5000,
    reason: "Extra Day Off",
  },
];

type HistoryItem = (typeof MOCK_HISTORY)[0];

const columns: ColumnDef<HistoryItem>[] = [
  {
    accessorKey: "id",
    header: "Transaction ID",
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">
        {row.getValue("id")}
      </span>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return (
        <Badge variant={type === "Earned" ? "success" : "secondary"}>
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "reason",
    header: "Description",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("reason")}</span>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      return (
        <div
          className={cn(
            "text-right font-bold",
            amount > 0 ? "text-emerald-600" : "text-destructive",
          )}
        >
          {amount > 0 ? "+" : ""}
          {amount.toLocaleString()} pts
        </div>
      );
    },
  },
];

export default function RewardsPage() {
  const [activeTab, setActiveTab] = React.useState("available");
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleCreateReward = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsDrawerOpen(false);
    }, 2000);
  };

  return (
    <div className="flex-1 space-y-8 p-6 md:p-10 bg-background/50">
      {/* --- Stats Row --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="Points Balance"
          value={MOCK_STATS.totalPoints.toLocaleString()}
          icon={<Star className="text-amber-500" />}
          trend="+12% from last month"
        />
        <StatsCard
          label="Badges Earned"
          value={MOCK_STATS.badgesEarned}
          icon={<Trophy className="text-indigo-500" />}
          trend="Next badge: Top Collaborator"
        />
        <StatsCard
          label="Global Rank"
          value={`#${MOCK_STATS.globalRank}`}
          icon={<TrendingUp className="text-emerald-500" />}
          trend="Top 1% of the company"
        />
        <StatsCard
          label="Next Milestone"
          value={`${MOCK_STATS.nextMilestone}%`}
          icon={<Target className="text-indigo-600" />}
          subtext={`Progress to ${MOCK_STATS.nextMilestoneLabel}`}
          showProgress
          progressValue={MOCK_STATS.nextMilestone}
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Rewards & Recognition
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage employee rewards, monitor achievements, and track your
            progress.
          </p>
        </div>

        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <SheetTrigger
            render={
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 px-6">
                <Plus className="mr-2 size-4" /> Add New Reward
              </Button>
            }
          />
          <SheetContent className="sm:max-w-md backdrop-blur-xl bg-background/80 border-l border-border/40">
            <SheetHeader>
              <SheetTitle>Create New Reward</SheetTitle>
              <SheetDescription>
                Design a new reward or achievement to recognize team efforts.
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={handleCreateReward} className="space-y-6 py-6">
              <div className="space-y-2">
                <Label htmlFor="title">Reward Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Employee of the Month"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="points">Points Value</Label>
                  <Input id="points" type="number" placeholder="500" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Reward Type</Label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option>One-time</option>
                    <option>Recurring</option>
                    <option>Achievement Badge</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dept">Target Departments</Label>
                <div className="flex flex-wrap gap-2 p-3 border rounded-md bg-muted/20">
                  <Badge variant="secondary" className="cursor-pointer">
                    All
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer">
                    Engineering
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer">
                    Sales
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer">
                    Product
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Description</Label>
                <Textarea
                  id="desc"
                  placeholder="Briefly describe why this reward is granted..."
                />
              </div>
              <div className="space-y-2">
                <Label>Reward Icon</Label>
                <div className="flex items-center gap-4">
                  <div className="size-16 rounded-xl border-2 border-dashed border-border/60 flex items-center justify-center bg-muted/10 cursor-pointer hover:bg-muted/20 transition-colors">
                    <Plus className="size-6 text-muted-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Upload or choose a preset icon
                  </span>
                </div>
              </div>

              <SheetFooter className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 relative overflow-hidden group"
                >
                  {isSuccess ? (
                    <span className="flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
                      <CheckCircle2 className="size-4" /> Reward Created!
                    </span>
                  ) : (
                    "Create and Assign Reward"
                  )}
                  {isSuccess && (
                    <div className="absolute inset-0 bg-emerald-500 animate-in fade-in duration-500" />
                  )}
                </Button>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      {/* --- Main Content --- */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        {/* Left Column (70%) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <Tabs
            className="w-full"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="available">Available Rewards</TabsTrigger>
              <TabsTrigger value="history">My History</TabsTrigger>
              <TabsTrigger value="shop">Redeem Shop</TabsTrigger>
            </TabsList>

            <TabsContent value="available" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {MOCK_REWARDS.filter(
                  (r) =>
                    r.type === "Achievement Badge" || r.type === "Recurring",
                ).map((reward) => (
                  <RewardCard key={reward.id} reward={reward} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <DataTable columns={columns} data={MOCK_HISTORY} />
            </TabsContent>

            <TabsContent value="shop" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {MOCK_REWARDS.filter((r) => r.type === "One-time").map(
                  (reward) => (
                    <RewardCard key={reward.id} reward={reward} isShop />
                  ),
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column (30%) */}
        <div className="lg:col-span-3">
          <Card className="border-border/40 bg-card/30 backdrop-blur-md shadow-xl sticky top-6">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="size-5 text-amber-500" /> Global Leaderboard
              </CardTitle>
              <CardDescription>Top contributors this month</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <div className="space-y-1">
                {MOCK_LEADERBOARD.map((person) => (
                  <div
                    key={person.id}
                    className={cn(
                      "flex items-center justify-between px-6 py-3 transition-colors",
                      person.isUser
                        ? "bg-indigo-500/10 border-y border-indigo-500/20"
                        : "hover:bg-muted/20",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "size-6 flex items-center justify-center rounded-full text-[10px] font-bold",
                          person.rank === 1
                            ? "bg-amber-100 text-amber-700 ring-4 ring-amber-50"
                            : person.rank === 2
                              ? "bg-slate-100 text-slate-700 ring-4 ring-slate-50"
                              : person.rank === 3
                                ? "bg-orange-100 text-orange-700 ring-4 ring-orange-50"
                                : "bg-muted text-muted-foreground",
                        )}
                      >
                        {person.rank}
                      </div>
                      <div className="size-9 rounded-full bg-linear-to-tr from-muted to-muted/20 flex items-center justify-center text-xs font-semibold ring-2 ring-background">
                        {person.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold leading-none">
                          {person.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {person.points.toLocaleString()} pts
                        </p>
                      </div>
                    </div>
                    <div>
                      {person.change === "up" ? (
                        <TrendingUp className="size-4 text-emerald-500" />
                      ) : person.change === "down" ? (
                        <TrendingDown className="size-4 text-destructive" />
                      ) : (
                        <span className="size-4 block" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 px-6">
                <Button
                  variant="outline"
                  className="w-full border-border/60 hover:bg-muted text-xs group"
                >
                  View Full Rankings{" "}
                  <ChevronRight className="ml-2 size-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// --- Internal Components ---

function StatsCard({
  label,
  value,
  icon,
  trend,
  subtext,
  showProgress,
  progressValue,
}: any) {
  return (
    <Card className="border-border/40 bg-card/40 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="size-10 rounded-xl bg-background shadow-sm border border-border/40 flex items-center justify-center transition-transform group-hover:scale-110">
            {icon}
          </div>
          {trend && (
            <span className="text-[10px] font-medium text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-full">
              {trend}
            </span>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {label}
          </p>
          {subtext && (
            <p className="text-[10px] text-muted-foreground pt-1">{subtext}</p>
          )}
        </div>
        {showProgress && (
          <div className="mt-4">
            <Progress value={progressValue} className="h-1.5" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function RewardCard({ reward, isShop }: any) {
  return (
    <div className="flex group">
      <div className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] hover:border-indigo-500/30">
        <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.06] select-none rotate-12 group-hover:rotate-6 transition-all duration-300">
          {reward.icon}
        </div>

        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div
              className={cn(
                "size-12 rounded-2xl flex items-center justify-center shadow-sm border border-border/40",
                reward.color === "indigo"
                  ? "bg-indigo-500/10 text-indigo-600"
                  : reward.color === "amber"
                    ? "bg-amber-500/10 text-amber-600"
                    : "bg-emerald-500/10 text-emerald-600",
              )}
            >
              {reward.icon}
            </div>
            <Badge
              variant={
                reward.color === "indigo"
                  ? "indigo"
                  : reward.color === "amber"
                    ? "warning"
                    : "success"
              }
            >
              {reward.type}
            </Badge>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-lg font-bold leading-tight group-hover:text-indigo-600 transition-colors">
              {reward.title}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {reward.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-1">
            {reward.department.map((dept: string) => (
              <span
                key={dept}
                className="inline-flex items-center text-[10px] text-muted-foreground bg-muted/40 px-2 py-0.5 rounded-full border border-border/20"
              >
                <Briefcase className="mr-1 size-2.5" /> {dept}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/20">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black font-mono tracking-tighter">
              {reward.points.toLocaleString()}
            </span>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              pts
            </span>
          </div>
          <Button
            size="sm"
            variant={isShop ? "default" : "outline"}
            className={cn(
              "h-8 px-4 text-xs font-semibold rounded-lg transition-all",
              isShop
                ? "bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20"
                : "border-border/60 hover:bg-muted",
            )}
          >
            {isShop ? "Redeem" : "Details"}
          </Button>
        </div>
      </div>
    </div>
  );
}
