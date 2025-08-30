"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Assessment,
  Chat,
  Close,
  Dashboard,
  Settings,
  Logout,
} from "@mui/icons-material";
import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface AppSidebarProps {
  onMobileClose?: () => void;
}

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Dashboard,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: Assessment,
  },
  {
    title: "Chat",
    url: "/chat",
    icon: Chat,
  },
];

const AppSidebar = ({ onMobileClose }: AppSidebarProps) => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      document.cookie = "token=; Max-Age=0; path=/;";
    }
    router.push("/login");
  };

  // Active link logic
  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname === path || (pathname?.startsWith(path + "/") ?? false);
  };

  const getNavClass = (path: string) =>
    isActive(path)
      ? "bg-primary text-primary-foreground glow-primary"
      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-smooth";

  const handleNavClick = () => {
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <Sidebar
      className={`${
        collapsed && !isMobile ? "w-16" : "w-64"
      } transition-smooth glass-card border-r border-glass-border/30`}
      collapsible="icon"
      style={{
        background: "var(--gradient-glass)",
        backdropFilter: "blur(20px)",
      }}
    >
      <SidebarContent className="p-3 sm:p-4">
        {/* Mobile Close Button */}
        {isMobile && onMobileClose && (
          <div className="flex justify-end mb-4">
            <IconButton
              onClick={onMobileClose}
              size="small"
              className="text-muted-foreground hover:text-foreground"
            >
              <Close />
            </IconButton>
          </div>
        )}

        {/* Logo/Brand */}
        <div className="mb-6 sm:mb-8 px-3">
          {(!collapsed || isMobile) && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl gradient-primary glow-primary flex items-center justify-center">
                <Dashboard className="text-white text-lg sm:text-xl" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold bg-gradient-to-r from-primary-glow to-accent-glow bg-clip-text text-black">
                  NextDash
                </h2>
                <p className="text-xs text-muted-foreground">
                  Creative Dashboard
                </p>
              </div>
            </div>
          )}
          {collapsed && !isMobile && (
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-xl gradient-primary glow-primary flex items-center justify-center">
                <Dashboard className="text-white text-lg" />
              </div>
            </div>
          )}
        </div>

        {/* Main Menu */}
        <SidebarGroup>
          <SidebarGroupLabel
            className={
              collapsed && !isMobile
                ? "hidden"
                : "text-muted-foreground text-xs uppercase tracking-wider font-medium"
            }
          >
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      onClick={handleNavClick}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-smooth ${getNavClass(
                        item.url
                      )}`}
                    >
                      <item.icon className="text-lg sm:text-xl flex-shrink-0" />
                      {(!collapsed || isMobile) && (
                        <span className="font-medium text-sm sm:text-base">
                          {item.title}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account: Settings and Logout */}
        <SidebarGroup>
          <SidebarGroupLabel
            className={
              collapsed && !isMobile
                ? "hidden"
                : "text-muted-foreground text-xs uppercase tracking-wider font-medium mt-6"
            }
          >
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/settings"
                    onClick={handleNavClick}
                    className="flex items-center space-x-3 px-3 py-3 rounded-xl transition-smooth hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full text-left"
                  >
                    <Settings className="text-lg sm:text-xl flex-shrink-0" />
                    {(!collapsed || isMobile) && (
                      <span className="font-medium text-sm sm:text-base">
                        Settings
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-3 py-3 rounded-xl transition-smooth hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full text-left cursor-pointer"
                  >
                    <Logout className="text-lg sm:text-xl flex-shrink-0" />
                    {(!collapsed || isMobile) && (
                      <span className="font-medium text-sm sm:text-base">
                        Logout
                      </span>
                    )}
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
