import { motion } from "motion/react";
import { Award, BookOpen, Star, Users } from "lucide-react";
import { memo } from "react";

const badges = [
  {
    icon: BookOpen,
    title: "10+ Lat Doświadczenia",
    description: "Pogłębiona wiedza mistyczna i duchowa",
  },
  {
    icon: Users,
    title: "1500+ Zadowolonych dusz",
    description: "Zaufane przewodnictwo duchowe",
  },
  {
    icon: Star,
    title: "5-Gwiazdkowe Opinie",
    description: "Wyjątkowa satysfakcja dusz",
  },
];

export const TrustBadges = memo(function TrustBadges() {
  return (
    <section className="relative px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group h-full"
              >
                <div className="relative h-full min-h-[220px] p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-center transition-transform duration-300 ease-out group-hover:-translate-y-2 flex flex-col" style={{ transform: 'translate3d(0, 0, 0)' }}>
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="inline-flex p-3 rounded-full bg-violet-500/10 mb-4">
                      <Icon className="w-6 h-6 text-violet-300" />
                    </div>
                    <h3
                      className="mb-2 text-violet-100 min-h-[3.5rem] flex items-center justify-center"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {badge.title}
                    </h3>
                    <p
                      className="text-sm text-violet-200/70"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {badge.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});