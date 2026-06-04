import { AddMemberModal } from "./invite-member/add-member-modal";

export function ManagementHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex-1 flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
        <p className="text-sm text-muted-foreground font-medium">
          Administrate your global workforce, invite new members, configure
          permissions, and monitor system access.
        </p>
      </div>
      <AddMemberModal />
    </div>
  );
}
