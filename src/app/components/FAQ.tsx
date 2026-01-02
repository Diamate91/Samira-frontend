import { motion } from "motion/react";
import { useState, memo } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "Jak działa wróżba z kart tarota?",
    answer: "Tarot to narzędzie do analizy energii i tendencji w życiu. Karty pokazują możliwe ścieżki i kierunki, pomagają znaleźć klarowność i wskazówki, ale nie przewidują przyszłości w sztywny sposób.",
  },
  {
    question: "O co mogę zapytać we wróżbie?",
    answer: "Pytania mogą dotyczyć wszystkiego: miłości, relacji rodzinnych, pracy, kariery, finansów, rozwoju osobistego czy decyzji życiowych. Wróżba pokazuje możliwe kierunki i energie.",
  },
  {
    question: "Jak działa uzdrawianie emocjonalne i kiedy warto z nieg skorzystać?",
    answer: "Uzdrawianie emocjonalne pomaga uwolnić nagromadzone emocje, przywrócić równowagę psychiczną i energetyczną oraz wzmocnić samopoczucie. Jest szczególnie wskazane po trudnych doświadczeniach lub relacjach, które pozostawiły emocjonalne blokady.",
  },
  {
    question: "Co to jest odczyt matrycy losu lub numerologia?",
    answer: "To analiza wibracji liczb powiązanych z życiem, np. data urodzenia lub imię. Pokazuje potencjały, cykle życia i kierunki rozwoju, zarówno osobistego, jak i relacyjnego.",
  },
  {
    question: "Co oznacza wyrocznia księżycowa i rada anielska?",
    answer: "Wyrocznia księżycowa interpretuje energie związane z cyklami Księżyca, emocjami i intuicją. Rada anielska to przekaz duchowy, który wspiera, dodaje pewności i wskazuje kierunek działania.",
  },
  {
    question: "Jak działają rytuały i świece intencyjne?",
    answer: "Rytuały i świece intencyjne koncentrują energię na określonym celu – np. przyciągnięcie miłości, ochronę lub oczyszczenie energetyczne. Ich moc wynika z profesjonalnego przygotowania i przeprowadzenia.",
  },
  {
    question: "Czym są sygille i jak działają?",
    answer: "Sygille to symbole stworzone w celu skoncentrowania intencji i energii na określony cel, np. przyciągnięcie pozytywnej energii lub realizację marzeń. Każdy symbol jest dopasowany indywidualnie i tworzony z myślą o określonej intencji.",
  },
  {
    question: "Jak zadawać pytania, żeby uzyskać najlepsze odpowiedzi?",
    answer: "Najlepiej zadawać pytania jasne, konkretne i precyzyjne – np. \"Jakie energie wpływają na relację między X a Y?\" lub \"Co mogę zrobić, aby przyciągnąć pozytywne zmiany?\".",
  },
  {
    question: "Jak mogę dowiedzieć się, która usługa będzie dla mnie najlepsza?",
    answer: "Możesz skonsultować się ze mną, a wspólnie ustalimy, która metoda najlepiej odpowiada Twoim potrzebom i intencjom.",
  },
  {
    question: "Czy mogę powtarzać sesje lub rytuały według potrzeby?",
    answer: "Tak, sesje i rytuały można powtarzać w zależności od potrzeb, intencji i celów klienta. Regularne korzystanie pozwala wzmocnić energię i wspierać długofalowe efekty.",
  },
];

const FAQItem = memo(function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="border-b border-white/10 last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <h3
          className="text-lg text-violet-100 group-hover:text-violet-50 transition-colors pr-4"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-violet-300 flex-shrink-0" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p
          className="pb-5 text-violet-200/80 leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {answer}
        </p>
      </motion.div>
    </motion.div>
  );
});

export const FAQ = memo(function FAQ() {
  return (
    <section id="faq" className="relative px-6 py-32">
      <div className="max-w-4xl mx-auto">
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
            Często Zadawane Pytania
          </h2>
          <p
            className="text-lg text-violet-200/80"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Odpowiedzi na najczęstsze pytania o czytania i sesje
          </p>
        </motion.div>

        <div className="relative p-8 md:p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
          {/* Background glow */}
          <div className="absolute -inset-20 bg-gradient-to-br from-violet-500/10 to-purple-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});