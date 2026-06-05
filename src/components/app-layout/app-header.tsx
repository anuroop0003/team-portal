import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppBreadcrumbs } from "./app-breadcrumbs";
import { NotificationDropdown } from "./notification-dropdown";
import { UserDropdown } from "./user-dropdown";

export function AppHeader() {
  return (
    <div className="sticky top-0 z-10 bg-background p-[16px_16px_16px_4px]">
      <header className="flex h-16 shrink-0 items-center justify-between transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 px-4 rounded-lg bg-muted/50">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2" />
          <AppBreadcrumbs />
        </div>

        <div className="flex items-center gap-4">
          <NotificationDropdown />
          <UserDropdown />
        </div>
      </header>
    </div>
  );
}
