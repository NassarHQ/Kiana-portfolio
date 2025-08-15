import SkySlide from "@/components/sky/SkySlide";

export default function Home() {
  return (
    // (optional) add snap for extra polish
    <main className="min-h-screen snap-y snap-mandatory scroll-smooth">
      <section className="snap-start">
        <SkySlide />
      </section>
    </main>
  );
}
