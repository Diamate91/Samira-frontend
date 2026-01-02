import { motion } from "motion/react";
import { BookOpen, ArrowRight } from "lucide-react";
import { memo } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  content: string;
}

interface BlogPreviewProps {
  onPostClick: (post: BlogPost) => void;
}

const blogPosts: BlogPost[] = [
  {
    title: "Czy ktoś rzucił na mnie urok? 7 znaków, że możesz być pod wpływem cudzej energii",
    excerpt: "Coraz więcej osób zadaje sobie pytanie, czy nagłe pogorszenie samopoczucia, pech lub chaos w życiu może mieć przyczynę energetyczną. Dowiedz się, jak rozpoznać możliwy urok i co możesz zrobić.",
    date: "2 Stycznia 2025",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1759592367854-b24fdb3f700a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwc3Bpcml0dWFsJTIwcHJvdGVjdGlvbnxlbnwxfHx8fDE3NjczMTQzNDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    content: `Coraz więcej osób zadaje sobie pytanie, czy nagłe pogorszenie samopoczucia, pech lub chaos w życiu może mieć przyczynę energetyczną. Choć nie wszystko, co trudne, musi być wynikiem działania z zewnątrz, istnieją sytuacje, w których warto przyjrzeć się wpływowi cudzej energii.

W tym artykule dowiesz się, jak rozpoznać możliwy urok, jakie są jego objawy oraz co możesz zrobić, aby się oczyścić i ochronić.

1. Nagłe pogorszenie nastroju bez wyraźnego powodu

Jeśli czujesz smutek, niepokój lub drażliwość, które pojawiły się nagle i nie potrafisz ich logicznie wyjaśnić, może to być sygnał zaburzenia energetycznego. Szczególnie jeśli wcześniej czułaś się stabilnie.

2. Ciągłe myśli o jednej osobie

Natrętne myśli, sny lub emocjonalne przyciąganie do kogoś, kto nie jest już obecny w Twoim życiu, mogą świadczyć o pozostałościach energetycznej więzi lub ingerencji.

3. Spadek energii i chroniczne zmęczenie

Uczucie „odcięcia od mocy", brak sił mimo snu, niechęć do działania – to częsty objaw obciążenia energetycznego, szczególnie po intensywnych relacjach lub konfliktach.

4. Pech i powtarzające się blokady

Gdy wszystko zaczyna iść nie tak: opóźnienia, straty, konflikty bez powodu – warto spojrzeć głębiej. W ezoteryce mówi się wtedy o zablokowanym przepływie energii.

5. Niepokojące sny lub uczucie obecności

Sny o ciemnych postaciach, uczucie bycia obserwowaną, napięcie w nocy – to częste sygnały, że Twoje pole energetyczne potrzebuje oczyszczenia.

6. Reakcje ciała bez medycznej przyczyny

Ucisk w klatce piersiowej, ciężar na barkach, nagłe bóle głowy – jeśli lekarz nie znajduje przyczyny, warto sprawdzić aspekt energetyczny.

7. Intuicja mówi, że „coś jest nie tak"

Najważniejszy znak. Jeśli wewnętrznie czujesz, że coś Ci nie służy, często masz rację. Intuicja jest pierwszą linią obrony.

Co możesz zrobić?

Na początek warto:

Oczyścić przestrzeń (kąpiel z solą, kadzidło, intencja)
Ograniczyć kontakt z osobami, które Cię obciążają
Wzmocnić ochronę energetyczną

Jeśli jednak objawy utrzymują się dłużej, warto sięgnąć po głębsze oczyszczenie lub rytuał ochronny, dopasowany indywidualnie.

Pamiętaj:

Nie każdy spadek energii to urok — ale każdy sygnał ciała warto potraktować z uważnością.`,
  },
  {
    title: "Rytuały miłosne – które działają, a które niszczą karmę",
    excerpt: "Rytuały miłosne fascynują ludzi od wieków. Jednak nie każdy rytuał działa w ten sam sposób, a niektóre mogą przynieść niepożądane skutki energetyczne. Dowiedz się, które są bezpieczne.",
    date: "28 Grudnia 2024",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1654619139072-682d58ba1b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb3ZlJTIwcml0dWFsJTIwY2FuZGxlc3xlbnwxfHx8fDE3NjczMTQyMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    content: `Rytuały miłosne fascynują ludzi od wieków. Jedni szukają w nich nadziei na nową miłość, inni chcą wzmocnić więź z ukochaną osobą lub przyciągnąć uczucia od konkretnej osoby. Jednak nie każdy rytuał działa w ten sam sposób, a niektóre mogą przynieść niepożądane skutki energetyczne.

W tym artykule dowiesz się, które rytuały miłosne są bezpieczne, które mogą naruszyć karmę, oraz jak podejść do magii miłosnej świadomie.

Czym jest rytuał miłosny?

Rytuał miłosny to świadoma praca energetyczna, której celem jest:

Przyciągnięcie miłości
Wzmocnienie emocjonalnej więzi z partnerem
Otwarcie serca na prawdziwą miłość
Energetyczne połączenie z drugą osobą w zgodzie z jej energią

Rytuały miłosne działają na pole relacyjne i wpływają na energie między osobami w danej relacji.

⚠️ Rytuały miłosne, które mogą niszczyć karmę

Niektóre praktyki są ryzykowne, szczególnie gdy:

Ingerują w wolę drugiej osoby
Opierają się na przymusie lub kontroli
Wykonuje się je w stanie silnej obsesji lub złości
Brak w nich ochrony energetycznej

Skutki takich rytuałów mogą obejmować:

Konflikty i chaos emocjonalny
Uzależnienie emocjonalne
Blokady miłosne w przyszłości
Poczucie pustki mimo osiągniętego celu

Rytuały miłosne bezpieczne i harmonijne

Bezpieczne rytuały działają poprzez:

Przyciąganie relacji zgodnych z duszą
Energetyczne połączenie z drugą osobą w zgodzie z jej energią
Otwieranie serca na miłość, zamiast jej wymuszania

Przykłady:

Rytuały otwierające serce na nową relację
Rytuały przyciągania partnera zgodnie z najwyższym dobrem
Rytuały wzmacniające istniejącą więź energetyczną w związku
Praca z intencją i afirmacjami zamiast kontroli

Jak podejść do rytuałów miłosnych świadomie?

Przed wykonaniem rytuału warto zadać sobie pytania:

Czy chcę miłości, czy kontroli?

Czy jestem gotowa na konsekwencje energetyczne?

Czy działam z miłości, a nie z lęku, obsesji lub złości?

Prawdziwa magia miłosna nie łamie woli innych, lecz prowadzi do harmonii i zgodności energetycznej między osobami.`,
  },
  {
    title: "Jak oczyścić energię po toksycznej relacji",
    excerpt: "Toksyczne relacje zostawiają nie tylko emocjonalne blizny, ale również obciążają Twoją aurę. Dowiedz się, jak skutecznie oczyścić swoją energię i otworzyć się na nowe, zdrowe doświadczenia.",
    date: "20 Grudnia 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1597717503010-ee19fef2db91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbnNpbmclMjByaXR1YWwlMjBzYWdlfGVufDF8fHx8MTc2NzMxNDM0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    content: `Toksyczne relacje zostawiają nie tylko emocjonalne blizny, ale również obciążają Twoją aurę i subtelne pole energetyczne. Nawet po rozstaniu możesz czuć zmęczenie, niepokój, brak motywacji, a czasem powtarzający się pech w życiu.

Dlatego ważne jest oczyszczenie swojej energii po toksycznej relacji, aby odzyskać spokój, równowagę i otworzyć się na nowe doświadczenia.

Dlaczego oczyszczanie energetyczne jest ważne?

Po toksycznej relacji w Twojej aurze mogą pozostać:

Negatywne emocje i lęki
Blokady energetyczne
Przywiązanie do przeszłości, które utrudnia nowe relacje

Oczyszczenie pozwala:

Uwolnić negatywne emocje
Przywrócić równowagę energetyczną
Wzmocnić intuicję i poczucie własnej wartości
Otworzyć się na zdrowe relacje w przyszłości

Energia po intymnej relacji

Po intymnej relacji część energii między partnerami może pozostawać w polu energetycznym, szczególnie w czakrze sakralnej (svadhisthana), która odpowiada za seksualność, emocje i więzi.

Ta subtelna więź może wpływać na uczucie przywiązania lub wspomnienia relacji, jeśli nie zostanie odpowiednio uwolniona.

⚠️ Dlaczego profesjonalne oczyszczenie jest ważne

Domowe rytuały i techniki wspomagające mogą przynieść ulgę, jednak po toksycznych relacjach i intymnych połączeniach energetycznych często nie wystarczają.

Profesjonalne oczyszczenie może obejmowa także rytuał odcięcia, który rozdziela energetyczne powiązania z byłym partnerem i przywraca równowagę w polu energetycznym.

Jak podejść do oczyszczania świadomie?

Zaufaj doświadczeniu – subtelne więzi energetyczne wymagają odpowiedniego podejścia.

Skorzystaj z profesjonalnej interwencji, jeśli potrzebujesz skutecznego oczyszczenia i odcięcia.

Utrzymuj równowagę w codziennym życiu – medytacja, afirmacje czy czystość przestrzeni mogą wspierać proces.`,
  },
];

export const BlogPreview = memo(function BlogPreview({ onPostClick }: BlogPreviewProps) {
  return (
    <section id="blog" className="relative px-6 py-32">
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
            Duchowe Porady
          </h2>
          <p
            className="text-lg text-violet-200/80"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Przewodnictwo, inspiracje i mądrość dla twojej duchowej podróży
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group cursor-pointer h-full"
              onClick={() => onPostClick(post)}
            >
              <div className="relative rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden h-full flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-2">
                {/* Image Section */}
                <div className="relative h-48 flex-shrink-0 overflow-hidden">
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110 origin-center">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-violet-900/90 via-violet-900/40 to-transparent" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-6 flex-grow flex flex-col">
                  <div className="relative z-10 flex-grow">
                    <div className="flex items-center gap-3 mb-3 text-xs text-violet-300/70">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        <span style={{ fontFamily: "'Inter', sans-serif" }}>
                          {post.readTime}
                        </span>
                      </div>
                      <span>•</span>
                      <span style={{ fontFamily: "'Inter', sans-serif" }}>
                        {post.date}
                      </span>
                    </div>

                    <h3
                      className="mb-3 text-xl text-violet-100 group-hover:text-violet-50 transition-colors"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {post.title}
                    </h3>

                    <p
                      className="text-sm text-violet-200/70 line-clamp-3"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Read more button */}
                  <div className="relative z-10 mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-sm text-violet-300 group-hover:text-violet-100 transition-colors">
                      <span style={{ fontFamily: "'Inter', sans-serif" }}>
                        Czytaj więcej
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Corner glow */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-violet-500/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
});