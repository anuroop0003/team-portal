import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, useLocation } from "react-router-dom";
import {
  BellIcon,
  SearchIcon,
  PaletteIcon,
  LogOutIcon,
  UserIcon,
  CreditCardIcon,
  Settings2Icon,
  ChevronRightIcon,
  CircleIcon,
  CheckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
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

// ─── Breadcrumb helper ────────────────────────────────────────────────────────

const SEGMENT_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  rewards: "Rewards",
  settings: "Settings",
  profile: "Profile",
  team: "Team",
};

function useBreadcrumbs() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);
  return segments.map((seg, i) => ({
    label: SEGMENT_LABELS[seg] ?? seg.charAt(0).toUpperCase() + seg.slice(1),
    href: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === segments.length - 1,
  }));
}

// ─── Theme palette config ─────────────────────────────────────────────────────

const THEMES = [
  { name: "teal", label: "Teal", color: "var(--teal-swatch)" },
  { name: "blue", label: "Blue", color: "var(--blue-swatch)" },
  { name: "green", label: "Green", color: "var(--green-swatch)" },
  { name: "orange", label: "Orange", color: "var(--orange-swatch)" },
  { name: "rose", label: "Rose", color: "var(--rose-swatch)" },
] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

function Breadcrumbs() {
  const crumbs = useBreadcrumbs();

  if (crumbs.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm">
      <span className="text-primary/60 font-medium">Home</span>
      {crumbs.map((crumb) => (
        <span key={crumb.href} className="flex items-center gap-1">
          <ChevronRightIcon className="size-3.5 text-primary/40" />
          <span
            className={
              crumb.isLast
                ? "font-semibold text-primary"
                : "text-primary/60 hover:text-primary transition-colors cursor-pointer"
            }
          >
            {crumb.label}
          </span>
        </span>
      ))}
    </nav>
  );
}

