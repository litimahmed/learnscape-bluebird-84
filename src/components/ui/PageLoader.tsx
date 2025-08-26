import { useEffect, useState } from "react";

const PageLoader = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Ensure loader shows for at least 1.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }
  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10"></div>
      
      {/* Floating Background Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-primary/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
      
      {/* Main Loading Container */}
      <div className="relative z-10 flex flex-col items-center gap-8 text-center max-w-md mx-auto px-6">
        {/* Modern Loading Spinner */}
        <div className="relative">
          {/* Outer Ring */}
          <div className="w-16 h-16 border-4 border-primary/20 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
          </div>
          
          {/* Inner Pulse */}
          <div className="absolute inset-3 w-10 h-10 bg-primary/30 rounded-full animate-pulse"></div>
          
          {/* Center Dot */}
          <div className="absolute inset-6 w-4 h-4 bg-primary rounded-full animate-bounce"></div>
        </div>

        {/* Professional Loading Text */}
        <div className="space-y-3 animate-fade-in">
          <h3 className="text-xl font-semibold text-foreground">
            Preparing Your Experience
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We're crafting something amazing for you. This will only take a moment as we optimize your learning journey.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="w-full max-w-xs">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Subtle Brand Message */}
        <p className="text-xs text-muted-foreground/80 animate-fade-in" style={{animationDelay: '0.5s'}}>
          Powered by Formacad's intelligent learning platform
        </p>
      </div>
    </div>
  );
};

export default PageLoader;