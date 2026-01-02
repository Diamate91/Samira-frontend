import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { memo } from "react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay: number;
  imageUrl: string;
  onClick: () => void;
}

export const ServiceCard = memo(function ServiceCard({ icon: Icon, title, description, delay, imageUrl, onClick }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.6, delay }}
      className="relative group cursor-pointer h-full"
      onClick={onClick}
    >
      <div className="relative rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden h-full flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-2">
        {/* Image Section */}
        <div className="relative h-48 sm:h-56 flex-shrink-0 overflow-hidden">
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110 origin-center">
            <ImageWithFallback
              src={imageUrl}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-violet-900/90 via-violet-900/40 to-transparent" />
          </div>
          
          {/* Icon overlay on image */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 inline-flex p-2 sm:p-3 rounded-xl bg-violet-500/30 backdrop-blur-sm border border-violet-400/40 z-10">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-violet-100" />
          </div>
        </div>

        {/* Text Content */}
        <div className="relative p-4 sm:p-6 flex-grow flex flex-col">
          {/* Card content */}
          <div className="relative z-10 flex-grow">
            <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl text-violet-100" style={{ fontFamily: "'Cinzel', serif" }}>
              {title}
            </h3>
            
            <p className="text-xs sm:text-sm text-violet-200/70 line-clamp-3" style={{ fontFamily: "'Inter', sans-serif" }}>
              {description}
            </p>
          </div>

          {/* Click to learn more */}
          <div className="relative z-10 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10">
            <span className="text-xs text-violet-300 group-hover:text-violet-100 transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
              Kliknij, aby dowiedzieć się więcej →
            </span>
          </div>

          {/* Corner glow */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-violet-500/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>
    </motion.div>
  );
});