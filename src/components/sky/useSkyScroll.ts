"use client";
import { useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useRef } from "react";

export function useSkyScroll() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Moon
  const moonX = useTransform(scrollYProgress, [0, 0.7], ["0%", "60%"]);
  const moonY = useTransform(scrollYProgress, [0, 0.7], ["0%", "50%"]);
  const moonOpacity = useTransform(scrollYProgress, [0, 0.5, 0.7], [1, 0.5, 0]);

  // Sun
  const sunX = useTransform(scrollYProgress, [0.2, 1], ["-60%", "20%"]);
  const sunY = useTransform(scrollYProgress, [0.2, 1], ["60%", "-10%"]);
  const sunOpacity = useTransform(scrollYProgress, [0.1, 0.3, 1], [0, 0.3, 1]);

  // Text
  const introX = useTransform(scrollYProgress, [0.2, 1], ["80vw", "3vw"]);
  const introY = useTransform(scrollYProgress, [0.2, 1], ["40vh", "-40vh"]);
  const introOpacity = useTransform(scrollYProgress, [0.1, 0.3, 1], [0, 0.3, 1]);

  // Stars / night
  const starsOpacity = useTransform(scrollYProgress, [0, 0.45, 0.7], [1, 0.35, 0]);
  const nightOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 0.7, 0.1]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  // Bloom
  const sunXPct = useTransform(scrollYProgress, [0.2, 1], [20, 70]);
  const sunYPct = useTransform(scrollYProgress, [0.2, 1], [65, 25]);
  const lightProgress = useTransform(scrollYProgress, [0.2, 1], [0, 1]);
  const a1 = useTransform(lightProgress, p => p * 0.4);
  const a2 = useTransform(lightProgress, p => p * 0.2);
  const radialBloom = useMotionTemplate`
    radial-gradient(
      ellipse 150% 100% at ${sunXPct}% ${sunYPct}%,
      rgba(255,220,150, ${a1}) 0%,
      rgba(255,180,120, ${a2}) 30%,
      transparent 70%
    )
  `;

  return {
    ref,
    moonX, moonY, moonOpacity,
    sunX, sunY, sunOpacity,
    introX, introY, introOpacity,
    starsOpacity, nightOpacity, hintOpacity,
    radialBloom, lightProgress
  };
}
