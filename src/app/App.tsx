import { motion, useScroll, useTransform } from "motion/react";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  MoonStar,
  Sparkles,
  Heart,
  Shield,
  Star,
  Clock,
  CheckCircle2,
  Mail,
  Send,
  Phone,
  Facebook,
  Instagram,
  MessageCircle,
  Infinity,
  Moon,
  Feather,
  Sun,
  WandSparkles,
  Flame,
  Waves,
  Calendar,
  Hexagon,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { StarryBackground } from "./components/StarryBackground";
import { ServiceCard } from "./components/ServiceCard";
import { ServiceModal } from "./components/ServiceModal";
import { TestimonialCard } from "./components/TestimonialCard";
import { ProcessStep } from "./components/ProcessStep";
// import { MysticalSlider } from "./components/MysticalSlider";
import { DailyCardPicker } from "./components/DailyCardPicker";
import { MysticalStats } from "./components/MysticalStats";
import { JourneyTimeline } from "./components/JourneyTimeline";
import { Navbar } from "./components/Navbar";
import { FAQ } from "./components/FAQ";
import { TrustBadges } from "./components/TrustBadges";
import { AvailabilityCalendar } from "./components/AvailabilityCalendar";
import { BlogPreview } from "./components/BlogPreview";
import { BlogModal } from "./components/BlogModal";
import { WhatToExpect } from "./components/WhatToExpect";
import { VideoIntroduction } from "./components/VideoIntroduction";
import { Gallery } from "./components/Gallery";
import { ScrollToTop } from "./components/ScrollToTop";
import { CookieConsent, CookieConsentReset } from "./components/CookieConsent";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import {
  trackButtonClick,
  trackServiceClick,
  trackFormSubmit,
  trackCTAClick,
  trackModalOpen,
  trackEvent
} from "./utils/analytics";
import { sendContactEmail } from "./utils/emailService";
import env from "./utils/env";

