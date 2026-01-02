import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useState, useMemo, memo, useRef } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  delay: number;
}

// Memoized star field component - renders once and reuses
const StarField = memo(function StarField({ 
  stars, 
  offsetY = 0,
  parallaxY
}: { 
  stars: Star[]; 
  offsetY?: number;
  parallaxY?: any; // Motion value
}) {
  return (
    <motion.div 
      className="absolute inset-x-0 h-screen"
      style={{ 
        top: `${offsetY}vh`,
        y: parallaxY,
        pointerEvents: 'none',
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        perspective: 1000
      }}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            background: "white",
            boxShadow: `0 0 ${star.size * 3}px rgba(255, 255, 255, 0.8), 0 0 ${
              star.size * 6
            }px rgba(168, 85, 247, 0.4)`,
            animationDuration: `${star.duration * 2}s`,
            animationDelay: `${star.delay}s`,
            transform: "translate3d(0, 0, 0)",
            willChange: 'opacity, transform'
          }}
        />
      ))}
    </motion.div>
  );
});

export const StarryBackground = memo(function StarryBackground() {
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [maxScrollHeight, setMaxScrollHeight] = useState(8000);
  const { scrollY, scrollYProgress } = useScroll();

  // Calculate document height dynamically
  useEffect(() => {
    const updateMaxScroll = () => {
      const documentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      setMaxScrollHeight(documentHeight - viewportHeight);
    };

    // Initial calculation
    updateMaxScroll();

    // Update on window resize and after content loads
    window.addEventListener('resize', updateMaxScroll);
    
    // Use MutationObserver to detect content changes
    const observer = new MutationObserver(updateMaxScroll);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true 
    });

    // Fallback: recalculate after a delay to catch late-loading content
    const timeout = setTimeout(updateMaxScroll, 1000);

    return () => {
      window.removeEventListener('resize', updateMaxScroll);
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  // Create different parallax speeds for depth effect
  // Using dynamic maxScrollHeight instead of fixed 8000px
  // Layer 1 (closest) - moves fastest (20% of scroll)
  const parallaxLayer1 = useTransform(scrollY, [0, maxScrollHeight], [0, -maxScrollHeight * 0.2]);
  // Layer 2 (middle) - medium speed (15% of scroll)
  const parallaxLayer2 = useTransform(scrollY, [0, maxScrollHeight], [0, -maxScrollHeight * 0.15]);
  // Layer 3 (far) - slower (10% of scroll)
  const parallaxLayer3 = useTransform(scrollY, [0, maxScrollHeight], [0, -maxScrollHeight * 0.1]);
  // Layer 4 (farthest) - slowest (5% of scroll)
  const parallaxLayer4 = useTransform(scrollY, [0, maxScrollHeight], [0, -maxScrollHeight * 0.05]);

  // Generate one reusable star pattern with 250 stars
  const starPattern = useMemo(() => {
    return Array.from({ length: 250 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100, // Only 100% since each field is 100vh
      size: Math.random() * 2.5 + 0.3,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 5,
    }));
  }, []);

  useEffect(() => {
    // Generate shooting stars
    const shootingStarsArray: ShootingStar[] = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 50,
      delay: i * 6,
    }));
    setShootingStars(shootingStarsArray);
  }, []);

  // Memoize orb positions
  const orbPositions = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        left: `${10 + (i % 4) * 25}%`,
        top: `${15 + Math.floor(i / 4) * 30}%`,
        size: 150 + Math.random() * 100,
        color:
          i % 3 === 0
            ? "rgba(147, 51, 234, 0.25)"
            : i % 3 === 1
            ? "rgba(168, 85, 247, 0.2)"
            : "rgba(139, 92, 246, 0.2)",
        duration: 10 + i * 1.5,
        delay: i * 0.8,
      })),
    []
  );

  // Memoize particle positions
  const particlePositions = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 4 + 1,
        duration: 15 + Math.random() * 10,
        delay: Math.random() * 10,
        xOffset: Math.random() * 50 - 25,
      })),
    []
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Smooth flowing gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              180deg,
              #1a0033 0%,
              #2d0a4e 15%,
              #4b0082 30%,
              #3d1960 45%,
              #2d1b4e 60%,
              #1e0936 75%,
              #0f0520 90%,
              #000000 100%
            )
          `,
        }}
      />

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              180deg,
              rgba(147, 51, 234, 0.15) 0%,
              rgba(139, 92, 246, 0.1) 25%,
              transparent 50%,
              rgba(168, 85, 247, 0.1) 75%,
              rgba(147, 51, 234, 0.15) 100%
            )
          `,
          backgroundSize: "100% 300%",
        }}
        animate={{
          backgroundPositionY: ["0%", "100%", "0%"],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Subtle grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Reusable star fields - 250 stars repeated 4 times = 1000 total visual effect */}
      <div className="absolute inset-0">
        <StarField stars={starPattern} offsetY={0} parallaxY={parallaxLayer1} />
        <StarField stars={starPattern} offsetY={100} parallaxY={parallaxLayer2} />
        <StarField stars={starPattern} offsetY={200} parallaxY={parallaxLayer3} />
        <StarField stars={starPattern} offsetY={300} parallaxY={parallaxLayer4} />
      </div>

      {/* Shooting stars */}
      {shootingStars.map((star) => (
        <motion.div
          key={`shooting-${star.id}`}
          className="absolute"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: "120px",
            height: "2px",
            rotate: "45deg",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)",
            boxShadow:
              "0 0 8px rgba(255, 255, 255, 0.6), 0 0 16px rgba(168, 85, 247, 0.4)",
          }}
          initial={{ opacity: 0, x: -50, y: -50 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: [0, 250],
            y: [0, 250],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: star.delay,
            repeatDelay: 10,
            ease: "easeOut",
            times: [0, 0.1, 0.8, 1],
          }}
        />
      ))}

      {/* Large glowing orbs */}
      {orbPositions.map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            left: orb.left,
            top: orb.top,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: "blur(60px)",
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}

      {/* Floating particles */}
      {particlePositions.map((particle, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-violet-300/40"
          style={{
            left: particle.left,
            top: particle.top,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            boxShadow: "0 0 10px rgba(168, 85, 247, 0.6)",
          }}
          animate={{
            y: [0, -100, -200],
            x: [0, particle.xOffset],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* Aurora-like waves */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 80% 50% at 50% 20%,
              rgba(147, 51, 234, 0.3) 0%,
              transparent 60%
            )
          `,
        }}
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 70% 40% at 50% 80%,
              rgba(168, 85, 247, 0.25) 0%,
              transparent 60%
            )
          `,
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
});