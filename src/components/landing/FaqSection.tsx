import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const faqs = [
  {
    q: "Sıfırdan başlayabilir miyim?",
    a: "Evet. Program yeni başlayanlar için yapılandırılmıştır ve temel seviyeden başlar.",
  },
  {
    q: "Program sonunda online çalışma mümkün mü?",
    a: "Program, online rol ve proje fırsatlarına hazırlanmanıza yardımcı olur. Uygun adaylar için yönlendirme desteği sunulur.",
  },
  {
    q: "İş veya gelir garantisi var mı?",
    a: "Hayır. Garanti verilmez. Sonuçlar kişisel çaba, deneyim ve piyasa koşullarına göre değişir.",
  },
  {
    q: "Eğitim süresince destek alacak mıyım?",
    a: "Evet. Uzman ekip tüm aşamalarda düzenli geri bildirim ve mentorluk desteği sağlar.",
  },
];

const FaqSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="faq" ref={ref} className="section-padding bg-background">
      <div className="container-narrow">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <h2 className="section-title mb-2">Sık sorulan <span className="text-gradient">sorular</span></h2>
          <p className="text-muted-foreground text-sm mb-8 lg:text-base">Karar vermeden önce en çok sorulan konular.</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((item, i) => (
            <motion.div
              key={i}
              className="card-elevated"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05 + i * 0.07 }}
            >
              <p className="font-semibold text-sm lg:text-base mb-1">{item.q}</p>
              <p className="text-xs lg:text-sm text-muted-foreground">{item.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
