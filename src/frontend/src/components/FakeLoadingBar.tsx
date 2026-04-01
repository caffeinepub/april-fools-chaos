import { useEffect, useRef } from "react";

interface FakeLoadingBarProps {
  label: string;
  color: string;
  animationName: string;
  duration: string;
}

export function FakeLoadingBar({
  label,
  color,
  animationName,
  duration,
}: FakeLoadingBarProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    bar.style.animationName = animationName;
    bar.style.animationDuration = duration;
    bar.style.animationIterationCount = "infinite";
    bar.style.animationTimingFunction = "linear";
  }, [animationName, duration]);

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-xs text-white/70">{label}</span>
        <span className="text-xs" style={{ color }}>
          Loading...
        </span>
      </div>
      <div
        className="w-full h-4 rounded-full overflow-hidden"
        style={{ background: "#1a1a2e" }}
      >
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, #fff, ${color})`,
            width: "0%",
          }}
        />
      </div>
    </div>
  );
}
