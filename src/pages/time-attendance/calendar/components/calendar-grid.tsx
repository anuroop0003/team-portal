import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TeamMemberSchedule {
  id: string;
  name: string;
  role: string;
  avatar: string;
  department: string;
  days: {
    [key: number]:
      | "present"
      | "sick-leave"
      | "annual-leave"
      | "late"
      | "weekly-off"
      | "pending-leave";
  };
}

interface CalendarGridProps {
  filteredSchedules: TeamMemberSchedule[];
  daysArray: number[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  deptFilter: string;
  setDeptFilter: (filter: string) => void;
  getStatusColor: (status: string) => string;
  getStatusLabel: (status: string) => string;
}

export function CalendarGrid({
  filteredSchedules,
  daysArray,
  searchQuery,
  setSearchQuery,
  deptFilter,
  setDeptFilter,
  getStatusColor,
  getStatusLabel,
}: CalendarGridProps) {
  return (
    <div className="space-y-5">
      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search team member..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
          <Select value={deptFilter} onValueChange={setDeptFilter}>
            <SelectTrigger className="w-[160px] cursor-pointer">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="cursor-pointer">
                All Departments
              </SelectItem>
              <SelectItem value="engineering" className="cursor-pointer">
                Engineering
              </SelectItem>
              <SelectItem value="product" className="cursor-pointer">
                Product
              </SelectItem>
              <SelectItem value="operations" className="cursor-pointer">
                Operations
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid View Container */}
      <div className="overflow-x-auto border border-border rounded-lg">
        <div className="min-w-[850px] divide-y divide-border">
          {/* Header row */}
          <div className="flex bg-slate-500/5 items-center py-2.5 font-semibold text-xs text-muted-foreground tracking-wider uppercase">
            <div className="w-[200px] pl-4 shrink-0">Team Member</div>
            <div className="flex flex-1 justify-around">
              {daysArray.map((day) => (
                <div
                  key={day}
                  className="w-6 text-center text-[10px] font-bold"
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* Members rows */}
          {filteredSchedules.map((member) => (
            <div
              key={member.id}
              className="flex items-center py-3 hover:bg-slate-500/5 transition-colors"
            >
              {/* Left Column: Member details */}
              <div className="w-[200px] pl-4 shrink-0 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                  {member.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight">
                    {member.name}
                  </p>
                  <p className="text-xs text-muted-foreground leading-tight">
                    {member.role}
                  </p>
                </div>
              </div>

              {/* Right Column: Calendar grids */}
              <div className="flex flex-1 justify-around">
                {daysArray.map((day) => {
                  const status = member.days[day] || "no-log";
                  return (
                    <div
                      key={day}
                      className={`w-5 h-5 rounded-full ${getStatusColor(status)} cursor-help transition-all duration-200`}
                      title={`${member.name} - Day ${day}: ${getStatusLabel(status)}`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-muted-foreground justify-center border-t border-border/40">
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-full bg-emerald-500" />
          <span>Present</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-full bg-orange-400" />
          <span>Late Arrival</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-full bg-blue-500" />
          <span>Annual Leave</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-full bg-red-500" />
          <span>Sick Leave</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-full bg-amber-500 animate-pulse" />
          <span>Pending Leave Approval</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded-full bg-slate-200 dark:bg-slate-800" />
          <span>Weekly Off</span>
        </div>
      </div>
    </div>
  );
}
