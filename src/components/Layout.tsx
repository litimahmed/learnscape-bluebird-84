import { useState, useEffect } from "react";
import NewHeader from "./NewHeader";
import Footer from "./Footer";

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
      {/* DEBUG MODE - Testing blob visibility */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {/* DEBUG: Primary Blob - Solid red for testing */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-red-500 rounded-full animate-float" />
        
        {/* DEBUG: Secondary Blob - Solid blue for testing */}
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-blue-500 rounded-full animate-float" style={{animationDelay: '2s', animationDirection: 'reverse'}} />
        
        {/* DEBUG: Tertiary Blob - Solid green for testing */}
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-green-500 rounded-full animate-float" style={{animationDelay: '4s'}} />
        
        {/* DEBUG: Quaternary Blob - Solid orange for testing */}
        <div className="absolute bottom-10 right-20 w-72 h-72 bg-orange-500 rounded-full animate-float" style={{animationDelay: '1s', animationDirection: 'reverse'}} />
        
        {/* DEBUG: Small Accent Blobs - Solid colors for testing */}
        <div className="absolute top-2/3 left-1/2 w-48 h-48 bg-purple-500 rounded-full animate-float" style={{animationDelay: '3s'}} />
        <div className="absolute top-10 right-1/3 w-40 h-40 bg-cyan-500 rounded-full animate-float" style={{animationDelay: '5s', animationDirection: 'reverse'}} />
      </div>

      {/* Content with higher z-index */}
      <div className="relative z-20">
        <NewHeader isDark={isDark} toggleTheme={toggleTheme} />
        <main className="relative z-20">
          {children}
        </main>
        <Footer isDark={isDark} />
      </div>
    </div>
  );
};

export default Layout;