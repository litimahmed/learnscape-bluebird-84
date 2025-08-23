import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

export function ChatbotFAB() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 150);
    // TODO: Add chatbot functionality here
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Pulsing Ring Background */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          width: "72px",
          height: "72px",
          left: "-8px",
          top: "-8px",
        }}
      />

      {/* Main FAB Button */}
      <motion.button
        className="relative w-14 h-14 bg-gradient-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all duration-200"
        onClick={handleClick}
        initial={{ 
          opacity: 0, 
          y: 20,
          scale: 0.8 
        }}
        animate={{ 
          opacity: 1, 
          y: 0,
          scale: 1 
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          delay: 0.5,
        }}
        whileHover={{
          scale: 1.1,
          y: -2,
          boxShadow: "0 10px 30px hsla(var(--primary) / 0.3)",
        }}
        whileTap={{
          scale: isClicked ? 0.9 : 1.05,
        }}
        aria-label="Open chatbot"
        role="button"
      >
        {/* Glow Effect on Hover */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20 blur-md"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />

        {/* Icon with Bounce Animation */}
        <motion.div
          className="relative z-10 flex items-center justify-center w-full h-full"
          whileHover={{
            y: [-2, 0, -2],
          }}
          transition={{
            y: {
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <MessageCircle 
            size={24} 
            className="drop-shadow-sm" 
            strokeWidth={2}
            fill="currentColor"
            fillOpacity={0.1}
          />
        </motion.div>

        {/* Ripple Effect on Click */}
        {isClicked && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary-foreground/50"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.button>

      {/* Accessibility Enhancement */}
      <span className="sr-only">
        Chat with our AI assistant for help and support
      </span>
    </div>
  );
}