// Service data with full descriptions
const services = [
  {
    id: 1,
    icon: Sparkles,
    title: "Odczyty Tarota od 30zł",
    description: "Odkryj ukryte prawdy i otrzymaj przewodnictwo poprzez starożytną mądrość kart tarota.",
    fullDescription: `Odczyty tarota to głębokie spojrzenie w energię twojego życia poprzez 78 kart pełnych symboliki i mądrości. Podczas sesji:

• Analiza aktualnej sytuacji życiowej i energii wokół ciebie
• Odpowiedzi na nurtujące pytania dotyczące przyszłości
• Ujawnienie ukrytych wpływów i możliwości
• Przewodnictwo w podejmowaniu ważnych decyzji
• Zrozumienie lekcji karmicznych i duchowych wyzwań
• Praktyczne rady na najbliższy okres życia

Karty tarota są lustrem duszy, które pokazują nie tylko to, co było i jest, ale także potencjalne ścieżki przyszłości. Każde czytanie jest unikalne i dostosowane do twoich potrzeb.`,
    imageUrl: "https://images.unsplash.com/photo-1761706280230-e2a1067451f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXJvdCUyMGNhcmRzJTIwcmVhZGluZ3xlbnwxfHx8fDE3NjczMDMyMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "od 30 PLN",
    duration: "20 minut",
  },
  {
    id: 2,
    icon: Sparkles,
    title: "Rytuały Energetyczne od 100zł",
    description: "Potężne ceremonie oczyszczające i transformujące twoją energię oraz przestrzeń życiową.",
    fullDescription: `Rytuały energetyczne to święte ceremonie łączące starożytną mądrość z mocą natury. Każdy rytuał jest dopasowany do twoich potrzeb:

• Rytuały oczyszczające z negatywnej energii
• Ceremonie ochronne dla ciebie i twojego domu
• Rytuały przyciągające miłość, obfitość lub sukces
• Praca z żywiołami: ogniem, wodą, ziemią, powietrzem
• Użycie kryształów, ziół, świec i kadzideł
• Instrukcje kontynuacji pracy energetycznej w domu

Rytuały energetyczne działają na głębokim poziomie duchowym, transformując energię i otwierając nowe możliwości. To potężne narzędzie zmiany i manifestacji.`,
    imageUrl: "https://images.unsplash.com/photo-1597717503010-ee19fef2db91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmVyZ3klMjByaXR1YWwlMjBoZWFsaW5nfGVufDF8fHx8MTc2NzMwMzIwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "od 100 PLN",
    duration: "180 minut",
  },
  {
    id: 3,
    icon: Heart,
    title: "Uzdrawianie Emocjonalne 15min/60zł",
    description: "Delikatne i skuteczne uwalnianie emocjonalnych blokad poprzez naturalny dar uzdrawiania.",
    fullDescription: `Uzdrawianie emocjonalne to mój osobisty dar, który pozwala na głęboką pracę z emocjami i traumami. Sesje są krótkie, ale intensywne:

• Identyfikacja i uwolnienie blokad emocjonalnych
• Praca z niewyrażonymi emocjami i lękami
• Uzdrawianie ran z przeszłości
• Przywracanie równowagi emocjonalnej
• Wzmocnienie wewnętrznej siły i pewności siebie
• Techniki samouzdrawiania na przyszłość

Sesje 15-minutowe pozwalają na precyzyjną pracę bez przeciążenia układu nerwowego. Idealne jako regularna praktyka wsparcia emocjonalnego lub pomoc w kryzysie.`,
    imageUrl: "https://images.unsplash.com/photo-1641997648547-240078910445?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlzdGFsJTIwaGVhbGluZyUyMGVuZXJneXxlbnwxfHx8fDE3NjczMDQwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "60 PLN",
    duration: "15 minut",
  },
  {
    id: 4,
    icon: Infinity,
    title: "Numerologia od 50zł",
    description: "Odkryj tajemny kod twojego życia ukryty w liczbach i datach.",
    fullDescription: `Numerologia to starożytna nauka odkrywająca duchowe znaczenie liczb w twoim życiu. Podczas analizy numerologicznej:

• Obliczenie liczby życiowej, duszy i osobowości
• Analiza daty urodzenia i jej wpływu na przeznaczenie
• Cykle numerologiczne i okresy życiowe
• Kompatybilność numerologiczna w relacjach
• Najlepsze daty dla ważnych wydarzeń
• Przewidywania na podstawie liczb osobistych

Liczby nie kłamią - każda wibracja numerologiczna niesie określoną energię i znaczenie. Poznanie swojej numerologii to klucz do zrozumienia życiowej misji.`,
    imageUrl: "https://images.unsplash.com/photo-1582744709859-2d89c6920cfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXN0aWNhbCUyMG51bWVyb2xvZ3klMjB0YXJvdHxlbnwxfHx8fDE3NjczMDQwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "od 50 PLN",
    duration: "60 minut",
  },
  {
    id: 5,
    icon: Hexagon,
    title: "Matryca Losu od 150zł",
    description: "Kompleksowa mapa duchowa twojego przeznaczenia oparta na dacie urodzenia.",
    fullDescription: `Matryca Losu to potężne narzędzie samopoznania łączące numerologię, tarot i psychologię duchową. Szczegółowa analiza obejmuje:

• Pełen rozkład matrycy losu z interpretacją
• Karmiczne zadania i lekcje do przepracowania
• Talenty i dary duszy czekające na odkrycie
• Znaczenie relacji rodzinnych i partnerskich
• Punkty zwrotne i ważne okresy życia
• Droga do spełnienia życiowego przeznaczenia

Matryca Losu to szczegółowa mapa twojej duszy zapisana w liczbach. Pokazuje dlaczego jesteś tutaj i jak najlepiej wykorzystać swój potencjał.`,
    imageUrl: "https://images.unsplash.com/photo-1671013033034-5ea58e9c5008?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXJvdCUyMG15c3RpY2FsJTIwY2FyZHN8ZW58MXx8fHwxNzY3MzA0MjA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "od 150 PLN",
    duration: "120 minut",
  },
  {
    id: 6,
    icon: Moon,
    title: "Wyrocznia Księżycowa od 20zł",
    description: "Połącz się z cykliczną mądrością Księżyca dla przewodnictwa i uzdrowienia.",
    fullDescription: `Wyrocznia Księżycowa to delikatna i intuicyjna praktyka czerpania przewodnictwa z energii Księżyca. Sesja obejmuje:

• Odczyt energii księżycowej dla twojej sytuacji
• Interpretacja aktualnej fazy Księżyca
• Wpływ cykli księżycowych na twoje życie
• Rytuały księżycowe dostosowane do faz
• Praca z kobiecą energią i intuicją
• Medytacje i praktyki księżycowe

Księżyc rządzi emocjami, intuicją i podświadomością. Wyrocznia Księżycowa łączy cię z tą starożytną mądrością, przynosząc spokój i jasność.`,
    imageUrl: "https://images.unsplash.com/photo-1645583918675-ba68da3e663b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb29uJTIwb3JhY2xlfGVufDF8fHx8MTc2NzMwMzIwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "od 20 PLN",
    duration: "20 minut",
  },
  {
    id: 7,
    icon: Feather,
    title: "Rada Anielska od 20zł",
    description: "Otrzymaj przesłania miłości i przewodnictwa od aniołów i istot światła.",
    fullDescription: `Rada Anielska otwiera kanał komunikacji z anielskimi przewodnikami gotowymi nieść pomoc. Podczas sesji:

• Kontakt z twoimi aniołami stróżami
• Przekaz konkretnych przesłań dla ciebie
• Karty anielskie i ich duchowe znaczenie
• Rozpoznawanie znaków anielskich w życiu
• Modlitwy i afirmacje anielskie
• Ochrona i wsparcie od aniołów

Aniołowie są zawsze blisko, czekając by służyć pomocą. Rada Anielska pozwala usłyszeć ich łagodne przesłania pełne miłości, wsparcia i mądrości.`,
    imageUrl: "https://images.unsplash.com/photo-1763499997622-b3bebbb98e06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmdlbCUyMGd1aWRhbmNlfGVufDF8fHx8MTc2NzMwMzIwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "od 20 PLN",
    duration: "20 minut",
  },
  {
    id: 8,
    icon: Sun,
    title: "Praca z Czakrami od 150zł",
    description: "Balansowanie i harmonizacja siedmiu głównych centrów energetycznych ciała.",
    fullDescription: `Praca z czakrami to holistyczna sesja oczyszczania i balansowania siedmiu głównych wirów energii. Program zawiera:

• Diagnoza stanu każdej czakry
• Oczyszczanie blokad energetycznych
• Aktywacja i wzmocnienie czakr
• Balansowanie przepływu energii życiowej
• Wizualizacje i medytacje czakrowe
• Kryształy i techniki pracy z czakrami

Czakry są bramami energii w ciele. Gdy są otwarte i zbalansowane, doświadczasz zdrowia fizycznego, emocjonalnej równowagi i duchowego rozwoju.`,
    imageUrl: "https://images.unsplash.com/photo-1725483733290-134e28219b8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXZlbiUyMGNoYWtyYXMlMjBlbmVyZ3l8ZW58MXx8fHwxNzY3MzA0MzYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "od 150 PLN",
    duration: "60 minut",
  },
  {
    id: 9,
    icon: WandSparkles,
    title: "Sygille od 50zł",
    description: "Tworzenie magicznych symboli mocy dla manifestacji intencji i ochrony duchowej.",
    fullDescription: `Sygille to starożytna sztuka magiczna tworzenia symboli koncentrujących intencję i wolę. Sesja obejmuje:

• Nauka o pochodzeniu i mocy sygilli
• Tworzenie spersonalizowanej sygilli dla celu
• Proces aktywacji magicznej sygilli
• Symbole ochronne i ich zastosowanie
• Praca z sygillami w rytuałach
• Etyka i odpowiedzialność w magii

Sygilla to skondensowana forma twojej woli przekształcona w symbol. Prawidłowo stworzona i naładowana energią, staje się potężnym narzędziem manifestacji.`,
    imageUrl: "https://images.unsplash.com/photo-1765994898002-14929c24a473?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXN0aWNhbCUyMHN5bWJvbHN8ZW58MXx8fHwxNzY3MzAzMjEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "od 50 PLN",
    duration: "50 minut",
  },
  {
    id: 10,
    icon: Flame,
    title: "Świece Intencyjne od 70zł",
    description: "Spersonalizowane świece magiczne naładowane twoimi intencjami i pragnieniami.",
    fullDescription: `Świece Intencyjne łączą moc żywiołu ognia z twoimi zamiarami, tworząc most między intencją a manifestacją. Sesja zawiera:

• Wybr koloru świecy według intencji
• Dobór odpowiednich ziół i olejków
• Naładowanie świecy twoją energią
• Rytuał aktywacji i zapalenia
• Interpretacja płomienia i zachowania wosku
• Wskazówki dalszej pracy ze świecą

Świeca intencyjna pali się nie tylko fizycznie - z każdą chwilą uwalnia twoją intencję do Wszechświata, manifestując pożądaną rzeczywistość poprzez alchemię ognia.`,
    imageUrl: "https://images.unsplash.com/photo-1638459603296-6ad128bd1a64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlbnRpb24lMjBjYW5kbGVzfGVufDF8fHx8MTc2NzMwMzIwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "od 70 PLN",
    duration: "120 minut",
  },
  {
    id: 11,
    icon: Waves,
    title: "Oczyszczanie Dźwiękiem od 100zł",
    description: "Głębokie oczyszczenie energetyczne poprzez uzdrawiające wibracje mis tybetańskich.",
    fullDescription: `Oczyszczanie Dźwiękiem wykorzystuje pradawną moc wibracji brzmieniowych do harmonizacji całej istoty. Sesja obejmuje:

• Praca z misami tybetańskimi i gongami
• Oczyszczanie aury i pola energetycznego
• Harmonizacja czakr poprzez dźwięk
• Głęboka medytacja dźwiękowa
• Uwolnienie blokad emocjonalnych i fizycznych
• Przywrócenie naturalnej częstotliwości ciała

Dźwięk penetruje każdą komórkę ciała, przywracając harmonię na wszystkich poziomach. To jedna z najstarszych i najpotężniejszych form uzdrawiania energetycznego.`,
    imageUrl: "https://images.unsplash.com/photo-1738193179197-bac79086bdbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3VuZCUyMGhlYWxpbmclMjBib3dsfGVufDF8fHx8MTc2NzI4NTM4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: "od 100 PLN",
    duration: "60 minut",
  },
];

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  content: string;
}

