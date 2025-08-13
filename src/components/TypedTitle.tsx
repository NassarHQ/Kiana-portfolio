"use client";

import { useEffect, useMemo, useState } from "react";
import { gloria, notoJP } from "@/app/fonts";

type Props = {
  english: string;
  japanese: string;
  className?: string;
  stepMs?: number; // time per character replace
  pauseMs?: number; // pause when a phrase is fully shown
};

export default function TypedTitle({
  english,
  japanese,
  className = "",
  stepMs = 60,
  pauseMs = 1000,
}: Props) {
  // stage decides the direction of overwrite
  const [stage, setStage] = useState<"en->jp" | "jp->en">("en->jp");
  const from = stage === "en->jp" ? english : japanese;
  const to = stage === "en->jp" ? japanese : english;

  // k = how many characters from "to" have replaced the start of "from"
  const [k, setK] = useState(0);
  const maxLen = useMemo(() => Math.max(from.length, to.length), [from, to]);

  // Current text is: first k chars from target + the tail of the source
  // This gives a visual left->right "overwrite" without a delete-then-type phase.
  const text = useMemo(() => {
    return to.slice(0, k) + from.slice(k);
  }, [from, to, k]);

  // Tick forward until we fully match the target, pause, then flip direction
  useEffect(() => {
    if (k < maxLen) {
      const t = setTimeout(() => setK((x) => x + 1), stepMs);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setStage((s) => (s === "en->jp" ? "jp->en" : "en->jp"));
        setK(0);
      }, pauseMs);
      return () => clearTimeout(t);
    }
  }, [k, maxLen, stepMs, pauseMs]);

  // Use JP font while overwriting toward JP, EN font while overwriting toward EN
  const fontClass = stage === "en->jp" ? notoJP.className : gloria.className;

  return (
    <h1 className={`font-bold ${fontClass} ${className}`}>
      {text}
      <span className="ml-1 opacity-70 animate-pulse">|</span>
    </h1>
  );
}
