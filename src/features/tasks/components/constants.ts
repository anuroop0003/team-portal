import type { Task } from "../types/tasks";
import { MOCK_WORKFORCE } from "@/features/workforce/components/constants";
import {
  Circle,
  Clock3,
  SearchCheck,
  CheckCircle2,
  ArrowDown,
  Minus,
  ArrowUp,
  AlertTriangle,
} from "lucide-react";

export const STATUS_OPTIONS = [
  {
    label: "Todo",
    value: "Todo",
    icon: Circle,
    className: "text-slate-500",
  },
  {
    label: "In Progress",
    value: "In Progress",
    icon: Clock3,
    className: "text-blue-500",
  },
  {
    label: "In Review",
    value: "In Review",
    icon: SearchCheck,
    className: "text-amber-500",
  },
  {
    label: "Done",
    value: "Done",
    icon: CheckCircle2,
    className: "text-green-500",
  },
] as const;

export const PRIORITY_OPTIONS = [
  {
    label: "Low",
    value: "Low",
    icon: ArrowDown,
    className: "text-green-500",
  },
  {
    label: "Medium",
    value: "Medium",
    icon: Minus,
    className: "text-yellow-500",
  },
  {
    label: "High",
    value: "High",
    icon: ArrowUp,
    className: "text-orange-500",
  },
  {
    label: "Critical",
    value: "Critical",
    icon: AlertTriangle,
    className: "text-red-500",
  },
] as const;

export const MOCK_TASKS: Task[] = [
  {
    id: "task-1",
    title: "Design System Architecture",
    description:
      "Create initial layout, theme configs, component structure, and design tokens for the client workspace.",
    status: "Done",
    priority: "Critical",
    assignee: {
      id: MOCK_WORKFORCE[3].id, // Emily Davis
      name: MOCK_WORKFORCE[3].name,
      email: MOCK_WORKFORCE[3].email,
      avatar: MOCK_WORKFORCE[3].avatar,
    },
    dueDate: "2026-06-15",
    createdAt: "2026-06-01",
    jiraKey: "TP-101",
    jiraUrl: "https://jira.company.com/browse/TP-101",
  },
  {
    id: "task-2",
    title: "Implement Time & Attendance UI",
    description:
      "Build the timesheets grid, clock-in/out toggles, leave requests dialog, and calendars views.",
    status: "In Progress",
    priority: "High",
    assignee: {
      id: MOCK_WORKFORCE[2].id, // Michael Ross
      name: MOCK_WORKFORCE[2].name,
      email: MOCK_WORKFORCE[2].email,
      avatar: MOCK_WORKFORCE[2].avatar,
    },
    dueDate: "2026-06-20",
    createdAt: "2026-06-05",
  },
  {
    id: "task-3",
    title: "Rewards Portal Integration",
    description:
      "Connect leaderboards, points distribution hooks, and redeem shop API queries with client-side context.",
    status: "Todo",
    priority: "Medium",
    assignee: {
      id: MOCK_WORKFORCE[5].id, // Jessica Lee
      name: MOCK_WORKFORCE[5].name,
      email: MOCK_WORKFORCE[5].email,
      avatar: MOCK_WORKFORCE[5].avatar,
    },
    dueDate: "2026-06-25",
    createdAt: "2026-06-08",
  },
  {
    id: "task-4",
    title: "Resolve Security Vulnerabilities in Upload Controller",
    description:
      "Fix path traversal vulnerabilities and restrict supported file formats on backend upload middleware.",
    status: "In Review",
    priority: "Critical",
    assignee: {
      id: MOCK_WORKFORCE[0].id, // Alex Thompson
      name: MOCK_WORKFORCE[0].name,
      email: MOCK_WORKFORCE[0].email,
      avatar: MOCK_WORKFORCE[0].avatar,
    },
    dueDate: "2026-06-12",
    createdAt: "2026-06-03",
    jiraKey: "TP-104",
    jiraUrl: "https://jira.company.com/browse/TP-104",
  },
  {
    id: "task-5",
    title: "Write End-to-End Tests for Org Chart",
    description:
      "Implement Cypress/Playwright assertions covering node expansion, drag-and-drop actions, and searching filters.",
    status: "Todo",
    priority: "Low",
    assignee: {
      id: MOCK_WORKFORCE[2].id, // Michael Ross
      name: MOCK_WORKFORCE[2].name,
      email: MOCK_WORKFORCE[2].email,
      avatar: MOCK_WORKFORCE[2].avatar,
    },
    dueDate: "2026-06-30",
    createdAt: "2026-06-09",
  },
];
