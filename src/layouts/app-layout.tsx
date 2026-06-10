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
        <main className="flex flex-col flex-1 gap-4 p-4 m-[0px_16px_16px_4px] min-h-0 overflow-auto bg-sidebar shadow-sm rounded-lg">
          <Outlet />
        </main>
        <ScrollRestoration />
      </SidebarInset>
    </SidebarProvider>
  );
}
