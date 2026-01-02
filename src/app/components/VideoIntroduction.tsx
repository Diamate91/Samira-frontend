import { motion } from "motion/react";
import { Play } from "lucide-react";
import { useState, memo } from "react";

export const VideoIntroduction = memo(function VideoIntroduction() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative px-6 py-32">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2
            className="mb-4 text-3xl sm:text-4xl md:text-5xl text-violet-100"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Poznaj Wróżkę Samirę
          </h2>
          <p
            className="text-lg text-violet-200/80"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Krótkie wprowadzenie do mojej pracy i misji
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative group"
        >
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10">
            {/* Background glow */}
            <div className="absolute -inset-10 bg-gradient-to-br from-violet-500/20 to-purple-500/20 blur-3xl opacity-50 group-hover:opacity-75 transition-opacity pointer-events-none" />

            {!isPlaying ? (
              // Video Thumbnail with Play Button
              <div className="relative w-full h-full">
                {/* Thumbnail background - mystical image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1683217956228-d3d24916df55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXJvdCUyMGNhcmRzJTIwbXlzdGljYWwlMjBzcGlyaXR1YWx8ZW58MXx8fHwxNzY2OTM5NzcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0033] via-[#1a0033]/50 to-transparent" />

                {/* Play Button */}
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center group/play"
                >
                  <div className="relative">
                    {/* Outer glow ring */}
                    <div className="absolute inset-0 rounded-full bg-violet-500/30 blur-xl scale-150 group-hover/play:scale-175 transition-transform duration-500" />

                    {/* Play button circle */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/30 flex items-center justify-center group-hover/play:bg-white/20 group-hover/play:scale-110 transition-all duration-300">
                      <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white ml-1" />
                    </div>
                  </div>
                </button>

                {/* Video title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <h3
                    className="text-xl sm:text-2xl text-white mb-2"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    Witaj w Mojej Świętej Przestrzeni
                  </h3>
                  <p
                    className="text-violet-200/90 text-sm sm:text-base"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    2 minuty • O mnie
                  </p>
                </div>
              </div>
            ) : (
              // Video Player (placeholder - replace with actual video embed)
              <div className="relative w-full h-full bg-black">
                {/* This would be replaced with actual video embed like YouTube/Vimeo iframe */}
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="Video Introduction"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>

          {/* Caption below video */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 text-center text-violet-200/70 text-sm"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Dowiedz się więcej o mojej podróży duchowej i jak mogę Ci pomóc znaleźć twoją ścieżkę!
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
});