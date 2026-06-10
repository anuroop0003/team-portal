import { Users, Shield, CheckCircle } from "lucide-react";
import { StatsCard } from "@/components/stats-card";

interface ManagementStatsProps {
  totalMembers: number;
  totalAdmins: number;
  totalActive: number;
  isLoading: boolean;
}

export function ManagementStats({
  totalMembers,
  totalAdmins,
  totalActive,
  isLoading,
}: ManagementStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <StatsCard
        label="Total Accounts"
        value={totalMembers.toString()}
        description="Total registered users"
        icon={<Users className="size-6 text-primary" />}
        isLoading={isLoading}
      />
      <StatsCard
        label="Administrators"
        value={totalAdmins.toString()}
        description="Accounts with admin privileges"
        icon={<Shield className="size-6 text-amber-500" />}
        isLoading={isLoading}
      />
      <StatsCard
        label="Active Status"
        value={totalActive.toString()}
        description="Currently active or WFH"
        icon={<CheckCircle className="size-6 text-emerald-500" />}
        isLoading={isLoading}
      />
    </div>
  );
}
