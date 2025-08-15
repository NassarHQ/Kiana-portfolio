"use client";
import React from "react";
import { motion } from "framer-motion";

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

export default Stars;
