import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import GoogleLoginButton from "@/components/ui/GoogleLoginButton";
import { useLoginForm } from "@/hooks/useLoginForm";
import { useAuth } from "@/hooks/useAuth";
import loginBanner from "@/assets/login-banner.jpg";
import loginImage1 from "@/assets/loginimage1.webp";
import loginImage2 from "@/assets/loginimage2.webp";
import loginImage3 from "@/assets/loginimage3.webp";
import loginImage4 from "@/assets/loginimage4.webp";

interface AuthDialogProps {
  onClose: () => void;
  isDark: boolean;
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const userImages = [loginImage1, loginImage2, loginImage3, loginImage4];

export default function AuthDialog({ onClose, isDark }: AuthDialogProps) {
  const {
    username,
    setUsername,
    email,
    setEmail,
    showPassword,
    setShowPassword,
    password,
    setPassword,
    resetForm,
  } = useLoginForm();
  
  const [method, setMethod] = useState<"username" | "email" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{
    field?: "identifier" | "password" | "general";
    message: string;
  } | null>(null);
  
  const { signIn } = useAuth();

  const handleInputChange = (field: "username" | "email", value: string) => {
    if (!method && value !== "") {
      setMethod(field);
    }
    if (field === "username") setUsername(value);
    if (field === "email") setEmail(value);
    setError(null);
  };

  const handleResetForm = () => {
    setMethod(null);
    resetForm();
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const identifier = method === "username" ? username : email;
      
      // For username method, we'll need to convert it to email
      // For now, we'll just use email for Supabase auth
      if (method === "username") {
        setError({
          field: "general",
          message: "Please use email to sign in for now.",
        });
        setIsLoading(false);
        return;
      }

      const { error } = await signIn(identifier, password);
      
      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          setError({
            field: "general",
            message: "Incorrect email or password.",
          });
        } else {
          setError({
            field: "general",
            message: error.message || "An error occurred during login.",
          });
        }
      } else {
        onClose();
      }
    } catch (error: any) {
      setError({
        field: "general",
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-[35%_65%] h-[570px] w-full overflow-hidden rounded-lg ${
        isDark ? "bg-zinc-800" : "bg-white"
      }`}
    >
      {/* Left Side - Login Form */}
      <motion.div
        className="px-8 py-8 max-w-md w-full mx-auto"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Welcome back</h2>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        <div className="mb-6">
          <GoogleLoginButton />
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-muted-foreground">or continue with</span>
          </div>
        </div>

        {method && (
          <div className="flex items-center justify-between text-sm bg-muted rounded-md px-3 py-2 mb-4">
            <span className="text-muted-foreground">
              Using <strong>{method}</strong>
            </span>
            <button
              className="text-primary hover:text-primary/80 font-medium"
              onClick={handleResetForm}
            >
              Switch
            </button>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              className={`${
                method && method !== "username"
                  ? "bg-muted/50 text-muted-foreground cursor-not-allowed"
                  : ""
              } ${error?.field === "identifier" ? "border-destructive" : ""}`}
              disabled={!!(method && method !== "username")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`${
                method && method !== "email"
                  ? "bg-muted/50 text-muted-foreground cursor-not-allowed"
                  : ""
              } ${error?.field === "identifier" ? "border-destructive" : ""}`}
              disabled={!!(method && method !== "email")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={error?.field === "password" ? "border-destructive" : ""}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>

          {error?.field === "general" && (
            <div className="text-destructive text-sm text-center p-3 bg-destructive/10 rounded-md">
              {error.message}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={
              !method ||
              (method === "username" && !username) ||
              (method === "email" && !email) ||
              !password ||
              isLoading
            }
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center mt-6 text-sm text-muted-foreground">
          Don't have an account?{" "}
          <button
            onClick={() => console.log("Navigate to sign up")}
            className="text-primary hover:text-primary/80 font-medium"
          >
            Sign up
          </button>
        </p>
      </motion.div>

      {/* Right Side - Banner */}
      <div className="relative w-full h-full">
        <img
          src={loginBanner}
          alt="Login Banner"
          className={`w-full h-full object-cover ${
            isDark ? "brightness-75" : "brightness-110"
          }`}
        />
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-black/50"
              : "bg-black/30"
          }`}
        />
        <div className="absolute inset-y-8 px-8 lg:px-10 pb-8 flex flex-col items-center justify-end">
          <motion.h1
            className="text-4xl leading-snug font-bold text-center text-gray-200 font-sans"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Transforming Education for a Brighter Future
          </motion.h1>

          <motion.p
            className="text-base leading-relaxed text-center mt-3 text-gray-100 font-sans"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Join thousands of professionals using our platform to empower
            learning.
            <br />
            Sign up for free and explore all features for 30 days—no credit card
            required.
          </motion.p>

          <motion.div
            className="flex items-center gap-1 mt-8 w-full justify-start"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex items-center">
              {userImages.map((src, i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-white rounded-full border border-gray-300 overflow-hidden shadow-lg -mb-2 -ml-3 first:ml-0"
                >
                  <img
                    src={src}
                    alt={`User ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="flex pl-3 flex-col items-center text-sm font-medium text-white">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-6 h-6 text-yellow-400 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-100 -mt-2">from 200+ reviews</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}