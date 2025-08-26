import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { StudentSidebar } from "@/components/dashboard/StudentSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { ComingSoon } from "@/components/dashboard/ComingSoon";
import { MyCourses } from "@/components/dashboard/courses/MyCourses";
import { ModernLearningPath } from "@/components/dashboard/learning-path/ModernLearningPath";
import { StudyTimePage } from "@/components/dashboard/schedule/StudyTimePage";
import { AchievementsPage } from "@/components/dashboard/achievements/AchievementsPage";
import { AssignmentsPage } from "@/components/dashboard/assignments/AssignmentsPage";

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
              <Route path="/schedule" element={<StudyTimePage />} />
              <Route path="/achievements" element={<div className="p-6"><AchievementsPage /></div>} />
              <Route path="/assignments" element={<div className="p-6"><AssignmentsPage /></div>} />
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