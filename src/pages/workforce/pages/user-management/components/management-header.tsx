import { AddMemberModal } from "./invite-member/add-member-modal";
import { Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PATHS } from "@/routes/constants/paths";

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
      <div className="flex items-center gap-3">
        <Link to={PATHS.WORKFORCE.ORGANIZATION}>
          <Button variant="outline" className="cursor-pointer">
            <Network />
            Organization
          </Button>
        </Link>
        <AddMemberModal />
      </div>
    </div>
  );
}
