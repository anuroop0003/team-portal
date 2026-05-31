import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/components/app-layout/app-header";
import { Outlet, ScrollRestoration } from "react-router-dom";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-h-screen flex flex-col">
        <AppHeader />
        <main className="flex-1 mx-4 mb-4 bg-muted/50 flex flex-col gap-4 p-4 md:p-6 rounded-lg overflow-auto">
          <Outlet />
        </main>
        <ScrollRestoration />
      </SidebarInset>
    </SidebarProvider>
  );
}
