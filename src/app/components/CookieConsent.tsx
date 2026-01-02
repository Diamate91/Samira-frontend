import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cookie, X, Check, Settings } from "lucide-react";
import { trackEvent } from "../utils/analytics";

interface CookieConsentProps {
  onAccept?: () => void;
  onReject?: () => void;
}

export const CookieConsent = ({ onAccept, onReject }: CookieConsentProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    
    if (!consent) {
      // Show popup after a delay to let user see the page first
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000); // 3 seconds delay - user can see the page before popup appears
      return () => clearTimeout(timer);
    } else if (consent === "accepted") {
      // Initialize GA4 if already accepted
      initializeGA4();
    }
  }, []);

  const initializeGA4 = () => {
    // Dispatch custom event to initialize GA4
    window.dispatchEvent(new CustomEvent("cookieConsentAccepted"));
    
    // Track the acceptance
    if (typeof window !== 'undefined' && (window as any).gtag) {
      trackEvent("cookie_consent", { action: "accepted" });
    }
  };

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
    initializeGA4();
    onAccept?.();
    
    // Reload to activate GA4
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setIsVisible(false);
    onReject?.();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop - lighter and less intrusive */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-[9998] pointer-events-none"
          />

          {/* Cookie Consent Popup */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-[95%] max-w-2xl pointer-events-auto"
          >
            <div className="relative bg-gradient-to-br from-[#2d1b4e] to-[#1a0f2e] border border-violet-500/30 rounded-2xl shadow-2xl overflow-hidden">
              {/* Mystical glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-purple-600/10 pointer-events-none" />
              <div
                className="absolute -top-20 -right-20 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl pointer-events-none"
                style={{ filter: "blur(60px)" }}
              />
              <div
                className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"
                style={{ filter: "blur(60px)" }}
              />

              <div className="relative p-6 sm:p-8">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 p-3 bg-gradient-to-br from-violet-600/20 to-purple-600/20 rounded-xl border border-violet-400/30">
                    <Cookie className="w-6 h-6 text-violet-300" />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-xl sm:text-2xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-purple-200"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      Cookies i Prywatność 🌙
                    </h3>
                    <p
                      className="text-violet-200/80 text-sm sm:text-base leading-relaxed"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Używamy cookies aby zapewnić najlepsze doświadczenie na naszej stronie
                      oraz do analizy ruchu poprzez Google Analytics. Twoja energia i prywatność
                      są dla nas ważne.
                    </p>
                  </div>
                </div>

                {/* Details section (collapsible) */}
                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mb-4 overflow-hidden"
                    >
                      <div className="p-4 bg-black/20 rounded-xl border border-violet-400/20">
                        <h4
                          className="text-violet-200 mb-3 flex items-center gap-2"
                          style={{ fontFamily: "'Cinzel', serif" }}
                        >
                          <Settings className="w-4 h-4" />
                          Szczegóły Cookies
                        </h4>
                        <div
                          className="space-y-3 text-sm text-violet-200/70"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          <div>
                            <p className="font-semibold text-violet-200 mb-1">
                              🔮 Niezbędne Cookies
                            </p>
                            <p>
                              Wymagane do podstawowego działania strony i zapisania Twoich
                              preferencji dotyczących cookies.
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold text-violet-200 mb-1">
                              📊 Google Analytics (GA4)
                            </p>
                            <p>
                              Pomaga nam zrozumieć jak odwiedzający korzystają ze strony,
                              aby móc ją ulepszać. Zbierane dane są anonimowe.
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold text-violet-200 mb-1">
                              🔍 Google Search Console
                            </p>
                            <p>
                              Weryfikacja strony w wyszukiwarce Google. Nie zbiera Twoich
                              danych osobowych.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowDetails(!showDetails)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-violet-200 transition-all text-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <Settings className="w-4 h-4" />
                    {showDetails ? "Ukryj szczegóły" : "Pokaż szczegóły"}
                  </motion.button>

                  <div className="flex-1 flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleReject}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-violet-200 transition-all"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <X className="w-4 h-4" />
                      Odrzuć
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAccept}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold transition-all shadow-lg shadow-violet-500/20"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      <Check className="w-4 h-4" />
                      Akceptuję
                    </motion.button>
                  </div>
                </div>

                {/* Footer note */}
                <p
                  className="mt-4 text-xs text-violet-300/50 text-center"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Kontynuując bez wyboru, domyślnie akceptujesz niezbędne cookies.
                  Możesz zmienić ustawienia w każdej chwili.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Helper component to reset cookie consent (for development/testing)
export const CookieConsentReset = () => {
  const handleReset = () => {
    localStorage.removeItem("cookie-consent");
    window.location.reload();
  };

  // Only show in development
  if (import.meta.env.PROD) return null;

  return (
    <button
      onClick={handleReset}
      className="fixed bottom-4 right-4 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-200 text-xs rounded-lg z-[10000] transition-colors"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      🔄 Reset Cookies (Dev)
    </button>
  );
};