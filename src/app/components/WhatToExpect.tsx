import { motion } from "motion/react";
import { Sparkles, MessageCircle, BookHeart, Gift } from "lucide-react";
import { memo } from "react";

const steps = [
  {
    icon: MessageCircle,
    title: "1. Kontakt i Rezerwacja",
    description: "Skontaktuj się ze mną przez formularz, telefon lub Messenger. Omówimy Twoją sytuację i wybierzemy najlepszą usługę dla Ciebie. Ustalimy dogodny termin i formę spotkania.",
  },
  {
    icon: Sparkles,
    title: "2. Przygotowanie",
    description: "Otrzymasz wszystkie niezbędne informacje dotyczące wybranej usługi. Jeśli potrzebuję jakichś danych od Ciebie (np. data urodzenia, pytania), przekażę Ci instrukcje. Możesz przygotować pytania, które Cię nurtują.",
  },
  {
    icon: BookHeart,
    title: "3. Realizacja Usługi",
    description: "W umówionym terminie wykonam wybraną usługę z pełnym zaangażowaniem i uwagą. Każda konsultacja jest indywidualna i dopasowana do Twojej sytuacji. Zachowuję pełną dyskrecję i profesjonalizm.",
  },
  {
    icon: Gift,
    title: "4. Wyniki i Wsparcie",
    description: "Po sesji otrzymasz szczegółowe wyjaśnienia i odpowiedzi na swoje pytania. W zależności od usługi, mogą to być wskazówki, interpretacja lub konkretne porady. Jestem dostępna na ewentualne pytania uzupełniające.",
  },
];

export const WhatToExpect = memo(function WhatToExpect() {
  return (
    <section className="relative px-6 py-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="mb-4 text-3xl sm:text-4xl md:text-5xl text-violet-100"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Czego Się Spodziewać
          </h2>
          <p
            className="text-lg text-violet-200/80"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Twoja podróż krok po kroku
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 h-full transition-transform duration-300 ease-out group-hover:-translate-y-2" style={{ transform: 'translate3d(0, 0, 0)' }}>
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="inline-flex p-4 rounded-full bg-violet-500/10 mb-4 group-hover:bg-violet-500/20 transition-colors">
                      <Icon className="w-7 h-7 text-violet-300" />
                    </div>

                    {/* Title */}
                    <h3
                      className="mb-3 text-xl text-violet-100"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-violet-200/70 leading-relaxed"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 p-6 rounded-2xl bg-violet-500/5 border border-violet-500/20"
        >
          <p
            className="text-center text-violet-200/80"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="text-violet-100 font-medium">Co zabrać:</span> Otwarte serce i umysł oraz pytania lub intencje, które chcesz zbadać.
          </p>
        </motion.div>
      </div>
    </section>
  );
});