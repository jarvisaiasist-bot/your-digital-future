import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail } from "lucide-react";

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 12);
  if (!digits) return "";
  let formatted = "+90";
  if (digits.length > 2) formatted += " (" + digits.slice(2, 5);
  if (digits.length > 5) formatted += ") " + digits.slice(5, 8);
  if (digits.length > 8) formatted += " " + digits.slice(8, 10);
  if (digits.length > 10) formatted += " " + digits.slice(10, 12);
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
    const withPrefix = raw.startsWith("90") ? raw : "90" + raw.replace(/^0+/, "");
    setPhone(formatPhone(withPrefix));
  };

  const handleSubmit = () => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 12) { setError("Geçerli bir numara girin"); return; }
    if (!consent) { setError("Onay gerekli"); return; }
    setError("");
    window.dispatchEvent(new CustomEvent("analytics", { detail: { event: "form_submit", source: "final_cta" } }));
    setSubmitted(true);
  };

  return (
    <section ref={ref} id="contact" className="section-padding relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.85))" }}>
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: "hsl(var(--accent))" }} />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-10" style={{ background: "hsl(var(--primary-foreground))" }} />

      <div className="container-narrow relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            <h2 className="font-display text-2xl font-bold mb-3 lg:text-4xl" style={{ color: "hsl(var(--primary-foreground))" }}>
              Hayatınızı bugün değiştirmeye başlayın
            </h2>
            <p className="text-base opacity-80 mb-6 lg:text-lg" style={{ color: "hsl(var(--primary-foreground))" }}>
              Numaranızı bırakın — sizi arayalım ve ücretsiz meslek seçmenize yardımcı olalım
            </p>

            {/* Contacts */}
            <motion.div
              className="flex gap-4 mb-8 lg:mb-0"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              <a href="mailto:hello@skyshift.com.tr" className="flex items-center gap-1.5 text-sm opacity-80 hover:opacity-100 transition-opacity" style={{ color: "hsl(var(--primary-foreground))" }}>
                <Mail className="w-4 h-4" /> Email
              </a>
            </motion.div>
          </motion.div>

          <div>
            {!submitted ? (
              <motion.div
                className="glass-card p-6 space-y-3"
                style={{ background: "hsl(var(--primary-foreground) / 0.1)", borderColor: "hsl(var(--primary-foreground) / 0.2)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 }}
              >
                <input
                  className="input-field"
                  placeholder="+90 (___) ___ __ __"
                  value={phone}
                  onChange={handlePhoneChange}
                  type="tel"
                  inputMode="numeric"
                />
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
                  <span className="text-xs opacity-80" style={{ color: "hsl(var(--primary-foreground))" }}>
                    Kişisel verilerin işlenmesine onay veriyorum
                  </span>
                </label>
                {error && <p className="text-xs" style={{ color: "hsl(0, 100%, 80%)" }}>{error}</p>}
                <button onClick={handleSubmit} className="cta-button w-full" style={{ background: "hsl(var(--primary-foreground))", color: "hsl(var(--primary))" }}>
                  Numaranızı bırakın — sizi arayacağız
                </button>
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="text-4xl mb-3">✅</div>
                <p className="font-bold text-lg" style={{ color: "hsl(var(--primary-foreground))" }}>Teşekkürler! Yakında sizi arayacağız.</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Privacy */}
        <p className="text-center text-xs mt-8 opacity-50" style={{ color: "hsl(var(--primary-foreground))" }}>
          © 2025 Skyshift. Gizlilik politikası: Verilerinizi üçüncü taraflarla paylaşmıyoruz
          ve yalnızca sizinle iletişim kurmak için kullanıyoruz.
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
