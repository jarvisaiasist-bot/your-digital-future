import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { submitLead } from "@/lib/submitLead";

interface PopupFormProps {
  isOpen: boolean;
  onClose: () => void;
}

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

const PopupForm = ({ isOpen, onClose }: PopupFormProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const phoneRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => phoneRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Adınızı girin";
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 12) e.phone = "Geçerli bir numara girin";
    if (!age || +age < 16 || +age > 80) e.age = "Yaş belirtin (16–80)";
    if (!city.trim()) e.city = "Şehir belirtin";
    if (!consent) e.consent = "Onay gerekli";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    if (sending) return;

    setSending(true);
    try {
      await submitLead({
        source: "popup",
        name: name.trim(),
        phone,
        age,
        city: city.trim(),
        consent,
      });
      window.dispatchEvent(new CustomEvent("analytics", { detail: { event: "form_submit", source: "popup" } }));
      setSubmitted(true);
    } catch (e) {
      setErrors((prev) => ({ ...prev, submit: "Gönderim hatası. Lütfen tekrar deneyin." }));
    } finally {
      setSending(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const withPrefix = raw.startsWith("90") ? raw : "90" + raw.replace(/^0+/, "");
    setPhone(formatPhone(withPrefix));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-md mx-4 mb-0 sm:mb-0 rounded-t-2xl sm:rounded-2xl p-6 bg-card"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <>
                <h3 className="font-display font-bold text-lg text-foreground mb-1">
                  Uzmanlarımız sizinle iletişime geçecek
                </h3>
                <p className="text-muted-foreground text-sm mb-5">
                  ve yeni fırsatları keşfetmenize yardımcı olacak
                </p>

                <div className="space-y-3">
                  <div>
                    <input className="input-field" placeholder="Ad" value={name} onChange={(e) => setName(e.target.value)} />
                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input ref={phoneRef} className="input-field" placeholder="+90 (___) ___ __ __" value={phone} onChange={handlePhoneChange} type="tel" inputMode="numeric" />
                    {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <input className="input-field" placeholder="Yaş" value={age} onChange={(e) => setAge(e.target.value.replace(/\D/g, "").slice(0, 2))} type="text" inputMode="numeric" />
                    {errors.age && <p className="text-destructive text-xs mt-1">{errors.age}</p>}
                  </div>
                  <div>
                    <input className="input-field" placeholder="Şehir" value={city} onChange={(e) => setCity(e.target.value)} />
                    {errors.city && <p className="text-destructive text-xs mt-1">{errors.city}</p>}
                  </div>

                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 accent-primary" />
                    <span className="text-xs text-muted-foreground leading-tight">
                      <a href="#privacy" className="text-primary underline">Gizlilik politikası</a> kapsamında kişisel verilerin işlenmesine onay veriyorum
                    </span>
                  </label>
                  {errors.consent && <p className="text-destructive text-xs">{errors.consent}</p>}

                  <button onClick={handleSubmit} className="cta-button w-full disabled:opacity-60" disabled={sending}>
                    {sending ? "Gönderiliyor..." : "Danışmanlık Al"}
                  </button>
                  {errors.submit && <p className="text-destructive text-xs">{errors.submit}</p>}

                  <p className="text-center text-xs text-muted-foreground">
                    🔒 Verileriniz korunmaktadır. Spam ve rahatsız edici aramalar yapılmaz.
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">Başvurunuz gönderildi!</h3>
                <p className="text-muted-foreground text-sm">
                  15 dakika içinde sizinle iletişime geçeceğiz.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupForm;
