import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { StudentSidebar } from "@/components/dashboard/StudentSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { ComingSoon } from "@/components/dashboard/ComingSoon";
import { MyCourses } from "@/components/dashboard/courses/MyCourses";
import { LearningPathRoadmap } from "@/components/dashboard/learning-path/LearningPathRoadmap";

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
          <main className="flex-1 p-6 modern-scrollbar overflow-auto">
            <Routes>
              <Route index element={<DashboardContent />} />
              <Route path="/" element={<DashboardContent />} />
              <Route path="/courses" element={<MyCourses />} />
              <Route path="/learning-path" element={<LearningPathRoadmap />} />
              <Route path="/schedule" element={<ComingSoon title="Schedule" description="Manage your class schedule, upcoming sessions, and important deadlines." />} />
              <Route path="/achievements" element={<ComingSoon title="Achievements" description="Track your accomplishments, certificates, and learning milestones." />} />
              <Route path="/progress" element={<ComingSoon title="Progress" description="Monitor your learning progress with detailed analytics and insights." />} />
              <Route path="/assignments" element={<ComingSoon title="Assignments" description="View and submit your assignments, track deadlines and grades." />} />
              <Route path="/study-time" element={<ComingSoon title="Study Time" description="Track your study hours and optimize your learning schedule." />} />
              <Route path="/reviews" element={<ComingSoon title="Reviews" description="Review and rate courses, instructors, and learning materials." />} />
              <Route path="/messages" element={<ComingSoon title="Messages" description="Communicate with instructors and fellow students." />} />
              <Route path="/profile" element={<ComingSoon title="Profile" description="Manage your personal information and account settings." />} />
              <Route path="/settings" element={<ComingSoon title="Settings" description="Customize your learning experience and account preferences." />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default StudentDashboard;