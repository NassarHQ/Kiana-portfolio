import React from "react";

const Sun = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 180 180"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
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

export default Sun;
