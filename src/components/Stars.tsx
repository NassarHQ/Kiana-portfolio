export default function Stars() {
  return (
    <svg
      className="absolute inset-0 h-full w-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Smaller pattern that fits properly in the viewBox */}
        <pattern
          id="starPattern"
          width="15"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          {/* Realistic star distribution - mostly tiny with few bright ones */}

          {/* Very dim background stars */}
          <circle cx="3" cy="8" r="0.08" fill="white" opacity="0.4" shapeRendering="geometricPrecision"/>
          <circle cx="12" cy="4" r="0.06" fill="white" opacity="0.3" shapeRendering="geometricPrecision"/>
          <circle cx="28" cy="7" r="0.07" fill="white" opacity="0.35" shapeRendering="geometricPrecision"/>
          <circle cx="35" cy="12" r="0.08" fill="white" opacity="0.4" shapeRendering="geometricPrecision"/>
          <circle cx="7" cy="22" r="0.06" fill="white" opacity="0.32" shapeRendering="geometricPrecision"/>
          <circle cx="24" cy="25" r="0.07" fill="white" opacity="0.38" shapeRendering="geometricPrecision"/>
          <circle cx="38" cy="28" r="0.08" fill="white" opacity="0.4" shapeRendering="geometricPrecision"/>
          <circle cx="16" cy="26" r="0.06" fill="white" opacity="0.3" shapeRendering="geometricPrecision"/>
          <circle cx="31" cy="18" r="0.07" fill="white" opacity="0.36" shapeRendering="geometricPrecision"/>

          {/* Medium brightness stars */}
          <circle cx="9" cy="14" r="0.12" fill="white" opacity="0.65" shapeRendering="geometricPrecision"/>
          <circle cx="22" cy="9" r="0.1" fill="white" opacity="0.6" shapeRendering="geometricPrecision"/>
          <circle cx="37" cy="20" r="0.11" fill="white" opacity="0.62" shapeRendering="geometricPrecision"/>
          <circle cx="14" cy="28" r="0.1" fill="white" opacity="0.58" shapeRendering="geometricPrecision"/>
          <circle cx="5" cy="18" r="0.12" fill="white" opacity="0.64" shapeRendering="geometricPrecision"/>

          {/* Bright prominent stars (fewer) */}
          <circle cx="19" cy="16" r="0.18" fill="white" opacity="0.9" shapeRendering="geometricPrecision"/>

          {/* One very bright star with subtle twinkle effect */}
          <circle cx="26" cy="22" r="0.3" fill="white" opacity="0.15" shapeRendering="geometricPrecision"/>
        </pattern>
      </defs>
      {/* Fill entire SVG with the repeating pattern */}
      <rect x="0" y="0" width="100%" height="100%" fill="url(#starPattern)" />
    </svg>
  );
}
