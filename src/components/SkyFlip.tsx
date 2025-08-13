"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, clamp } from "framer-motion";
import Stars from "@/components/Stars";
import Moon from "@/components/Moon";
import Sunrise from "@/components/Sunrise";

export default function SkyFlip() {
  // This whole component is a 200vh scroll area (2 screens tall)
  const ref = useRef<HTMLDivElement | null>(null);

  // Track scroll progress only within this component
  // 0 at the very top of the section, 1 when you've scrolled past its bottom
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Map scroll progress -> sunrise position
  // First ~60% of the scroll slides sunrise from 100% (offscreen) to 0% (covering night)
  const y = useTransform(scrollYProgress, [0, 0.6], ["100%", "0%"]);
  // Soft dim of the night as sunrise comes up
  const dim = useTransform(scrollYProgress, [0, 0.6], [0, 0.12]);

  return (
    <div ref={ref} className="relative h-[200vh] w-full">
      {/* STICKY viewport section: the animated reveal happens here */}
      <section className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Night base */}
        <div className="relative h-full w-full bg-gradient-to-t from-blue-800 via-blue-950 to-slate-950">
          <Stars />
          <div className="absolute top-[10%] right-[12%] z-10 rounded-full motion-safe:animate-[float_6s_ease-in-out_infinite] drop-shadow-[0_0_20px_rgba(0,255,255,0.75)]">
            <Moon />
          </div>

          {/* Subtle dim as sunrise rises */}
          <motion.div
            className="pointer-events-none absolute inset-0 bg-black z-10"
            style={{ opacity: dim }}
          />

          {/* Sunrise panel sliding up over the night */}
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

      {/* Landing section: once you scroll past the reveal, you’re on sunrise */}
      <section className="h-screen w-full">
        <Sunrise />
      </section>
    </div>
  );
}
