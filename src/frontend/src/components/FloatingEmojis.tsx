import { useEffect, useState } from "react";

interface FloatingEmoji {
  id: number;
  emoji: string;
  left: string;
  delay: string;
  duration: string;
  size: string;
}

const EMOJIS = [
  "🎉",
  "🎊",
  "🤡",
  "💀",
  "🔥",
  "💯",
  "🤣",
  "😂",
  "🌚",
  "👻",
  "🎈",
  "🚀",
  "🦆",
  "🐸",
  "💸",
  "🎪",
];

export function FloatingEmojis() {
  const [emojis, setEmojis] = useState<FloatingEmoji[]>([]);

  useEffect(() => {
    const items: FloatingEmoji[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${6 + Math.random() * 8}s`,
      size: `${1 + Math.random() * 2}rem`,
    }));
    setEmojis(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {emojis.map((e) => (
        <div
          key={e.id}
          style={{
            position: "absolute",
            left: e.left,
            bottom: "-10%",
            fontSize: e.size,
            animationName: "float-up",
            animationDuration: e.duration,
            animationDelay: e.delay,
            animationIterationCount: "infinite",
            animationTimingFunction: "linear",
          }}
        >
          {e.emoji}
        </div>
      ))}
    </div>
  );
}
