"use client";
import React from "react";
import { motion } from "framer-motion";

const CloudSVG = ({ opacity = 0.9 }: { opacity?: number }) => (
  <svg
    viewBox="0 0 120 60"
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="50" cy="38" rx="38" ry="18" fill="white" opacity={opacity} />
    <ellipse cx="28" cy="34" rx="16" ry="12" fill="white" opacity={opacity} />
    <ellipse cx="46" cy="26" rx="18" ry="14" fill="white" opacity={opacity} />
    <ellipse cx="70" cy="30" rx="20" ry="14" fill="white" opacity={opacity} />
    <ellipse cx="90" cy="36" rx="16" ry="12" fill="white" opacity={opacity} />
  </svg>
);

const Clouds = () => {
  const clouds = [
    {
      top: "26%",
      right: "4%",
      w: 170,
      h: 78,
      duration: 65,
      opacity: 0.9,
      scale: 1.0,
      hideOnMobile: true,
    },
    {
      top: "14%",
      right: "10%",
      w: 135,
      h: 62,
      duration: 52,
      opacity: 0.85,
      scale: 0.9,
      hideOnMobile: true,
    },
    {
      top: "20%",
      right: "2%",
      w: 200,
      h: 90,
      duration: 74,
      opacity: 0.92,
      scale: 1.1,
      hideOnMobile: false,
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {clouds.map((c, i) => (
        <motion.div
          key={i}
          className={`${c.hideOnMobile ? "hidden md:block" : ""} absolute`}
          style={{
            top: c.top,
            right: c.right,
            width: c.w,
            height: c.h,
            scale: c.hideOnMobile ? c.scale : 0.85,
            opacity: c.opacity,
            filter: "blur(0.3px)",
          }}
          initial={{ x: "0vw" }}
          animate={{ x: ["0vw", "-120vw"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            duration: c.duration,
          }}
        >
          <CloudSVG opacity={c.opacity} />
        </motion.div>
      ))}
    </div>
  );
};

export default Clouds;
