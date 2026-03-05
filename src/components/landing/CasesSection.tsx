import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";

interface CasesSectionProps {
  onInView: () => void;
}

const cases = [
  { name: "Emre", from: "Market güvenliği", to: "Blockchain analisti", duration: "6 ay", avatar: "E", color: "bg-primary" },
  { name: "Ahmet", from: "Taksi şoförü", to: "AI mühendisi", duration: "8 ay", avatar: "A", color: "bg-accent" },
  { name: "Ayşe", from: "Muhasebeci", to: "UX tasarımcı", duration: "5 ay", avatar: "AY", color: "bg-success" },
  { name: "Mehmet", from: "Satış müdürü", to: "Ürün yöneticisi", duration: "4 ay", avatar: "M", color: "bg-primary" },
  { name: "Elif", from: "Öğretmen", to: "SMM uzmanı", duration: "3 ay", avatar: "EL", color: "bg-accent" },
  { name: "Can", from: "İnşaat işçisi", to: "Frontend geliştirici", duration: "9 ay", avatar: "C", color: "bg-success" },
  { name: "Zeynep", from: "Kasiyer", to: "Hedefleme uzmanı", duration: "4 ay", avatar: "Z", color: "bg-primary" },
  { name: "Burak", from: "Elektrikçi", to: "Veri bilimci", duration: "10 ay", avatar: "B", color: "bg-accent" },
];

const CasesSection = ({ onInView }: CasesSectionProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
    onChange: (visible) => { if (visible) onInView(); },
  });

  return (
    <section ref={ref} id="cases" className="section-padding bg-background">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="section-title mb-1">Gerçek <span className="text-gradient">başarı hikayeleri</span></h2>
          <p className="text-muted-foreground text-sm mb-8 lg:text-base">
            Skyshift desteğiyle kariyerini dönüştüren kişiler
          </p>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              className="card-elevated flex items-center gap-3 lg:flex-col lg:items-start lg:text-left lg:gap-4"
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.06 }}
            >
              <div className={`w-11 h-11 lg:w-14 lg:h-14 rounded-full ${c.color} flex items-center justify-center flex-shrink-0`}>
                <span className="text-sm lg:text-base font-bold" style={{ color: "hsl(var(--primary-foreground))" }}>{c.avatar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground lg:text-base">{c.name}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground lg:text-sm">
                  <span className="truncate">{c.from}</span>
                  <ArrowRight className="w-3 h-3 flex-shrink-0 text-accent" />
                  <span className="truncate font-medium text-foreground">{c.to}</span>
                </div>
              </div>
              <span className="text-xs font-bold text-primary whitespace-nowrap lg:text-sm">{c.duration}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
