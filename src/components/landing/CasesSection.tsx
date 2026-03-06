import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircle } from "lucide-react";

interface CasesSectionProps {
  onInView: () => void;
}

const audience = [
  "Dijital finans araçlarını sıfırdan öğrenmek isteyenler",
  "Finansal piyasaların çalışma mantığını anlamak isteyenler",
  "Finans alanında AI kullanımını öğrenmek isteyenler",
  "Uluslararası ödeme sistemlerini kavramak isteyenler",
  "Kişisel finans yönetimini güçlendirmek isteyenler",
  "Uzman desteğiyle yapılandırılmış bir program arayanlar",
];

const CasesSection = ({ onInView }: CasesSectionProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
    onChange: (visible) => {
      if (visible) onInView();
    },
  });

  return (
    <section ref={ref} id="cases" className="section-padding bg-background">
      <div className="container-narrow">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <h2 className="section-title mb-1">
            Program <span className="text-gradient">kimler için uygun?</span>
          </h2>
          <p className="text-muted-foreground text-sm mb-8 lg:text-base">
            Aşağıdaki hedeflere sahipseniz program sizin için tasarlandı.
          </p>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {audience.map((item, i) => (
            <motion.div
              key={i}
              className="card-elevated flex items-start gap-3"
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 + i * 0.05 }}
            >
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground lg:text-base">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
