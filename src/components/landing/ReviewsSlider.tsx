import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  { name: "Анна К.", age: 28, text: "За 4 месяца освоила UX-дизайн. Уже работаю на фрилансе и зарабатываю больше, чем на прошлой работе.", avatar: "А", color: "bg-primary" },
  { name: "Сергей М.", age: 35, text: "Боялся менять профессию в 35. Но ребята из Skyshift буквально за руку провели через весь путь. Теперь я frontend-разработчик.", avatar: "С", color: "bg-accent" },
  { name: "Ирина В.", age: 42, text: "Мне казалось, что IT — это для молодых. Ошибалась! Через 5 месяцев стала тестировщиком. Спасибо за поддержку!", avatar: "И", color: "bg-success" },
  { name: "Максим Д.", age: 25, text: "Консультация помогла понять, что мне подходит аналитика данных. Через полгода получил оффер в крупную компанию.", avatar: "М", color: "bg-primary" },
  { name: "Ольга Т.", age: 31, text: "Работала продавцом, а сейчас — копирайтер с доходом x3. План перехода был очень чётким.", avatar: "О", color: "bg-accent" },
  { name: "Роман Л.", age: 29, text: "Skyshift не просто учат, а реально помогают найти работу. Меня буквально довели до первого клиента.", avatar: "Р", color: "bg-success" },
  { name: "Наталья Г.", age: 38, text: "Второй декрет — и я решила не возвращаться в офис. Теперь работаю удалённо как проектный менеджер.", avatar: "Н", color: "bg-primary" },
  { name: "Артём Б.", age: 23, text: "После университета не мог найти работу. За 3 месяца стал junior-разработчиком. Лучшее решение в жизни!", avatar: "А", color: "bg-accent" },
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
    <section ref={ref} className="section-padding bg-card">
      <div className="container-narrow">
        <motion.h2
          className="section-title mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          Отзывы наших выпускников
        </motion.h2>

        <motion.div
          className="card-elevated relative"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-11 h-11 rounded-full ${review.color} flex items-center justify-center`}>
              <span className="text-sm font-bold" style={{ color: "hsl(var(--primary-foreground))" }}>{review.avatar}</span>
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground">{review.name}</p>
              <p className="text-xs text-muted-foreground">{review.age} лет</p>
            </div>
          </div>

          <div className="flex gap-0.5 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-accent text-accent" />
            ))}
          </div>

          <p className="text-sm text-foreground leading-relaxed min-h-[4.5rem]">
            «{review.text}»
          </p>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-4">
            <button onClick={prev} className="p-2 rounded-full bg-muted" aria-label="Предыдущий отзыв">
              <ChevronLeft className="w-4 h-4 text-foreground" />
            </button>
            <div className="flex gap-1.5">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? "bg-primary w-5" : "bg-border"
                  }`}
                  aria-label={`Отзыв ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={next} className="p-2 rounded-full bg-muted" aria-label="Следующий отзыв">
              <ChevronRight className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSlider;
