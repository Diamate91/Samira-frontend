import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { memo, useMemo } from "react";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

const events: TimelineEvent[] = [
  {
    year: "2016",
    title: "Początek Praktyki",
    description: "Pierwsze profesjonalne konsultacje i poznawanie tajników czytania kart tarota.",
  },
  {
    year: "2017",
    title: "Rozwój Umiejętności",
    description: "Zgłębianie wiedzy z zakresu astrologii, numerologii i symboliki kart.",
  },
  {
    year: "2018",
    title: "Start Działalności",
    description: "Założenie profesjonalnej praktyki i regularne przyjmowanie klientów. Pierwsze sesje indywidualne.",
  },
  {
    year: "2019",
    title: "Poszerzenie Oferty",
    description: "Wprowadzenie dodatkowych usług: rytuałów, horoskopów, analiz numerologicznych i konsultacji duchowych.",
  },
  {
    year: "2020",
    title: "Przejście Online",
    description: "Rozszerzenie działalności o konsultacje zdalne, co umożliwiło współpracę z klientami z całej Polski i zagranicy.",
  },
  {
    year: "2021 - Obecnie",
    title: "Kontynuacja Misji",
    description: "Systematyczna praca z setkami klientów rocznie, stałe podnoszenie kwalifikacji i doskonalenie warsztatu.",
  },
];

export const JourneyTimeline = memo(function JourneyTimeline() {
  return (
    <div className="relative">
      <div className="text-center mb-12">
        <h3
          className="text-2xl sm:text-3xl mb-3 text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-purple-200"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Moja Droga
        </h3>
        <p
          className="text-violet-200/70"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Historia rozwoju praktyki
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-400/40 via-purple-400/40 to-violet-400/40" />

        {/* Timeline events */}
        <div className="space-y-8 sm:space-y-12">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-center gap-6 ${
                index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
              }`}
            >
              {/* Content */}
              <div className={`flex-1 ${index % 2 === 0 ? "sm:text-right" : "sm:text-left"} ml-12 sm:ml-0`}>
                <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                  {/* Glow effect */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-2xl blur-xl -z-10" />

                  <div
                    className="text-sm text-violet-400 mb-2"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {event.year}
                  </div>
                  <h4
                    className="text-lg sm:text-xl mb-2 text-violet-200"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {event.title}
                  </h4>
                  <p
                    className="text-sm sm:text-base text-violet-200/70"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Center dot */}
              <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 z-10">
                <motion.div
                  className="relative"
                  whileInView={{
                    scale: [1, 1.2, 1],
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center border-2 border-violet-300/50">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  {/* Pulsing glow */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-violet-400/40"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                </motion.div>
              </div>

              {/* Spacer for alternating layout on desktop */}
              <div className="hidden sm:block flex-1" />
            </motion.div>
          ))}
        </div>

        {/* Bottom decoration */}
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 -bottom-4 z-10"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center border-4 border-violet-400/30">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <motion.div
            className="absolute inset-0 rounded-full bg-violet-400/30 blur-lg"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div> */}
      </div>
    </div>
  );
});