import type { AttendanceCorrectionRequest } from "@/features/time-attendance/api/time-attendance.types";

export const INITIAL_REQUESTS: AttendanceCorrectionRequest[] = [
  {
    id: "corr_1",
    employeeId: "emp_1",
    employeeName: "Anuroop TM",
    date: "2026-05-27",
    originalClockIn: "09:35 AM",
    originalClockOut: "06:00 PM",
    requestedClockIn: "09:05 AM",
    requestedClockOut: "06:00 PM",
    reason:
      "Swipe card didn't register at main entry gate. Arrived at desk by 9:05 AM.",
    status: "pending",
    createdAt: "2026-05-27",
  },
  {
    id: "corr_2",
    employeeId: "emp_1",
    employeeName: "Anuroop TM",
    date: "2026-05-20",
    originalClockIn: "09:00 AM",
    originalClockOut: "04:30 PM",
    requestedClockIn: "09:00 AM",
    requestedClockOut: "06:00 PM",
    reason:
      "Power outage at branch, signed out manually with supervisor approval.",
    status: "approved",
    approvedByName: "Supervisor Jane",
    createdAt: "2026-05-20",
  },
];
