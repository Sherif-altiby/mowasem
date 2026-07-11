export default function HeroTrustStats() {
  return (
    <div className="mt-12 flex items-center gap-8 border-t border-white/10 pt-8 w-full lg:w-auto justify-center lg:justify-end">
      <div className="text-center lg:text-right">
        <p className="text-3xl font-bold text-white mb-1">+500</p>
        <p className="text-sm text-gray-300">وجهة سياحية</p>
      </div>
      <div className="w-px h-12 bg-card/20" />
      <div className="text-center lg:text-right">
        <p className="text-3xl font-bold text-white mb-1">+10k</p>
        <p className="text-sm text-gray-300">عميل سعيد</p>
      </div>
      <div className="w-px h-12 bg-card/20" />
      <div className="text-center lg:text-right">
        <p className="text-3xl font-bold text-white mb-1">24/7</p>
        <p className="text-sm text-gray-300">دعم متواصل</p>
      </div>
    </div>
  );
}
