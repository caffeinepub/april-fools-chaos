import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { playTaDaSound } from "../utils/sounds";

const ROASTS = [
  "Your code is so bad, even Stack Overflow refused to help 💀",
  "Tu itna boring hai ki sleeping pills tujhe dekhke so jaati hain 😴",
  "Bhai, teri life ka loading bar kabhi 100% nahi hoga 💻",
  "You're like a software update — nobody asked for you 🔄",
  "Teri personality itni flat hai ki x-ray mein bhi nahi aayegi 🩻",
  "You bring everyone so much joy... when you leave the room 🚪",
  "Tere WiFi se zyada slow teri thinking hai 🐌",
  "Your future is so bleak, even your shadow leaves you 🌑",
  "Bhai, tu Google Maps se bhi zyada confused rehta hai 🗺️",
  "Your jokes are like your WiFi: always dropping 📶",
  "Tera common sense aur Jio data dono missing hain 📵",
  "You're not useless — you can always be used as a bad example ✅",
  "Tu itna predictable hai ki even AI tujhe bore ho jaata hai 🤖",
  "Your vibe is on airplane mode permanently ✈️",
  "Teri life mein plot twist itna weak hai ki ek star bhi nahi milega ⭐",
  "You have something to say about everything... except something useful 🗣️",
  "Bhai, tu khud ka WhatsApp status bhi interesting nahi bana sakta 📱",
  "Your rizz is so low, it's in negative numbers 📉",
  "Tere saath ek minute baithna ek ghante jaisa lagta hai 🕐",
  "You're like a broken pencil — completely pointless ✏️",
];

export function RoastMe() {
  const [roast, setRoast] = useState<string | null>(null);
  const [key, setKey] = useState(0);

  const getRoasted = () => {
    playTaDaSound();
    setRoast(ROASTS[Math.floor(Math.random() * ROASTS.length)]);
    setKey((k) => k + 1);
  };

  return (
    <div className="text-center">
      <button
        type="button"
        data-ocid="roast.primary_button"
        onClick={getRoasted}
        className="px-8 py-4 rounded-full text-white font-bold text-xl uppercase tracking-wide transition-all hover:scale-110 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #FF7A18, #FF3BD4)",
          boxShadow: "0 0 20px #FF7A18, 0 0 40px #FF3BD4",
          fontFamily: "Anton, Impact, sans-serif",
        }}
      >
        🔥 ROAST ME BRO
      </button>

      <AnimatePresence mode="wait">
        {roast && (
          <motion.div
            key={key}
            initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="mt-6 p-6 rounded-2xl"
            style={{
              background: "#12121A",
              border: "2px solid #FF7A18",
              boxShadow: "0 0 20px #FF7A1850",
            }}
          >
            <p className="text-white text-xl font-bold leading-relaxed">
              {roast}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
