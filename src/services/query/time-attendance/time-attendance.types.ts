export type AttendanceStatus =
  | "present"
  | "late"
  | "absent"
  | "half_day"
  | "holiday"
  | "weekend"
  | "on_leave";

export interface BreakSession {
  id: string;
  breakStart: string;
  breakEnd?: string;
  durationMinutes?: number;
}

export interface TimesheetEntry {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  clockIn: string;
  clockOut?: string;
  breaks: BreakSession[];
  status: AttendanceStatus;
  workHoursMinutes: number; // calculated total productive minutes
  overtimeMinutes: number;
  regularized: boolean;
}

export interface TimeOffRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveTypeId: string;
  leaveTypeName: string;
  startDate: string;
  endDate: string;
  halfDay: boolean;
  halfDaySession?: "morning" | "afternoon";
  reason: string;
  status: "pending" | "approved" | "rejected" | "cancelled";
  approvedBy?: string;
  approvedByName?: string;
  approvedAt?: string;
  attachmentUrl?: string;
  createdAt: string;
}

export interface TimeOffBalance {
  leaveTypeId: string;
  leaveTypeName: string;
  allocated: number; // in days
  consumed: number;
  pendingApproval: number;
  remaining: number;
}

export interface AccrualPolicy {
  id: string;
  name: string;
  leaveTypeId: string;
  accrualRate: number; // e.g. 1.5 days
  accrualFrequency: "monthly" | "yearly" | "accrued_on_hire";
  carryForwardLimit: number;
  maxAccumulation: number;
  rolloverMonth: number; // month of the year (1-12)
}

export interface LeaveType {
  id: string;
  name: string;
  code: string; // e.g. "SL", "CL", "AL"
  color: string; // Tailwind class or Hex value e.g. "bg-emerald-500"
  description: string;
  isActive: boolean;
  requiresDocuments: boolean;
}

export interface ShiftDefinition {
  id: string;
  name: string;
  startTime: string; // e.g. "09:00"
  endTime: string; // e.g. "18:00"
  flexibleGraceMinutes: number;
  halfDayMinutes: number;
  minFullDayMinutes: number;
  daysOfWeek: number[]; // e.g. [1, 2, 3, 4, 5] (Mon-Fri)
}

export interface HolidayDefinition {
  id: string;
  name: string;
  date: string;
  type: "statutory" | "restricted" | "company";
  description?: string;
  applicableLocations?: string[]; // e.g. ["Global", "NY Office", "IN Office"]
}

export interface AttendanceCorrectionRequest {
  id: string;
  timesheetEntryId?: string;
  employeeId: string;
  employeeName: string;
  date: string;
  requestedClockIn?: string;
  requestedClockOut?: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  approvedBy?: string;
  approvedByName?: string;
  createdAt: string;
}