export default function App() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleInputChange = useCallback((field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Proszę wypełnić wszystkie wymagane pola');
      return;
    }

    setIsSubmitting(true);

    // Track form submission
    trackFormSubmit('contact_form', formData);

    // Send email via Backend API (Resend + Auto-Reply)
    const result = await sendContactEmail(formData);

    if (result.success) {
      toast.success(result.message);
      // Clear form
      setFormData({
        name: '',
        email: '',
        service: '',
        message: ''
      });
    } else {
      toast.error(result.message);
    }

    setIsSubmitting(false);
  }, [formData]);

  return (
    <div className="relative min-h-screen" style={{ willChange: 'scroll-position' }}>
      {/* Animated starry background */}
      <StarryBackground />

      {/* Sticky Navbar */}
      <Navbar />

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Toast notifications */}
      <Toaster position="top-right" richColors />

      {/* Service Modal */}
      {selectedService && (
        <ServiceModal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          icon={selectedService.icon}
          title={selectedService.title}
          description={selectedService.description}
          fullDescription={selectedService.fullDescription}
          imageUrl={selectedService.imageUrl}
          price={selectedService.price}
          duration={selectedService.duration}
        />
      )}

      {/* Blog Modal */}
      {selectedBlogPost && (
        <BlogModal
          isOpen={!!selectedBlogPost}
          onClose={() => setSelectedBlogPost(null)}
          title={selectedBlogPost.title}
          content={selectedBlogPost.content}
          date={selectedBlogPost.date}
          readTime={selectedBlogPost.readTime}
          imageUrl={selectedBlogPost.image}
        />
      )}

      {/* Main content */}
      <main className="relative z-10" style={{ contain: 'layout style paint' }}>
        {/* Hero Section */}
        <header id="hero" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20 pt-24 sm:pt-32">
          <div className="max-w-6xl mx-auto text-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Mystical icon */}
              <motion.div
                className="inline-flex mb-4 sm:mb-6"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              >
                <MoonStar className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-violet-300" strokeWidth={1.5} />
              </motion.div>

              {/* Headline with SEO keywords */}
              <h1
                className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-transparent bg-clip-text bg-gradient-to-br from-violet-200 via-purple-200 to-pink-200 px-2"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Profesjonalne Sesje Tarota Online
              </h1>

              <p
                className="mb-6 sm:mb-8 text-sm sm:text-base md:text-lg lg:text-xl text-violet-200/80 max-w-3xl mx-auto px-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Oferuję kompleksowe wsparcie duchowe, oparte na moim wieloletnim doświadczeniu i naturalnym darze.
              </p>
              <p
                className="mb-6 sm:mb-8 text-sm sm:text-base md:text-lg lg:text-xl text-violet-200/80 max-w-3xl mx-auto px-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Moje usługi obejmują odczyty tarota, rytuały energetyczne, uzdrawianie emocjonalne, numerologię, pracę z czakrami, sygille, wyrocznię księżycową, radę anielską oraz oczyszczanie dźwiękiem.
              </p>
              <p
                className="mb-6 sm:mb-8 text-sm sm:text-base md:text-lg lg:text-xl text-violet-200/80 max-w-3xl mx-auto px-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Pomagam ludziom w trudnych momentach życia, wspieram w odnalezieniu równowagi, rozwiązywaniu problemów emocjonalnych i odkrywaniu ścieżki ku wewnętrznemu spokoju.
              </p>
              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white overflow-hidden"
                style={{ fontFamily: "'Cinzel', serif" }}
                onClick={() => trackCTAClick('rozpocznij_podroż', 'hero_section')}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                  Rozpocznij Swoją Podróż
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                </span>

                {/* Button glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
                  style={{ filter: "blur(20px)" }}
                />
              </motion.button>

              {/* Witch Samira Introduction */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mt-12 sm:mt-16 md:mt-20 max-w-5xl mx-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center px-2 sm:px-0">
                  {/* Samira's Image */}
                  <motion.div
                    className="relative group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative rounded-3xl overflow-hidden ">
                      <img
                        src="gallery/hero.png"
                        alt="Wróżka Samira - Twój przewodnik duchowy"
                        className="w-full h-[550px] sm:h-[650px] md:h-[750px] object-cover"
                      />
                    </div>
                    {/* Floating glow effect */}
                    <div className="absolute -inset-8 bg-violet-500/30 rounded-[3rem] blur-[60px] -z-10" />
                    <div className="absolute -inset-12 bg-purple-600/20 rounded-[4rem] blur-[80px] -z-20" />
                  </motion.div>

                  {/* Samira's Description */}
                  <div className="text-left space-y-6">
                    <div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="inline-flex items-center gap-2 mb-3 px-4 py-2 rounded-full bg-violet-500/20 border border-violet-400/30"
                      >
                        <Star className="w-4 h-4 text-violet-300" />
                        <span className="text-sm text-violet-300" style={{ fontFamily: "'Inter', sans-serif" }}>
                          Twój Przewodnik Duchowy
                        </span>
                      </motion.div>

                      <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-4xl sm:text-5xl md:text-6xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-purple-200 to-pink-200"
                        style={{ fontFamily: "'Cinzel', serif" }}
                      >
                        Wróżka Samira
                      </motion.h2>
                    </div>

                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="text-base sm:text-lg text-violet-200/90 leading-relaxed"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Nazywam się Samira i od wielu lat zawodowo zajmuję się ezoteryką. Jestem wróżką, wiedźmą, przewodniczką oraz uzdrowicielką duchową, a swoją pracę traktuję jako misję i powołanie. Wspieram ludzi w momentach zagubienia, wewnętrznej transformacji oraz poszukiwania odpowiedzi, łącząc wiedzę duchową z silną intuicją i świadomą pracą z energią.
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                      className="text-base sm:text-lg text-violet-200/80 leading-relaxed"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Pomagam poprzez odczyty tarota, wyrocznię księżycową, radę anielską, numerologię oraz odczyty matrycy losu. W swojej praktyce wykonuję również rytuały, tworzę świece intencyjne, pracuję z sygillami i runami, a także prowadzę oczyszczanie dźwiękiem oraz pracę z czakrami. Szczególne miejsce zajmuje u mnie uzdrawianie emocjonalne, do którego jestem obdarzona naturalnym darem.
                    </motion.p>

                     <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="text-base sm:text-lg text-violet-200/90 leading-relaxed"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                       Moją misją jest towarzyszenie innym w ich drodze ku głębszemu zrozumieniu siebie, uwolnieniu blokad oraz odnalezieniu światła, które każdy nosi w sobie.
                    </motion.p>

                  </div>
                </div>
              </motion.div>

              {/* Hero image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="mt-20 relative max-w-7xl mx-auto"
              >
                {/* <MysticalSlider /> */}
              </motion.div>
            </motion.div>
          </div>
        </header>

        {/* About Section */}
        <section id="about" className="relative px-4 sm:px-6 py-20 sm:py-24 md:py-32">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-16"
            >
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-violet-500/20 border border-violet-400/30">
                <Star className="w-4 h-4 text-violet-300" />
                <span className="text-xs sm:text-sm text-violet-300" style={{ fontFamily: "'Inter', sans-serif" }}>
                  O Praktyce
                </span>
                <Star className="w-4 h-4 text-violet-300" />
              </div>

              <h2
                className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-violet-100 px-2"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Podróż Intuicji i Mądrości
              </h2>

              <p
                className="mb-4 sm:mb-6 text-base sm:text-lg text-violet-200/80 leading-relaxed max-w-3xl mx-auto px-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Od ponad dekady kroczę świętą ścieżkę wróżbiarstwa i duchowego przewodnictwa.
                Poprzez starożytną sztukę tarota, niebiańską mądrość astrologii i potężne
                prace rytualne, pomagam poszukującym znaleźć jasnoć, uzdrowienie i transformację.
              </p>

              <p
                className="text-base sm:text-lg text-violet-200/80 leading-relaxed max-w-3xl mx-auto px-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Każde czytanie jest unikalną rozmową między tobą, kartami i kosmosem.
                Razem oświetlamy cienie, świętujemy światło i nawigujemy tajemnice
                podróży twojej duszy.
              </p>
            </motion.div>

            {/* Mystical Stats */}
            <div className="mb-20">
              <MysticalStats />
            </div>

            {/* Daily Card Picker */}
            <div className="mb-20">
              <DailyCardPicker />
            </div>

            {/* Journey Timeline */}
            <div>
              <JourneyTimeline />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="relative px-6 py-32" aria-labelledby="services-heading">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2
                id="services-heading"
                className="mb-4 text-3xl sm:text-4xl md:text-5xl text-violet-100"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Usługi Wróżby i Czytania Tarota Online
              </h2>
              <p
                className="text-lg text-violet-200/80 max-w-2xl mx-auto"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Profesjonalne wykładanie kart tarota, tarot miłosny, czytanie kariery,
                rytuały duchowe i oczyszczanie energetyczne
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  delay={0.1 + index * 0.1}
                  imageUrl={service.imageUrl}
                  onClick={() => {
                    setSelectedService(service);
                    trackServiceClick(service.title, service.id);
                    trackModalOpen(service.title);
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="relative px-6 py-32">
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
                Twoja Mistyczna Podróż
              </h2>
              <p
                className="text-lg text-violet-200/80"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Prosty, święty proces od intencji do iluminacji
              </p>
            </motion.div>

            <div className="space-y-0">
              <ProcessStep
                icon={Calendar}
                step={1}
                title="Wybierz rodzaj usługi oraz czas, który rezonuje z Twoim duchem"
                description="Wybierz rodzaj czytania i wybierz czas, który rezonuje z twoim duchem. Otrzymaj potwierdzenie i przewodnik przygotowawczy."
                delay={0.1}
              />
              <ProcessStep
                icon={MoonStar}
                step={2}
                title="Ustaw Swoją Intencję"
                description="Przed naszą sesją, poświęć czas na refleksję nad swoimi pytaniami i otwórz serce, aby przyjąć kosmiczne przewodnictwo."
                delay={0.2}
              />
              <ProcessStep
                icon={Sparkles}
                step={3}
                title="Połącz się i Przyjmij"
                description="Wejdź do świętej przestrzeni, gdzie wspólnie tworzymy magię. Poprzez karty i intuicję, twoje odpowiedzi się ujawnią."
                delay={0.3}
              />
              <ProcessStep
                icon={Star}
                step={4}
                title="Zintegruj i Transformuj"
                description="Weź otrzymaną mądrość i wplecz ją w swoje codzienne życie. Opcjonalne wsparcie kontynuacyjne dostępne dla głębszej integracji."
                delay={0.4}
                isLast
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
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
                Głosy z Podróży
              </h2>
              <p
                className="text-lg text-violet-200/80"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Świadectwa dusz, które znalazły swoje światło
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard
                name="Katarzyna"
                text="Czytanie było niesamowicie dokładne i pomogło mi znaleźć jasność w trudnym czasie. Czułam się vraiment zauważona i zrozumiana."
                rating={5}
                delay={0.1}
              />
              <TestimonialCard
                name="Michał"
                text="Rytuał ochrony energetycznej całkowicie przekształcił moją przestrzeń życiową. W końcu czuję spokój i bezpieczeństwo w moim domu."
                rating={5}
                delay={0.2}
              />
              <TestimonialCard
                name="Anna"
                text="Jej intuicyjne dary są niezwykłe. Czytanie kariery dało mi pewność siebie, aby podążać za moim prawdziwym powołaniem."
                rating={5}
                delay={0.3}
              />
              <TestimonialCard
                name="Dawid"
                text="Na początku byłem sceptyczny, ale czytanie miłosne ujawniło wzorce, których nie widziałem. Pomogło to uzdrowić mój związek."
                rating={5}
                delay={0.4}
              />
              <TestimonialCard
                name="Jaśmina"
                text="Duchowe oczyszczenie było potężne i głęboko poruszające. Od razu poczułam się lżejsza, a efekty utrzymywały się tygodniami."
                rating={5}
                delay={0.5}
              />
              <TestimonialCard
                name="Aleksander"
                text="Niesamowite doświadczenie! Przewodnictwo astrologiczne idealnie pasowało do tego, przez co przechodziłem. Gorąco polecam."
                rating={5}
                delay={0.6}
              />
            </div>
          </div>
        </section>

        {/* NEW SECTIONS - Trust Badges */}
        <TrustBadges />

        {/* Video Introduction */}
        <VideoIntroduction />

        {/* Availability Calendar */}
        <AvailabilityCalendar />

        {/* What To Expect */}
        <WhatToExpect />

        {/* Gallery */}
        <Gallery />

        {/* Blog Preview */}
        <BlogPreview onPostClick={(post) => setSelectedBlogPost(post)} />

        {/* FAQ */}
        <FAQ />

        {/* Terms & Conditions Section */}
        <section className="relative px-6 py-32">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-violet-500/20 border border-violet-400/30">
                <Shield className="w-4 h-4 text-violet-300" />
                <span className="text-xs sm:text-sm text-violet-300" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Warunki Świadczenia Usług
                </span>
                <Shield className="w-4 h-4 text-violet-300" />
              </div>

              <h2
                className="mb-4 text-3xl sm:text-4xl md:text-5xl text-violet-100"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Ważne Informacje
              </h2>
            </motion.div>

            {/* Terms Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Payment Policy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden"
              >
                <div className="absolute -inset-10 bg-gradient-to-br from-violet-500/10 to-purple-500/10 blur-2xl" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-violet-500/20 border border-violet-400/30">
                      <CheckCircle2 className="w-6 h-6 text-violet-300" />
                    </div>
                    <h3
                      className="text-xl text-violet-100"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      Płatność z Góry
                    </h3>
                  </div>
                  
                  <p
                    className="text-violet-200/80 leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Wszystkie usługi duchowe są świadczone wyłącznie po wcześniejszej opłacie. 
                    Sesja zostanie przeprowadzona dopiero po potwierdzeniu wpłaty. 
                    Dzięki temu mogę w pełni skupić się na przygotowaniu energetycznym i duchowym 
                    do naszego spotkania.
                  </p>
                </div>
              </motion.div>

              {/* No Refunds Policy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden"
              >
                <div className="absolute -inset-10 bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-2xl" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-400/30">
                      <Shield className="w-6 h-6 text-purple-300" />
                    </div>
                    <h3
                      className="text-xl text-violet-100"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      Polityka Zwrotów
                    </h3>
                  </div>
                  
                  <p
                    className="text-violet-200/80 leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Ze względu na duchowy i energetyczny charakter usług, zakupione sesje 
                    nie podlegają zwrotom. Każda sesja wymaga indywidualnego przygotowania, 
                    pracy energetycznej i poświęconego czasu. Przed zakupem upewnij się, 
                    że wybrana usługa odpowiada Twoim potrzebom.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Additional Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 p-6 rounded-2xl bg-violet-500/10 border border-violet-400/20"
            >
              <p
                className="text-center text-violet-200/70 text-sm leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                💜 Przed umówieniem sesji zachęcam do zapoznania się z opisami usług 
                i skontaktowania się w razie pytań. Chętnie pomogę dobrać odpowiednią 
                formę wsparcia duchowego dla Ciebie.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact/Booking Section */}
        <section id="contact" className="relative px-6 py-32">
          <div className="max-w-2xl mx-auto">
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
                Rozpocznij Swoją Transformację
              </h2>
              <p
                className="text-lg text-violet-200/80"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Skontaktuj się i pozwól magii się rozpocząć
              </p>
            </motion.div>

            {/* Glassmorphism contact form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative p-8 md:p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden"
            >
              {/* Background glow */}
              <div className="absolute -inset-20 bg-gradient-to-br from-violet-500/10 to-purple-500/10 blur-3xl" />

              <form className="relative z-10 space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    className="block mb-2 text-violet-200"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    htmlFor="name"
                  >
                    Twoje Imię
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-violet-100 placeholder-violet-300/50 focus:outline-none focus:border-violet-400/50 transition-colors"
                    placeholder="Wprowadź swoje imię"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>

                <div>
                  <label
                    className="block mb-2 text-violet-200"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    htmlFor="email"
                  >
                    Adres Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-violet-100 placeholder-violet-300/50 focus:outline-none focus:border-violet-400/50 transition-colors"
                    placeholder="twoj@email.com"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>

                <div>
                  <label
                    className="block mb-2 text-violet-200"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    htmlFor="service"
                  >
                    Interesująca Usługa
                  </label>
                  <select
                    id="service"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-violet-100 focus:outline-none focus:border-violet-400/50 transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    value={formData.service}
                    onChange={(e) => handleInputChange('service', e.target.value)}
                  >
                    <option value="" className="bg-[#2d1b4e]">Wybierz usługę</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.title} className="bg-[#2d1b4e]">
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    className="block mb-2 text-violet-200"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    htmlFor="message"
                  >
                    Twoja Wiadomość
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-violet-100 placeholder-violet-300/50 focus:outline-none focus:border-violet-400/50 transition-colors resize-none"
                    placeholder="Podziel się swoimi intencjami lub pytaniami..."
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                  />
                </div>

                <motion.button
  type="submit"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="group relative w-full px-6 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
  style={{ fontFamily: "'Cinzel', serif" }}
  disabled={isSubmitting}
>
  <span className="relative z-10 flex items-center justify-center gap-2">
    {isSubmitting ? (
      <>
        <motion.div
          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        Wysyłanie...
      </>
    ) : (
      <>
        <Send className="w-5 h-5" />
        Wyślij Wiadomość
      </>
    )}
  </span>

  {/* Button glow on hover */}
  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"
    style={{ filter: "blur(20px)" }}
  />
</motion.button>

{/* Informacja POD przyciskiem */}
{!isSubmitting && (
  <p className="mt-2 text-sm text-center text-muted-foreground">
    Po wysłaniu wiadomości sprawdź folder spam.
  </p>
)}


                {/* Alternative contact */}
                <div className="pt-6 border-t border-white/10 text-center">
                  <p
                    className="text-violet-200/70 mb-3"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Lub skontaktuj się bezpośrednio
                  </p>
                  <div className="space-y-2">
                    {/* Email */}
                    <div className="flex items-center justify-center gap-2 text-violet-300">
                      <Mail className="w-4 h-4" />
                      <a
                        href={`mailto:${env.contactEmail}`}
                        className="hover:text-violet-100 transition-colors"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        onClick={() => trackButtonClick('contact_email', 'contact_form')}
                      >
                        {env.contactEmail}
                      </a>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center justify-center gap-2 text-violet-300">
                      <Phone className="w-4 h-4" />
                      <a
                        href="tel:+48724320995"
                        className="hover:text-violet-100 transition-colors"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        onClick={() => trackButtonClick('contact_phone', 'contact_form')}
                      >
                        +48 724 320 995
                      </a>
                    </div>

                    {/* Messenger */}
                    <div className="flex items-center justify-center gap-2 text-violet-300">
                      <MessageCircle className="w-4 h-4" />
                      <a
                        href="https://m.me/61571159270154"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-violet-100 transition-colors"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        onClick={() => trackButtonClick('contact_messenger', 'contact_form')}
                      >
                        Messenger
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative px-6 py-12 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            {/* Top section - Logo and tagline */}
            <div className="text-center mb-8">
              <div className="mb-4">
                <MoonStar className="w-8 h-8 text-violet-400 mx-auto" />
              </div>
              <h3
                className="text-xl mb-3 text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-purple-300"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Wróżka Samira
              </h3>
              <p
                className="text-violet-300/60 mb-6 max-w-md mx-auto"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Czytania Tarota i Duchowe Przewodnictwo
              </p>
            </div>

            {/* Main footer content - Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-8 max-w-4xl mx-auto">
              {/* Contact Section */}
              <div className="text-center">
                <h4
                  className="text-lg mb-4 text-violet-200"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Kontakt
                </h4>
                <div className="space-y-3">
                  {/* Email */}
                  <a
                    href={`mailto:${env.contactEmail}`}
                    className="flex items-center justify-center gap-2 text-violet-300/80 hover:text-violet-200 transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    onClick={() => trackButtonClick('footer_email', 'footer')}
                  >
                    <Mail className="w-4 h-4" />
                    <span>{env.contactEmail}</span>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+48724320995"
                    className="flex items-center justify-center gap-2 text-violet-300/80 hover:text-violet-200 transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    onClick={() => trackButtonClick('footer_phone', 'footer')}
                  >
                    <Phone className="w-4 h-4" />
                    <span>+48 724 320 995</span>
                  </a>

                  {/* Messenger */}
                  <a
                    href="https://m.me/61571159270154"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-violet-300/80 hover:text-violet-200 transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    onClick={() => trackButtonClick('footer_messenger', 'footer')}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Messenger</span>
                  </a>
                </div>
              </div>

              {/* Social Media Section */}
              <div className="text-center">
                <h4
                  className="text-lg mb-4 text-violet-200"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Obserwuj Mnie
                </h4>
                <div className="flex items-center justify-center gap-4">
                  {/* Facebook */}
                  <motion.a
                    href="https://www.facebook.com/profile.php?id=61571159270154"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/5 border border-white/10 text-violet-300 hover:text-violet-100 hover:bg-white/10 transition-all"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => trackButtonClick('footer_facebook', 'footer')}
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </motion.a>

                  {/* Instagram */}
                  <motion.a
                    href="https://www.instagram.com/tarotsamira?igsh=dWttdXZqZmhlbG05"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/5 border border-white/10 text-violet-300 hover:text-violet-100 hover:bg-white/10 transition-all"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => trackButtonClick('footer_instagram', 'footer')}
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </motion.a>

                  {/* TikTok */}
                  <motion.a
                    href="https://tiktok.com/@twojprofil"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/5 border border-white/10 text-violet-300 hover:text-violet-100 hover:bg-white/10 transition-all"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => trackButtonClick('footer_tiktok', 'footer')}
                    aria-label="TikTok"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Bottom section - Copyright */}
            <div className="pt-6 border-t border-white/5 text-center">
              <p
                className="text-violet-300/60 mb-2"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                © 2025 Wróżka Samira. Wszelkie prawa zastrzeżone.
              </p>
              <p
                className="text-violet-300/40 text-sm"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Developed by{" "}
                <a
                  href="https://www.grabski.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 transition-colors hover:text-violet-300"
                >
                  Jakub Grabski Development
                </a>.
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* Cookie Consent Popup */}
      <CookieConsent
        onAccept={() => {
          console.log('✅ Cookies accepted');
          trackEvent('cookie_consent', { action: 'accepted' });
        }}
        onReject={() => {
          console.log('❌ Cookies rejected');
          trackEvent('cookie_consent', { action: 'rejected' });
        }}
      />

      {/* Development tool to reset cookie consent */}
      <CookieConsentReset />
    </div>
  );
}