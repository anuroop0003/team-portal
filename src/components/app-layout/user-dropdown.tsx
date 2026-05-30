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
  LogOutIcon,
  UserIcon,
  SettingsIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function UserDropdown() {
  const { mode, toggleMode } = useTheme();

  const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Sarah",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="size-9 rounded-full cursor-pointer"
          >
            <Avatar className="size-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent className="w-60">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <UserIcon />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <SettingsIcon />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <div className="flex items-center justify-between px-2 py-2">
          <div className="flex items-center gap-2">
            <SunIcon
              className={cn(
                "size-4",
                mode === "light" ? "text-amber-600" : "text-muted-foreground",
              )}
            />
            <span className="text-sm font-medium">Light</span>
          </div>
          <Switch
            checked={mode === "dark"}
            className="cursor-pointer"
            onCheckedChange={toggleMode}
          />
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Dark</span>
            <MoonIcon
              className={cn(
                "size-4",
                mode === "dark" ? "text-amber-300" : "text-muted-foreground",
              )}
            />
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" className="cursor-pointer">
          <LogOutIcon />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
