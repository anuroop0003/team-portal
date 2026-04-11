import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/theme-context";
import {
  BellIcon,
  LogOutIcon,
  UserIcon,
  SettingsIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react";
import { Outlet, useLocation } from "react-router-dom";
import { useMemo } from "react";

export default function DashboardLayout() {
  const location = useLocation();
  const { mode, toggleMode } = useTheme();

  const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  };

  const breadcrumbs = useMemo(() => {
    const paths = location.pathname.split("/").filter(Boolean);
    return paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join("/")}`;
      const isLast = index === paths.length - 1;
      const title =
        path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");

      return { title, href, isLast };
    });
  }, [location]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-10 px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbs.length > 0 &&
                  breadcrumbs[0].title !== "Dashboard" &&
                  breadcrumbs.map((crumb) => (
                    <div key={crumb.href} className="flex items-center gap-2">
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        {crumb.isLast ? (
                          <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={crumb.href}>
                            {crumb.title}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </div>
                  ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="relative inline-flex">
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <BellIcon className="h-4 w-4" />
                    <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-primary" />
                  </Button>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <div className="p-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    No new notifications
                  </p>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="end">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <div className="flex items-center justify-between px-2 py-2">
                  <div className="flex items-center gap-2">
                    <SunIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Light</span>
                  </div>
                  <Switch
                    checked={mode === "dark"}
                    onCheckedChange={toggleMode}
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Dark</span>
                    <MoonIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
