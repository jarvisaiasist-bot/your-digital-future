import { motion, AnimatePresence } from "framer-motion";

interface StickyCTAProps {
  visible: boolean;
  onClick: () => void;
}

const StickyCTA = ({ visible, onClick }: StickyCTAProps) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
          style={{ background: "linear-gradient(transparent, hsl(var(--background)) 30%)" }}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
        >
          <button onClick={onClick} className="cta-button w-full max-w-lg mx-auto block">
            Получить консультацию
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;
