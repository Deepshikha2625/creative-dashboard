"use client";

import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import { usePathname } from "next/navigation";
import { useState } from "react";

import ThemeToggle from "@/components/ThemeToggle";
import AppSidebar from "./AppSidebar";


// Child component to use useSidebar inside SidebarProvider
const DashboardLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { state } = useSidebar();
  const sidebarWidth = isMobile ? 0 : state === "collapsed" ? 64 : 256; // px

  const getPageTitle = () => {
    const path = pathname.replace("/dashboard", "").replace("/", "");
    if (!path) return "Dashboard";
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="min-h-screen w-full gradient-primary">
      {/* Top Header - fixed and shifted right on desktop */}
      <AppBar
        position="fixed"
        elevation={0}
        className="glass-card"
        sx={{
          background: "var(--gradient-glass)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid hsl(var(--glass-border) / 0.3)",
          left: { xs: 0, md: `${sidebarWidth + 12}px` }, // 12px gap
          width: { xs: '100%', md: `calc(100% - ${sidebarWidth + 12}px)` },
          zIndex: 1201,
          transition: 'left 0.3s, width 0.3s',
        }}
      >
        <Toolbar className="px-2 sm:px-4">
          {isMobile ? (
            <IconButton
              edge="start"
              onClick={handleDrawerToggle}
              className="mr-2 text-foreground"
            >
              <MenuIcon
               />
            </IconButton>
          ) : (
            <SidebarTrigger className="mr-4" />
          )}

          <Typography
            variant={isMobile ? "body1" : "h6"}
            className="flex-1 font-semibold truncate text-black"
          >
            {getPageTitle()}
          </Typography>

          <div className="flex items-center space-x-1 sm:space-x-4">
            <ThemeToggle />
            <Avatar
              className="gradient-primary glow-primary"
              sx={{
                width: isMobile ? 32 : 40,
                height: isMobile ? 32 : 40,
                fontSize: isMobile ? "1rem" : "1.25rem",
                ml: { xs: 1, sm: 2 },
              }}
            >
              J
            </Avatar>
          </div>
        </Toolbar>
      </AppBar>

  <div className="flex w-full gap-3 md:gap-3">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <div style={{ width: sidebarWidth, flexShrink: 0 }}>
            <AppSidebar />
          </div>
        )}

        {/* Mobile Drawer */}
        {isMobile && (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile
            }}
            sx={{
              "& .MuiDrawer-paper": {
                width: 280,
                background: "var(--gradient-glass)",
                backdropFilter: "blur(20px)",
                border: "none",
              },
            }}
          >
            <AppSidebar onMobileClose={() => setMobileOpen(false)} />
          </Drawer>
        )}

        {/* Main Content - add top padding for fixed header and left margin for sidebar */}
        <main
          className="flex-1 p-3 sm:p-4 lg:p-6 overflow-hidden"
          style={{ paddingTop: 72 }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </SidebarProvider>
  );
};


export default DashboardLayout;
