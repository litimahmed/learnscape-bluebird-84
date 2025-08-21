import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import NewHeader from "./NewHeader";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = saved === "dark" || (!saved && prefersDark);
    
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background w-full">
        <NewHeader isDark={isDark} toggleTheme={toggleTheme} />
        <main>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;