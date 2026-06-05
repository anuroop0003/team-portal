import { useMemo, useState } from "react";
import { useUserStore } from "@/features/auth/stores/use-user-store";
import { useUsers } from "@/features/workforce/api/user-management.query";
import { ManagementHeader } from "./components/management-header";
import { ManagementStats } from "./components/management-stats";
import { ManagementSearch } from "./components/management-search";
import { UserTable } from "./components/user-table";

export default function WorkforceUserManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const user = useUserStore((state) => state.user);

  const { data: members = [], isLoading } = useUsers(user?.organization_id, {
    search: searchQuery,
  });

  const totalAdmins = useMemo(
    () =>
      members.filter((member) => member.role.toLowerCase() === "admin").length,
    [members],
  );

  const totalActive = useMemo(
    () =>
      members.filter(
        (member) => member.status === "In Office" || member.status === "WFH",
      ).length,
    [members],
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Page Header */}
      <ManagementHeader />

      {/* Stats Overview */}
      <ManagementStats
        isLoading={isLoading}
        totalMembers={members.length}
        totalAdmins={totalAdmins}
        totalActive={totalActive}
      />

      {/* Search Filter */}
      <ManagementSearch onSearch={setSearchQuery} />

      {/* User Table */}
      <UserTable members={members} isLoading={isLoading} />
    </div>
  );
}
