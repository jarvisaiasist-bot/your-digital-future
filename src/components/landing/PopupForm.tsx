import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface PopupFormProps {
  isOpen: boolean;
  onClose: () => void;
}

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

const PopupForm = ({ isOpen, onClose }: PopupFormProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const phoneRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => phoneRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Введите имя";
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 11) e.phone = "Введите корректный номер";
    if (!age || +age < 16 || +age > 80) e.age = "Укажите возраст (16–80)";
    if (!city.trim()) e.city = "Укажите город";
    if (!consent) e.consent = "Необходимо согласие";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    // Analytics event
    window.dispatchEvent(new CustomEvent("analytics", { detail: { event: "form_submit", source: "popup" } }));
    setSubmitted(true);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const withPrefix = raw.startsWith("7") ? raw : raw.startsWith("8") ? "7" + raw.slice(1) : "7" + raw;
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
            <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground">
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <>
                <h3 className="font-display font-bold text-lg text-foreground mb-1">
                  Наши специалисты свяжутся с&nbsp;вами
                </h3>
                <p className="text-muted-foreground text-sm mb-5">
                  и помогут освоить новые возможности
                </p>

                <div className="space-y-3">
                  <div>
                    <input
                      className="input-field"
                      placeholder="Имя"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      ref={phoneRef}
                      className="input-field"
                      placeholder="+7 (___) ___-__-__"
                      value={phone}
                      onChange={handlePhoneChange}
                      type="tel"
                      inputMode="numeric"
                    />
                    {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <input
                      className="input-field"
                      placeholder="Возраст"
                      value={age}
                      onChange={(e) => setAge(e.target.value.replace(/\D/g, "").slice(0, 2))}
                      type="text"
                      inputMode="numeric"
                    />
                    {errors.age && <p className="text-destructive text-xs mt-1">{errors.age}</p>}
                  </div>
                  <div>
                    <input
                      className="input-field"
                      placeholder="Город"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    {errors.city && <p className="text-destructive text-xs mt-1">{errors.city}</p>}
                  </div>

                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 accent-primary"
                    />
                    <span className="text-xs text-muted-foreground leading-tight">
                      Даю согласие на обработку персональных данных в&nbsp;соответствии с{" "}
                      <a href="#privacy" className="text-primary underline">политикой конфиденциальности</a>
                    </span>
                  </label>
                  {errors.consent && <p className="text-destructive text-xs">{errors.consent}</p>}

                  <button onClick={handleSubmit} className="cta-button w-full">
                    Получить консультацию
                  </button>

                  <p className="text-center text-xs text-muted-foreground">
                    🔒 Данные защищены. Без спама и&nbsp;навязчивых звонков.
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">Заявка отправлена!</h3>
                <p className="text-muted-foreground text-sm">
                  Мы свяжемся с вами в течение 15 минут.
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
