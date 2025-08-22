import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { StudentSidebar } from "@/components/dashboard/StudentSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StudentDashboard = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <StudentSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader isDark={isDark} toggleTheme={toggleTheme} />
          <main className="flex-1 modern-scrollbar overflow-auto">
            <Tabs defaultValue="overview" className="w-full h-full">
              <div className="px-6 pt-6 pb-2 border-b border-border/50">
                <TabsList className="grid w-auto grid-cols-4 gap-1">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                  <TabsTrigger value="assignments">Assignments</TabsTrigger>
                  <TabsTrigger value="progress">Progress</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="overview" className="p-6 mt-0">
                <DashboardContent />
              </TabsContent>
              <TabsContent value="courses" className="p-6 mt-0">
                <div className="text-muted-foreground">Courses content coming soon...</div>
              </TabsContent>
              <TabsContent value="assignments" className="p-6 mt-0">
                <div className="text-muted-foreground">Assignments content coming soon...</div>
              </TabsContent>
              <TabsContent value="progress" className="p-6 mt-0">
                <div className="text-muted-foreground">Progress content coming soon...</div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default StudentDashboard;