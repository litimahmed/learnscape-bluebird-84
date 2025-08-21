import * as React from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/ui/SearchBar";
import { MegaMenu } from "@/components/ui/MegaMenu";
import { Dialog, DialogContent, DialogTrigger, DialogOverlay } from "@/components/ui/dialog";
import UserProfileDropdown from "@/components/ui/UserProfileDropdown";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import AuthDialog from "@/components/AuthDialog";
import { useAuth } from "@/hooks/useAuth";

interface NewHeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function NewHeader({ isDark, toggleTheme }: NewHeaderProps) {
  const { user, loading } = useAuth();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Listen for custom event to open login modal
  React.useEffect(() => {
    const handleOpenLoginModal = () => {
      openModal();
    };

    window.addEventListener('openLoginModal', handleOpenLoginModal);
    
    return () => {
      window.removeEventListener('openLoginModal', handleOpenLoginModal);
    };
  }, []);

  return (
    <div className="w-full sticky top-0 z-50 bg-background border-b border-border">
      {/* Top Header Bar */}
      <div className="w-full bg-primary px-4 lg:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-12">
          {/* Left - Language Selector */}
          <div className="flex-shrink-0">
            <select 
              className="bg-transparent border border-white/30 text-white text-sm px-3 py-1 rounded hover:bg-white/10 focus:outline-none cursor-pointer"
              defaultValue="English"
            >
              <option value="English" className="text-black bg-white">English</option>
              <option value="Arabic" className="text-black bg-white">Arabic</option>
              <option value="French" className="text-black bg-white">French</option>
            </select>
          </div>

          {/* Center - Text Content */}
          <div className="flex-1 text-center px-4">
            <span className="text-white text-sm font-medium hidden sm:inline">
              We build a strong platform that tailor to have different things to function
            </span>
          </div>

          {/* Right - Help Center & Theme Toggle */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button
              variant="ghost"
              className="text-white border border-white/30 hover:bg-white/10 text-sm px-4 py-1 h-auto"
            >
              Help Center
            </Button>
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="w-full bg-background border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="flex items-center justify-between h-16">
            {/* Left - Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link to="/" className="flex items-center">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-3">
                  <span className="text-primary-foreground font-bold text-xl">E</span>
                </div>
                <span className="text-xl font-bold text-foreground">Edutech</span>
              </Link>
            </div>

            {/* Center - Explore Menu & Search */}
            <div className="flex items-center gap-6 flex-1 max-w-2xl mx-6">
              <MegaMenu width="full" padding="lg">
                <MegaMenu.Column title="Explore Roles">
                  <MegaMenu.Item label="Data Analyst" href="/courses/data-analyst" />
                  <MegaMenu.Item label="Project Manager" href="/courses/project-manager" />
                  <MegaMenu.Item label="Cyber Security Analyst" href="/courses/cybersecurity" />
                  <MegaMenu.Item label="Data Scientist" href="/courses/data-scientist" />
                  <MegaMenu.Item label="Business Intelligence Analyst" href="/courses/business-intelligence" />
                  <MegaMenu.Item label="Digital Marketing Specialist" href="/courses/digital-marketing" />
                  <MegaMenu.Item label="UI / UX Designer" href="/courses/ui-ux" />
                  <MegaMenu.Item label="Machine Learning Engineer" href="/courses/machine-learning" />
                  <MegaMenu.Item label="Social Media Specialist" href="/courses/social-media" />
                  <MegaMenu.Item label="Computer Support Specialist" href="/courses/computer-support" />
                  <MegaMenu.Item label="View all" href="/courses" highlight />
                </MegaMenu.Column>

                <MegaMenu.Column title="Popular Subjects">
                  <MegaMenu.Item label="Programming" href="/courses/programming" />
                  <MegaMenu.Item label="Data Science" href="/courses/data-science" />
                  <MegaMenu.Item label="Web Development" href="/courses/web-development" />
                  <MegaMenu.Item label="View all" href="/courses" highlight />
                </MegaMenu.Column>

                <MegaMenu.Column title="Skill Levels">
                  <MegaMenu.Item label="Beginner" href="/courses?level=beginner" />
                  <MegaMenu.Item label="Intermediate" href="/courses?level=intermediate" />
                  <MegaMenu.Item label="Advanced" href="/courses?level=advanced" />
                  <MegaMenu.Item label="View all" href="/courses" highlight />
                </MegaMenu.Column>

                <MegaMenu.CTA
                  image="/lovable-uploads/1f6a2417-0f18-43a3-b0f3-6a65ecad2be2.png"
                  title="Master Data Science"
                  description="Enroll in our top-rated course and become a data expert."
                  buttonText="Get Started"
                  buttonLink="/courses/data-science"
                />
              </MegaMenu>

              <div className="flex-1 max-w-md">
                <SearchBar />
              </div>
            </div>

            {/* Right - Navigation Links & Login */}
            <div className="flex items-center gap-6 flex-shrink-0">
              {user ? (
                <div className="flex items-center gap-6">
                  <Link
                    to="/my-courses"
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    My Courses
                  </Link>
                  <Link
                    to="/dashboard"
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    Dashboard
                  </Link>
                  <UserProfileDropdown user={user} />
                </div>
              ) : (
                <div className="flex items-center gap-6">
                  <Link
                    to="/register/teacher"
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors hidden md:block"
                  >
                    Become a Teacher
                  </Link>
                  <Link
                    to="/"
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors hidden md:block"
                  >
                    Careers
                  </Link>
                  <Dialog
                    open={isModalOpen}
                    onOpenChange={(open) => {
                      if (open) openModal();
                      else closeModal();
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Login
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="fixed left-1/2 top-1/2 z-50 max-h-screen w-[95vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl p-0 shadow-xl">
                      <AuthDialog onClose={closeModal} isDark={isDark} />
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}