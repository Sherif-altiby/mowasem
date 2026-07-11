
export default function HeroBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/10 backdrop-blur-md border border-white/20 text-white mb-6 shadow-lg animate-pulse">
      <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
      <span className="text-sm font-medium tracking-wide">
        وكالتك الأولى للسفر والسياحة
      </span>
    </div>
  );
}
