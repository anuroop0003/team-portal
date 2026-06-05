import { useState } from "react";
import { useUserStore } from "@/features/auth/stores/use-user-store";
import { useUsers } from "@/features/workforce/api/user-management.query";
import { DirectoryHeader } from "./components/directory-header";
import { DirectoryStats } from "./components/directory-stats";
import { DirectorySearch } from "./components/directory-search";
import { MemberGrid } from "./components/member-grid";

export default function WorkforceDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const userStore = useUserStore((state) => state.user);

  const { data: members = [], isLoading } = useUsers(
    userStore?.organization_id,
    {
      search: searchQuery,
    },
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <DirectoryHeader />
      <DirectoryStats totalMembers={members.length} isLoading={isLoading} />
      <DirectorySearch onSearch={setSearchQuery} />
      <MemberGrid members={members} isLoading={isLoading} />
    </div>
  );
}
