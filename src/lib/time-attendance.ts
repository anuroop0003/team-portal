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

export const getTimeOffStatusVariant = (
  status: "approved" | "pending" | "rejected" | "cancelled",
) => {
  switch (status) {
    case "approved":
      return "success";
    case "pending":
      return "warning";
    case "rejected":
      return "destructive";
    default:
      return "secondary";
  }
};

export const getTimeOffStatusLabel = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export const getCorrectionStatusVariant = (
  status: "approved" | "pending" | "rejected",
) => {
  switch (status) {
    case "approved":
      return "success";
    case "rejected":
      return "destructive";
    default:
      return "warning";
  }
};

export const getCorrectionStatusLabel = (status: string) => {
  if (status === "pending") return "Pending Review";
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export const getLeaveTypeBadgeVariant = (leaveType: string) => {
  switch (leaveType.toLowerCase()) {
    case "annual leave":
      return "indigo";
    case "sick leave":
      return "destructive";
    case "casual leave":
      return "warning";
    default:
      return "outline";
  }
};
