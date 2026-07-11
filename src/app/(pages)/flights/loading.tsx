export default function Loading() {
  return (
    <div className="w-full animate-pulse container mx-auto pt-4 mb-6! mt-35! md:mt-42!  ">

        {/* ── SectionHeader skeleton (Hero) ── */}
        <div className="flex flex-col items-center text-center mb-10 gap-4">
          <div className="h-8 md:h-12 w-2/3 md:w-1/2 bg-gray-200 rounded-xl" />
          <div className="h-4 md:h-6 w-full max-w-2xl bg-gray-200 rounded-lg" />
          <div className="h-4 md:h-6 w-4/5 max-w-xl bg-gray-200 rounded-lg" />
        </div>

        {/* ── Map illustration skeleton ── */}
        <div className="relative w-full max-w-[1000px] mx-auto px-4 mb-16 h-[200px] md:h-[400px] my-10">
          {/* Main map background */}
          <div className="absolute inset-0 bg-gray-200 rounded-2xl opacity-60" />

          {/* Animated pin blobs */}
          {[
            { top: "25%", left: "15%", size: "w-6 h-6 md:w-10 md:h-10" },
            { top: "55%", left: "25%", size: "w-8 h-8 md:w-12 md:h-12" },
            { top: "30%", left: "48%", size: "w-7 h-7 md:w-10 md:h-10" },
            { top: "50%", left: "45%", size: "w-6 h-6 md:w-8 md:h-8" },
            { top: "35%", left: "72%", size: "w-10 h-10 md:w-14 md:h-14" },
            { top: "65%", left: "82%", size: "w-7 h-7 md:w-11 md:h-11" },
          ].map((pin, i) => (
            <div
              key={i}
              className={`absolute hidden sm:block ${pin.size} bg-gray-300 rounded-full`}
              style={{ top: pin.top, left: pin.left }}
            />
          ))}

          {/* Center badge */}
          <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[160px] h-[88px] md:w-[273px] md:h-[151px] bg-gray-300 rounded-2xl" />
        </div>

        {/* ── SectionHeader skeleton (Plan) ── */}
        <div className="flex flex-col items-center text-center mb-10 gap-4">
          <div className="h-7 md:h-10 w-1/3 md:w-1/4 bg-gray-200 rounded-xl" />
          <div className="h-4 md:h-5 w-full max-w-xl bg-gray-200 rounded-lg" />
          <div className="h-4 md:h-5 w-3/4 max-w-md bg-gray-200 rounded-lg" />
        </div>

        {/* ── FlightBookForm skeleton ── */}
        <div className="w-full bg-card rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10 mb-16">
          {/* Tab row */}
          <div className="flex gap-3 mb-6">
            <div className="h-10 w-28 bg-gray-200 rounded-full" />
            <div className="h-10 w-28 bg-gray-200 rounded-full" />
          </div>

          {/* Row 1: From / To */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="h-14 bg-gray-100 rounded-2xl" />
            <div className="h-14 bg-gray-100 rounded-2xl" />
          </div>

          {/* Row 2: Date / Passengers / Class */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="h-14 bg-gray-100 rounded-2xl" />
            <div className="h-14 bg-gray-100 rounded-2xl" />
            <div className="h-14 bg-gray-100 rounded-2xl" />
          </div>

          {/* Submit button */}
          <div className="flex justify-end">
            <div className="h-12 w-40 bg-gray-300 rounded-2xl" />
          </div>
        </div>

        {/* ── Features Section skeleton ── */}
        <div className="text-center mt-10 pb-5">
          {/* Section title */}
          <div className="h-8 md:h-12 w-1/3 bg-gray-200 rounded-xl mx-auto mb-4" />

          {/* Section description lines */}
          <div className="flex flex-col items-center gap-3 mb-12">
            <div className="h-4 md:h-6 w-full max-w-3xl bg-gray-200 rounded-lg" />
            <div className="h-4 md:h-6 w-5/6 max-w-2xl bg-gray-200 rounded-lg" />
            <div className="h-4 md:h-6 w-2/3 max-w-xl bg-gray-200 rounded-lg" />
          </div>

          {/* 3 feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="bg-card rounded-3xl p-8 flex flex-col items-center text-center border border-gray-100 shadow-sm"
              >
                {/* Icon circle */}
                <div className="w-16 h-16 rounded-full bg-gray-200 mb-6" />
                {/* Card title */}
                <div className="h-6 md:h-8 w-1/2 bg-gray-200 rounded-lg mb-3" />
                {/* Card description */}
                <div className="flex flex-col gap-2 w-full">
                  <div className="h-4 md:h-5 w-full bg-gray-100 rounded-md" />
                  <div className="h-4 md:h-5 w-5/6 mx-auto bg-gray-100 rounded-md" />
                  <div className="h-4 md:h-5 w-4/6 mx-auto bg-gray-100 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>

    </div>
  );
}
