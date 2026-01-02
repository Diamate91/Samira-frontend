import { motion } from "motion/react";
import { Star } from "lucide-react";
import { memo, useMemo } from "react";

interface TestimonialCardProps {
  name: string;
  text: string;
  rating: number;
  delay: number;
}

export const TestimonialCard = memo(function TestimonialCard({ name, text, rating, delay }: TestimonialCardProps) {
  // Memoize stars array to avoid re-creating on every render
  const stars = useMemo(() => Array(rating).fill(null), [rating]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.5, delay }}
      className="relative group"
      style={{ willChange: 'transform' }}
    >
      <div className="relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-transform duration-300 ease-out group-hover:-translate-y-2" style={{ transform: 'translate3d(0, 0, 0)' }}>
        {/* Soft glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-violet-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10">
          {/* Stars */}
          <div className="flex gap-1 mb-3">
            {stars.map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>

          {/* Testimonial text */}
          <p className="mb-4 text-violet-100/80 italic" style={{ fontFamily: "'Inter', sans-serif" }}>
            "{text}"
          </p>

          {/* Name */}
          <p className="text-violet-300" style={{ fontFamily: "'Cinzel', serif" }}>
            — {name}
          </p>
        </div>
      </div>
    </motion.div>
  );
});