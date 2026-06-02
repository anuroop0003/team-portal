import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ActiveEmployee {
  id: string;
  name: string;
  role: string;
  avatar: string;
  clockInTime: string;
  status: "active" | "break" | "late" | "absent";
  location: string;
}

interface LiveTableProps {
  filteredStaff: ActiveEmployee[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  getStatusBadge: (status: ActiveEmployee["status"]) => React.ReactNode;
}

export function LiveTable({
  filteredStaff,
  searchQuery,
  setSearchQuery,
  getStatusBadge,
}: LiveTableProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search active team member..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto border border-border rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-500/5 border-b border-border text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <th className="p-4">Staff Member</th>
              <th className="p-4">Clocked In At</th>
              <th className="p-4">Geographic Node</th>
              <th className="p-4">Current Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm font-medium">
            {filteredStaff.map((staff) => (
              <tr
                key={staff.id}
                className="hover:bg-slate-500/5 transition-colors"
              >
                <td className="p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                    {staff.avatar}
                  </div>
                  <div>
                    <p className="font-bold">{staff.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {staff.role}
                    </p>
                  </div>
                </td>
                <td className="p-4 text-muted-foreground">
                  {staff.clockInTime}
                </td>
                <td className="p-4 text-muted-foreground">{staff.location}</td>
                <td className="p-4">{getStatusBadge(staff.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
