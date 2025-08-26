import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { StudentSidebar } from "@/components/dashboard/StudentSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { ComingSoon } from "@/components/dashboard/ComingSoon";
import { MyCourses } from "@/components/dashboard/courses/MyCourses";
import { ModernLearningPath } from "@/components/dashboard/learning-path/ModernLearningPath";
import { SchedulePage } from "@/components/dashboard/schedule/SchedulePage";

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
            <Routes>
              <Route index element={<div className="p-6"><DashboardContent /></div>} />
              <Route path="/" element={<div className="p-6"><DashboardContent /></div>} />
              <Route path="/courses" element={<div className="p-6"><MyCourses /></div>} />
              <Route path="/learning-path" element={<ModernLearningPath />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/achievements" element={<div className="p-6"><ComingSoon title="Achievements" description="Track your accomplishments, certificates, and learning milestones." /></div>} />
              <Route path="/progress" element={<div className="p-6"><ComingSoon title="Progress" description="Monitor your learning progress with detailed analytics and insights." /></div>} />
              <Route path="/assignments" element={<div className="p-6"><ComingSoon title="Assignments" description="View and submit your assignments, track deadlines and grades." /></div>} />
              <Route path="/study-time" element={<div className="p-6"><ComingSoon title="Study Time" description="Track your study hours and optimize your learning schedule." /></div>} />
              <Route path="/reviews" element={<div className="p-6"><ComingSoon title="Reviews" description="Review and rate courses, instructors, and learning materials." /></div>} />
              <Route path="/messages" element={<div className="p-6"><ComingSoon title="Messages" description="Communicate with instructors and fellow students." /></div>} />
              <Route path="/profile" element={<div className="p-6"><ComingSoon title="Profile" description="Manage your personal information and account settings." /></div>} />
              <Route path="/settings" element={<div className="p-6"><ComingSoon title="Settings" description="Customize your learning experience and account preferences." /></div>} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default StudentDashboard;