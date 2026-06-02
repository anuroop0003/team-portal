import { useState } from "react";
import { Clock, Coffee, ShieldAlert, UserCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LiveHeader } from "./components/live-header";
import { LiveStats } from "./components/live-stats";
import { LiveTable } from "./components/live-table";
import { ActivityFeed } from "./components/activity-feed";

interface ActiveEmployee {
  id: string;
  name: string;
  role: string;
  avatar: string;
  clockInTime: string;
  status: "active" | "break" | "late" | "absent";
  location: string;
}

interface ActivityEvent {
  id: string;
  time: string;
  employeeName: string;
  action: string;
}

export default function LiveAttendancePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const [activeStaff, setActiveStaff] = useState<ActiveEmployee[]>([
    {
      id: "1",
      name: "Anuroop TM",
      role: "Lead UI Developer",
      avatar: "AT",
      clockInTime: "09:02 AM",
      status: "active",
      location: "Remote (India)",
    },
    {
      id: "2",
      name: "Sarah Jenkins",
      role: "Product Manager",
      avatar: "SJ",
      clockInTime: "08:55 AM",
      status: "break",
      location: "New York HQ",
    },
    {
      id: "3",
      name: "Michael Chen",
      role: "Senior Backend Eng.",
      avatar: "MC",
      clockInTime: "10:15 AM",
      status: "late",
      location: "San Francisco Branch",
    },
    {
      id: "4",
      name: "Elena Rostova",
      role: "DevOps Engineer",
      avatar: "ER",
      clockInTime: "—",
      status: "absent",
      location: "—",
    },
  ]);

  const [events, setEvents] = useState<ActivityEvent[]>([
    {
      id: "e_1",
      time: "10:15 AM",
      employeeName: "Michael Chen",
      action: "Clocked in as LATE ARRIVAL",
    },
    {
      id: "e_2",
      time: "09:45 AM",
      employeeName: "Sarah Jenkins",
      action: "Started coffee/lunch break",
    },
    {
      id: "e_3",
      time: "09:02 AM",
      employeeName: "Anuroop TM",
      action: "Clocked in successfully (Remote)",
    },
    {
      id: "e_4",
      time: "08:55 AM",
      employeeName: "Sarah Jenkins",
      action: "Clocked in successfully (HQ)",
    },
  ]);

  const getStatusBadge = (status: ActiveEmployee["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge
            variant="outline"
            className="border-emerald-500 text-emerald-500 bg-emerald-500/5 font-semibold gap-1.5"
          >
            <UserCheck className="h-3.5 w-3.5" /> Working
          </Badge>
        );
      case "break":
        return (
          <Badge
            variant="outline"
            className="border-amber-500 text-amber-500 bg-amber-500/5 font-semibold gap-1.5"
          >
            <Coffee className="h-3.5 w-3.5" /> On Break
          </Badge>
        );
      case "late":
        return (
          <Badge
            variant="outline"
            className="border-orange-400 text-orange-400 bg-orange-400/5 font-semibold gap-1.5 animate-pulse"
          >
            <Clock className="h-3.5 w-3.5" /> Late Arrival
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="border-red-500 text-red-500 bg-red-500/5 font-semibold gap-1.5"
          >
            <ShieldAlert className="h-3.5 w-3.5" /> Absent
          </Badge>
        );
    }
  };

  const filteredStaff = activeStaff.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Live status telemetry widgets */}
      <LiveStats />

      <div className="grid gap-6 md:grid-cols-3">
        {/* Active Staff Registry List */}
        <Card className="md:col-span-2 shadow-sm border border-border">
          <CardContent className="pt-6">
            <LiveHeader />
            <LiveTable
              filteredStaff={filteredStaff}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              getStatusBadge={getStatusBadge}
            />
          </CardContent>
        </Card>

        {/* Live Activity Event Stream */}
        <ActivityFeed events={events} />
      </div>
    </div>
  );
}
