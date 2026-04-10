import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { BellIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useThemeColor } from "@/components/theme-context";

export default function DashboardLayout() {
  const { setThemeColor } = useThemeColor();

  const themes = [
    { name: "teal", color: "var(--teal-swatch)" },
    { name: "blue", color: "var(--blue-swatch)" },
    { name: "green", color: "var(--green-swatch)" },
    { name: "orange", color: "var(--orange-swatch)" },
    { name: "rose", color: "var(--rose-swatch)" },
  ] as const;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 bg-primary px-4">
          <div className="ml-auto flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-transparent cursor-pointer"
            >
              <BellIcon className="size-5 text-background" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    className="relative size-8 rounded-full cursor-pointer"
                  >
                    <Avatar>
                      <AvatarImage src="/avatars/shadcn.jpg" alt="@shadcn" />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                  </Button>
                }
              />
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">shadcn</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        m@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer rounded-sm">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer rounded-sm">
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer rounded-sm">
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer rounded-sm">
                    New Team
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="flex items-center justify-between px-3 py-1.5 gap-2">
                  {themes.map((t) => (
                    <DropdownMenuItem
                      key={t.name}
                      className="size-6 cursor-pointer rounded-xs hover:scale-110 transition-transform p-0"
                      style={{ backgroundColor: t.color }}
                      onClick={() => setThemeColor(t.name)}
                    />
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer rounded-sm hover:bg-red-300! hover:text-red-700!">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="relative flex-1 bg-white">
          <div className="relative z-0">
            <Outlet />
          </div>
          <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
