import React from "react";

const Moon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 140 140"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#a7f3f3" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="moonFill" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#e6e9ee" />
        <stop offset="100%" stopColor="#d7dbe2" />
      </radialGradient>
    </defs>
    <circle cx="70" cy="70" r="66" fill="url(#moonGlow)" />
    <circle cx="70" cy="70" r="52" fill="url(#moonFill)" />
    <circle cx="50" cy="48" r="8" fill="#cfd6df" opacity="0.7" />
    <circle cx="88" cy="54" r="6" fill="#cfd6df" opacity="0.6" />
    <circle cx="74" cy="82" r="7" fill="#cfd6df" opacity="0.65" />
  </svg>
);

export default Moon;