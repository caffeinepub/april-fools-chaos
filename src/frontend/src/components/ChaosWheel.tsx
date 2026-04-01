import { motion } from "motion/react";
import { useRef, useState } from "react";
import { playBoingSound } from "../utils/sounds";

const SEGMENTS = [
  { label: "Get Rickrolled 🎵", color: "#FF3BD4" },
  { label: "Free Chai ☕", color: "#21F0FF" },
  { label: "Teri photo viral 😂", color: "#39FF6A" },
  { label: "1 month bad luck 😈", color: "#8B5CFF" },
  { label: "Win ₹10 Crore! 💸", color: "#FFE74A" },
  { label: "Infinite Loading... ⏳", color: "#FF7A18" },
  { label: "Dance Now! 💃", color: "#FF3BD4" },
  { label: "APRIL FOOLS! 🤡", color: "#21F0FF" },
];

const NUM = SEGMENTS.length;
const ANGLE = 360 / NUM;

export function ChaosWheel() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const spinRef = useRef(0);

  const spin = () => {
    if (spinning) return;
    playBoingSound();
    setSpinning(true);
    setResult(null);

    const extraDeg = Math.floor(Math.random() * 360);
    const totalDeg = spinRef.current + 360 * 7 + extraDeg;
    spinRef.current = totalDeg;
    setRotation(totalDeg);

    setTimeout(() => {
      const landed = ((totalDeg % 360) + 360) % 360;
      const idx = Math.floor((360 - landed) / ANGLE) % NUM;
      setResult(SEGMENTS[idx].label);
      setSpinning(false);
    }, 3500);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        {/* Pointer */}
        <div
          className="absolute top-0 left-1/2 z-10"
          style={{
            transform: "translateX(-50%) translateY(-8px)",
            width: 0,
            height: 0,
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderTop: "24px solid #FFE74A",
            filter: "drop-shadow(0 0 6px #FFE74A)",
          }}
        />
        <motion.svg
          width="280"
          height="280"
          viewBox="0 0 280 280"
          role="img"
          aria-label="Chaos Wheel spinner"
          animate={{ rotate: rotation }}
          transition={{ duration: 3.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformOrigin: "140px 140px" }}
        >
          <title>Chaos Wheel</title>
          {SEGMENTS.map((seg, i) => {
            const startAngle = (i * ANGLE - 90) * (Math.PI / 180);
            const endAngle = ((i + 1) * ANGLE - 90) * (Math.PI / 180);
            const x1 = 140 + 120 * Math.cos(startAngle);
            const y1 = 140 + 120 * Math.sin(startAngle);
            const x2 = 140 + 120 * Math.cos(endAngle);
            const y2 = 140 + 120 * Math.sin(endAngle);
            const midAngle = ((i + 0.5) * ANGLE - 90) * (Math.PI / 180);
            const tx = 140 + 75 * Math.cos(midAngle);
            const ty = 140 + 75 * Math.sin(midAngle);

            return (
              <g key={seg.label}>
                <path
                  d={`M140,140 L${x1},${y1} A120,120 0 0,1 ${x2},${y2} Z`}
                  fill={seg.color}
                  stroke="#0B0B10"
                  strokeWidth="2"
                />
                <text
                  x={tx}
                  y={ty}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="8"
                  fontWeight="bold"
                  fill="#0B0B10"
                  transform={`rotate(${i * ANGLE + ANGLE / 2}, ${tx}, ${ty})`}
                >
                  {seg.label.length > 14
                    ? `${seg.label.slice(0, 12)}…`
                    : seg.label}
                </text>
              </g>
            );
          })}
          <circle
            cx="140"
            cy="140"
            r="15"
            fill="#0B0B10"
            stroke="#FFE74A"
            strokeWidth="3"
          />
        </motion.svg>
      </div>

      <button
        type="button"
        data-ocid="wheel.primary_button"
        onClick={spin}
        disabled={spinning}
        className="px-10 py-4 rounded-full font-bold text-xl uppercase tracking-wide transition-all hover:scale-110 active:scale-95 disabled:opacity-50"
        style={{
          background: "linear-gradient(135deg, #8B5CFF, #FF3BD4)",
          boxShadow: "0 0 20px #8B5CFF, 0 0 40px #FF3BD4",
          fontFamily: "Anton, Impact, sans-serif",
          color: "white",
        }}
      >
        {spinning ? "SPINNING... 🌀" : "🎡 SPIN THE WHEEL"}
      </button>

      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-4 rounded-2xl"
          style={{
            background: "#12121A",
            border: "2px solid #FFE74A",
            boxShadow: "0 0 20px #FFE74A50",
          }}
        >
          <p className="text-white text-lg font-bold">🎯 Result: {result}</p>
        </motion.div>
      )}
    </div>
  );
}
