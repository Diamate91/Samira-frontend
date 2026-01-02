import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";
import { memo } from "react";

interface ProcessStepProps {
  icon: LucideIcon;
  step: number;
  title: string;
  description: string;
  delay: number;
  isLast?: boolean;
}

export const ProcessStep = memo(function ProcessStep({ icon: Icon, step, title, description, delay, isLast }: ProcessStepProps) {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "50px" }}
        transition={{ duration: 0.6, delay }}
        className="flex items-start gap-4 sm:gap-6"
      >
        {/* Icon circle */}
        <div className="relative flex-shrink-0">
          <motion.div
            className="relative z-10 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 border-2 border-violet-400/50"
            whileHover={{ scale: 1.1, rotate: 5 }}
            style={{
              boxShadow: "0 0 30px rgba(139, 92, 246, 0.4)",
            }}
          >
            <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
          </motion.div>

          {/* Connecting line */}
          {!isLast && (
            <motion.div
              className="absolute left-1/2 top-12 sm:top-16 w-0.5 h-20 sm:h-24 -ml-px"
              style={{
                background: "linear-gradient(180deg, rgba(139, 92, 246, 0.5) 0%, rgba(139, 92, 246, 0.1) 100%)",
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: delay + 0.3 }}
            />
          )}

          {/* Connecting stars */}
          {!isLast && (
            <>
              <motion.div
                className="absolute left-1/2 top-16 sm:top-20 w-1 h-1 -ml-0.5 rounded-full bg-violet-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0, 1, 0] }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: delay + 0.5, repeat: Infinity }}
              />
              <motion.div
                className="absolute left-1/2 top-24 sm:top-28 w-1 h-1 -ml-0.5 rounded-full bg-violet-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0, 1, 0] }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: delay + 0.7, repeat: Infinity }}
              />
            </>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 pb-12">
          <div className="inline-block px-3 py-1 mb-2 rounded-full bg-violet-500/20 border border-violet-400/30">
            <span className="text-sm text-violet-300" style={{ fontFamily: "'Inter', sans-serif" }}>
              Krok {step}
            </span>
          </div>
          
          <h3 className="mb-2 text-violet-100" style={{ fontFamily: "'Cinzel', serif" }}>
            {title}
          </h3>
          
          <p className="text-violet-200/70" style={{ fontFamily: "'Inter', sans-serif" }}>
            {description}
          </p>
        </div>
      </motion.div>
    </div>
  );
});