import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Rocket, Brain, Zap, Clock } from "lucide-react";

const professions = [
  { icon: Brain, title: "AI uzmanları", desc: "Prompt mühendisleri, AI eğitmenleri, ML analistleri" },
  { icon: Rocket, title: "No-code geliştiriciler", desc: "Kod yazmadan ürün oluşturma" },
  { icon: Zap, title: "Dijital pazarlamacılar", desc: "Pazarlama otomasyonu uzmanları" },
];

const skills = [
  "AI araçlarıyla çalışma",
  "Analitik düşünme",
  "Uzaktan iletişim",
  "Öz organizasyon",
];

const ForecastSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} id="forecast" className="section-padding bg-background">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="section-title mb-1">2027–2028 <span className="text-gradient">Öngörüsü</span></h2>
          <p className="text-muted-foreground text-sm mb-8 lg:text-base">
            Hangi meslekler büyüyecek ve neden şimdi başlamak gerekiyor
          </p>
        </motion.div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-6">
          <div className="space-y-3 mb-6 lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 lg:mb-0">
            {professions.map((p, i) => (
              <motion.div
                key={i}
                className="card-elevated flex items-start gap-3 lg:gap-4"
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1 }}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center flex-shrink-0">
                  <p.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground lg:text-base">{p.title}</p>
                  <p className="text-xs text-muted-foreground lg:text-sm">{p.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* Why now card */}
            <motion.div
              className="flex items-start gap-3 p-4 rounded-xl bg-accent/10 border border-accent/20"
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground leading-relaxed">
                <strong>Neden şimdi?</strong> Pazar şu anda şekilleniyor. 2025–2026'da başlayanlar, 2028'de en iyi pozisyonları alacak.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="card-elevated"
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <p className="font-semibold text-sm text-foreground mb-3 lg:text-base">
              Zorunlu olacak beceriler:
            </p>
            <div className="space-y-3">
              {skills.map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent flex-shrink-0" />
                  <span className="text-sm text-foreground">{s}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ForecastSection;
