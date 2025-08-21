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
  const [loading, setLoading] = React.useState(true);
  const [mounted, setMounted] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
      setMounted(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div
      style={{
        maxWidth: "100%",
        margin: "0 auto",
        width: "100%",
        paddingRight: "clamp(5px, 1vw, 5px)",
        flexWrap: "nowrap",
        borderBottom: `1px solid ${isDark ? "#3f3f46" : "var(--border)"}`,
        background: isDark ? "#27272a" : "white",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Mini Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.5rem",
          height: "60px",
          maxWidth: "100%",
          margin: "0 auto",
          width: "100%",
          backgroundColor: "#2c75e4",
        }}
      >
        {/* Right Side */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
            minWidth: "200px",
          }}
        >
          {loading || mounted ? (
            <>
              <Skeleton
                style={{
                  width: "100px",
                  height: "36px",
                  borderRadius: "4px",
                }}
              />
              <Skeleton
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                }}
              />
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  color: "white",
                  fontWeight: 500,
                  fontSize: "14px",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
                className="hover:bg-white/20 hover:border-white/50"
              >
                Help Center
              </Button>
              <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
            </>
          )}
        </div>

        {/* Center Content */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: "1",
            textAlign: "center",
            padding: "0 2rem",
          }}
        >
          {loading || mounted ? (
            <Skeleton
              style={{
                width: "100%",
                maxWidth: "600px",
                height: "20px",
                borderRadius: "4px",
              }}
            />
          ) : (
            <div
              style={{
                display: "inline-block",
                width: "100%",
                maxWidth: "100%",
                overflow: "hidden",
                whiteSpace: "nowrap",
                color: "#fff",
                fontSize: "15px",
                fontWeight: 500,
              }}
            >
              <AnimatedText
                staticText="Unlock your potential with"
                words={["interactive courses", "expert instructors", "hands-on projects", "personalized learning", "skill certifications", "career advancement"]}
                interval={3500}
              />
            </div>
          )}
        </div>

        {/* Left Side */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            minWidth: "150px",
          }}
        >
          {loading || mounted ? (
            <Skeleton
              style={{
                width: "120px",
                height: "36px",
                borderRadius: "4px",
              }}
            />
          ) : (
            <select
              name="Language"
              id="Language"
              style={{
                padding: "8px 12px",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "6px",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 500,
                outline: "none",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                minWidth: "120px",
              }}
              className="hover:bg-white/20 hover:border-white/50"
            >
              <option value="English" style={{ color: "#000", background: "#fff" }}>
                English
              </option>
              <option value="Arabic" style={{ color: "#000", background: "#fff" }}>
                Arabic
              </option>
              <option value="French" style={{ color: "#000", background: "#fff" }}>
                French
              </option>
            </select>
          )}
        </div>
      </div>

      {/* Navbar Main Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "100%",
          margin: "0 auto",
          width: "100%",
          paddingRight: "clamp(5px, 1vw, 5px)",
          flexWrap: "nowrap",
        }}
      >
        {/* Logo + MegaMenu */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          {loading || mounted ? (
            <Skeleton
              style={{
                width: "75px",
                height: "75px",
                borderRadius: "999px",
                marginRight: "3rem",
                transform: "scale(0.7)",
                backgroundColor: isDark ? undefined : "#D6D9DB",
              }}
            />
          ) : (
            <Link to="/" style={{ display: "flex", alignItems: "center", marginRight: "2rem" }}>
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-2">
                <GraduationCap className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-2xl font-display font-bold text-foreground">
                LearnSpace
              </span>
            </Link>
          )}

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

        {/* SearchBar */}
        <div
          style={{
            flex: "4 3 auto",
            maxWidth: "500px",
            transition: "flex 0.3s ease-in-out",
            margin: "0 2rem",
          }}
        >
          <SearchBar />
        </div>

        {/* Right Side Navigation */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flex: "0 1 auto",
            justifyContent: "flex-end",
            minWidth: "300px",
            whiteSpace: "nowrap",
            color: isDark ? "#e4e4e7" : "#1f2937",
          }}
        >
          {loading || mounted ? (
            <Skeleton
              style={{
                width: "50%",
                height: "36px",
                borderRadius: "4px",
                alignSelf: "center",
                backgroundColor: isDark ? undefined : "#D6D9DB",
              }}
            />
          ) : user?.position === "student" ? (
            <div style={{ display: "flex", gap: "23px" }}>
              <Link
                to="/my-courses"
                className={`text-sm pl-4 font-medium transition-colors duration-200 ${
                  isDark
                    ? "text-zinc-200 hover:text-blue-400"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                My Courses
              </Link>
              <Link
                to="/dashboard"
                className={`text-sm font-medium transition-colors duration-200 ${
                  isDark
                    ? "text-zinc-200 hover:text-blue-400"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Progress Dashboard
              </Link>
            </div>
          ) : user?.position === "teacher" ? (
            <div style={{ display: "flex", gap: "23px" }}>
              <Link
                to="/teacher/courses"
                className={`text-sm pl-4 font-medium transition-colors duration-200 ${
                  isDark
                    ? "text-zinc-200 hover:text-blue-400"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                My Teaching
              </Link>
              <Link
                to="/dashboard"
                className={`text-sm font-medium transition-colors duration-200 ${
                  isDark
                    ? "text-zinc-200 hover:text-blue-400"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Teacher Dashboard
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "23px" }}>
              <Link
                to="/register/teacher"
                className={`text-sm pl-4 font-medium transition-colors duration-200 ${
                  isDark
                    ? "text-zinc-200 hover:text-blue-400"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Become a Teacher
              </Link>
              <Link
                to="/"
                className={`text-sm font-medium transition-colors duration-200 ${
                  isDark
                    ? "text-zinc-200 hover:text-blue-400"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Careers
              </Link>
            </div>
          )}
          <Separator
            orientation="vertical"
            style={{
              height: "20px",
              backgroundColor: isDark ? "#52525b" : "#E5E7EB",
            }}
          />
          {loading || mounted ? (
            <Skeleton
              style={{
                width: "50px",
                height: "36px",
                borderRadius: "4px",
                alignSelf: "center",
                backgroundColor: isDark ? undefined : "#D6D9DB",
              }}
            />
          ) : user?.position === "student" ? (
            <UserProfileDropdown user={user} />
          ) : user?.position === "teacher" ? (
            <UserProfileDropdown user={user} />
          ) : (
            <Dialog.Root
              open={isModalOpen}
              onOpenChange={(open) => {
                if (open) openModal();
                else closeModal();
              }}
            >
              <Dialog.Trigger asChild>
                <button
                  onClick={openModal}
                  className="cursor-pointer rounded-md bg-[#2c75e4] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#225fbb] focus:outline-none"
                >
                  Login
                </button>
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
          )}
        </div>
      </div>
    </div>
  );
}