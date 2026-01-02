import { motion, useScroll, useTransform } from "motion/react";
import { useState, useEffect, memo } from "react";
import { ArrowUp } from "lucide-react";

export const ScrollToTop = memo(function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling down 400px
      if (window.scrollY > 400 || document.documentElement.scrollTop > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check on mount
    toggleVisibility();

    // Listen to scroll events
    window.addEventListener('scroll', toggleVisibility, { passive: true });

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 p-3 sm:p-4 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-lg backdrop-blur-sm border border-white/10 group"
      initial={{ opacity: 0, scale: 0, y: 100 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
        y: isVisible ? 0 : 100,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{
        pointerEvents: isVisible ? "auto" : "none",
        transform: "translate3d(0, 0, 0)",
      }}
      aria-label="Przewiń do góry"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
      
      {/* Icon */}
      <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:-translate-y-1 transition-transform" />
      
      {/* Pulse ring animation */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-violet-300/50"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
    </motion.button>
  );
});