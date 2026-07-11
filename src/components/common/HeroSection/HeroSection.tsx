import dynamic from "next/dynamic";

// Client-side interactive components
const HeroInteractive = dynamic(() => import("./HeroInteractive"), {
  loading: () => (
    <div className="relative min-h-[calc(100vh-48px)] rounded-[40px] bg-black m-6 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-black" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#03081f]/40 via-[#03081f]/10 to-[#03081f]/40 pointer-events-none" />
    </div>
  ),
});

export default function HeroSection() {
  return (
    <section className="w-full">
      <HeroInteractive />
    </section>
  );
}
