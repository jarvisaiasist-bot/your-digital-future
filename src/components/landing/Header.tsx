import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  onCTAClick: () => void;
}

const navItems = [
  { label: "Trendler", href: "#trend" },
  { label: "Başarı Hikayeleri", href: "#cases" },
  { label: "Yorumlar", href: "#reviews" },
  { label: "Gelecek", href: "#forecast" },
  { label: "İletişim", href: "#contact" },
];

const Header = ({ onCTAClick }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b"
        style={{ 
          background: "hsl(var(--background) / 0.85)",
          borderColor: "hsl(var(--border) / 0.5)"
        }}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 20 }}
      >
        <div className="max-w-6xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <img src="/logo.svg" alt="Skyshift logo" className="w-9 h-9 rounded-xl" loading="eager" />
            <span className="font-display font-bold text-xl text-foreground">Skyshift</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <button
            onClick={onCTAClick}
            className="hidden lg:inline-flex cta-button !px-6 !py-2.5 !min-h-0 !text-sm !rounded-xl"
          >
            Ücretsiz Ön Görüşme
          </button>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-muted transition-colors"
            aria-label="Menü"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 pt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
            <motion.div
              className="relative mx-4 mt-2 p-4 rounded-2xl border"
              style={{
                background: "hsl(var(--card))",
                borderColor: "hsl(var(--border))"
              }}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
            >
              <div className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t" style={{ borderColor: "hsl(var(--border))" }}>
                <button onClick={() => { setMenuOpen(false); onCTAClick(); }} className="cta-button w-full !text-sm">
                  Ücretsiz Ön Görüşme
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
