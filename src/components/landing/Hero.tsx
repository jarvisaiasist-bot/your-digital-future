import { motion } from "framer-motion";
import { CheckCircle, ArrowDown, Sparkles } from "lucide-react";

const benefits = [
  "Yeni başlayanlar için anlaşılır ve yapılandırılmış eğitim",
  "Gerçek örneklerle pratik finansal okuryazarlık",
  "Adım adım mentor desteği ve net öğrenme planı",
];

interface HeroProps {
  onCTAClick: () => void;
  onCasesClick: () => void;
}

const Hero = ({ onCTAClick, onCasesClick }: HeroProps) => {
  return (
    <section className="relative overflow-hidden pt-16" style={{ background: "var(--hero-gradient)" }}>
      {/* Decorative elements */}
      <div className="glow-dot w-72 h-72 bg-primary top-10 -left-20" />
      <div className="glow-dot w-96 h-96 bg-accent -top-20 right-0 opacity-10" />
      <div className="glow-dot w-64 h-64 bg-primary-glow bottom-0 left-1/2 opacity-10" style={{ background: "hsl(var(--primary))" }} />

      <div className="container-narrow pt-12 pb-16 lg:pt-20 lg:pb-24 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: "hsl(var(--primary) / 0.08)" }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-primary">Dijital çağ için finansal okuryazarlık</span>
            </motion.div>

            <motion.h1
              className="font-display text-[2rem] leading-[1.1] font-extrabold text-foreground mb-4 lg:text-5xl lg:leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Finansal okuryazarlıkta
              <span className="text-gradient"> yeni nesil yaklaşım</span>
            </motion.h1>

            <motion.p
              className="text-muted-foreground text-base leading-relaxed mb-8 lg:text-lg lg:max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
Finansal piyasaların çalışma mantığını, profesyonellerin kullandığı araçları ve uluslararası ödeme sistemlerinin temelini sıfırdan, uygulamalı şekilde öğrenin.
            </motion.p>

            {/* Benefits */}
            <motion.ul
              className="space-y-3 mb-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {benefits.map((b, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  <span className="text-foreground text-[0.95rem] font-medium">{b}</span>
                </li>
              ))}
            </motion.ul>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 mb-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <button onClick={onCTAClick} className="cta-button w-full sm:w-auto text-base">
                Ücretsiz Ön Görüşme Al
              </button>
              <button onClick={onCasesClick} className="cta-button-secondary w-full sm:w-auto text-base">
                <ArrowDown className="w-4 h-4 mr-2" />
                Program İçeriğini Gör
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="trust-badge">✓ Ücretsiz ön görüşme</span>
              <span className="trust-badge">✓ Şeffaf program planı</span>
              <span className="trust-badge">✓ Adım adım destek</span>
            </motion.div>
          </div>

          {/* Right side — decorative graphic on desktop */}
          <motion.div
            className="hidden lg:flex items-center justify-center relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="relative w-full max-w-md">
              {/* Abstract shapes */}
              <div className="w-80 h-80 rounded-[3rem] bg-gradient-to-br from-primary/20 to-accent/20 rotate-6 mx-auto" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-[2.5rem] bg-gradient-to-tr from-primary/10 to-accent/10 -rotate-6 backdrop-blur-sm border border-primary/10" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass-card p-6 rounded-2xl max-w-[240px] shadow-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">4 Modül</p>
                      <p className="text-xs text-muted-foreground">Uygulamalı içerik</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 rounded-full bg-primary/20 overflow-hidden">
                      <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-primary to-accent" />
                    </div>
                    <div className="h-2 rounded-full bg-primary/20 overflow-hidden">
                      <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-accent to-primary" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 right-4 glass-card px-4 py-2 rounded-xl shadow-lg"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <p className="text-xs font-bold text-primary">Şeffaf öğrenme planı</p>
              </motion.div>
              <motion.div
                className="absolute -bottom-2 left-4 glass-card px-4 py-2 rounded-xl shadow-lg"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
              >
                <p className="text-xs font-bold text-accent">Esnek eğitim süreci</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
