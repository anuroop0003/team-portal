import { Users, Shield, CheckCircle } from "lucide-react";
import { StatsCard } from "@/features/rewards/components/components/stats-card";

interface ManagementStatsProps {
  totalMembers: number;
  totalAdmins: number;
  totalActive: number;
}

export function ManagementStats({
  totalMembers,
  totalAdmins,
  totalActive,
}: ManagementStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <StatsCard
        label="Total Accounts"
        value={totalMembers.toString()}
        description="Total registered users"
        icon={<Users className="size-6 text-primary" />}
      />
      <StatsCard
        label="Administrators"
        value={totalAdmins.toString()}
        description="Accounts with admin privileges"
        icon={<Shield className="size-6 text-amber-500" />}
      />
      <StatsCard
        label="Active Status"
        value={totalActive.toString()}
        description="Currently active or WFH"
        icon={<CheckCircle className="size-6 text-emerald-500" />}
      />
    </div>
  );
}
