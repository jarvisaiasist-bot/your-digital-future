import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";

interface CasesSectionProps {
  onInView: () => void;
}

const cases = [
  { name: "Василий", from: "Охранник магазина", to: "Аналитик в blockchain", duration: "6 мес", avatar: "В", color: "bg-primary" },
  { name: "Пётр", from: "Водитель такси", to: "AI-инженер", duration: "8 мес", avatar: "П", color: "bg-accent" },
  { name: "Марина", from: "Бухгалтер", to: "UX-дизайнер", duration: "5 мес", avatar: "М", color: "bg-success" },
  { name: "Дмитрий", from: "Менеджер по продажам", to: "Product-менеджер", duration: "4 мес", avatar: "Д", color: "bg-primary" },
  { name: "Елена", from: "Учитель", to: "SMM-специалист", duration: "3 мес", avatar: "Е", color: "bg-accent" },
  { name: "Алексей", from: "Строитель", to: "Frontend-разработчик", duration: "9 мес", avatar: "А", color: "bg-success" },
  { name: "Ольга", from: "Кассир", to: "Таргетолог", duration: "4 мес", avatar: "О", color: "bg-primary" },
  { name: "Игорь", from: "Электрик", to: "Data Scientist", duration: "10 мес", avatar: "И", color: "bg-accent" },
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
          <h2 className="section-title mb-1">Реальные кейсы</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Люди, которые уже сменили профессию с нашей помощью
          </p>
        </motion.div>

        <div className="space-y-3">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              className="card-elevated flex items-center gap-3"
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.07 }}
            >
              <div className={`w-11 h-11 rounded-full ${c.color} flex items-center justify-center flex-shrink-0`}>
                <span className="text-sm font-bold" style={{ color: "hsl(var(--primary-foreground))" }}>{c.avatar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground">{c.name}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="truncate">{c.from}</span>
                  <ArrowRight className="w-3 h-3 flex-shrink-0 text-accent" />
                  <span className="truncate font-medium text-foreground">{c.to}</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-primary whitespace-nowrap">{c.duration}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
