import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Compass, BookOpen, Briefcase, Headset } from "lucide-react";

const steps = [
  {
    icon: Compass,
    title: "1. Yön belirleme",
    desc: "Mevcut seviyenize göre hedef rol ve öğrenme planı belirlenir.",
  },
  {
    icon: BookOpen,
    title: "2. Uygulamalı eğitim",
    desc: "Finansal okuryazarlık, dijital araçlar ve gerçek senaryolarla pratik çalışma.",
  },
  {
    icon: Briefcase,
    title: "3. Online role hazırlık",
    desc: "Portföy, profil ve görev yaklaşımı ile online iş/proje fırsatlarına hazırlık.",
  },
  {
    icon: Headset,
    title: "4. Sürekli mentorluk desteği",
    desc: "Uzmanlarımız tüm aşamalarda size düzenli geri bildirim ve yönlendirme sağlar.",
  },
];

const JourneySection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="journey" ref={ref} className="section-padding bg-card">
      <div className="container-narrow">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <h2 className="section-title mb-2">Online çalışmaya geçiş için <span className="text-gradient">adım adım yol</span></h2>
          <p className="text-muted-foreground text-sm mb-8 lg:text-base">
            Hedefimiz sizi eğitimden sonra online çalışma fırsatlarına daha hazır hale getirmek.
          </p>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="card-elevated flex items-start gap-3"
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 + i * 0.08 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center flex-shrink-0">
                <step.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground lg:text-base">{step.title}</p>
                <p className="text-xs text-muted-foreground lg:text-sm">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          Not: İş veya gelir garantisi verilmez; sonuçlar kişisel çaba, deneyim ve piyasa koşullarına göre değişebilir.
        </p>
      </div>
    </section>
  );
};

export default JourneySection;
