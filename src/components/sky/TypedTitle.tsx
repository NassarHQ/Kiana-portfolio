"use client";
import React from "react";
import { motion } from "framer-motion";

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

const TypedTitle: React.FC<{
  english: string;
  japanese: string;
  className?: string;
  stepMs?: number;
  pauseMs?: number;
  startDelayMs?: number;
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

  React.useEffect(() => {
    if (!startDelayMs) return;
    const t = setTimeout(() => void 0, startDelayMs);
    return () => clearTimeout(t);
  }, [startDelayMs]);

  let text = "";
  if (phase === "TYPE_EN") text = en.slice(0, i);
  else if (phase === "HOLD_EN") text = en;
  else if (phase === "EN_TO_JP") text = jp.slice(0, i) + en.slice(i);
  else if (phase === "HOLD_JP") text = jp;
  else if (phase === "JP_TO_EN") text = en.slice(0, i) + jp.slice(i);

  const delay = phase === "HOLD_EN" || phase === "HOLD_JP" ? null : stepMs;

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

export default TypedTitle;
