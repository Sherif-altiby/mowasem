import AnimatedDiv from "@/components/common/AnimatedWrapper/AnimatedWrapper";
import { Plane } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-card/80 backdrop-blur-md">
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative flex items-center justify-center w-28 h-28">
          {/* Animated rings */}
          <div className="absolute inset-0 border-4 border-dashed border-[#00246B]/20 rounded-full animate-[spin_4s_linear_infinite]" />
          <div className="absolute inset-2 border-4 border-transparent border-t-[#00246B] border-r-[#00246B]/50 rounded-full animate-[spin_1.5s_ease-in-out_infinite]" />

          <div className="absolute inset-0 bg-[#00246B]/5 rounded-full animate-pulse" />

          <Plane
            className="w-10 h-10 text-[#00246B] absolute -rotate-45"
            strokeWidth={1.5}
          />
        </div>

        <AnimatedDiv
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#00246B] font-bold text-lg tracking-widest drop-shadow-sm animate-pulse">
            جاري التحميل...
          </span>
        </AnimatedDiv>
      </div>
    </div>
  );
}
