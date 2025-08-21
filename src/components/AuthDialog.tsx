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
        className={`px-8 pt-7 max-w-lg w-full mx-auto ${
          isDark ? "bg-zinc-800 text-white" : "bg-white"
        }`}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          <p
            className={`text-sm font-semibold mb-2 uppercase tracking-wider border px-3 py-1 inline-block rounded-md ${
              isDark
                ? "text-primary border-primary"
                : "text-primary border-primary"
            }`}
          >
            Edutech
          </p>
          <h3 className="text-2xl mb-5">
            Login into your{" "}
            <span className="text-primary font-medium">Account</span>
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <GoogleLoginButton />
        </motion.div>

        <motion.div
          className="flex items-center justify-center mt-4 mb-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
        >
          <div className={`h-px flex-1 ${isDark ? "bg-gray-500" : "bg-primary"}`} />
          <span
            className={`font-medium text-sm tracking-wide uppercase px-3 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            OR
          </span>
          <div className={`h-px flex-1 ${isDark ? "bg-gray-500" : "bg-primary"}`} />
        </motion.div>

        <AnimatePresence>
          {method && (
            <motion.div
              className={`flex items-center justify-between text-sm rounded-lg px-4 py-3 mb-2 ${
                isDark
                  ? "text-gray-300 bg-zinc-700"
                  : "text-gray-700 bg-gray-100"
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <span>
                logging in with <strong>{method}</strong>.
              </span>
              <button
                className="text-primary font-medium hover:underline"
                onClick={handleResetForm}
              >
                Switch method
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form
          className="space-y-4 mt-1"
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
        >
          {/* Username */}
          <motion.div 
            className="grid"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Label
              className="font-medium text-primary"
              htmlFor="username"
            >
              Username
            </Label>
            <Input
              id="username"
              type="text"
              name="username"
              placeholder="sofia_ben123"
              value={username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              className={`transition-all duration-300 border-primary focus:ring-1 focus:ring-primary ${
                method && method !== "username"
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : isDark
                    ? "bg-zinc-700 text-white"
                    : "bg-white"
              } ${error?.field === "identifier" ? "border-red-500" : ""}`}
              disabled={!!(method && method !== "username")}
            />
          </motion.div>

          {/* Email */}
          <motion.div 
            className="grid"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
          >
            <Label
              className="font-medium text-primary"
              htmlFor="email"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="sofia.bensalah@email.com"
              value={email}
              className={`transition-all duration-300 border-primary focus:ring-1 focus:ring-primary ${
                method && method !== "email"
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : isDark
                    ? "bg-zinc-700 text-white"
                    : "bg-white"
              } ${error?.field === "identifier" ? "border-red-500" : ""}`}
              onChange={(e) => handleInputChange("email", e.target.value)}
              disabled={!!(method && method !== "email")}
            />
          </motion.div>

          {/* Password */}
          <motion.div 
            className="grid"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <Label
              className="font-medium text-primary"
              htmlFor="password"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`transition-all duration-300 border-primary focus:ring-1 focus:ring-primary ${
                  isDark ? "bg-zinc-700 text-white" : ""
                } ${error?.field === "password" ? "border-red-500" : ""}`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </motion.div>

          {/* General Error Message */}
          {error?.field === "general" && (
            <motion.div
              className="text-red-500 text-sm text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {error.message}
            </motion.div>
          )}

          {/* Submit */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6 }}
          >
            <Button
              type="submit"
              className={`w-full py-3 text-sm font-medium rounded-md transition-colors duration-200 ${
                isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
              disabled={
                !method ||
                (method === "username" && !username) ||
                (method === "email" && !email) ||
                !password ||
                isLoading
              }
            >
              {isLoading ? (
                <motion.div
                  className="flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Loading...
                </motion.div>
              ) : (
                "Sign In"
              )}
            </Button>
          </motion.div>
        </motion.form>

        <motion.p
          className={`text-center mt-6 text-sm leading-relaxed ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          Don't have an account?{" "}
          <button
            onClick={() => {
              // Handle sign up navigation
              console.log("Navigate to sign up");
            }}
            className="underline font-medium text-primary hover:text-primary/80"
          >
            Create one
          </button>
        </motion.p>
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