function ThemeSwitcher() {
  const { themeColor, setThemeColor } = useThemeColor();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            id="theme-switcher-trigger"
            variant="ghost"
            size="icon"
            className="relative size-9 rounded-full hover:bg-primary/10 cursor-pointer transition-all duration-200"
            aria-label="Switch theme"
          >
            <PaletteIcon className="size-4.5 text-primary" />
          </Button>
        }
      />
      <DropdownMenuContent
        align="end"
        className="w-52 p-1.5 rounded-xl border border-border/60 shadow-xl bg-background/95 backdrop-blur-md"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1.5">
            Accent Color
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {THEMES.map((t) => (
            <DropdownMenuItem
              key={t.name}
              id={`theme-option-${t.name}`}
              onClick={() => setThemeColor(t.name)}
              className="flex items-center gap-3 cursor-pointer rounded-lg px-2 py-2"
              aria-label={`Switch to ${t.label} theme`}
            >
              <span
                className="size-4.5 rounded-full ring-2 ring-offset-1 ring-offset-background shrink-0"
                style={{ backgroundColor: t.color }}
              />
              <span className="text-sm">{t.label}</span>
              {themeColor === t.name && (
                <CheckIcon className="ml-auto size-3.5 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NotificationButton() {
  const notificationCount = 3; // TODO: wire to real data

  return (
    <Button
      id="notification-bell"
      variant="ghost"
      size="icon"
      className="relative size-9 rounded-full hover:bg-primary/10 cursor-pointer transition-all duration-200"
      aria-label={`${notificationCount} unread notifications`}
    >
      <BellIcon className="size-4.5 text-primary" />
      {notificationCount > 0 && (
        <span className="absolute top-1.5 right-1.5 flex size-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
          <span className="relative inline-flex rounded-full size-2 bg-rose-500" />
        </span>
      )}
    </Button>
  );
}

function SearchButton() {
  return (
    <Button
      id="global-search-trigger"
      variant="ghost"
      className="hidden md:flex items-center gap-2 h-9 px-3 rounded-full text-sm text-muted-foreground border border-border/60 hover:border-primary/40 hover:bg-primary/5 hover:text-foreground transition-all duration-200 cursor-pointer"
      aria-label="Open global search"
    >
      <SearchIcon className="size-3.5 shrink-0" />
      <span>Search...</span>
      <kbd className="ml-1 hidden lg:inline-flex items-center gap-1 rounded border border-border/60 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
        ⌘K
      </kbd>
    </Button>
  );
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            id="user-avatar-trigger"
            className="relative flex shrink-0 cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Open user menu"
          >
            <Avatar className="size-8 ring-2 ring-primary/20 hover:ring-primary/60 transition-all duration-200">
              <AvatarImage src="/avatars/shadcn.jpg" alt="User avatar" />
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                SC
              </AvatarFallback>
            </Avatar>
            <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
          </button>
        }
      />
      <DropdownMenuContent
        className="w-64 rounded-xl border border-border/60 shadow-2xl bg-background/95 backdrop-blur-md p-1.5"
        align="end"
        sideOffset={8}
      >
        {/* User info */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal px-2 py-2">
            <div className="flex items-center gap-3">
              <Avatar className="size-9 ring-2 ring-primary/20">
                <AvatarImage src="/avatars/shadcn.jpg" alt="User avatar" />
                <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                  SC
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold truncate">shadcn</span>
                <span className="text-xs text-muted-foreground truncate">
                  m@example.com
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <CircleIcon className="size-2 fill-emerald-500 text-emerald-500" />
                  <span className="text-[10px] text-emerald-600 font-medium">
                    Active
                  </span>
                  <Separator orientation="vertical" className="h-3" />
                  <span className="inline-flex items-center rounded-sm bg-muted px-1.5 py-0 text-[10px] font-medium text-muted-foreground h-4">
                    Admin
                  </span>
                </div>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="mx-1" />

        {/* Navigation */}
        <DropdownMenuGroup>
          <DropdownMenuItem
            id="user-menu-profile"
            className="flex items-center gap-2.5 cursor-pointer rounded-lg px-2 py-2 text-sm"
          >
            <UserIcon className="size-4 text-muted-foreground" />
            <span>My Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            id="user-menu-billing"
            className="flex items-center gap-2.5 cursor-pointer rounded-lg px-2 py-2 text-sm"
          >
            <CreditCardIcon className="size-4 text-muted-foreground" />
            <span>Billing & Usage</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            id="user-menu-settings"
            className="flex items-center gap-2.5 cursor-pointer rounded-lg px-2 py-2 text-sm"
          >
            <Settings2Icon className="size-4 text-muted-foreground" />
            <span>Account Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="mx-1" />

        {/* Logout */}
        <DropdownMenuItem
          id="user-menu-logout"
          className="flex items-center gap-2.5 cursor-pointer rounded-lg px-2 py-2 text-sm text-rose-600 hover:bg-rose-50! dark:hover:bg-rose-950/40! hover:text-rose-600! focus:bg-rose-50! dark:focus:bg-rose-950/40! focus:text-rose-600!"
        >
          <LogOutIcon className="size-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ─── Main layout ──────────────────────────────────────────────────────────────

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* ── Top navigation bar ── */}
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border/60 bg-background/95 px-4 backdrop-blur-md shadow-sm">
          {/* Left – breadcrumbs */}
          <div className="flex items-center gap-3 min-w-0">
            <Breadcrumbs />
          </div>

          {/* Right – actions */}
          <div className="flex items-center gap-1.5 shrink-0">
            <SearchButton />
            <Separator orientation="vertical" className="h-6 mx-1" />
            <ThemeSwitcher />
            <NotificationButton />
            <Separator orientation="vertical" className="h-6 mx-1" />
            <UserMenu />
          </div>
        </header>

        {/* ── Page content ── */}
        <main id="main-content" className="flex-1 bg-muted/30 min-h-0">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
