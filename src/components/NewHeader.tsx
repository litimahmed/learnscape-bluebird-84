import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "react-router-dom";
import { X, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SearchBar } from "@/components/ui/SearchBar";
import { MegaMenu } from "@/components/ui/MegaMenu";
import UserProfileDropdown from "@/components/ui/UserProfileDropdown";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Skeleton } from "@/components/ui/skeleton";
import AnimatedText from "@/components/ui/AnimatedText";

interface NewHeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function NewHeader({ isDark, toggleTheme }: NewHeaderProps) {
  // Mock auth state - replace with your actual auth context
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="w-full sticky top-0 z-50 bg-background border-b border-border">
      {/* Top Header Bar */}
      <div className="w-full bg-primary px-4 lg:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-12">
          {/* Left - Language Selector */}
          <div className="flex-shrink-0">
            <select 
              className="bg-transparent border border-white/30 text-white text-sm px-2 md:px-3 py-1 rounded hover:bg-white/10 focus:outline-none cursor-pointer"
              defaultValue="English"
            >
              <option value="English" className="text-black bg-white">EN</option>
              <option value="Arabic" className="text-black bg-white">AR</option>
              <option value="French" className="text-black bg-white">FR</option>
            </select>
          </div>

          {/* Center - Text Content */}
          <div className="flex-1 text-center px-4 hidden md:block">
            <span className="text-white text-sm font-medium">
              We build a strong platform that tailor to have different things to function
            </span>
          </div>

          {/* Right - Help Center & Theme Toggle */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            <Button
              variant="ghost"
              className="text-white border border-white/30 hover:bg-white/10 text-xs md:text-sm px-2 md:px-4 py-1 h-auto hidden sm:flex"
            >
              Help Center
            </Button>
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="w-full bg-background border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex items-center justify-between h-16">
            {/* Left - Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link to="/" className="flex items-center">
                <div className="w-8 md:w-10 h-8 md:h-10 bg-primary rounded-lg flex items-center justify-center mr-2 md:mr-3">
                  <span className="text-primary-foreground font-bold text-lg md:text-xl">E</span>
                </div>
                <span className="text-lg md:text-xl font-bold text-foreground">Edutech</span>
              </Link>
            </div>

            {/* Center - Explore Menu & Search */}
            <div className="flex items-center gap-3 md:gap-6 flex-1 max-w-2xl mx-4 md:mx-6">
              <div className="hidden lg:block">
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
              </div>

              {/* Mobile Explore Button */}
              <Link
                to="/courses"
                className="lg:hidden px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors border border-border rounded-md"
              >
                Courses
              </Link>

              <div className="flex-1 max-w-md">
                <SearchBar />
              </div>
            </div>

            {/* Right - Navigation Links & Login */}
            <div className="flex items-center gap-3 md:gap-6 flex-shrink-0">
              {user?.position === "student" ? (
                <div className="flex items-center gap-3 md:gap-6">
                  <Link
                    to="/my-courses"
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors hidden md:block"
                  >
                    My Courses
                  </Link>
                  <Link
                    to="/dashboard"
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors hidden lg:block"
                  >
                    Progress Dashboard
                  </Link>
                  <UserProfileDropdown user={user} />
                </div>
              ) : user?.position === "teacher" ? (
                <div className="flex items-center gap-3 md:gap-6">
                  <Link
                    to="/teacher/courses"
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors hidden md:block"
                  >
                    My Teaching
                  </Link>
                  <Link
                    to="/dashboard"
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors hidden lg:block"
                  >
                    Teacher Dashboard
                  </Link>
                  <UserProfileDropdown user={user} />
                </div>
              ) : (
                <div className="flex items-center gap-3 md:gap-6">
                  <Link
                    to="/register/teacher"
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors hidden lg:block"
                  >
                    Become a Teacher
                  </Link>
                  <Link
                    to="/"
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors hidden xl:block"
                  >
                    Careers
                  </Link>
                  <Dialog.Root
                    open={isModalOpen}
                    onOpenChange={(open) => {
                      if (open) openModal();
                      else closeModal();
                    }}
                  >
                    <Dialog.Trigger asChild>
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-3 md:px-4 py-2 text-sm">
                        Login
                      </Button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
                      <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-screen w-[95vw] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-background p-6 shadow-xl transition-all duration-300 focus:outline-none">
                        <Dialog.Close
                          onClick={closeModal}
                          className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground focus:outline-none"
                        >
                          <X className="h-5 w-5" />
                        </Dialog.Close>
                        <div className="space-y-6">
                          <div className="space-y-2 text-center">
                            <h2 className="text-2xl font-bold">Welcome Back</h2>
                            <p className="text-muted-foreground">Sign in to your account to continue learning</p>
                          </div>
                          <div className="space-y-4">
                            <Button className="w-full" size="lg">
                              Sign in with Google
                            </Button>
                            <Button variant="outline" className="w-full" size="lg">
                              Sign in with Email
                            </Button>
                          </div>
                          <p className="text-center text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <button className="text-primary hover:underline" onClick={() => {
                              // Handle sign up
                            }}>
                              Sign up
                            </button>
                          </p>
                        </div>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}