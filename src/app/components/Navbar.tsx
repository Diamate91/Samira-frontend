import { motion, useScroll, useTransform } from "motion/react";
import { useState, memo } from "react";
import { MoonStar, Menu, X } from "lucide-react";
import { trackNavigationClick } from "../utils/analytics";

const navItems = [
  { name: "Strona główna", href: "#hero" },
  { name: "O mnie", href: "#about" },
  { name: "Usługi", href: "#services" },
  { name: "Galeria", href: "#gallery" },
  { name: "Blog", href: "#blog" },
  { name: "FAQ", href: "#faq" },
  { name: "Kontakt", href: "#contact" },
];

export const Navbar = memo(function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Dynamic background with gradient matching the main background
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    [
      "rgba(45, 10, 78, 0.4)", 
      "rgba(29, 9, 59, 0.85)"
    ]
  );

  // Border opacity
  const borderOpacity = useTransform(
    scrollY,
    [0, 100],
    [0.3, 0.5]
  );

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl shadow-lg shadow-violet-900/20"
        style={{ 
          backgroundColor,
          borderBottom: `1px solid rgba(168, 85, 247, ${borderOpacity})`,
          boxShadow: "0 4px 30px rgba(75, 0, 130, 0.3), 0 0 80px rgba(147, 51, 234, 0.15)",
        }}
      >
        {/* Frosted glass overlay with stronger gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-800/40 via-purple-900/30 to-indigo-950/20 pointer-events-none" />
        
        {/* Enhanced top glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-300/60 to-transparent" />
        
        {/* Bottom glow accent */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        
        {/* Noise texture overlay for frosted glass effect */}
        <div 
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="max-w-7xl mx-auto px-6 py-4 relative z-10">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => handleNavClick("#hero")}
              className="flex items-center gap-2 group"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <MoonStar className="w-7 h-7 text-violet-300 group-hover:text-violet-200 transition-colors drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
              </motion.div>
              <span
                className="text-xl text-violet-100 group-hover:text-white transition-colors drop-shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Wróżka Samira
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    handleNavClick(item.href);
                    trackNavigationClick(item.name);
                  }}
                  className="relative text-violet-200/90 hover:text-violet-100 transition-all text-sm group"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {item.name}
                  {/* Hover underline glow */}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-violet-400 to-purple-400 group-hover:w-full transition-all duration-300 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                </button>
              ))}
              <motion.button
                onClick={() => handleNavClick("#contact")}
                className="relative px-5 py-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm overflow-hidden group"
                style={{ fontFamily: "'Cinzel', serif" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Zarezerwuj</span>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
                
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-violet-300 hover:text-violet-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
              ) : (
                <Menu className="w-6 h-6 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-[73px] left-0 right-0 z-40 backdrop-blur-2xl border-b border-violet-400/20 md:hidden max-h-[calc(100vh-73px)] overflow-y-auto"
          style={{
            background: "linear-gradient(180deg, rgba(29, 9, 59, 0.95) 0%, rgba(45, 10, 78, 0.95) 100%)",
            boxShadow: "0 8px 32px rgba(75, 0, 130, 0.3)",
          }}
        >
          {/* Frosted glass overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-violet-900/30 via-purple-900/20 to-transparent pointer-events-none" />
          
          {/* Top glow line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />
          
          {/* Noise texture */}
          <div 
            className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="px-4 py-6 space-y-2 relative z-10">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => {
                  handleNavClick(item.href);
                  trackNavigationClick(item.name);
                }}
                className="block w-full text-left text-violet-200/90 hover:text-white hover:bg-violet-500/20 active:bg-violet-500/30 transition-all py-3 px-4 rounded-xl text-base backdrop-blur-sm border border-violet-400/0 hover:border-violet-400/30"
                style={{ fontFamily: "'Inter', sans-serif" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <span className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400/60 group-hover:bg-violet-300" />
                  {item.name}
                </span>
              </motion.button>
            ))}
            <motion.button
              onClick={() => handleNavClick("#contact")}
              className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white text-center mt-4 hover:from-violet-500 hover:to-purple-500 active:scale-95 transition-all shadow-[0_0_20px_rgba(168,85,247,0.5)] text-base"
              style={{ fontFamily: "'Cinzel', serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Zarezerwuj
            </motion.button>
          </div>
        </motion.div>
      )}
    </>
  );
});