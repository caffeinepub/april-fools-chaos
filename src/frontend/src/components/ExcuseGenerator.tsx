import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { playBoingSound } from "../utils/sounds";

const EXCUSES = [
  "Meri dadi ka birthday tha, isliye kaam nahi kar saka 👵",
  "My WiFi was possessed by a ghost 👻",
  "I was busy saving the world (and also napping) 🦸",
  "Bhai, Thoda risk toh lena padega 💀",
  "The vibes were off today ✨",
  "Mercury was in retrograde bro 🪐",
  "My dog ate my deadline 🐶",
  "I was emotionally unavailable due to a sad meme 😢",
  "Bijli gayi thi, phir wapas aayi, phir main so gaya 💤",
  "I had a philosophical crisis about spreadsheets 🤔",
  "My horoscope said 'rest today' and I'm spiritual 🔮",
  "Traffic tha bhai, even though I WFH 🚗",
  "Main busy tha — busy matlab Netflix 📺",
  "Computer freeze ho gaya tha... permanently 💻",
  "I was stress-testing my bed for structural integrity 🛏️",
  "My alarm clock and I had a disagreement ⏰",
  "Chai bana raha tha, pura 3 ghante lag gaye ☕",
  "I was manifesting success instead of doing work 🧘",
  "Auto-correct ne mera kaam uda diya 📱",
  "My brain went on a government holiday 🧠",
];

export function ExcuseGenerator() {
  const [excuse, setExcuse] = useState<string | null>(null);
  const [key, setKey] = useState(0);

  const generate = () => {
    playBoingSound();
    setExcuse(EXCUSES[Math.floor(Math.random() * EXCUSES.length)]);
    setKey((k) => k + 1);
  };

  return (
    <div className="text-center">
      <button
        type="button"
        data-ocid="excuse.primary_button"
        onClick={generate}
        className="px-8 py-4 rounded-full text-black font-bold text-xl uppercase tracking-wide transition-all hover:scale-110 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #21F0FF, #39FF6A)",
          boxShadow: "0 0 20px #21F0FF, 0 0 40px #39FF6A",
          fontFamily: "Anton, Impact, sans-serif",
        }}
      >
        🎲 GENERATE EXCUSE
      </button>

      <AnimatePresence mode="wait">
        {excuse && (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="mt-6 p-6 rounded-2xl"
            style={{
              background: "#12121A",
              border: "2px solid #21F0FF",
              boxShadow: "0 0 20px #21F0FF50",
            }}
          >
            <p className="text-white text-xl font-bold leading-relaxed">
              {excuse}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
