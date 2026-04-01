import { AnimatePresence, motion } from "motion/react";

interface PopupModalProps {
  message: string | null;
  onClose: () => void;
}

export function PopupModal({ message, onClose }: PopupModalProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-[9000] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/70" />
          <motion.div
            className="relative pop-in rounded-2xl p-8 max-w-sm w-full text-center"
            style={{
              background: "#12121A",
              border: "2px solid #FF3BD4",
              boxShadow: "0 0 30px #FF3BD4, 0 0 60px #FF3BD480",
            }}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.3, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.3, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="text-4xl mb-4">🚨</div>
            <p
              className="text-white text-lg font-bold mb-6 leading-tight"
              style={{ fontFamily: "Anton, Impact, sans-serif" }}
            >
              {message}
            </p>
            <button
              type="button"
              data-ocid="popup.close_button"
              onClick={onClose}
              className="px-6 py-2 rounded-full text-black font-bold text-sm transition-transform hover:scale-105 active:scale-95"
              style={{ background: "#FF3BD4" }}
            >
              OK FINE 😒
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
