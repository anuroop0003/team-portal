import { Search, Filter, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface TimesheetRecord {
  id: string;
  name: string;
  department: string;
  date: string;
  clockIn: string;
  clockOut: string;
  workHours: number;
  overtime: number;
  status: "approved" | "pending" | "correction-requested";
}

interface TimesheetsTableProps {
  filteredRecords: TimesheetRecord[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  handleApprove: (id: string) => void;
  handleOpenCorrection: (id: string) => void;
  getStatusBadge: (status: TimesheetRecord["status"]) => React.ReactNode;
}

export function TimesheetsTable({
  filteredRecords,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  handleApprove,
  handleOpenCorrection,
  getStatusBadge,
}: TimesheetsTableProps) {
  return (
    <div className="space-y-5">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employee or department..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px] cursor-pointer">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="cursor-pointer">
                All Statuses
              </SelectItem>
              <SelectItem value="pending" className="cursor-pointer">
                Pending Review
              </SelectItem>
              <SelectItem value="approved" className="cursor-pointer">
                Approved
              </SelectItem>
              <SelectItem
                value="correction-requested"
                className="cursor-pointer"
              >
                Correction Req.
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Record table */}
      <div className="overflow-x-auto border border-border rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-500/5 border-b border-border text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <th className="p-4">Employee</th>
              <th className="p-4">Date</th>
              <th className="p-4">Clock In</th>
              <th className="p-4">Clock Out</th>
              <th className="p-4">Work Duration</th>
              <th className="p-4">Overtime</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm font-medium">
            {filteredRecords.map((record) => (
              <tr
                key={record.id}
                className="hover:bg-slate-500/5 transition-colors"
              >
                <td className="p-4">
                  <div>
                    <p className="font-bold">{record.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {record.department}
                    </p>
                  </div>
                </td>
                <td className="p-4 text-muted-foreground">
                  {new Date(record.date).toLocaleDateString([], {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="p-4">{record.clockIn}</td>
                <td className="p-4">{record.clockOut}</td>
                <td className="p-4 font-semibold">{record.workHours} hrs</td>
                <td className="p-4 text-emerald-600 font-semibold">
                  {record.overtime > 0 ? `+${record.overtime} hrs` : "—"}
                </td>
                <td className="p-4">{getStatusBadge(record.status)}</td>
                <td className="p-4 text-right">
                  {record.status === "pending" && (
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(record.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold cursor-pointer gap-1.5"
                      >
                        <Check className="h-3.5 w-3.5" /> Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenCorrection(record.id)}
                        className="text-red-500 border-red-200 hover:bg-red-500/5 cursor-pointer gap-1.5"
                      >
                        <X className="h-3.5 w-3.5" /> Reject / Adjust
                      </Button>
                    </div>
                  )}
                  {record.status !== "pending" && (
                    <span className="text-xs text-muted-foreground font-semibold">
                      —
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
