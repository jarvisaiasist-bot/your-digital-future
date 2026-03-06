import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail } from "lucide-react";
import { submitLead } from "@/lib/submitLead";

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
  const [consent, setConsent] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const withPrefix = raw.startsWith("90") ? raw : "90" + raw.replace(/^0+/, "");
    setPhone(formatPhone(withPrefix));
  };

  const handleSubmit = async () => {
    if (sending) return;
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 12) { setError("Geçerli bir numara girin"); return; }
    if (!consent) { setError("Onay gerekli"); return; }
    setError("");

    setSending(true);
    try {
      await submitLead({
        source: "final_cta",
        phone,
        consent,
      });
      window.dispatchEvent(new CustomEvent("analytics", { detail: { event: "form_submit", source: "final_cta" } }));
      setSubmitted(true);
    } catch (e) {
      setError("Gönderim hatası. Lütfen tekrar deneyin");
    } finally {
      setSending(false);
    }
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
              Ücretsiz ön görüşme ile başlayın
            </h2>
            <p className="text-base opacity-80 mb-6 lg:text-lg" style={{ color: "hsl(var(--primary-foreground))" }}>
              Hedefinize uygun programı birlikte belirleyelim. İçerik ve süreç hakkında net bilgi verelim.
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
                    <a href="/privacy" className="underline">Gizlilik politikası</a> kapsamında kişisel verilerin işlenmesine onay veriyorum
                  </span>
                </label>
                {error && <p className="text-xs" style={{ color: "hsl(0, 100%, 80%)" }}>{error}</p>}
                <button onClick={handleSubmit} disabled={sending} className="cta-button w-full disabled:opacity-60" style={{ background: "hsl(var(--primary-foreground))", color: "hsl(var(--primary))" }}>
                  {sending ? "Gönderiliyor..." : "Ücretsiz Ön Görüşme Talep Et"}
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
        <div className="text-center text-xs mt-8 opacity-70 space-y-2" style={{ color: "hsl(var(--primary-foreground))" }}>
          <p>© 2026 Skyshift. Bu site eğitim programları için ön başvuru içindir.</p>
          <p className="space-x-3">
            <a href="/privacy" className="underline">Gizlilik</a>
            <a href="/terms" className="underline">Kullanım Şartları</a>
            <a href="/refund" className="underline">İptal/İade</a>
            <a href="/contact-info" className="underline">İletişim</a>
          </p>
          <p>Eğitim içerikleri yatırım tavsiyesi değildir; sonuçlar kişiye göre değişebilir.</p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
