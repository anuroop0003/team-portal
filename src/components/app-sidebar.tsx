import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  TerminalIcon,
  LayoutDashboardIcon,
  TrophyIcon,
  UsersIcon,
} from "lucide-react";
import { PATHS } from "@/routes/constants/paths";

// This is sample data.
const data = {
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
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {data.teams[0].logo}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {data.teams[0].name}
                </span>
                <span className="truncate text-xs">{data.teams[0].plan}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
