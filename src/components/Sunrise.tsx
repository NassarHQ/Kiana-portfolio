// components/Sunrise.tsx
export default function Sunrise() {
  return (
    <section
      id="sunrise"
      className="h-screen w-full relative overflow-hidden bg-gradient-to-t from-amber-400 via-orange-400 to-sky-300"
    >
      <div className="absolute left-1/2 bottom-[-4rem] -translate-x-1/2 w-[28rem] h-[28rem] rounded-full bg-yellow-200 blur-3xl opacity-70" />
      <div className="absolute left-1/2 bottom-[-2rem] -translate-x-1/2 w-72 h-72 rounded-full bg-yellow-100" />
    </section>
  );
}
