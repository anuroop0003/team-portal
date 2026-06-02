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

export const getDaysRemaining = (dateStr: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const holidayDate = new Date(dateStr);
  holidayDate.setHours(0, 0, 0, 0);
  const diffTime = holidayDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getDayOfWeek = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString([], { weekday: "long" });
};

export const getHolidayBadgeVariant = (
  type: "public" | "restricted" | "company-specific",
) => {
  switch (type) {
    case "public":
      return "success";
    case "restricted":
      return "warning";
    default:
      return "indigo";
  }
};

export const getHolidayBadgeLabel = (
  type: "public" | "restricted" | "company-specific",
) => {
  switch (type) {
    case "public":
      return "National Public";
    case "restricted":
      return "Restricted";
    default:
      return "Company Specific";
  }
};

export const getMonthColor = (dateStr: string) => {
  const month = new Date(dateStr).getMonth();

  const colors = [
    { bg: "#fecaca", text: "#991b1b" }, // Jan: Red
    { bg: "#fbcfe8", text: "#9d174d" }, // Feb: Pink
    { bg: "#ffedd5", text: "#9a3412" }, // Mar: Orange
    { bg: "#fef3c7", text: "#92400e" }, // Apr: Amber
    { bg: "#fef08a", text: "#854d0e" }, // May: Yellow
    { bg: "#d9f99d", text: "#3f6212" }, // Jun: Lime
    { bg: "#a7f3d0", text: "#065f46" }, // Jul: Emerald
    { bg: "#99f6e4", text: "#115e59" }, // Aug: Teal
    { bg: "#cffafe", text: "#155e75" }, // Sep: Cyan
    { bg: "#dbeafe", text: "#1e40af" }, // Oct: Blue
    { bg: "#e0e7ff", text: "#3730a3" }, // Nov: Indigo
    { bg: "#f3e8ff", text: "#6b21a8" }, // Dec: Violet
  ];

  return colors[month] || { bg: "transparent", text: "currentColor" };
};
