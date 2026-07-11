export default function Loading() {
  return (
    <div
      className="min-h-screen animate-pulse"
      style={{ backgroundColor: "#f8f9fa", color: "#00153B" }}
    >
      <div className="container py-8">
        {/* Header Section */}
        <div className="text-center mb-16 py-12">
          <div className="h-12 w-48 bg-gray-300 rounded mx-auto mb-6"></div>
          <div className="h-6 w-72 bg-gray-200 rounded mx-auto mb-4"></div>
          <div className="h-5 w-3/4 bg-gray-200 rounded mx-auto"></div>
        </div>

        {/* Stats Section */}
        <div
          className="rounded-xl p-8 mb-12"
          style={{ backgroundColor: "#EEF2F8" }}
        >
          <div className="h-8 w-48 bg-gray-300 rounded mx-auto mb-8"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="h-10 w-20 bg-gray-300 rounded mx-auto"></div>
                <div className="h-5 w-24 bg-gray-200 rounded mx-auto"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8 mb-12">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="bg-card rounded-xl p-4 md:p-8 shadow-lg border-r-4  md:space-y-4 space-y-2"
              style={{ borderColor: "#00153B" }}
            >
              <div className="h-6 w-40 bg-gray-300 rounded"></div>
              <div className="h-5 w-full bg-gray-200 rounded"></div>
              <div className="h-5 w-2/3 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>

        {/* Goals */}
        <div className="bg-card rounded-xl p-8 shadow-lg">
          <div className="h-8 w-40 bg-gray-300 rounded mx-auto mb-8"></div>
          <div className="grid md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-lg space-y-3"
                style={{ backgroundColor: "#EEF2F8" }}
              >
                <div className="w-24 h-24 rounded-full mx-auto bg-gray-300"></div>
                <div className="h-5 w-32 bg-gray-300 rounded mx-auto"></div>
                <div className="h-4 w-48 bg-gray-200 rounded mx-auto"></div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div
            className="inline-block rounded-xl p-8 md:space-y-4 space-y-2"
            style={{ backgroundColor: "#00153B" }}
          >
            <div className="h-6 w-40 bg-gray-300 rounded mx-auto"></div>
            <div className="h-5 w-72 bg-gray-400 rounded mx-auto"></div>
            <div className="h-10 w-40 bg-gray-200 rounded mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
