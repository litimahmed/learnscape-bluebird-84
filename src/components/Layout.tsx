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
        <div className="absolute top-1/3 -right-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full blur-3xl animate-float" style={{animationDelay: '2s', animationDirection: 'reverse'}} />
        
        {/* Tertiary Blob */}
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}} />
        
        {/* Quaternary Blob */}
        <div className="absolute bottom-10 -right-20 w-72 h-72 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full blur-3xl animate-float" style={{animationDelay: '1s', animationDirection: 'reverse'}} />
        
        {/* Small Accent Blobs */}
        <div className="absolute top-2/3 left-1/2 w-48 h-48 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}} />
        <div className="absolute top-10 right-1/3 w-40 h-40 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full blur-3xl animate-float" style={{animationDelay: '5s', animationDirection: 'reverse'}} />
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