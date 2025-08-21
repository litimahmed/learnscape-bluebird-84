import { useState } from "react";
import { 
  BookOpen, 
  Search, 
  User, 
  GraduationCap, 
  Briefcase, 
  Code, 
  Database, 
  Shield, 
  Palette,
  TrendingUp,
  Users,
  HelpCircle,
  Settings,
  LogIn,
  UserPlus
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

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
import { SearchBar } from "@/components/ui/SearchBar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const courseCategories = [
  { title: "Data Analysis", url: "/courses/data-analyst", icon: TrendingUp },
  { title: "Programming", url: "/courses/programming", icon: Code },
  { title: "Data Science", url: "/courses/data-science", icon: Database },
  { title: "Cybersecurity", url: "/courses/cybersecurity", icon: Shield },
  { title: "UI/UX Design", url: "/courses/ui-ux", icon: Palette },
  { title: "Project Management", url: "/courses/project-manager", icon: Briefcase },
];

const quickLinks = [
  { title: "All Courses", url: "/courses", icon: BookOpen },
  { title: "About Us", url: "/about", icon: Users },
  { title: "Contact", url: "/contact", icon: HelpCircle },
];

interface AppSidebarProps {
  user: any;
  onLoginClick: () => void;
}

export function AppSidebar({ user, onLoginClick }: AppSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = (path: string) =>
    isActive(path) 
      ? "bg-primary/10 text-primary font-medium border-l-2 border-primary" 
      : "hover:bg-accent text-muted-foreground hover:text-foreground";

  return (
    <Sidebar className={state === "collapsed" ? "w-14" : "w-72"} collapsible="icon">
      <SidebarContent className="p-4">
        {/* Search Section */}
        {state !== "collapsed" && (
          <div className="mb-6">
            <SearchBar />
          </div>
        )}

        {/* Course Categories */}
        <SidebarGroup>
          <SidebarGroupLabel>Course Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {courseCategories.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className={getNavCls(item.url)}>
                      <item.icon className="h-4 w-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-4" />

        {/* Quick Links */}
        <SidebarGroup>
          <SidebarGroupLabel>Quick Links</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className={getNavCls(item.url)}>
                      <item.icon className="h-4 w-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Section */}
        {state !== "collapsed" && (
          <>
            <Separator className="my-4" />
            <SidebarGroup>
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarGroupContent>
                {user ? (
                  <SidebarMenu>
                    {user.position === "student" && (
                      <>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <Link to="/my-courses" className={getNavCls("/my-courses")}>
                              <BookOpen className="h-4 w-4" />
                              <span>My Courses</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <Link to="/dashboard" className={getNavCls("/dashboard")}>
                              <TrendingUp className="h-4 w-4" />
                              <span>Progress</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </>
                    )}
                    {user.position === "teacher" && (
                      <>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <Link to="/teacher/courses" className={getNavCls("/teacher/courses")}>
                              <GraduationCap className="h-4 w-4" />
                              <span>My Teaching</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <Link to="/dashboard" className={getNavCls("/dashboard")}>
                              <TrendingUp className="h-4 w-4" />
                              <span>Dashboard</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </>
                    )}
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to="/profile" className={getNavCls("/profile")}>
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                ) : (
                  <div className="space-y-2">
                    <Button 
                      onClick={onLoginClick}
                      className="w-full justify-start bg-primary hover:bg-primary/90"
                      size="sm"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                    <SidebarMenuButton asChild>
                      <Link to="/register/teacher" className="hover:bg-accent">
                        <UserPlus className="h-4 w-4" />
                        <span>Become a Teacher</span>
                      </Link>
                    </SidebarMenuButton>
                  </div>
                )}
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>
    </Sidebar>
  );
}