import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  GraduationCap,
  Calendar,
  Trophy,
  MessageSquare,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  BarChart3,
  FileText,
  Clock,
  Star,
  Zap,
  Target,
  Bookmark
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mainNavItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "My Courses", url: "/dashboard/courses", icon: BookOpen },
  { title: "Learning Path", url: "/dashboard/learning-path", icon: GraduationCap },
  { title: "Schedule", url: "/dashboard/schedule", icon: Calendar },
  { title: "Achievements", url: "/dashboard/achievements", icon: Trophy },
  { title: "Progress", url: "/dashboard/progress", icon: BarChart3 },
];

const secondaryNavItems = [
  { title: "Assignments", url: "/dashboard/assignments", icon: FileText },
  { title: "Study Time", url: "/dashboard/study-time", icon: Clock },
  { title: "Reviews", url: "/dashboard/reviews", icon: Star },
  { title: "Messages", url: "/dashboard/messages", icon: MessageSquare },
];

const accountItems = [
  { title: "Profile", url: "/dashboard/profile", icon: User },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function StudentSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavClasses = (path: string) =>
    isActive(path)
      ? "bg-primary/10 text-primary border-r-2 border-primary font-medium"
      : "text-muted-foreground hover:text-foreground hover:bg-accent/50";

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} border-r border-border transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className="bg-card modern-scrollbar">
        {/* Header with Toggle */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          {!collapsed ? (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-lg">LearnHub</h3>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">Pro</Badge>
                  <span className="text-xs text-muted-foreground">Level 5</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>
          )}
          
          <SidebarTrigger className="h-8 w-8 hover:bg-accent rounded-lg flex items-center justify-center">
            <ChevronLeft className={`w-4 h-4 transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`} />
          </SidebarTrigger>
        </div>

        {/* Quick Stats */}
        {!collapsed && (
          <div className="p-4 border-b border-border">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-primary/5 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-primary">67%</div>
                <div className="text-xs text-muted-foreground">Progress</div>
              </div>
              <div className="bg-green-500/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-green-600">4</div>
                <div className="text-xs text-muted-foreground">Courses</div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Groups */}
        <div className="flex-1 py-4">
          {/* Main Navigation */}
          <SidebarGroup>
            {!collapsed && (
              <SidebarGroupLabel className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Main
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent className="px-2">
              <SidebarMenu>
                {mainNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-11">
                      <NavLink
                        to={item.url}
                        className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${getNavClasses(item.url)}`}
                      >
                        <item.icon className={`${collapsed ? "w-5 h-5" : "w-5 h-5 mr-3"}`} />
                        {!collapsed && <span className="font-medium">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Secondary Navigation */}
          <SidebarGroup className="mt-6">
            {!collapsed && (
              <SidebarGroupLabel className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Learning
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent className="px-2">
              <SidebarMenu>
                {secondaryNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-11">
                      <NavLink
                        to={item.url}
                        className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${getNavClasses(item.url)}`}
                      >
                        <item.icon className={`${collapsed ? "w-5 h-5" : "w-5 h-5 mr-3"}`} />
                        {!collapsed && <span className="font-medium">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Account Section */}
          <SidebarGroup className="mt-auto">
            {!collapsed && (
              <SidebarGroupLabel className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Account
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent className="px-2">
              <SidebarMenu>
                {accountItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-11">
                      <NavLink
                        to={item.url}
                        className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${getNavClasses(item.url)}`}
                      >
                        <item.icon className={`${collapsed ? "w-5 h-5" : "w-5 h-5 mr-3"}`} />
                        {!collapsed && <span className="font-medium">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="h-11">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent/50 h-11 px-3"
                    >
                      <LogOut className={`${collapsed ? "w-5 h-5" : "w-5 h-5 mr-3"}`} />
                      {!collapsed && <span className="font-medium">Logout</span>}
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}