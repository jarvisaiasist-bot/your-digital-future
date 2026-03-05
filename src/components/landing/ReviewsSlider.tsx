import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const reviews = [
  { name: "Aylin K.", age: 28, text: "4 ayda UX tasarımı öğrendim. Şimdi freelance çalışıyorum ve önceki işimden daha fazla kazanıyorum.", avatar: "A", color: "bg-primary" },
  { name: "Serkan M.", age: 35, text: "35 yaşında meslek değiştirmekten korkuyordum. Ama Skyshift ekibi tüm süreçte elimi tuttu. Şimdi frontend geliştiriciyim.", avatar: "S", color: "bg-accent" },
  { name: "İrem V.", age: 42, text: "IT'nin gençlere özel olduğunu düşünüyordum. Yanılmışım! 5 ayda test mühendisi oldum. Destekleri için teşekkürler!", avatar: "İ", color: "bg-success" },
  { name: "Murat D.", age: 25, text: "Danışmanlık sayesinde veri analitiğinin bana uygun olduğunu anladım. Yarım yılda büyük bir şirketten teklif aldım.", avatar: "M", color: "bg-primary" },
  { name: "Zeynep T.", age: 31, text: "Satıcıydım, şimdi içerik yazarıyım ve 3 kat daha fazla kazanıyorum. Geçiş planı çok netti.", avatar: "Z", color: "bg-accent" },
  { name: "Onur L.", age: 29, text: "Skyshift sadece eğitim vermiyor, gerçekten iş bulmana yardım ediyor. İlk müşterime kadar yanımdaydılar.", avatar: "O", color: "bg-success" },
  { name: "Nazlı G.", age: 38, text: "İkinci doğum izni sırasında ofise dönmemeye karar verdim. Şimdi uzaktan proje yöneticisi olarak çalışıyorum.", avatar: "N", color: "bg-primary" },
  { name: "Cem B.", age: 23, text: "Üniversiteden sonra iş bulamıyordum. 3 ayda junior geliştirici oldum. Hayatımın en iyi kararı!", avatar: "C", color: "bg-accent" },
];

const ReviewsSlider = () => {
  const [current, setCurrent] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const next = useCallback(() => setCurrent((p) => (p + 1) % reviews.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + reviews.length) % reviews.length), []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  const review = reviews[current];

  return (
    <section ref={ref} id="reviews" className="section-padding bg-card">
      <div className="container-narrow">
        <div className="lg:grid lg:grid-cols-5 lg:gap-12 lg:items-center">
          <div className="lg:col-span-2">
            <motion.h2
              className="section-title mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
            >
              Mezunlarımızın <span className="text-gradient">yorumları</span>
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-sm mb-6 lg:text-base lg:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              Binlerce kişi hayatını değiştirdi. İşte onların hikayeleri.
            </motion.p>
          </div>

          <motion.div
            className="lg:col-span-3 card-elevated relative"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            <Quote className="w-8 h-8 text-primary/20 mb-2" />
            <p className="text-sm text-foreground leading-relaxed min-h-[4.5rem] lg:text-base lg:min-h-[3.5rem]">
              «{review.text}»
            </p>

            <div className="flex items-center gap-3 mt-4 mb-4">
              <div className={`w-11 h-11 rounded-full ${review.color} flex items-center justify-center`}>
                <span className="text-sm font-bold" style={{ color: "hsl(var(--primary-foreground))" }}>{review.avatar}</span>
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{review.name}</p>
                <p className="text-xs text-muted-foreground">{review.age} yaşında</p>
              </div>
              <div className="flex gap-0.5 ml-auto">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button onClick={prev} className="p-2 rounded-full bg-muted hover:bg-primary/10 transition-colors" aria-label="Önceki yorum">
                <ChevronLeft className="w-4 h-4 text-foreground" />
              </button>
              <div className="flex gap-1.5">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === current ? "bg-primary w-6" : "bg-border hover:bg-muted-foreground/30"
                    }`}
                    aria-label={`Yorum ${i + 1}`}
                  />
                ))}
              </div>
              <button onClick={next} className="p-2 rounded-full bg-muted hover:bg-primary/10 transition-colors" aria-label="Sonraki yorum">
                <ChevronRight className="w-4 h-4 text-foreground" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSlider;
