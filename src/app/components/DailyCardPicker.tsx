import { motion, AnimatePresence } from "motion/react";
import { useState, memo, useCallback, useMemo } from "react";
import { Sparkles } from "lucide-react";

interface Card {
  id: number;
  title: string;
  message: string;
}

// Uniwersalne zdjęcie dla wszystkich kart
const UNIVERSAL_CARD_IMAGE = "https://images.unsplash.com/photo-1765822019828-6c9ea15fac10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWNvcmF0aXZlJTIwdGFyb3QlMjBjYXJkJTIwYXJ0fGVufDF8fHx8MTc2NzMwNjkxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

// Pełna talia 78 kart Tarota
const fullTarotDeck: Card[] = [
  // ARKANA WIELKIE (22 karty)
  { id: 0, title: "Błazen", message: "Nowy początek, spontaniczność i wiara w przyszłość. Czas na odwagę i podążanie za marzeniami bez lęku." },
  { id: 1, title: "Mag", message: "Manifestacja, moc twórcza i zdolność przekształcania marzeń w rzeczywistość. Masz wszystkie narzędzia, których potrzebujesz." },
  { id: 2, title: "Wysoka Kapłanka", message: "Intuicja, tajemnica i wewnętrzna mądrość. Słuchaj swojego wewnętrznego głosu i zaufaj podświadomości." },
  { id: 3, title: "Cesarzowa", message: "Płodność, obfitość i matczyna troska. Czas na twórczość, rozwój i pielęgnowanie swoich projektów." },
  { id: 4, title: "Cesarz", message: "Struktura, autorytet i kontrola. Ustanów porządek i weź odpowiedzialność za swoje życie." },
  { id: 5, title: "Hierofant", message: "Tradycja, duchowe nauczanie i przewodnictwo. Szukaj mądrości u doświadczonych przewodników." },
  { id: 6, title: "Kochankowie", message: "Miłość, wybory i harmonia. Podejmij decyzję serca i zaufaj swoim uczuciom." },
  { id: 7, title: "Rydwan", message: "Determinacja, zwycięstwo i kontrola. Masz siłę by pokonać wszystkie przeszkody na swojej drodze." },
  { id: 8, title: "Siła", message: "Wewnętrzna moc, odwaga i opanowanie emocji. Prawdziwa siła płynie z łagodności i współczucia." },
  { id: 9, title: "Eremita", message: "Samotność, wewnętrzna refleksja i poszukiwanie prawdy. Czas na kontemplację i duchowe poszukiwania." },
  { id: 10, title: "Koło Fortuny", message: "Zmiana, cykle życia i przeznaczenie. Akceptuj zmiany jako naturalną część życia." },
  { id: 11, title: "Sprawiedliwość", message: "Równowaga, prawda i odpowiedzialność. Działaj sprawiedliwie i otrzymasz sprawiedliwość w zamian." },
  { id: 12, title: "Wisielec", message: "Poświęcenie, nowa perspektywa i zawieszenie. Czasem trzeba coś oddać, by coś otrzymać." },
  { id: 13, title: "Śmierć", message: "Transformacja, zakończenie i nowy początek. Koniec jednego rozdziału otwiera drzwi do nowego." },
  { id: 14, title: "Umiarkowanie", message: "Równowaga, harmonia i umiar. Znajdź złoty środek między skrajnościami." },
  { id: 15, title: "Diabeł", message: "Pokusa, materializm i uwolnienie. Uświadom sobie swoje więzy, by móc się od nich uwolnić." },
  { id: 16, title: "Wieża", message: "Nagła zmiana, zniszczenie i objawienie. Upadek starego otwiera drogę do nowej rzeczywistości." },
  { id: 17, title: "Gwiazda", message: "Nadzieja, inspiracja i duchowe przewodnictwo. Twoja intuicja prowadzi cię we właściwym kierunku." },
  { id: 18, title: "Księżyc", message: "Iluzja, podświadomość i intuicja. Nie wszystko jest takie, jakim się wydaje. Zagłęb się głębiej." },
  { id: 19, title: "Słońce", message: "Radość, sukces i życiowa energia. Nadchodzi okres wielkiej radości i świętowania osiągnięć." },
  { id: 20, title: "Sąd", message: "Odrodzenie, wybaczenie i świadomość. Czas na podsumowanie i nowy początek z czystym sercem." },
  { id: 21, title: "Świat", message: "Spełnienie, zakończenie cyklu i osiągnięcie celu. Jesteś dokładnie tam, gdzie powinieneś być." },
  
  // BUŁAWY (Wands) - 14 kart
  { id: 22, title: "As Buław", message: "Nowy projekt, inspiracja i kreatywna energia. Nadszedł czas na nowe przedsięwzięcia." },
  { id: 23, title: "Dwójka Buław", message: "Planowanie przyszłości, decyzje i wizje. Świat jest w twoich rękach." },
  { id: 24, title: "Trójka Buław", message: "Ekspansja, przewidywanie i handel. Twoje wysiłki zaczynają przynosić owoce." },
  { id: 25, title: "Czwórka Buław", message: "Świętowanie, harmonia i stabilność. Czas na radość i wdzięczność za osiągnięcia." },
  { id: 26, title: "Piątka Buław", message: "Rywalizacja, konflikt i wyzwania. Zachowaj spokój w środku chaosu." },
  { id: 27, title: "Szóstka Buław", message: "Zwycięstwo, uznanie i sukces publiczny. Twoje osiągnięcia zostaną docenione." },
  { id: 28, title: "Siódemka Buław", message: "Obrona pozycji, determinacja i walka. Stań mocno przy swoich przekonaniach." },
  { id: 29, title: "Ósemka Buław", message: "Szybki postęp, wiadomości i ruch. Sprawy przyspieszają i wszystko toczy się naprzód." },
  { id: 30, title: "Dziewiątka Buław", message: "Wytrwałość, siła wewnętrzna i obrona. Jesteś silniejszy niż myślisz." },
  { id: 31, title: "Dziesiątka Buław", message: "Przeciążenie, odpowiedzialność i ciężar. Pamiętaj, że możesz prosić o pomoc." },
  { id: 32, title: "Paź Buław", message: "Entuzjazm, przygoda i odważne wiadomości. Podążaj za swoją pasją z otwartym sercem." },
  { id: 33, title: "Rycerz Buław", message: "Akcja, impulsywność i przygoda. Czas na śmiałe działanie i podążanie za marzeniami." },
  { id: 34, title: "Królowa Buław", message: "Pewność siebie, pasja i niezależność. Wyrażaj siebie autentycznie i odważnie." },
  { id: 35, title: "Król Buław", message: "Przywództwo, wizja i inspirowanie innych. Prowadź z odwagą i pasją." },

  // KIELICHY (Cups) - 14 kart
  { id: 36, title: "As Kielichów", message: "Nowa miłość, duchowość i intuicja. Otwórz swoje serce na nowe możliwości." },
  { id: 37, title: "Dwójka Kielichów", message: "Partnerstwo, miłość i harmonia. Znajdź równowagę w związkach z innymi." },
  { id: 38, title: "Trójka Kielichów", message: "Świętowanie, przyjaźń i radość. Ciesz się czasem spędzonym z bliskimi." },
  { id: 39, title: "Czwórka Kielichów", message: "Apatia, kontemplacja i niezadowolenie. Może czas przyjrzeć się nowym możliwościom?" },
  { id: 40, title: "Piątka Kielichów", message: "Strata, smutek i rozczarowanie. Pamiętaj, że po burzy zawsze wychodzi słońce." },
  { id: 41, title: "Szóstka Kielichów", message: "Nostalgia, wspomnienia i dziecięca radość. Znajdź piękno w prostych przyjemnościach." },
  { id: 42, title: "Siódemka Kielichów", message: "Iluzje, fantazje i wybory. Odróżnij prawdziwe pragnienia od złudnych marzeń." },
  { id: 43, title: "Ósemka Kielichów", message: "Odchodzenie, porzucenie i poszukiwanie czegoś więcej. Czas ruszy naprzód." },
  { id: 44, title: "Dziewiątka Kielichów", message: "Spełnienie życzeń, zadowolenie i satysfakcja. Twoje marzenia stają się rzeczywistością." },
  { id: 45, title: "Dziesiątka Kielichów", message: "Szczęście rodzinne, harmonia i emocjonalne spełnienie. Dom pełen miłości." },
  { id: 46, title: "Paź Kielichów", message: "Wrażliwość, intuicja i twórcze przesłania. Słuchaj głosu swojego serca." },
  { id: 47, title: "Rycerz Kielichów", message: "Romans, urok i artystyczna dusza. Podążaj za swoimi uczuciami z gracją." },
  { id: 48, title: "Królowa Kielichów", message: "Współczucie, ciepło i emocjonalna mądrość. Słuchaj intuicji i serca." },
  { id: 49, title: "Król Kielichów", message: "Emocjonalna równowaga, mądrość i dyplomacja. Kieruj z sercem pełnym współczucia." },

  // MIECZE (Swords) - 14 kart
  { id: 50, title: "As Mieczy", message: "Jasność umysłu, prawda i przełom. Nowe pomysły i mentalna klarowność." },
  { id: 51, title: "Dwójka Mieczy", message: "Trudna decyzja, równowaga i dylemat. Zaufaj swojemu wewnętrznemu głosowi." },
  { id: 52, title: "Trójka Mieczy", message: "Ból serca, smutek i cierpienie. Czas uzdrowienia i przebaczenia nadejdzie." },
  { id: 53, title: "Czwórka Mieczy", message: "Odpoczynek, medytacja i regeneracja. Pozwól sobie na zasłużony relaks." },
  { id: 54, title: "Piątka Mieczy", message: "Konflikt, porażka i gorycz. Nie wszystkie bitwy są warte walki." },
  { id: 55, title: "Szóstka Mieczy", message: "Przejście, zmiana i spokojniejsze wody. Opuszczasz burzliwe czasy za sobą." },
  { id: 56, title: "Siódemka Mieczy", message: "Oszustwo, strategia i tajne plany. Bądź czujny i przemyślany w działaniu." },
  { id: 57, title: "Ósemka Mieczy", message: "Poczucie uwięzienia, izolacja i ograniczenia. Uwolnij się od mentalnych więzów." },
  { id: 58, title: "Dziewiątka Mieczy", message: "Niepokój, koszmary i zmartwienia. Pamiętaj, że myśli nie zawsze są prawdą." },
  { id: 59, title: "Dziesiątka Mieczy", message: "Koniec cyklu, zdrada i bolesne zakończenie. Po ciemności zawsze przychodzi świt." },
  { id: 60, title: "Paź Mieczy", message: "Ciekawość, czujność i nowe pomysły. Badaj świat z otwartym umysłem." },
  { id: 61, title: "Rycerz Mieczy", message: "Szybkie działanie, asertywność i bezpośredniość. Idź prosto do celu." },
  { id: 62, title: "Królowa Mieczy", message: "Intelekt, jasność myśli i niezależność. Wyraź swoją prawdę z gracją i siłą." },
  { id: 63, title: "Król Mieczy", message: "Autorytet intelektualny, logika i sprawiedliwe osądy. Kieruj z mądrością i jasnym umysłem." },

  // PENTAKLE (Pentacles) - 14 kart
  { id: 64, title: "As Pentakli", message: "Nowa możliwość finansowa, obfitość i manifest. Nasiona sukcesu zostały zasiane." },
  { id: 65, title: "Dwójka Pentakli", message: "Równowaga, adaptacja i priorytet. Żongluj obowiązkami z gracją." },
  { id: 66, title: "Trójka Pentakli", message: "Współpraca, nauka i mistrzostwo. Twoja ciężka praca zostanie doceniona." },
  { id: 67, title: "Czwórka Pentakli", message: "Kontrola, bezpieczeństwo i chciwość. Pamiętaj o równowadze między oszczędzaniem a szczodrością." },
  { id: 68, title: "Piątka Pentakli", message: "Trudności finansowe, izolacja i potrzeba. Pomoc jest bliżej niż myślisz." },
  { id: 69, title: "Szóstka Pentakli", message: "Szczodrość, dzielenie się i równowaga. Co dajesz, do ciebie wraca." },
  { id: 70, title: "Siódemka Pentakli", message: "Cierpliwość, długoterminowe cele i ocena. Twoja inwestycja przynosi owoce." },
  { id: 71, title: "Ósemka Pentakli", message: "Ciężka praca, doskonalenie umiejętności i dedykacja. Twój trud się opłaci." },
  { id: 72, title: "Dziewiątka Pentakli", message: "Niezależność finansowa, samodyscyplina i sukces. Ciesz się owocami swojej pracy." },
  { id: 73, title: "Dziesiątka Pentakli", message: "Bogactwo rodzinne, stabilność i dziedzictwo. Długoterminowy sukces i obfitość." },
  { id: 74, title: "Paź Pentakli", message: "Nowe możliwości, pracowitość i studia. Bądź otwarty na uczenie się i rozwój." },
  { id: 75, title: "Rycerz Pentakli", message: "Odpowiedzialność, systematyczność i wytrwałość. Krok po kroku osiągniesz cel." },
  { id: 76, title: "Królowa Pentakli", message: "Praktyczność, pielęgnowanie i obfitość. Twórz i dbaj o swoją rzeczywistość." },
  { id: 77, title: "Król Pentakli", message: "Sukces materialny, przywództwo i stabilność. Osiągnąłeś mistrzostwo w świecie fizycznym." },
];

