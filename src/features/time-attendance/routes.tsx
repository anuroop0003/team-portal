import { lazy } from "react";
import { type RouteObject } from "react-router-dom";
import { PATHS } from "@/routes/constants/paths";

const TimesheetPage = lazy(() => import("./components/timesheet/page"));
const TimeOffPage = lazy(() => import("./components/time-off/page"));
const HolidaysPage = lazy(() => import("./components/holidays/page"));
const CorrectionsPage = lazy(() => import("./components/corrections/page"));
const ApprovalsPage = lazy(() => import("./components/approvals/page"));
const OperationsTimesheetsPage = lazy(
  () => import("./components/operations-timesheets/page"),
);
const OperationsCalendarPage = lazy(() => import("./components/calendar/page"));
const ReportsPage = lazy(() => import("./components/reports/page"));
const PoliciesPage = lazy(() => import("./components/policies/page"));
const LeaveTypesPage = lazy(() => import("./components/leave-types/page"));

export const timeAttendanceRoutes: RouteObject[] = [
  {
    path: PATHS.TIME_ATTENDANCE.ROOT,
    children: [
      {
        index: true,
        element: <TimesheetPage />,
      },
      {
        path: PATHS.TIME_ATTENDANCE.TIME_OFF,
        element: <TimeOffPage />,
      },
      {
        path: PATHS.TIME_ATTENDANCE.HOLIDAYS,
        element: <HolidaysPage />,
      },
      {
        path: PATHS.TIME_ATTENDANCE.CORRECTIONS,
        element: <CorrectionsPage />,
      },
      {
        path: PATHS.TIME_ATTENDANCE.APPROVALS,
        element: <ApprovalsPage />,
      },
      {
        path: PATHS.TIME_ATTENDANCE.OPERATIONS_TIMESHEETS,
        element: <OperationsTimesheetsPage />,
      },
      {
        path: PATHS.TIME_ATTENDANCE.CALENDAR,
        element: <OperationsCalendarPage />,
      },
      {
        path: PATHS.TIME_ATTENDANCE.REPORTS,
        element: <ReportsPage />,
      },
      {
        path: PATHS.TIME_ATTENDANCE.POLICIES,
        element: <PoliciesPage />,
      },
      {
        path: PATHS.TIME_ATTENDANCE.LEAVE_TYPES,
        element: <LeaveTypesPage />,
      },
    ],
  },
];
