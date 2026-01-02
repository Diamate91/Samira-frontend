import { motion, AnimatePresence } from "motion/react";
import { X, LucideIcon } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { memo } from "react";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  icon: LucideIcon;
  title: string;
  description: string;
  fullDescription: string;
  imageUrl: string;
  price?: string;
  duration?: string;
}

export const ServiceModal = memo(function ServiceModal({
  isOpen,
  onClose,
  icon: Icon,
  title,
  description,
  fullDescription,
  imageUrl,
  price,
  duration,
}: ServiceModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 pointer-events-none overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl my-auto overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-indigo-950/95 to-purple-950/95 backdrop-blur-xl border border-violet-400/30 shadow-2xl shadow-violet-500/20 pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-colors group"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-violet-200 group-hover:text-white transition-colors" />
              </button>

              {/* Scrollable content */}
              <div className="overflow-y-auto max-h-[85vh] sm:max-h-[90vh] custom-scrollbar">
                {/* Hero Image */}
                <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden">
                  <ImageWithFallback
                    src={imageUrl}
                    alt={title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-950/60 to-transparent" />
                  
                  {/* Icon */}
                  <div className="absolute top-4 left-4 sm:top-8 sm:left-8 inline-flex p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-violet-500/30 backdrop-blur-md border border-violet-400/40">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-violet-100" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 md:p-12">
                  {/* Title */}
                  <h2
                    className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-purple-200 to-pink-200"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {title}
                  </h2>

                  {/* Short description */}
                  <p
                    className="mb-4 sm:mb-6 text-base sm:text-lg text-violet-200/90 leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {description}
                  </p>

                  {/* Price and Duration */}
                  {(price || duration) && (
                    <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-white/10">
                      {price && (
                        <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-violet-500/20 border border-violet-400/30">
                          <span className="text-xs sm:text-sm text-violet-300" style={{ fontFamily: "'Inter', sans-serif" }}>
                            Cena:
                          </span>
                          <span className="text-sm sm:text-base text-violet-100" style={{ fontFamily: "'Cinzel', serif" }}>
                            {price}
                          </span>
                        </div>
                      )}
                      {duration && (
                        <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-purple-500/20 border border-purple-400/30">
                          <span className="text-xs sm:text-sm text-purple-300" style={{ fontFamily: "'Inter', sans-serif" }}>
                            Czas trwania:
                          </span>
                          <span className="text-sm sm:text-base text-purple-100" style={{ fontFamily: "'Cinzel', serif" }}>
                            {duration}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Full Description */}
                  <div className="space-y-4">
                    <h3
                      className="text-lg sm:text-xl text-violet-100 mb-3 sm:mb-4"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      Szczegóły Usługi
                    </h3>
                    <div
                      className="text-sm sm:text-base text-violet-200/80 leading-relaxed space-y-4 whitespace-pre-line"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {fullDescription}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 sm:mt-8 w-full px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-shadow text-sm sm:text-base"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    Zarezerwuj Teraz
                  </motion.button>
                </div>
              </div>

              {/* Decorative glow */}
              <div className="absolute -inset-20 bg-violet-500/20 rounded-full blur-[100px] -z-10 pointer-events-none" />
            </motion.div>
          </div>

          {/* Custom scrollbar styles */}
          <style>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: rgba(139, 92, 246, 0.1);
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(167, 139, 250, 0.5);
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(167, 139, 250, 0.7);
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
});