"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Stars from "@/components/Stars";
import Moon from "@/components/Moon";
import Sunrise from "@/components/Sunrise";
import TypedTitle from "./TypedTitle";
import { gloria } from "@/app/fonts";

export default function SkySlide() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // For sunrise movement
  const y = useTransform(scrollYProgress, [0, 0.6], ["100%", "0%"]);
  const dim = useTransform(scrollYProgress, [0, 0.6], [0, 0.12]);

  // For scroll indicator fade out quickly after scrolling starts
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.05],
    [1, 0]
  );

  return (
    <div ref={ref} className="relative h-[200vh] w-full">
      {/* STICKY viewport section */}
      <section className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="relative h-full w-full bg-gradient-to-t from-blue-800 via-blue-950 to-slate-950">
          <Stars />
          <TypedTitle
            className="absolute top-8 left-8 z-40 text-3xl md:text-4xl text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.6)]"
            english="Hi, I'm Kiana!"
            japanese="こんにちは、キアナです!"
            stepMs={120}
            pauseMs={1400}
          />
          <p
            className={`${gloria.className} absolute items-center top-[4.7rem] left-8 z-[999] text-sm md:text-base text-slate-200 tracking-wide`}
          >
            Junior CS Student @ SJSU
          </p>
          <div className="absolute top-[10%] right-[12%] z-10 rounded-full motion-safe:animate-[float_6s_ease-in-out_infinite] drop-shadow-[0_0_20px_rgba(0,255,255,0.75)]">
            <Moon />
          </div>

          {/* Enhanced Scroll Indicator */}
          <motion.div
            style={{ opacity: scrollIndicatorOpacity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-50"
          >
            {/* Glowing orb container */}

            {/* Text with glow */}
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
              className="text-center"
            >
              <span className="text-cyan-100 text-sm font-light tracking-[0.2em] uppercase drop-shadow-[0_0_10px_rgba(147,197,253,0.8)]">
                Discover
              </span>
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="mt-1 text-blue-200 text-xs tracking-wider"
              >
                ↓
              </motion.div>
            </motion.div>

            {/* Falling stars/particles effect */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-20 pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, 30],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeOut",
                    delay: i * 0.4,
                  }}
                  className="absolute left-1/2 top-0 w-1 h-1 bg-cyan-300 rounded-full"
                  style={{
                    left: `${50 + (i - 1) * 20}%`,
                    filter: "blur(0.5px)",
                    boxShadow: "0 0 6px rgba(147,197,253,0.9)",
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Subtle dim */}
          <motion.div
            className="pointer-events-none absolute inset-0 bg-black z-10"
            style={{ opacity: dim }}
          />

          {/* Sunrise panel */}
          <motion.div
            className="absolute inset-0 z-20"
            style={{
              y,
              WebkitMaskImage:
                "linear-gradient(to top, rgba(0,0,0,0.04) 0%, rgba(0,0,0,1) 16%)",
              maskImage:
                "linear-gradient(to top, rgba(0,0,0,0.04) 0%, rgba(0,0,0,1) 16%)",
            }}
            transition={{
              type: "spring",
              stiffness: 160,
              damping: 26,
              mass: 1.1,
            }}
          >
            <Sunrise />
          </motion.div>
        </div>
      </section>

      {/* Landing section */}
      <section className="h-screen w-full">
        <Sunrise />
      </section>
    </div>
  );
}
