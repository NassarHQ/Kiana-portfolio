// components/Sky.tsx
import Stars from "@/components/Stars";
import Moon from "@/components/Moon";

export default function Sky({ onMoonClick }: { onMoonClick?: () => void }) {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-t from-blue-800 via-blue-950 to-slate-950">
      <Stars />
      <div
        className="absolute top-[10%] right-[12%] z-10 cursor-pointer motion-safe:animate-[float_6s_ease-in-out_infinite] rounded-full drop-shadow-[0_0_20px_rgba(0,255,255,0.75)]"
        onClick={onMoonClick}
        title="Flip to sunrise"
      >
        <Moon />
      </div>
    </section>
  );
}
