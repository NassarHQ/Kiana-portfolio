export default function Moon() {
  return (
    <svg
      width="275"
      height="275"
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Moon Body */}
      <circle cx="60" cy="60" r="50" fill="#e5e7eb" />

      {/* Craters */}
      <circle cx="40" cy="45" r="8" fill="#d1d5db" opacity="0.9" />
      <circle cx="75" cy="50" r="5" fill="#d1d5db" opacity="0.7" />
      <circle cx="55" cy="80" r="6" fill="#d1d5db" opacity="0.65" />
    </svg>
  );
}
