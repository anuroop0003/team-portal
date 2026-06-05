import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarHeader } from "./components/calendar-header";
import { CalendarStats } from "./components/calendar-stats";
import { CalendarGrid } from "./components/calendar-grid";

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

export default function OperationsCalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(5); // June (0-indexed 5)
  const [currentYear, setCurrentYear] = useState(2026);
  const [searchQuery, setSearchQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const teamSchedules: TeamMemberSchedule[] = [
    {
      id: "1",
      name: "Anuroop TM",
      role: "Lead UI Developer",
      avatar: "AT",
      department: "Engineering",
      days: {
        1: "present",
        2: "present",
        3: "present",
        4: "present",
        5: "present",
        6: "weekly-off",
        7: "weekly-off",
        8: "present",
        9: "late",
        10: "present",
        11: "present",
        12: "present",
        13: "weekly-off",
        14: "weekly-off",
        15: "annual-leave",
        16: "annual-leave",
        17: "annual-leave",
        18: "annual-leave",
        19: "present",
        20: "weekly-off",
        21: "weekly-off",
        22: "present",
        23: "present",
        24: "present",
        25: "present",
        26: "present",
        27: "weekly-off",
        28: "weekly-off",
        29: "present",
        30: "present",
      },
    },
    {
      id: "2",
      name: "Sarah Jenkins",
      role: "Product Manager",
      avatar: "SJ",
      department: "Product",
      days: {
        1: "present",
        2: "present",
        3: "present",
        4: "present",
        5: "present",
        6: "weekly-off",
        7: "weekly-off",
        8: "sick-leave",
        9: "sick-leave",
        10: "present",
        11: "present",
        12: "present",
        13: "weekly-off",
        14: "weekly-off",
        15: "present",
        16: "present",
        17: "present",
        18: "present",
        19: "present",
        20: "weekly-off",
        21: "weekly-off",
        22: "present",
        23: "present",
        24: "present",
        25: "present",
        26: "present",
        27: "weekly-off",
        28: "weekly-off",
        29: "present",
        30: "present",
      },
    },
    {
      id: "3",
      name: "Michael Chen",
      role: "Senior Backend Eng.",
      avatar: "MC",
      department: "Engineering",
      days: {
        1: "present",
        2: "present",
        3: "present",
        4: "present",
        5: "present",
        6: "weekly-off",
        7: "weekly-off",
        8: "present",
        9: "present",
        10: "present",
        11: "present",
        12: "present",
        13: "weekly-off",
        14: "weekly-off",
        15: "present",
        16: "present",
        17: "present",
        18: "present",
        19: "pending-leave",
        20: "weekly-off",
        21: "weekly-off",
        22: "present",
        23: "present",
        24: "present",
        25: "present",
        26: "present",
        27: "weekly-off",
        28: "weekly-off",
        29: "present",
        30: "present",
      },
    },
    {
      id: "4",
      name: "Elena Rostova",
      role: "DevOps Engineer",
      avatar: "ER",
      department: "Operations",
      days: {
        1: "present",
        2: "present",
        3: "present",
        4: "present",
        5: "present",
        6: "weekly-off",
        7: "weekly-off",
        8: "present",
        9: "present",
        10: "present",
        11: "present",
        12: "present",
        13: "weekly-off",
        14: "weekly-off",
        15: "present",
        16: "present",
        17: "present",
        18: "present",
        19: "present",
        20: "weekly-off",
        21: "weekly-off",
        22: "annual-leave",
        23: "annual-leave",
        24: "annual-leave",
        25: "present",
        26: "present",
        27: "weekly-off",
        28: "weekly-off",
        29: "present",
        30: "present",
      },
    },
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-emerald-500 hover:scale-110";
      case "sick-leave":
        return "bg-red-500 hover:scale-110";
      case "annual-leave":
        return "bg-blue-500 hover:scale-110";
      case "pending-leave":
        return "bg-amber-500 animate-pulse hover:scale-110";
      case "late":
        return "bg-orange-400 hover:scale-110";
      case "weekly-off":
        return "bg-slate-200 dark:bg-slate-800 opacity-60";
      default:
        return "bg-slate-100 dark:bg-slate-900";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "present":
        return "Present";
      case "sick-leave":
        return "Sick Leave";
      case "annual-leave":
        return "Annual Leave";
      case "pending-leave":
        return "Leave Pending Approval";
      case "late":
        return "Late Arrival";
      case "weekly-off":
        return "Weekly Off";
      default:
        return "No Log";
    }
  };

  const filteredSchedules = teamSchedules.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept =
      deptFilter === "all" ||
      member.department.toLowerCase() === deptFilter.toLowerCase();
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Visual Analytics Widgets */}
      <CalendarStats />

      {/* Main Attendance Calendar Card */}
      <Card className="shadow-sm border border-border">
        <CalendarHeader
          currentMonth={currentMonth}
          currentYear={currentYear}
          months={months}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
        <CardContent>
          <CalendarGrid
            filteredSchedules={filteredSchedules}
            daysArray={daysArray}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            deptFilter={deptFilter}
            setDeptFilter={setDeptFilter}
            getStatusColor={getStatusColor}
            getStatusLabel={getStatusLabel}
          />
        </CardContent>
      </Card>
    </div>
  );
}
