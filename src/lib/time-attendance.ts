import type { AttendanceStatus } from "@/services/query/time-attendance/time-attendance.types";

export const getAttendanceStatusVariant = (status: AttendanceStatus) => {
  switch (status) {
    case "present":
      return "success";
    case "late":
      return "warning";
    case "absent":
      return "destructive";
    default:
      return "secondary";
  }
};

export const getAttendanceStatusLabel = (status: AttendanceStatus) => {
  switch (status) {
    case "present":
      return "Present";
    case "late":
      return "Late Arrival";
    case "absent":
      return "Absent";
    default:
      return status;
  }
};
