import { useState } from "react";
import { MOCK_WORKFORCE } from "../constants";
import { ManagementHeader } from "./components/management-header";
import { ManagementStats } from "./components/management-stats";
import { ManagementSearch } from "./components/management-search";
import { UserTable } from "./components/user-table";

export default function WorkforceUserManagementPage() {
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

  const totalAdmins = MOCK_WORKFORCE.filter(
    (member) => member.role.toLowerCase() === "admin",
  ).length;

  const totalActive = MOCK_WORKFORCE.filter(
    (member) => member.status === "In Office" || member.status === "WFH",
  ).length;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Page Header */}
      <ManagementHeader />

      {/* Stats Overview */}
      <ManagementStats
        totalMembers={MOCK_WORKFORCE.length}
        totalAdmins={totalAdmins}
        totalActive={totalActive}
      />

      {/* Search Filter */}
      <ManagementSearch onSearch={setSearchQuery} />

      {/* User Table */}
      <UserTable members={filteredMembers} />
    </div>
  );
}
