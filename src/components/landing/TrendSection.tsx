import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TrendingUp, Users, Globe } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";

const data = [
  { year: "2020", value: 8 },
  { year: "2021", value: 14 },
  { year: "2022", value: 22 },
  { year: "2023", value: 35 },
  { year: "2024", value: 48 },
  { year: "2025", value: 61 },
];

const insights = [
  { icon: TrendingUp, text: "Dijital varlık piyasasının yapısı ve temel/ileri seviye piyasa analizi" },
  { icon: Users, text: "AI ile finansal analiz ve rutin görevlerin otomasyonu" },
  { icon: Globe, text: "Uluslararası bankacılık yapısı ve küresel ödeme altyapıları" },
];

const TrendSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} id="trend" className="section-padding bg-card">
      <div className="container-narrow">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
          {/* Left: Chart */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
            >
              <h2 className="section-title mb-2">Programda <span className="text-gradient">neler öğreneceksiniz?</span></h2>
              <p className="text-muted-foreground text-sm mb-6 lg:text-base">
                Modern finansın temelini, dijital araçları ve uluslararası ödeme sistemlerini uygulamalı şekilde öğreneceksiniz.
              </p>
            </motion.div>

            <motion.div
              className="card-elevated mb-6 lg:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <p className="text-xs text-muted-foreground mb-3 font-medium">
                Finansal piyasalar, analiz yöntemleri ve risk yönetimi modülü
              </p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data} barCategoryGap="20%">
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {data.map((_, i) => (
                      <Cell
                        key={i}
                        fill={i === data.length - 1 ? "hsl(340, 80%, 55%)" : "hsl(250, 60%, 52%)"}
                        fillOpacity={i === data.length - 1 ? 1 : 0.5 + i * 0.1}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Right: Insights */}
          <div className="space-y-4 lg:pt-16">
            {insights.map((item, i) => (
              <motion.div
                key={i}
                className="card-elevated flex items-start gap-4"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.12 }}
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm text-foreground font-medium lg:text-base">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendSection;
