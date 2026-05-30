import { useState } from "react";
import { MOCK_WORKFORCE } from "../../constants";
import { DirectoryHeader } from "./components/directory-header";
import { DirectoryStats } from "./components/directory-stats";
import { DirectorySearch } from "./components/directory-search";
import { MemberGrid } from "./components/member-grid";

export default function WorkforceDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = MOCK_WORKFORCE.filter((member) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    return (
      member.name.toLowerCase().includes(query) ||
      member.email.toLowerCase().includes(query) ||
      member.position.toLowerCase().includes(query) ||
      member.role.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Page Header */}
      <DirectoryHeader />

      {/* Stats Overview */}
      <DirectoryStats totalMembers={MOCK_WORKFORCE.length} />

      {/* Search Filter */}
      <DirectorySearch onSearch={setSearchQuery} />

      {/* Member Grid */}
      <MemberGrid members={filteredMembers} />
    </div>
  );
}
