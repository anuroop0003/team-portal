import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/components/app-layout/app-header";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useMe } from "@/features/auth";

export default function AppLayout() {
  useMe();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-h-screen flex flex-col">
        <AppHeader />
        <main className="flex-1 min-h-0 overflow-auto m-[0px_16px_16px_4px] bg-muted/50 flex flex-col gap-4 p-4 rounded-lg">
          <Outlet />
        </main>
        <ScrollRestoration />
      </SidebarInset>
    </SidebarProvider>
  );
}
