import type { TimesheetEntry } from "@/services/query/time-attendance/time-attendance.types";

export const MOCK_HISTORY: TimesheetEntry[] = [
  {
    id: "1",
    employeeId: "emp_1",
    employeeName: "Anuroop TM",
    date: "2026-05-29",
    clockIn: "09:02 AM",
    clockOut: "06:05 PM",
    breaks: [
      {
        id: "b1",
        breakStart: "01:00 PM",
        breakEnd: "01:45 PM",
        durationMinutes: 45,
      },
    ],
    status: "present",
    workHoursMinutes: 498, // 8h 18m
    overtimeMinutes: 18,
    regularized: false,
  },
  {
    id: "2",
    employeeId: "emp_1",
    employeeName: "Anuroop TM",
    date: "2026-05-28",
    clockIn: "09:15 AM",
    clockOut: "06:00 PM",
    breaks: [
      {
        id: "b2",
        breakStart: "01:10 PM",
        breakEnd: "01:50 PM",
        durationMinutes: 40,
      },
    ],
    status: "present",
    workHoursMinutes: 485, // 8h 5m
    overtimeMinutes: 5,
    regularized: false,
  },
  {
    id: "3",
    employeeId: "emp_1",
    employeeName: "Anuroop TM",
    date: "2026-05-27",
    clockIn: "09:35 AM",
    clockOut: "06:00 PM",
    breaks: [
      {
        id: "b3",
        breakStart: "01:00 PM",
        breakEnd: "01:55 PM",
        durationMinutes: 55,
      },
    ],
    status: "late",
    workHoursMinutes: 450, // 7h 30m
    overtimeMinutes: 0,
    regularized: false,
  },
  {
    id: "4",
    employeeId: "emp_1",
    employeeName: "Anuroop TM",
    date: "2026-05-26",
    clockIn: "09:00 AM",
    clockOut: "06:00 PM",
    breaks: [
      {
        id: "b4",
        breakStart: "01:00 PM",
        breakEnd: "01:40 PM",
        durationMinutes: 40,
      },
    ],
    status: "present",
    workHoursMinutes: 500, // 8h 20m
    overtimeMinutes: 20,
    regularized: false,
  },
];
