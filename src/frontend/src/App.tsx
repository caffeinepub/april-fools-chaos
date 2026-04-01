import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChaosWheel } from "./components/ChaosWheel";
import { CursorTrail } from "./components/CursorTrail";
import { ExcuseGenerator } from "./components/ExcuseGenerator";
import { FakeLoadingBar } from "./components/FakeLoadingBar";
import { FloatingEmojis } from "./components/FloatingEmojis";
import { PopupModal } from "./components/PopupModal";
import { RoastMe } from "./components/RoastMe";
import { playBoingSound, playChaosSound, playTaDaSound } from "./utils/sounds";

const POPUP_MESSAGES = [
  "🎉 Congratulations! You've been selected for FREE MONEY! (April Fools 😂)",
  "⚠️ VIRUS DETECTED: Teri photo dekh ke virus bhi rona chahu hai 😭",
  "☁️ Your IQ has been successfully downloaded to the cloud",
  "💔 System Alert: Aapka dil toot gaya hai. Restart karo?",
  "🔥 WARNING: You are TOO AWESOME for this website!",
  "🦆 Breaking: Local duck wins Nobel Prize. You're still normal.",
  "📱 Your mom is calling... (jk she's embarrassed)",
  "🤖 AI has replaced you. But honestly, same energy.",
  "💸 ₹10 CRORE CREDIT INCOMING... processing... failed. LOL.",
  "🧠 BRAIN.EXE has stopped responding. Have you tried turning it on?",
  "🚨 ALERT: Someone said you look like a potato today. We cannot confirm.",
  "🎪 Welcome to the circus! Oh wait, you brought it with you.",
];

const HOVER_TEXTS: Record<string, string[]> = {
  hero_headline: [
    "OMFG IT'S APRIL FOOLZ! PREPARE TO DANCE",
    "YOU THOUGHT THIS WAS REAL? LOL 😂",
    "NOTHING IS REAL. EVERYTHING IS CHAOS.",
    "YOUR BRAIN IS LOADING... 3%",
  ],
  cows_headline: [
    "URGENT: COWS CAN FLY",
    "CONFIRMED BY NASA (not really)",
    "YOUR DOG CAN FLY TOO BTW",
    "MOOOO-VE OUT OF THE WAY 🐄",
  ],
};

const CHAOS_EMOJIS = [
  "🎉",
  "🤡",
  "💀",
  "🔥",
  "💯",
  "🤣",
  "🌚",
  "👻",
  "🎈",
  "🚀",
  "🦆",
  "💸",
  "🎪",
  "😂",
  "🐄",
  "🌝",
];

const MEMES = [
  {
    top: "Me when alarm rings",
    bottom: "5 more minutes since 2019",
    bg: "#1a1a2e",
    emoji: "😴",
  },
  {
    top: "Teacher: explain yourself",
    bottom: "Me: ok so basically I'm cooked 💀",
    bg: "#1a2e1a",
    emoji: "💀",
  },
  {
    top: "LinkedIn: I am grateful to announce",
    bottom: "(got free chai at internship)",
    bg: "#2e1a1a",
    emoji: "☕",
  },
  {
    top: "Thoda risk toh lena padega",
    bottom: "*loses everything*",
    bg: "#2e2e1a",
    emoji: "📉",
  },
];

const DRAKE_MEMES = [
  {
    title: "DRAKE MEME:",
    nope: "Actually finishing tasks on time",
    yep: "Generating excuses with AI at 2am",
    color: "#FF3BD4",
  },
  {
    title: "LITERALLY ME:",
    nope: "Sleeping 8 hours",
    yep: "Doomscrolling until bhoomi shakes",
    color: "#21F0FF",
  },
  {
    title: "INDIAN STUDENT:",
    nope: "Reading the textbook",
    yep: "PYQ 11pm se padhna start",
    color: "#39FF6A",
  },
];

