import { Data, ItineraryItem } from "@/types/Data/tourDetails";
import {
  IoLocationOutline,
  IoTimeOutline,
  IoCheckmark,
  IoClose,
} from "react-icons/io5";
import TourProgram from "../../TourProgram/TourProgram";

export default function TourContentSection({ data }: { data: Data }) {
  return (
    <div className="xl:col-span-2   bg-gradient-to-br from-[#EEF2F8] via-white to-[#EEF2F8]/50 p-6 sm:p-8 rounded-3xl shadow-lg border border-primary/5 transition-all duration-500 relative overflow-hidden">
      {/* Hero Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4 text-primary/70">
          <IoLocationOutline className="w-5 h-5" />
          <span className="text-lg font-medium">
            {typeof data.city === 'string' ? data.city : data.city?.name || ''}
            {data.country?.name || (typeof data.city !== 'string' && data.city?.country?.name) ? `, ${data.country?.name || (typeof data.city !== 'string' && data.city?.country?.name)}` : ""}
          </span>
        </div>

        <p className="text-3xl sm:text-4xl font-bold text-primary mb-4 leading-tight">
          {data.title}
        </p>

        <div
          className="text-lg text-primary/80 mb-3 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />

      </div>

      {/* Tour Program */}
      {data.program && data.program.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">
            برنامج الرحلة
          </h2>
          <TourProgram programs={data.program} />
        </div>
      )}

      {/* Tour Itinerary */}
      {data.itinerary?.itineraryItems && data.itinerary.itineraryItems.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">
            تفاصيل الرحلة
          </h2>

        <div className="space-y-6">
          {(data.itinerary?.itineraryItems ?? []).map((item: ItineraryItem, index: number) => (
            <div
              key={index}
              className="bg-card/70 rounded-2xl p-6 border border-primary/10 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>

                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1 text-primary/70">
                      <IoTimeOutline className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {item.duration?.fixedDurationInMinutes ? `${item.duration.fixedDurationInMinutes} دقيقة` : ""}
                      </span>
                    </div>
                  </div>

                  <p className="text-primary/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      )}

      {/* Includes & Excludes */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Includes */}
        <div className="bg-card/70 rounded-2xl p-6 border border-primary/10">
          <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            <IoCheckmark className="w-5 h-5 text-green-600" />
            الجوله تشمل :
          </h3>

          <ul className="space-y-3">
            {(data.inclusions ?? []).map((item: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <IoCheckmark className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                <span className="text-primary/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Excludes */}
        <div className="bg-card/70 rounded-2xl p-6 border border-primary/10">
          <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            <IoClose className="w-5 h-5 text-red-500" />
            الجوله لا تشمل :
          </h3>

          <ul className="space-y-3">
            {(data.exclusions ?? []).map((item: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <IoClose className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                <span className="text-primary/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/3 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
    </div>
  );
}
