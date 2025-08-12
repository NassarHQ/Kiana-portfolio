import Image from "next/image";
import React from "react";
import Moon from "@/components/Moon";

export default function Sky() {
  return (
    <div className="sky bg-gradient-to-t from-blue-800 via-blue-950 to-slate-950 h-screen w-full flex items-center justify-center">
      <div className="top-[12%] motion-safe:animate-[float_4s_ease-in-out_infinite] rounded-full absolute top-[10%] right-[12%] drop-shadow-[0_0_20px_rgba(0,255,255,075)]">
        <Moon />
      </div>
    </div>
  );
}
