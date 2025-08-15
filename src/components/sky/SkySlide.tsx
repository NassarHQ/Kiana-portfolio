"use client";
import React, { useRef } from "react";
import { gloria } from "@/app/fonts";
import { playwriteQLD } from "@/app/fonts";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

import Stars from "@/components/sky/Stars";
import Moon from "@/components/sky/Moon";
import Sun from "@/components/sky/Sun";
import Clouds from "@/components/sky/Clouds";
import TypedTitle from "@/components/sky/TypedTitle";

export default function SkySlide() {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Moon: down-right (sets)
  const moonX = useTransform(scrollYProgress, [0, 0.7], ["0%", "60%"]);
  const moonY = useTransform(scrollYProgress, [0, 0.7], ["0%", "50%"]);
  const moonOpacity = useTransform(scrollYProgress, [0, 0.5, 0.7], [1, 0.5, 0]);

  // Sun: up-right (rises)
  const sunX = useTransform(scrollYProgress, [0.2, 1], ["-60%", "20%"]);
  const sunY = useTransform(scrollYProgress, [0.2, 1], ["60%", "-10%"]);
  const sunOpacity = useTransform(scrollYProgress, [0.1, 0.3, 1], [0, 0.3, 1]);

  // Intro text motion
  const introX = useTransform(scrollYProgress, [0.2, 1], ["80vw", "3vw"]);
  const introY = useTransform(scrollYProgress, [0.2, 1], ["40vh", "-40vh"]);
  const introOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.3, 1],
    [0, 0.3, 1]
  );

  // Bloom follows the sun
  const sunXPct = useTransform(scrollYProgress, [0.2, 1], [20, 70]);
  const sunYPct = useTransform(scrollYProgress, [0.2, 1], [65, 25]);
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

  const starsOpacity = useTransform(
    scrollYProgress,
    [0, 0.45, 0.7],
    [1, 0.35, 0]
  );
  const nightOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8],
    [1, 0.7, 0.1]
  );
  const dawnOverlayOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.8],
    [0, 0.8]
  );
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <div ref={ref} className="relative h-[300vh] w-full">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden px-4 md:px-0">
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
          {/* Title */}
          <TypedTitle
            className={`${gloria.className} absolute top-8 left-4 md:left-8 z-40
                        text-[clamp(20px,6vw,40px)] text-white font-bold drop-shadow`}
            english="Hi, I'm Kiana!"
            japanese="こんにちは、キアナです!"
            stepMs={120}
            pauseMs={1400}
            startDelayMs={0}
          />
          <p
            className={`${gloria.className} absolute top-20 left-4 md:left-8 z-40
                        text-[12px] md:text-base text-slate-200 tracking-wide`}
          >
            Junior CS Student @ SJSU
          </p>

          {/* Clouds — top-right, drifting */}
          <Clouds />

          {/* Moon — down-right */}
          <motion.div
            className="absolute top-[12%] right-[12%] z-30"
            style={{ x: moonX, y: moonY, opacity: moonOpacity }}
          >
            <Moon className="w-24 h-24 md:w-[140px] md:h-[140px]" />
          </motion.div>

          {/* Sun — up-right */}
          <motion.div
            className="absolute bottom-[18%] left-[10%] z-30"
            style={{ x: sunX, y: sunY, opacity: sunOpacity }}
          >
            <Sun className="w-28 h-28 md:w-[180px] md:h-[180px]" />
          </motion.div>

          {/* Intro copy */}
          <motion.div
            className="absolute right-4 left-4 md:right-[10%] md:left-auto bottom-[8%] z-30"
            style={{
              x: introX,
              y: introY,
              opacity: introOpacity,
              willChange: "transform",
            }}
          >
            <span
              className={`z-50 text-rock-100 mix-blend-difference text-sm tracking-[0.2em] uppercase drop-shadow w-2/3 block mb-4`}
            >
              {" "}
              I climb rocks for fun, read like it’s a competitive sport, and
              will 100% take apart something just to see if I can put it back
              together better.{" "}
            </span>{" "}
            <span className="z-50 text-rock-300 mix-blend-difference text-sm tracking-[0.2em] uppercase drop-shadow w-2/3 block mb-4">
              {" "}
              I love horses, building things (digital or not), and right now I’m
              bouldering my way up both climbing walls and new projects.{" "}
            </span>{" "}
            <span className="z-50 text-rock-100 mix-blend-difference text-sm tracking-[0.2em] uppercase drop-shadow w-2/3 block mb-4">
              {" "}
              On the more “professional” side, I spent two years helping
              students survive calculus as an SI leader, just got picked as an
              Adobe Student Ambassador, and transferred to SJSU with a 4.0 — so
              yeah, I work hard, but I make it fun.{" "}
            </span>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            style={{ opacity: hintOpacity }}
            className="absolute bottom-14 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-50"
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
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
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