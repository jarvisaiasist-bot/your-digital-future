import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Rocket, Brain, Zap, Clock } from "lucide-react";

const professions = [
  { icon: Brain, title: "AI-специалисты", desc: "Промпт-инженеры, AI-тренеры, ML-аналитики" },
  { icon: Rocket, title: "No-code разработчики", desc: "Создание продуктов без написания кода" },
  { icon: Zap, title: "Digital-маркетологи", desc: "Специалисты по автоматизации маркетинга" },
];

const skills = [
  "Работа с AI-инструментами",
  "Аналитическое мышление",
  "Удалённая коммуникация",
  "Самоорганизация",
];

const ForecastSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="section-padding bg-background">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="section-title mb-1">Прогноз 2027–2028</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Какие профессии будут востребованы и почему начинать нужно сейчас
          </p>
        </motion.div>

        <div className="space-y-3 mb-6">
          {professions.map((p, i) => (
            <motion.div
              key={i}
              className="card-elevated flex items-start gap-3"
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1 }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <p.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{p.title}</p>
                <p className="text-xs text-muted-foreground">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="card-elevated"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <p className="font-semibold text-sm text-foreground mb-3">
            Навыки, которые станут обязательными:
          </p>
          <div className="space-y-2">
            {skills.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                <span className="text-sm text-foreground">{s}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-accent/10 border border-accent/20"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <p className="text-sm text-foreground leading-relaxed">
            <strong>Почему сейчас?</strong> Рынок формируется прямо сейчас. Те, кто начнёт в 2025–2026, займут лучшие позиции к 2028 году.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ForecastSection;
