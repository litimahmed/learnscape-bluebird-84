import { useState, useEffect } from "react";
import NewHeader from "./NewHeader";
import Footer from "./Footer";
import { ChatbotFAB } from "./ui/ChatbotFAB";
import ScrollToTop from "./ui/ScrollToTop";

interface LayoutProps {
  children: React.ReactNode;
  headerLoading?: boolean;
  footerLoading?: boolean;
}

const Layout = ({ children, headerLoading, footerLoading }: LayoutProps) => {
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
        {/* Large Left Blob - Dynamic with pulse */}
        <div className="fixed top-32 left-0 w-80 h-80 bg-gradient-to-br from-primary/15 to-primary/25 rounded-full blur-3xl animate-float opacity-60 hover:opacity-80 transition-opacity duration-1000" style={{animationDuration: '8s'}} />
        
        {/* Small Left Blob - Counter rotation */}
          <div className="fixed top-80 left-20 w-36 h-36 bg-gradient-to-br from-primary/20 to-primary/35 rounded-full blur-2xl animate-float opacity-70" style={{animationDelay: '2s', animationDirection: 'reverse', animationDuration: '6s'}} />
        {/* Right Blob - Slow drift */}
      </div>

      {/* Content with higher z-index */}
      <div className="relative z-10">
        <NewHeader isDark={isDark} toggleTheme={toggleTheme} loading={headerLoading} />
        <main>
          {children}
        </main>
        <Footer isDark={isDark} loading={footerLoading} />
        <ChatbotFAB />
        <ScrollToTop />
      </div>
    </div>
  );
};

export default Layout;