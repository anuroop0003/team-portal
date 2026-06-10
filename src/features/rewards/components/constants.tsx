import { type ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, XCircle, type LucideIcon } from "lucide-react";

// --- Types ---

export type HistoryItem = {
  id: string;
  date: string;
  type: "Earned" | "Redeemed";
  amount: number;
  reason: string;
  status: "Completed" | "Pending" | "Cancelled";
};

export type Reward = {
  id: string;
  title: string;
  points: number;
  description: string;
};

// --- Mock Data ---

export const MOCK_STATS = {
  totalPoints: 12450,
  badgesEarned: 12,
  globalRank: 4,
  nextMilestone: 75, // percentage
  nextMilestoneLabel: "Platinum Elite",
};

export const MOCK_LEADERBOARD = [
  {
    id: 1,
    name: "Sarah Jenkins",
    points: 28400,
    rank: 1,
    change: "up",
    avatar: "SJ",
    email: "sarah.j@acme.com",
  },
  {
    id: 2,
    name: "Michael Chen",
    points: 25150,
    rank: 2,
    change: "down",
    avatar: "MC",
    email: "m.chen@acme.com",
  },
  {
    id: 3,
    name: "Jessica Wong",
    points: 22900,
    rank: 3,
    change: "stable",
    avatar: "JW",
    email: "j.wong@acme.com",
  },
  {
    id: 4,
    name: "You",
    points: 12450,
    rank: 4,
    change: "up",
    avatar: "ME",
    email: "you@acme.com",
    isUser: true,
  },
  {
    id: 5,
    name: "David Miller",
    points: 11200,
    rank: 5,
    change: "down",
    avatar: "DM",
    email: "d.miller@acme.com",
  },
];

export const MOCK_MY_REWARDS: Reward[] = [
  {
    id: "r5",
    title: "Leads Mastery",
    points: 800,
    description: "Consistent lead conversion over a 3-month period.",
  },
  {
    id: "r2",
    title: "Innovation Badge",
    points: 1200,
    description: "awarded for submitting a groundbreaking process improvement.",
  },
  {
    id: "r7",
    title: "Star Performer",
    points: 2000,
    description: "awarded for exceptional dedication and results.",
  },
  {
    id: "r6",
    title: "Team Lunch Host",
    points: 3000,
    description: "Host the next monthly team lunch on the company's dime.",
  },
  {
    id: "r3",
    title: "Performance Bonus",
    points: 15000,
    description: "A quarterly performance incentive for top achievers.",
  },
];

export const MOCK_SHOP_REWARDS: Reward[] = [
  {
    id: "r8",
    title: "Movie Tickets (Pair)",
    points: 1000,
    description: "Enjoy a night out at the cinema on us.",
  },
  {
    id: "r10",
    title: "Wellness Grant",
    points: 1500,
    description: "Points towards gym membership or wellness apps.",
  },
  {
    id: "r4",
    title: "Amazon Gift Card ($50)",
    points: 2500,
    description: "Redeem your points for a digital Amazon gift card.",
  },
  {
    id: "r9",
    title: "Home Office Credit",
    points: 4000,
    description: "Upgrade your remote setup with a $100 credit.",
  },
  {
    id: "r1",
    title: "Extra Day Off",
    points: 5000,
    description: "Get an additional paid day off to recharge and relax.",
  },
];

export const MOCK_REWARDS = [...MOCK_MY_REWARDS, ...MOCK_SHOP_REWARDS];

export const MOCK_HISTORY: HistoryItem[] = [
  {
    id: "TX-9012",
    date: "2024-03-15",
    type: "Earned",
    amount: 1200,
    reason: "Project Beta Completion",
    status: "Completed",
  },
  {
    id: "TX-8945",
    date: "2024-03-10",
    type: "Redeemed",
    amount: -2500,
    reason: "Amazon Gift Card",
    status: "Completed",
  },
  {
    id: "TX-8821",
    date: "2024-03-05",
    type: "Earned",
    amount: 500,
    reason: "Peer Recognition - Great collaboration",
    status: "Completed",
  },
  {
    id: "TX-8756",
    date: "2024-02-28",
    type: "Earned",
    amount: 3000,
    reason: "Quarterly Performance Bonus",
    status: "Completed",
  },
  {
    id: "TX-8643",
    date: "2024-02-20",
    type: "Redeemed",
    amount: -5000,
    reason: "Extra Day Off",
    status: "Completed",
  },
  {
    id: "TX-8521",
    date: "2024-02-15",
    type: "Earned",
    amount: 150,
    reason: "Bug Bounty - Security Patch",
    status: "Completed",
  },
  {
    id: "TX-8410",
    date: "2024-02-10",
    type: "Earned",
    amount: 1000,
    reason: "Referral Bonus - New Hire",
    status: "Pending",
  },
  {
    id: "TX-8390",
    date: "2024-02-05",
    type: "Redeemed",
    amount: -1000,
    reason: "Movie Tickets (Pair)",
    status: "Completed",
  },
  {
    id: "TX-8211",
    date: "2024-01-25",
    type: "Earned",
    amount: 250,
    reason: "Team Lead Shoutout",
    status: "Completed",
  },
  {
    id: "TX-8105",
    date: "2024-01-20",
    type: "Earned",
    amount: 5000,
    reason: "Yearly Loyalty Reward",
    status: "Completed",
  },
  {
    id: "TX-7988",
    date: "2024-01-15",
    type: "Redeemed",
    amount: -1500,
    reason: "Wellness Grant",
    status: "Completed",
  },
  {
    id: "TX-7856",
    date: "2024-01-10",
    type: "Earned",
    amount: 750,
    reason: "Internal Hackathon 3rd Place",
    status: "Completed",
  },
  {
    id: "TX-7742",
    date: "2023-12-28",
    type: "Earned",
    amount: 200,
    reason: "Weekly Wins - Documentation",
    status: "Completed",
  },
];

export const MOCK_RECENT_HISTORY = MOCK_HISTORY.slice(0, 5);

export const columns: ColumnDef<HistoryItem>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div className="text-muted-foreground tabular-nums whitespace-nowrap">
        {row.getValue("date")}
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return (
        <Badge variant={type === "Earned" ? "success" : "destructive"}>
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "reason",
    header: "Description",
    cell: ({ row }) => (
      <span className="font-semibold text-foreground tracking-tight">
        {row.getValue("reason")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusConfig: Record<
        string,
        { variant: "success" | "warning" | "destructive"; icon: LucideIcon }
      > = {
        Completed: { variant: "success" as const, icon: CheckCircle2 },
        Pending: { variant: "warning" as const, icon: Clock },
        Cancelled: { variant: "destructive" as const, icon: XCircle },
      };

      const config = statusConfig[status] || {
        variant: "outline" as const,
        icon: null,
      };

      const Icon = config.icon;

      return (
        <Badge variant={config.variant}>
          {Icon && <Icon />}
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Points</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      return (
        <div
          className={cn(
            "text-right font-bold tabular-nums",
            amount > 0 ? "text-emerald-500" : "text-destructive",
          )}
        >
          {amount > 0 ? "+" : ""}
          {amount.toLocaleString()}{" "}
          <span className="text-[10px] uppercase opacity-70 ml-1">pts</span>
        </div>
      );
    },
  },
];