const FOOTER_LINKS = [
  "Privacy Policy (lol)",
  "Terms of Chaos",
  "Cookie Nahi Milega",
  "Contact: nobody",
  "About: chaos",
  "Help: no",
  "Newsletter: spam only",
  "Refund: hahaha",
];

export default function App() {
  const [popup, setPopup] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [easterEggFound, setEasterEggFound] = useState(false);
  const [hoveredText, setHoveredText] = useState<Record<string, number>>({});
  const [dontClickCount, setDontClickCount] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);
  const popupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerShake = useCallback(() => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  }, []);

  const schedulePopup = useCallback(() => {
    const delay = 4000 + Math.random() * 6000;
    popupTimerRef.current = setTimeout(() => {
      setPopup(
        POPUP_MESSAGES[Math.floor(Math.random() * POPUP_MESSAGES.length)],
      );
    }, delay);
  }, []);

  useEffect(() => {
    schedulePopup();
    const shakeInterval = setInterval(
      () => {
        if (Math.random() > 0.5) triggerShake();
      },
      20000 + Math.random() * 15000,
    );
    return () => {
      if (popupTimerRef.current) clearTimeout(popupTimerRef.current);
      clearInterval(shakeInterval);
    };
  }, [schedulePopup, triggerShake]);

  const closePopup = () => {
    setPopup(null);
    schedulePopup();
  };

  const handleDontClick = () => {
    playChaosSound();
    triggerShake();
    setDontClickCount((c) => c + 1);
    for (let i = 0; i < 25; i++) {
      setTimeout(() => {
        const el = document.createElement("div");
        el.className = "emoji-projectile";
        el.textContent =
          CHAOS_EMOJIS[Math.floor(Math.random() * CHAOS_EMOJIS.length)];
        el.style.left = `${Math.random() * 100}vw`;
        el.style.top = `${50 + Math.random() * 40}vh`;
        el.style.animationDuration = `${0.8 + Math.random() * 1.2}s`;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 2000);
      }, i * 60);
    }
    setPopup("🤡 YOU CLICKED IT! CHAOS UNLOCKED! Tune in for more insanity!");
  };

  const handleHoverText = (key: string) => {
    const texts = HOVER_TEXTS[key];
    if (!texts) return;
    setHoveredText((prev) => ({
      ...prev,
      [key]: Math.floor(Math.random() * (texts.length - 1)) + 1,
    }));
  };

  const resetHoverText = (key: string) => {
    setHoveredText((prev) => ({ ...prev, [key]: 0 }));
  };

  const heroText = HOVER_TEXTS.hero_headline[hoveredText.hero_headline ?? 0];
  const cowsText = HOVER_TEXTS.cows_headline[hoveredText.cows_headline ?? 0];

  return (
    <div
      ref={mainRef}
      className={`min-h-screen relative ${isShaking ? "shake-it" : ""}`}
      style={{ background: "#0B0B10" }}
    >
      <CursorTrail />
      <FloatingEmojis />
      <PopupModal message={popup} onClose={closePopup} />

      {/* Scanlines overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[100]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
        }}
      />

      {/* Neon background streaks */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "-10%",
            width: "120%",
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, #FF3BD4, #21F0FF, transparent)",
            opacity: 0.4,
            transform: "rotate(-3deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "-10%",
            width: "120%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, #39FF6A, #8B5CFF, transparent)",
            opacity: 0.3,
            transform: "rotate(2deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "70%",
            left: "-10%",
            width: "120%",
            height: "3px",
            background:
              "linear-gradient(90deg, transparent, #FFE74A, #FF7A18, transparent)",
            opacity: 0.3,
            transform: "rotate(-1deg)",
          }}
        />
      </div>

      {/* ===== RAINBOW MARQUEE BANNER ===== */}
      <div
        className="w-full overflow-hidden py-2 relative z-50"
        style={{
          background:
            "linear-gradient(90deg, #FF3BD4, #21F0FF, #39FF6A, #FFE74A, #FF7A18, #8B5CFF, #FF3BD4)",
          backgroundSize: "400% 100%",
          animation: "rainbow-bg 3s linear infinite",
        }}
      >
        <div className="marquee-track">
          {(["a", "b"] as const).map((n) => (
            <span
              key={n}
              className="text-black font-bold text-sm whitespace-nowrap px-4"
            >
              🎉 APRIL FOOLZ 2024: CHAOS EDITION! 🎊&nbsp;&nbsp;&nbsp;YOU WON
              ₹10 CRORE! (just kidding lol) 😂&nbsp;&nbsp;&nbsp;OMFG IT'S REAL
              THIS TIME... jk&nbsp;&nbsp;&nbsp;🤡 CHAOS IS THE ONLY
              CONSTANT&nbsp;&nbsp;&nbsp;💀 YOUR IQ IS
              DOWNLOADING...&nbsp;&nbsp;&nbsp;🔥 THODA RISK TOH LENA
              PADEGA&nbsp;&nbsp;&nbsp;🎪 WELCOME TO THE GREATEST SHOW ON
              INTERNET&nbsp;&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ===== HEADER ===== */}
      <header className="relative z-10 pt-6 pb-4 px-4 text-center">
        <nav className="mb-4 flex flex-wrap justify-center gap-4">
          {["WHAT IS EVEN THIS?", "GLITCH MODE", "MEME CENTRAL", "WTF?"].map(
            (link) => (
              <button
                type="button"
                key={link}
                onClick={() => {
                  playBoingSound();
                  setPopup("Nice try clicking that link 😂 It goes nowhere!");
                }}
                className="text-xs font-bold tracking-widest uppercase transition-all hover:scale-110 bg-transparent border-0 cursor-pointer"
                style={{ color: "#21F0FF", textShadow: "0 0 10px #21F0FF" }}
              >
                {link}
              </button>
            ),
          )}
        </nav>

        <h1
          className="glitch-text text-7xl md:text-9xl uppercase tracking-tighter leading-none mb-2 select-none"
          style={{ fontFamily: "Anton, Impact, sans-serif", color: "white" }}
        >
          APRIL
        </h1>
        <h1
          className="glitch-text text-7xl md:text-9xl uppercase tracking-tighter leading-none mb-4 select-none"
          style={{ fontFamily: "Anton, Impact, sans-serif", color: "#FF3BD4" }}
        >
          FOOLZ 🤡
        </h1>

        {/* Sticky section nav */}
        <div
          className="mt-4 py-2 px-4 rounded-full inline-flex flex-wrap gap-4 justify-center"
          style={{ background: "#12121A", border: "1px solid #333" }}
        >
          {["CHAOS HOME", "MEMES", "WTF?", "FREE PRIZE 💸", "URGENT…"].map(
            (item) => (
              <button
                type="button"
                key={item}
                className="text-xs font-bold cursor-pointer transition-all hover:scale-110 bg-transparent border-0"
                style={{
                  color: "#FFE74A",
                  fontFamily: "Anton, Impact, sans-serif",
                }}
                onClick={() => {
                  playBoingSound();
                  triggerShake();
                }}
              >
                {item}
              </button>
            ),
          )}
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 pb-20">
        {/* ===== HERO SECTION ===== */}
        <section className="mb-12">
          <div
            className="rounded-3xl p-8 md:p-12 relative overflow-hidden neon-pulse"
            style={{
              background: "#0F0F1A",
              border: "2px solid #FF3BD4",
              transform: "rotate(-0.5deg)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "repeating-linear-gradient(45deg, transparent, transparent 50px, rgba(255,59,212,0.03) 50px, rgba(255,59,212,0.03) 51px)",
              }}
            />

            <div
              className="text-4xl md:text-6xl font-bold uppercase leading-tight mb-6 cursor-default select-none"
              style={{ fontFamily: "Anton, Impact, sans-serif" }}
              onMouseEnter={() => handleHoverText("hero_headline")}
              onMouseLeave={() => resetHoverText("hero_headline")}
            >
              <span className="glitch-text" style={{ color: "white" }}>
                {heroText}
              </span>
            </div>

            <p className="text-white/60 text-sm mb-8 max-w-md">
              Aaj ka din special hai bhai. Kuch bhi ho sakta hai. Kuch bhi nahi
              bhi ho sakta. Actually, definitely kuch nahi hoga. April Fools! 🎊
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                data-ocid="hero.primary_button"
                onClick={() => {
                  playBoingSound();
                  triggerShake();
                  setPopup(
                    "AHA! You clicked it! Nothing happened... or did it? 👀",
                  );
                }}
                className="bounce-wild px-8 py-4 rounded-full text-black font-bold text-xl uppercase"
                style={{
                  background: "linear-gradient(135deg, #FF3BD4, #8B5CFF)",
                  boxShadow: "0 0 20px #FF3BD4",
                  fontFamily: "Anton, Impact, sans-serif",
                }}
              >
                🖱️ CLICK ME!
              </button>
              <button
                type="button"
                data-ocid="hero.secondary_button"
                onClick={() =>
                  setPopup(
                    "LOL you can't leave. This website has your soul now. 😈",
                  )
                }
                className="px-8 py-4 rounded-full font-bold text-xl uppercase"
                style={{
                  border: "2px solid #21F0FF",
                  color: "#21F0FF",
                  boxShadow: "0 0 15px #21F0FF",
                  fontFamily: "Anton, Impact, sans-serif",
                }}
              >
                🚪 I'M LEAVING
              </button>
            </div>

            <motion.div
              className="absolute -top-4 -right-4 rounded-2xl p-4 text-center"
              style={{
                background: "#12121A",
                border: "2px solid #FFE74A",
                boxShadow: "0 0 20px #FFE74A",
                transform: "rotate(8deg)",
                width: "140px",
              }}
              animate={{ rotate: [8, 12, 8, 5, 8] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="text-2xl">🏆</div>
              <div
                className="text-xs font-bold"
                style={{ color: "#FFE74A", fontFamily: "Anton" }}
              >
                YOU WIN!!
              </div>
              <div className="text-xs text-white/60">(not really)</div>
            </motion.div>
          </div>
        </section>

        {/* ===== FAKE LOADING BARS ===== */}
        <section className="mb-12">
          <h2
            className="text-3xl font-bold uppercase mb-6 text-center wobble"
            style={{
              fontFamily: "Anton, Impact, sans-serif",
              color: "#21F0FF",
              textShadow: "0 0 20px #21F0FF",
            }}
          >
            ⏳ IMPORTANT PROCESSES RUNNING
          </h2>
          <div
            className="p-6 rounded-2xl"
            style={{
              background: "#0F0F1A",
              border: "1px solid #21F0FF40",
              transform: "rotate(0.3deg)",
            }}
          >
            <FakeLoadingBar
              label="Downloading your common sense..."
              color="#21F0FF"
              animationName="loading-chaos"
              duration="6s"
            />
            <FakeLoadingBar
              label="Uploading your dignity to cloud..."
              color="#FF3BD4"
              animationName="loading-fake"
              duration="4s"
            />
            <FakeLoadingBar
              label="Installing personality update..."
              color="#39FF6A"
              animationName="loading-slow"
              duration="30s"
            />
          </div>
        </section>

        {/* ===== CONTENT GRID ===== */}
        <section className="grid md:grid-cols-2 gap-6 mb-12">
          {/* URGENT: COWS CAN FLY */}
          <div
            className="rounded-2xl p-6 relative"
            style={{
              background: "#0F0F1A",
              border: "2px solid #FFE74A",
              boxShadow: "0 0 15px #FFE74A40",
              transform: "rotate(-1.5deg)",
            }}
          >
            <div
              className="text-xs font-bold mb-2 px-2 py-1 rounded inline-block"
              style={{ background: "#FFE74A", color: "#0B0B10" }}
            >
              ⚠️ BREAKING NEWS
            </div>
            <h3
              className="text-2xl font-bold uppercase mb-4 cursor-default"
              style={{
                fontFamily: "Anton, Impact, sans-serif",
                color: "#FFE74A",
              }}
              onMouseEnter={() => handleHoverText("cows_headline")}
              onMouseLeave={() => resetHoverText("cows_headline")}
            >
              {cowsText}
            </h3>
            <div
              className="rounded-xl mb-4 flex items-center justify-center"
              style={{
                height: "120px",
                background: "linear-gradient(135deg, #1a1a2e, #16213e)",
                fontSize: "4rem",
              }}
            >
              🐄✈️🌤️
            </div>
            <p className="text-white/60 text-sm mb-4">
              Scientists confirm: cows have been secretly flying at night. "We
              were too busy eating poha," says lead researcher.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  playBoingSound();
                  setPopup(
                    "CONFIRMED: Cows can fly. Source: my uncle's WhatsApp group 🐄",
                  );
                }}
                className="px-4 py-2 rounded-full text-xs font-bold text-black"
                style={{ background: "#FFE74A" }}
              >
                READ MORE
              </button>
              <button
                type="button"
                onClick={() => {
                  playBoingSound();
                  triggerShake();
                }}
                className="px-4 py-2 rounded-full text-xs font-bold"
                style={{ border: "1px solid #FFE74A", color: "#FFE74A" }}
              >
                SHARE
              </button>
            </div>
          </div>

          {/* MEME GANG */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: "#0F0F1A",
              border: "2px solid #39FF6A",
              boxShadow: "0 0 15px #39FF6A40",
              transform: "rotate(1deg)",
            }}
          >
            <h3
              className="text-2xl font-bold uppercase mb-4"
              style={{
                fontFamily: "Anton, Impact, sans-serif",
                color: "#39FF6A",
              }}
            >
              🐸 MEME GANG AYYY
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {MEMES.map((meme) => (
                <button
                  type="button"
                  key={meme.top}
                  className="rounded-lg p-3 text-center cursor-pointer transition-transform hover:scale-105"
                  style={{ background: meme.bg }}
                  onClick={playBoingSound}
                >
                  <div className="text-3xl mb-1">{meme.emoji}</div>
                  <p className="text-white/70 text-xs font-bold mb-1">
                    {meme.top}
                  </p>
                  <p className="text-white text-xs">{meme.bottom}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CHAOS WHEEL ===== */}
        <section className="mb-12">
          <h2
            className="text-4xl font-bold uppercase mb-8 text-center"
            style={{
              fontFamily: "Anton, Impact, sans-serif",
              color: "#8B5CFF",
              textShadow: "0 0 30px #8B5CFF",
              transform: "rotate(-1deg)",
            }}
          >
            🎡 SPIN THE CHAOS WHEEL
          </h2>
          <div
            className="p-8 rounded-3xl"
            style={{
              background: "#0F0F1A",
              border: "2px solid #8B5CFF",
              boxShadow: "0 0 30px #8B5CFF40",
            }}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-white/60 text-sm space-y-2">
                <p className="font-bold text-white">
                  🎲 WHAT WILL YOUR FATE BE?
                </p>
                <p>The wheel decides. You have no power here.</p>
                <p>Bhai, whatever it lands on — that's your personality now.</p>
                <p className="text-xs text-white/40">
                  (Terms & conditions: none. Chaos only.)
                </p>
              </div>
              <ChaosWheel />
              <div className="flex-1 text-white/60 text-sm space-y-2">
                <p className="font-bold" style={{ color: "#FFE74A" }}>
                  PAST VICTIMS:
                </p>
                <p>🐄 Ram got "Cow Can Fly" — believed it</p>
                <p>💸 Priya spun "₹10 Crore" — still waiting</p>
                <p>☕ Dev got "Free Chai" — actually worked!</p>
                <p>😂 Sneha spun "Rickrolled" — cried</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== EXCUSE GENERATOR ===== */}
        <section className="mb-12">
          <h2
            className="text-4xl font-bold uppercase mb-6 text-center"
            style={{
              fontFamily: "Anton, Impact, sans-serif",
              color: "#21F0FF",
              textShadow: "0 0 20px #21F0FF",
              transform: "rotate(0.5deg)",
            }}
          >
            🎲 EXCUSE GENERATOR 3000
          </h2>
          <p className="text-center text-white/50 text-sm mb-6">
            Boss asking questions? Family WhatsApp group getting intense? We got
            you. 👀
          </p>
          <div
            className="p-8 rounded-3xl"
            style={{
              background: "#0F0F1A",
              border: "2px solid #21F0FF",
              boxShadow: "0 0 20px #21F0FF30",
            }}
          >
            <ExcuseGenerator />
          </div>
        </section>

        {/* ===== ROAST ME ===== */}
        <section className="mb-12">
          <h2
            className="text-4xl font-bold uppercase mb-6 text-center"
            style={{
              fontFamily: "Anton, Impact, sans-serif",
              color: "#FF7A18",
              textShadow: "0 0 20px #FF7A18",
              transform: "rotate(-0.7deg)",
            }}
          >
            🔥 ROAST ME SECTION
          </h2>
          <p className="text-center text-white/50 text-sm mb-6">
            Ask and ye shall receive. Harmless, but it will sting. Lovingly. 💀
          </p>
          <div
            className="p-8 rounded-3xl"
            style={{
              background: "#0F0F1A",
              border: "2px solid #FF7A18",
              boxShadow: "0 0 20px #FF7A1830",
            }}
          >
            <RoastMe />
          </div>
        </section>

        {/* ===== DRAKE MEME GALLERY ===== */}
        <section className="mb-12">
          <h2
            className="text-3xl font-bold uppercase mb-6 text-center"
            style={{
              fontFamily: "Anton, Impact, sans-serif",
              color: "#FF3BD4",
              textShadow: "0 0 15px #FF3BD4",
            }}
          >
            🐸 CERTIFIED MEME GALLERY
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {DRAKE_MEMES.map((m) => (
              <motion.button
                type="button"
                key={m.title}
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl overflow-hidden cursor-pointer text-left"
                style={{
                  border: `2px solid ${m.color}`,
                  background: "#0F0F1A",
                }}
                onClick={playBoingSound}
              >
                <div
                  className="p-3 text-xs font-bold"
                  style={{ background: m.color, color: "#0B0B10" }}
                >
                  {m.title}
                </div>
                <div className="flex">
                  <div className="w-12 flex items-center justify-center text-2xl py-4 opacity-40">
                    ❌
                  </div>
                  <div className="flex-1 p-3 text-xs text-white/60 border-b border-white/10">
                    {m.nope}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-12 flex items-center justify-center text-2xl py-4">
                    ✅
                  </div>
                  <div className="flex-1 p-3 text-xs text-white font-bold">
                    {m.yep}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* ===== BOTTOM CTA ROW ===== */}
        <section className="mb-12">
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              type="button"
              data-ocid="cta.primary_button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                playBoingSound();
                setPopup(
                  "You clicked CLICK ME and now nothing will ever be the same. 🎭",
                );
              }}
              className="px-10 py-5 rounded-full font-bold text-xl uppercase"
              style={{
                background: "linear-gradient(135deg, #8B5CFF, #FF3BD4)",
                boxShadow: "0 0 30px #8B5CFF",
                fontFamily: "Anton, Impact, sans-serif",
                color: "white",
              }}
            >
              🖱️ CLICK ME!
            </motion.button>

            <motion.button
              type="button"
              data-ocid="chaos.dont_click_button"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
              onClick={handleDontClick}
              className="px-10 py-5 rounded-full font-bold text-xl uppercase"
              style={{
                background: "linear-gradient(135deg, #FF3BD4, #FF7A18)",
                boxShadow: "0 0 30px #FF3BD4",
                fontFamily: "Anton, Impact, sans-serif",
                color: "white",
              }}
              animate={{ scale: [1, 1.03, 1], rotate: [0, -1, 1, -1, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              🚫 DONT CLICK! (
              {dontClickCount > 0
                ? `clicked ${dontClickCount}x lol`
                : "seriously"}
              )
            </motion.button>

            <motion.button
              type="button"
              data-ocid="cta.free_money_button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                playTaDaSound();
                setPopup(
                  "₹10 CRORE TRANSFER IN PROGRESS... ███░░░░░ 32%... ERROR: Nice try 😂",
                );
              }}
              className="px-10 py-5 rounded-full font-bold text-xl uppercase"
              style={{
                background: "linear-gradient(135deg, #39FF6A, #21F0FF)",
                boxShadow: "0 0 30px #39FF6A",
                fontFamily: "Anton, Impact, sans-serif",
                color: "#0B0B10",
              }}
            >
              💸 FREE MOOLAH
            </motion.button>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer
        className="relative z-10 py-10 px-4 text-center"
        style={{
          background: "#0A0A0F",
          borderTop: "2px solid #FF3BD4",
          boxShadow: "0 -10px 40px #FF3BD430",
        }}
      >
        <h2
          className="text-4xl font-bold uppercase mb-4"
          style={{
            fontFamily: "Anton, Impact, sans-serif",
            color: "#FF3BD4",
            textShadow: "0 0 20px #FF3BD4",
          }}
        >
          CHAOS LIL BYE 👋
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mb-6 text-xs">
          {FOOTER_LINKS.map((link) => (
            <button
              type="button"
              key={link}
              className="cursor-pointer hover:scale-110 transition-transform bg-transparent border-0"
              style={{ color: "#21F0FF" }}
              onClick={() => {
                playBoingSound();
                setPopup(`"${link}" page is under construction since 2019 🚧`);
              }}
            >
              {link}
            </button>
          ))}
        </div>
        <p className="text-white/40 text-xs mb-3">
          © 3024 LOL BYE. No rights reserved. Chaos is public domain. 🤡
        </p>
        <p className="text-white/30 text-xs">
          Built with{" "}
          <span style={{ color: "#FF3BD4" }}>❤️ chaos and neon paint</span> using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
            style={{ color: "#21F0FF" }}
          >
            caffeine.ai
          </a>
        </p>
      </footer>

      {/* ===== HIDDEN EASTER EGG ===== */}
      <button
        type="button"
        className="fixed bottom-2 right-2 z-[200] cursor-pointer border-0 p-0"
        style={{
          width: "4px",
          height: "4px",
          background: "#FF3BD440",
          borderRadius: "50%",
          minWidth: 0,
        }}
        onClick={() => {
          playTaDaSound();
          setEasterEggFound(true);
        }}
        aria-label="Hidden easter egg"
      />

      <AnimatePresence>
        {easterEggFound && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEasterEggFound(false)}
          >
            <div className="absolute inset-0 bg-black/80" />
            <motion.div
              className="relative text-center p-10 rounded-3xl"
              style={{
                background: "#0F0F1A",
                border: "3px solid #39FF6A",
                boxShadow: "0 0 60px #39FF6A",
              }}
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-6xl mb-4">🥚</div>
              <h3
                className="text-3xl font-bold uppercase mb-3"
                style={{
                  fontFamily: "Anton, Impact, sans-serif",
                  color: "#39FF6A",
                }}
              >
                EASTER EGG UNLOCKED!
              </h3>
              <p className="text-white mb-2">
                YOU ACTUALLY FOUND IT! Legend! 🏆
              </p>
              <p className="text-white/50 text-sm">
                Achievement unlocked: "Has No Life" 🎮
              </p>
              <button
                type="button"
                className="mt-6 px-6 py-2 rounded-full font-bold text-black"
                style={{ background: "#39FF6A" }}
                onClick={() => setEasterEggFound(false)}
              >
                I AM LEGEND 👑
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
