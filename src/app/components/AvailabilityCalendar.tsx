import { motion } from "motion/react";
import { Calendar, Clock } from "lucide-react";
import { memo } from "react";

const workingHours = [
  { day: "Poniedziałek", time: "14:00 - 20:00", isOpen: true },
  { day: "Wtorek", time: "10:00 - 18:00", isOpen: true },
  { day: "Środa", time: "12:00 - 20:00", isOpen: true },
  { day: "Czwartek", time: "14:00 - 19:00", isOpen: true },
  { day: "Piątek", time: "15:00 - 21:00", isOpen: true },
  { day: "Sobota", time: "10:00 - 22:00", isOpen: true },
];

export const AvailabilityCalendar = memo(function AvailabilityCalendar() {
  return (
    <section className="relative px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2
            className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-violet-100 px-2"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Godziny Pracy
          </h2>
          <p
            className="text-base sm:text-lg text-violet-200/80 px-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Dostępność na sesje duchowe i czytania
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10"
        >
          {/* Background glow */}
          <div className="absolute -inset-20 bg-gradient-to-br from-violet-500/10 to-purple-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-3 sm:space-y-4">
            {workingHours.map((schedule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 sm:p-5 rounded-xl bg-white/5 border border-white/5 hover:border-violet-500/30 transition-all duration-300 group"
                style={{ transform: 'translate3d(0, 0, 0)' }}
              >
                <div className="flex items-center gap-3 sm:gap-4 flex-1">
                  <div className="p-2.5 sm:p-3 rounded-lg bg-violet-500/10 group-hover:bg-violet-500/20 transition-colors flex-shrink-0">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-violet-300" />
                  </div>
                  <div className="min-w-0">
                    <h3
                      className="text-violet-100 mb-1 text-base sm:text-lg truncate"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {schedule.day}
                    </h3>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-violet-300/70">
                      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span style={{ fontFamily: "'Inter', sans-serif" }}>
                        {schedule.time}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Status indicator */}
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <div className="relative">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400/80 group-hover:bg-green-400 transition-colors" />
                    <div className="absolute inset-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400/50 animate-ping" />
                  </div>
                  <span className="text-xs sm:text-sm text-green-400/90 hidden sm:inline" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Otwarte
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Notice for Sunday */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-6 sm:mt-8 p-4 sm:p-5 rounded-xl bg-violet-500/10 border border-violet-400/20"
          >
            <p
              className="text-sm sm:text-base text-violet-200/90 text-center"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <span className="text-violet-100 font-semibold">Niedziela:</span> Dzień regeneracji duchowej - zamknięte
            </p>
          </motion.div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10 text-center"
          >
            <p
              className="text-violet-200/70 mb-4 text-sm sm:text-base px-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Nie widzisz odpowiedniego dla siebie terminu?
            </p>
            <button
              onClick={() => {
                const element = document.querySelector("#contact");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-500 hover:to-purple-500 transition-all text-sm sm:text-base"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Skontaktuj się ze mną osobiście
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});