export function DailyCardPicker() {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  // Randomowo wybierz 3 karty z pełnej talii za każdym razem
  const randomCards = useMemo(() => {
    const shuffled = [...fullTarotDeck].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, [revealed]); // Przy reset zmienia się revealed, więc nowe karty

  const handleCardClick = useCallback((cardIndex: number) => {
    if (!revealed) {
      setSelectedCardIndex(cardIndex);
      setTimeout(() => setRevealed(true), 300);
    }
  }, [revealed]);

  const handleReset = useCallback(() => {
    setRevealed(false);
    setTimeout(() => setSelectedCardIndex(null), 300);
  }, []);

  return (
    <div className="relative">
      <div className="text-center mb-8">
        <h3
          className="text-2xl sm:text-3xl mb-3 text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-purple-200"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Wyciągnij Kartę Dnia
        </h3>
        <p
          className="text-violet-200/70"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Skoncentruj swoją energię i wybierz kartę, która do ciebie przemawia
        </p>
      </div>

      <div className="flex justify-center gap-4 sm:gap-6 mb-8">
        {randomCards.map((card, index) => {
          const isFlipped = selectedCardIndex === index && revealed;
          
          return (
            <motion.div
              key={card.id}
              className="relative"
              style={{ perspective: "1000px" }}
              whileHover={!revealed ? { y: -10 } : {}}
            >
              {/* Card Container */}
              <motion.div
                className="relative w-24 h-36 sm:w-32 sm:h-48 cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                onClick={() => handleCardClick(index)}
                whileTap={!revealed ? { scale: 0.95 } : {}}
              >
                {/* Card Back (visible by default) */}
                <div
                  className="absolute inset-0 rounded-xl border-2 border-violet-400/40 bg-gradient-to-br from-violet-900 to-purple-900 flex items-center justify-center overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <div className="text-center relative z-10">
                    <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-violet-300 mx-auto mb-2" />
                    <div className="text-xs text-violet-300/50" style={{ fontFamily: "'Cinzel', serif" }}>
                      TAROT
                    </div>
                  </div>
                  {/* Decorative pattern */}
                  <div className="absolute inset-2 border border-violet-400/30 rounded-lg" />
                  <div className="absolute inset-4 border border-violet-400/20 rounded-md" />
                </div>

                {/* Card Front (with image, visible when flipped) */}
                <div
                  className="absolute inset-0 rounded-xl border-2 border-violet-400/40 overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  {/* Background Image - UNIWERSALNE dla wszystkich kart */}
                  <img
                    src={UNIVERSAL_CARD_IMAGE}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/95 via-purple-900/60 to-transparent" />
                  
                  {/* Card Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
                    <div
                      className="text-[10px] sm:text-xs text-white font-semibold drop-shadow-lg leading-tight px-1 line-clamp-2"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {card.title}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Glow effect for selected card */}
              {selectedCardIndex === index && (
                <motion.div
                  className="absolute -inset-2 bg-violet-500/30 rounded-xl blur-xl -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Card Message - Z PŁYNNĄ ANIMACJĄ ROZWIJANIA */}
      <AnimatePresence>
        {revealed && selectedCardIndex !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ 
              opacity: 1, 
              height: "auto", 
              marginTop: 0,
              transition: {
                height: { duration: 0.5, ease: "easeOut" },
                opacity: { duration: 0.4, delay: 0.1 }
              }
            }}
            exit={{ 
              opacity: 0, 
              height: 0,
              transition: {
                height: { duration: 0.3, ease: "easeIn" },
                opacity: { duration: 0.2 }
              }
            }}
            className="relative overflow-hidden"
          >
            <motion.div 
              className="relative p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-violet-500/10 to-purple-500/10 blur-2xl -z-10" />
              
              <div className="text-center">
                <motion.h4
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="text-xl sm:text-2xl mb-4 text-violet-200"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {randomCards[selectedCardIndex]?.title}
                </motion.h4>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="text-base sm:text-lg text-violet-200/80 leading-relaxed mb-6"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {randomCards[selectedCardIndex]?.message}
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  onClick={handleReset}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Wyciągnij Ponownie
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}