import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  GalleryVerticalEndIcon,
  LayoutDashboardIcon,
  Settings2Icon,
  PanelLeftIcon,
} from "lucide-react";
import { PATHS } from "@/routes/constants/paths";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Navigation",
      url: "#",
      icon: <LayoutDashboardIcon />,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: PATHS.DASHBOARD,
        },
        {
          title: "Rewards",
          url: PATHS.REWARDS,
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
      items: [
        {
          title: "Profile",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-1 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <GalleryVerticalEndIcon />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate font-semibold">Team Portal</span>
            <span className="truncate text-xs">Management</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="cursor-pointer"
              onClick={toggleSidebar}
            >
              <PanelLeftIcon />
              <span>Collapse Sidebar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
