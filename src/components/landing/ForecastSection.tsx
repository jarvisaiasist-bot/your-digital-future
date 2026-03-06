import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CalendarDays, UserRound, Headset, Target } from "lucide-react";

const steps = [
  { icon: CalendarDays, title: "Süre", desc: "Program süresi: 2 haftadan başlar" },
  { icon: UserRound, title: "Kişisel mentor", desc: "Program boyunca size özel eğitmen/mentor desteği" },
  { icon: Headset, title: "7/24 destek", desc: "Sorularınız için sürekli teknik ve eğitim desteği" },
  { icon: Target, title: "Bireysel yaklaşım", desc: "Her katılımcı için seviyeye göre kişisel ilerleme planı" },
];

const trust = [
  "İlk 3 gün ücretsiz",
  "Programlar 100 USD’den başlar",
  "2 hafta ve üzeri eğitim seçenekleri",
  "7/24 destek",
  "Sahada çalışan finans uzmanlarıyla eğitim",
];

const ForecastSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} id="forecast" className="section-padding bg-background">
      <div className="container-narrow">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <h2 className="section-title mb-1">
            Eğitim <span className="text-gradient">nasıl ilerler?</span>
          </h2>
          <p className="text-muted-foreground text-sm mb-8 lg:text-base">
            Program baştan sona yapılandırılmış, uygulama odaklı ve takip edilebilir şekilde tasarlanmıştır.
          </p>
        </motion.div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-6">
          <div className="space-y-3 mb-6 lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 lg:mb-0">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                className="card-elevated flex items-start gap-3 lg:gap-4"
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1 }}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground lg:text-base">{s.title}</p>
                  <p className="text-xs text-muted-foreground lg:text-sm">{s.desc}</p>
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
            <p className="font-semibold text-sm text-foreground mb-3 lg:text-base">Güven ve şeffaflık:</p>
            <div className="space-y-3">
              {trust.map((s, i) => (
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
