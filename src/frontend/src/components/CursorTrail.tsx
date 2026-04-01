import { useEffect, useRef } from "react";

export function CursorTrail() {
  const dotRef = useRef<HTMLDivElement>(null);
  const trailEmojis = ["✨", "💫", "⭐", "🌟", "💥", "🎊", "🎉", "🔥", "💯"];

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    let lastSpawn = 0;

    const onMove = (e: MouseEvent) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;

      const now = Date.now();
      if (now - lastSpawn < 80) return;
      lastSpawn = now;

      const span = document.createElement("span");
      span.className = "sparkle";
      span.style.left = `${e.clientX + (Math.random() - 0.5) * 20}px`;
      span.style.top = `${e.clientY + (Math.random() - 0.5) * 20}px`;
      span.textContent =
        trailEmojis[Math.floor(Math.random() * trailEmojis.length)];
      document.body.appendChild(span);
      setTimeout(() => span.remove(), 800);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <div ref={dotRef} className="cursor-dot" />;
}
