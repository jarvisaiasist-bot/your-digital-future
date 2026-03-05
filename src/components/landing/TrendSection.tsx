import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TrendingUp, Users, Globe } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";

const data = [
  { year: "2020", value: 12 },
  { year: "2021", value: 18 },
  { year: "2022", value: 27 },
  { year: "2023", value: 38 },
  { year: "2024", value: 52 },
  { year: "2025", value: 64 },
];

const insights = [
  { icon: TrendingUp, text: "Количество онлайн-специалистов выросло в 5 раз за 5 лет" },
  { icon: Users, text: "78% компаний нанимают удалённых сотрудников" },
  { icon: Globe, text: "Средний доход в digital на 40% выше оффлайн-профессий" },
];

const TrendSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="section-padding bg-card">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title mb-2">Онлайн-работа — это тренд</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Миллионы людей уже перешли в digital. И их число растёт каждый год.
          </p>
        </motion.div>

        {/* Chart */}
        <motion.div
          className="card-elevated mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <p className="text-xs text-muted-foreground mb-3 font-medium">
            Онлайн-специалисты в России (млн чел.)
          </p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={data} barCategoryGap="20%">
              <XAxis dataKey="year" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {data.map((_, i) => (
                  <Cell
                    key={i}
                    fill={i === data.length - 1 ? "hsl(15, 85%, 57%)" : "hsl(220, 65%, 48%)"}
                    fillOpacity={i === data.length - 1 ? 1 : 0.6 + i * 0.08}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Insights */}
        <div className="space-y-3">
          {insights.map((item, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-3 p-3 rounded-xl bg-muted"
              initial={{ opacity: 0, x: -15 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <item.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-foreground font-medium">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendSection;
