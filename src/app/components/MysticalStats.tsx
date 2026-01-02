import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState, memo, useCallback } from "react";
import { Star, Users, Sparkles, Moon } from "lucide-react";

interface StatProps {
  icon: React.ElementType;
  value: number;
  label: string;
  suffix?: string;
  delay: number;
}

const AnimatedStat = memo(function AnimatedStat({ icon: Icon, value, label, suffix = "", delay }: StatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000; // 2 seconds
      const increment = end / (duration / 16); // 60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <div className="relative p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-center overflow-hidden">
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className="inline-flex mb-4"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-violet-300" strokeWidth={1.5} />
          </motion.div>

          {/* Animated Number */}
          <div
            className="text-3xl sm:text-4xl md:text-5xl mb-2 text-transparent bg-clip-text bg-gradient-to-br from-violet-200 via-purple-200 to-pink-200"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {count}
            {suffix}
          </div>

          {/* Label */}
          <div
            className="text-sm sm:text-base text-violet-200/70"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {label}
          </div>
        </div>

        {/* Decorative corner accents */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-violet-400/30 rounded-tl-lg" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-violet-400/30 rounded-tr-lg" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-violet-400/30 rounded-bl-lg" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-violet-400/30 rounded-br-lg" />
      </div>
    </motion.div>
  );
});

export const MysticalStats = memo(function MysticalStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <AnimatedStat
        icon={Star}
        value={10}
        suffix="+"
        label="Lat Doświadczenia"
        delay={0.1}
      />
      <AnimatedStat
        icon={Users}
        value={1500}
        suffix="+"
        label="Zadowolonych Dusz"
        delay={0.2}
      />
      <AnimatedStat
        icon={Sparkles}
        value={4000}
        suffix="+"
        label="Przeprowadzonych Sesji"
        delay={0.3}
      />
      <AnimatedStat
        icon={Moon}
        value={99}
        suffix="%"
        label="Satysfakcji z Usług"
        delay={0.4}
      />
    </div>
  );
});