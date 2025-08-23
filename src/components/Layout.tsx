import { useState, useEffect } from "react";
import NewHeader from "./NewHeader";
import Footer from "./Footer";
import { ChatbotFAB } from "./ui/ChatbotFAB";

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
    <div className="min-h-screen bg-background relative">
      {/* Professional Floating Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
        {/* Primary Blob */}
        <div className="absolute top-20 -left-32 w-96 h-96 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full blur-3xl animate-float" />
        
        {/* Secondary Blob */}
        <div className="absolute top-1/3 -left-30 w-80 h-80 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full blur-3xl animate-float" style={{animationDelay: '2s', animationDirection: 'reverse'}} />

        
        {/* Quaternary Blob */}
        
        
      </div>

      {/* Content with higher z-index */}
      <div className="relative z-10">
        <NewHeader isDark={isDark} toggleTheme={toggleTheme} />
        <main>
          {children}
        </main>
        <Footer isDark={isDark} />
        <ChatbotFAB />
      </div>
    </div>
  );
};

export default Layout;