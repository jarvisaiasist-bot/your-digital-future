import { motion } from "framer-motion";
import { CheckCircle, ArrowDown } from "lucide-react";
import heroImage from "@/assets/hero-illustration.png";

const benefits = [
  "Помогаем выбрать профессию",
  "Даём понятный план перехода",
  "Сопровождаем до результата",
];

interface HeroProps {
  onCTAClick: () => void;
  onCasesClick: () => void;
}

const Hero = ({ onCTAClick, onCasesClick }: HeroProps) => {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--hero-gradient)" }}>
      <div className="container-narrow pt-6 pb-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 mb-8"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-sm">S</span>
          </div>
          <span className="font-display font-bold text-lg text-foreground">Skyshift</span>
        </motion.div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="font-display text-[2rem] leading-[1.15] font-extrabold text-foreground mb-3">
            Освой онлайн&#8209;профессию и&nbsp;начни зарабатывать в&nbsp;digital
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            Поможем выбрать направление, дадим пошаговый план и&nbsp;доведём до&nbsp;первого дохода. Бесплатная консультация — без&nbsp;спама и&nbsp;обязательств.
          </p>
        </motion.div>

        {/* Benefits */}
        <motion.ul
          className="space-y-2.5 mb-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {benefits.map((b, i) => (
            <li key={i} className="flex items-center gap-2.5">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
              <span className="text-foreground text-[0.95rem] font-medium">{b}</span>
            </li>
          ))}
        </motion.ul>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col gap-3 mb-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button onClick={onCTAClick} className="cta-button w-full text-base">
            Получить консультацию
          </button>
          <button onClick={onCasesClick} className="cta-button-secondary w-full text-base">
            <ArrowDown className="w-4 h-4 mr-1" />
            Смотреть реальные кейсы
          </button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="flex flex-wrap gap-4 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span className="trust-badge">✓ Бесплатно</span>
          <span className="trust-badge">✓ Без спама</span>
          <span className="trust-badge">✓ Ответ за 15 мин</span>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="mt-6 flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <img
            src={heroImage}
            alt="Переход в онлайн-профессию"
            className="w-64 h-64 object-contain rounded-2xl"
            loading="eager"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
