import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MessageCircle, Mail, Send } from "lucide-react";

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (!digits) return "";
  let formatted = "+7";
  if (digits.length > 1) formatted += " (" + digits.slice(1, 4);
  if (digits.length > 4) formatted += ") " + digits.slice(4, 7);
  if (digits.length > 7) formatted += "-" + digits.slice(7, 9);
  if (digits.length > 9) formatted += "-" + digits.slice(9, 11);
  return formatted;
};

const FinalCTA = () => {
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const withPrefix = raw.startsWith("7") ? raw : raw.startsWith("8") ? "7" + raw.slice(1) : "7" + raw;
    setPhone(formatPhone(withPrefix));
  };

  const handleSubmit = () => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 11) { setError("Введите корректный номер"); return; }
    if (!consent) { setError("Необходимо согласие"); return; }
    setError("");
    window.dispatchEvent(new CustomEvent("analytics", { detail: { event: "form_submit", source: "final_cta" } }));
    setSubmitted(true);
  };

  return (
    <section ref={ref} className="section-padding bg-primary" id="privacy">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-6"
        >
          <h2 className="font-display text-2xl font-bold mb-2" style={{ color: "hsl(var(--primary-foreground))" }}>
            Начните менять свою жизнь сегодня
          </h2>
          <p className="text-sm opacity-80" style={{ color: "hsl(var(--primary-foreground))" }}>
            Оставьте номер — мы перезвоним и бесплатно подберём профессию
          </p>
        </motion.div>

        {!submitted ? (
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            <input
              className="input-field"
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={handlePhoneChange}
              type="tel"
              inputMode="numeric"
            />
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1"
              />
              <span className="text-xs opacity-70" style={{ color: "hsl(var(--primary-foreground))" }}>
                Даю согласие на обработку персональных данных
              </span>
            </label>
            {error && <p className="text-xs" style={{ color: "hsl(0, 100%, 80%)" }}>{error}</p>}
            <button onClick={handleSubmit} className="cta-button w-full">
              Оставить номер — мы перезвоним
            </button>
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-4xl mb-3">✅</div>
            <p className="font-bold text-lg" style={{ color: "hsl(var(--primary-foreground))" }}>Спасибо! Мы скоро перезвоним.</p>
          </motion.div>
        )}

        {/* Contacts */}
        <motion.div
          className="flex justify-center gap-6 mt-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <a href="https://t.me/skyshift" className="flex items-center gap-1.5 text-sm opacity-80 hover:opacity-100 transition-opacity" style={{ color: "hsl(var(--primary-foreground))" }}>
            <Send className="w-4 h-4" /> Telegram
          </a>
          <a href="https://wa.me/79001234567" className="flex items-center gap-1.5 text-sm opacity-80 hover:opacity-100 transition-opacity" style={{ color: "hsl(var(--primary-foreground))" }}>
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
          <a href="mailto:hello@skyshift.ru" className="flex items-center gap-1.5 text-sm opacity-80 hover:opacity-100 transition-opacity" style={{ color: "hsl(var(--primary-foreground))" }}>
            <Mail className="w-4 h-4" /> Email
          </a>
        </motion.div>

        {/* Privacy */}
        <p className="text-center text-xs mt-6 opacity-50" style={{ color: "hsl(var(--primary-foreground))" }}>
          © 2025 Skyshift. Политика конфиденциальности: мы не передаём ваши данные третьим лицам
          и используем их исключительно для связи с вами.
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
