"use client";
import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  AnimatePresence, // (kept; not required, but safe to leave)
} from "framer-motion";

/* =============================== Stars =================================== */
const Stars = () => {
  const stars = Array.from({ length: 150 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.8 + 0.2,
    twinkleDelay: Math.random() * 3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
          }}
          animate={{
            opacity: [s.opacity, s.opacity * 0.3, s.opacity],
            scale: [1, 0.85, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: s.twinkleDelay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

/* ================================ Moon =================================== */
const Moon = () => (
  <svg width="140" height="140" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#a7f3f3" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="moonFill" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#e6e9ee" />
        <stop offset="100%" stopColor="#d7dbe2" />
      </radialGradient>
    </defs>
    <circle cx="70" cy="70" r="66" fill="url(#moonGlow)" />
    <circle cx="70" cy="70" r="52" fill="url(#moonFill)" />
    <circle cx="50" cy="48" r="8" fill="#cfd6df" opacity="0.7" />
    <circle cx="88" cy="54" r="6" fill="#cfd6df" opacity="0.6" />
    <circle cx="74" cy="82" r="7" fill="#cfd6df" opacity="0.65" />
  </svg>
);

/* ================================= Sun =================================== */
const Sun = () => (
  <svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="sunCore" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fff6cc" />
        <stop offset="55%" stopColor="#ffd36a" />
        <stop offset="100%" stopColor="#ff9d3c" />
      </radialGradient>
    </defs>
    {Array.from({ length: 24 }, (_, i) => {
      const angle = (i * 360) / 24;
      const len = 78;
      const x2 = 90 + Math.cos((angle * Math.PI) / 180) * (len + 10);
      const y2 = 90 + Math.sin((angle * Math.PI) / 180) * (len + 10);
      return (
        <line
          key={i}
          x1={90}
          y1={90}
          x2={x2}
          y2={y2}
          stroke="rgba(255,240,200,0.4)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      );
    })}
    <circle cx="90" cy="90" r="70" fill="url(#sunCore)" />
  </svg>
);

/* ===================== Helpers for the typing title ======================= */
function useInterval(callback: () => void, delayMs: number | null) {
  const saved = React.useRef(callback);
  React.useEffect(() => {
    saved.current = callback;
  }, [callback]);
  React.useEffect(() => {
    if (delayMs === null) return;
    const id = setInterval(() => saved.current(), delayMs);
    return () => clearInterval(id);
  }, [delayMs]);
}

const Caret = () => (
  <motion.span
    aria-hidden="true"
    initial={{ opacity: 1 }}
    animate={{ opacity: [1, 0, 1] }}
    transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
    className="inline-block translate-y-[2px]"
  >
    |
  </motion.span>
);

/**
 * TypedTitle — loops forever:
 * 1) type EN
 * 2) hold
 * 3) overwrite to JP (char-by-char)
 * 4) hold
 * 5) overwrite back to EN
 * No fades; efficient single interval.
 * Props kept compatible with your usage (stepMs, pauseMs, startDelayMs).
 */
const TypedTitle: React.FC<{
  english: string;
  japanese: string;
  className?: string;
  stepMs?: number;       // speed per char
  pauseMs?: number;      // pause after finishing each phase
  startDelayMs?: number; // initial delay before typing starts
}> = ({
  english,
  japanese,
  className,
  stepMs = 90,
  pauseMs = 1000,
  startDelayMs = 0,
}) => {
  type Phase = "TYPE_EN" | "HOLD_EN" | "EN_TO_JP" | "HOLD_JP" | "JP_TO_EN";
  const [phase, setPhase] = React.useState<Phase>("TYPE_EN");
  const [i, setI] = React.useState(0);

  const en = english;
  const jp = japanese;
  const maxLen = Math.max(en.length, jp.length);

  // initial delay before typing starts
  React.useEffect(() => {
    if (!startDelayMs) return;
    const t = setTimeout(() => void 0, startDelayMs);
    return () => clearTimeout(t);
  }, [startDelayMs]);

  // compute text for the current phase/index
  let text = "";
  if (phase === "TYPE_EN") {
    text = en.slice(0, i);
  } else if (phase === "HOLD_EN") {
    text = en;
  } else if (phase === "EN_TO_JP") {
    text = jp.slice(0, i) + en.slice(i);
  } else if (phase === "HOLD_JP") {
    text = jp;
  } else if (phase === "JP_TO_EN") {
    text = en.slice(0, i) + jp.slice(i);
  }

  // ticking speed (paused during holds)
  const delay = phase === "HOLD_EN" || phase === "HOLD_JP" ? null : stepMs;

  // main loop
  useInterval(() => {
    if (phase === "TYPE_EN") {
      if (i < en.length) setI(i + 1);
      else {
        setPhase("HOLD_EN");
        setTimeout(() => {
          setI(0);
          setPhase("EN_TO_JP");
        }, pauseMs);
      }
    } else if (phase === "EN_TO_JP") {
      if (i < maxLen) setI(i + 1);
      else {
        setPhase("HOLD_JP");
        setTimeout(() => {
          setI(0);
          setPhase("JP_TO_EN");
        }, pauseMs);
      }
    } else if (phase === "JP_TO_EN") {
      if (i < maxLen) setI(i + 1);
      else {
        // loop back
        setPhase("HOLD_EN");
        setTimeout(() => {
          setI(0);
          setPhase("EN_TO_JP");
        }, pauseMs);
      }
    }
  }, delay);

  const showCaret =
    phase === "TYPE_EN" || phase === "EN_TO_JP" || phase === "JP_TO_EN";

  return (
    <div className={className}>
      <div className="whitespace-pre">
        <span>{text}</span>
        {showCaret && <Caret />}
      </div>
    </div>
  );
};

/* ================================ Page ==================================== */
export default function SkySlide() {
  const ref = useRef<HTMLDivElement | null>(null);

  // Scroll progress within this section (UNCHANGED)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* --------- Celestial motion (UNCHANGED) --------- */
  // Moon: down-right (sets)
  const moonX = useTransform(scrollYProgress, [0, 0.7], ["0%", "60%"]);
  const moonY = useTransform(scrollYProgress, [0, 0.7], ["0%", "50%"]);
  const moonOpacity = useTransform(scrollYProgress, [0, 0.5, 0.7], [1, 0.5, 0]);

  // Sun: up-right (rises)
  const sunX = useTransform(scrollYProgress, [0.2, 1], ["-60%", "20%"]);
  const sunY = useTransform(scrollYProgress, [0.2, 1], ["60%", "-10%"]);
  const sunOpacity = useTransform(scrollYProgress, [0.1, 0.3, 1], [0, 0.3, 1]);

  // Sun position in % for lighting center
  const sunXPct = useTransform(scrollYProgress, [0.2, 1], [20, 70]); // %
  const sunYPct = useTransform(scrollYProgress, [0.2, 1], [65, 25]); // %

  /* --------------------------- Atmosphere / FX (UNCHANGED) --------------------------- */
  const starsOpacity = useTransform(scrollYProgress, [0, 0.45, 0.7], [1, 0.35, 0]);
  const nightOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 0.7, 0.1]);
  const dawnOverlayOpacity = useTransform(scrollYProgress, [0.3, 0.8], [0, 0.8]);
  const lightProgress = useTransform(scrollYProgress, [0.2, 1], [0, 1]);
  const a1 = useTransform(lightProgress, (p) => p * 0.4);
  const a2 = useTransform(lightProgress, (p) => p * 0.2);

  const radialBloom = useMotionTemplate`
    radial-gradient(
      ellipse 150% 100% at ${sunXPct}% ${sunYPct}%,
      rgba(255,220,150, ${a1}) 0%,
      rgba(255,180,120, ${a2}) 30%,
      transparent 70%
    )
  `;

  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <div ref={ref} className="relative h-[300vh] w-full">
      {/* Sticky viewport (single page) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Base night sky */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-950 to-slate-950"
          style={{ opacity: nightOpacity }}
        >
          <motion.div style={{ opacity: starsOpacity }}>
            <Stars />
          </motion.div>
        </motion.div>

        {/* Dawn wash under the bloom */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-orange-200 via-pink-300 to-blue-400 opacity-0"
          style={{ opacity: dawnOverlayOpacity }}
        />

        {/* Sunlight bloom that follows the sun */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: radialBloom,
            opacity: lightProgress,
            mixBlendMode: "screen",
          }}
        />

        {/* Content */}
        <div className="relative h-full w-full">
          {/* Title (looping EN ↔ JP overwrite) */}
          <TypedTitle
            className="absolute top-8 left-8 z-40 text-3xl md:text-4xl text-white font-bold drop-shadow"
            english="Hi, I'm Kiana!"
            japanese="こんにちは、キアナです!"
            stepMs={120}
            pauseMs={1400}
            startDelayMs={0}
          />
          <p className="absolute top-20 left-8 z-40 text-sm md:text-base text-slate-200 tracking-wide">
            Junior CS Student @ SJSU
          </p>

          {/* Moon — down-right */}
          <motion.div
            className="absolute top-[12%] right-[12%] z-30"
            style={{ x: moonX, y: moonY, opacity: moonOpacity }}
          >
            <Moon />
          </motion.div>

          {/* Sun — up-right */}
          <motion.div
            className="absolute bottom-[18%] left-[10%] z-30"
            style={{ x: sunX, y: sunY, opacity: sunOpacity }}
          >
            <Sun />
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            style={{ opacity: hintOpacity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-50"
          >
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-center"
            >
              <span className="text-cyan-100 text-sm font-light tracking-[0.2em] uppercase">
                Scroll to see sunrise
              </span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="mt-2 text-blue-200 text-lg"
              >
                ↓
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
