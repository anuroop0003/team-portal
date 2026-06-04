import {
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  TerminalIcon,
  LayoutDashboardIcon,
  TrophyIcon,
  UsersIcon,
  CarIcon,
  ClockIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { PATHS } from "@/routes/constants/paths";

export interface SidebarSubItem {
  title: string;
  url: string;
}

export interface SidebarNavItem {
  title: string;
  url: string;
  icon?: ReactNode;
  isActive?: boolean;
  items?: SidebarSubItem[];
}

export const SIDEBAR_DATA = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: <GalleryVerticalEndIcon />,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: <AudioLinesIcon />,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: <TerminalIcon />,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: PATHS.DASHBOARD,
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Rewards",
      url: PATHS.REWARDS.ROOT,
      icon: <TrophyIcon />,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: PATHS.REWARDS.ROOT,
        },
        {
          title: "My Rewards",
          url: PATHS.REWARDS.MY_REWARDS,
        },
        {
          title: "Points History",
          url: PATHS.REWARDS.POINTS_HISTORY,
        },
        {
          title: "Redeem Shop",
          url: PATHS.REWARDS.REDEEM_SHOP,
        },
        {
          title: "Global Leaderboard",
          url: PATHS.REWARDS.GLOBAL_LEADERBOARD,
        },
        {
          title: "Add Reward",
          url: PATHS.REWARDS.ADD_REWARD,
        },
      ],
    },
    {
      title: "Workforce",
      url: PATHS.WORKFORCE.ROOT,
      icon: <UsersIcon />,
      items: [
        {
          title: "Directory",
          url: PATHS.WORKFORCE.ROOT,
        },
        {
          title: "Organization",
          url: PATHS.WORKFORCE.ORGANIZATION,
        },
        {
          title: "User Management",
          url: PATHS.WORKFORCE.USER_MANAGEMENT,
        },
      ],
    },
    {
      title: "Parking",
      url: PATHS.PARKING,
      icon: <CarIcon />,
    },
    {
      title: "Time & Attendance",
      url: PATHS.TIME_ATTENDANCE.TIMESHEET,
      icon: <ClockIcon />,
      items: [
        {
          title: "Timesheet",
          url: PATHS.TIME_ATTENDANCE.TIMESHEET,
        },
        {
          title: "Time Off",
          url: PATHS.TIME_ATTENDANCE.TIME_OFF,
        },
        {
          title: "Corrections",
          url: PATHS.TIME_ATTENDANCE.CORRECTIONS,
        },
        {
          title: "Holidays",
          url: PATHS.TIME_ATTENDANCE.HOLIDAYS,
        },
        {
          title: "Approvals",
          url: PATHS.TIME_ATTENDANCE.APPROVALS,
        },
        {
          title: "Team Timesheets",
          url: PATHS.TIME_ATTENDANCE.OPERATIONS_TIMESHEETS,
        },
        {
          title: "Team Calendar",
          url: PATHS.TIME_ATTENDANCE.CALENDAR,
        },
        {
          title: "Reports",
          url: PATHS.TIME_ATTENDANCE.REPORTS,
        },
        {
          title: "Accrual Policies",
          url: PATHS.TIME_ATTENDANCE.POLICIES,
        },
        {
          title: "Leave Types",
          url: PATHS.TIME_ATTENDANCE.LEAVE_TYPES,
        },
      ],
    },
  ],
};
