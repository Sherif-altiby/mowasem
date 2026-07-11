import { City, CityWeather } from "@/types/Data/cityDetails";
import {
  FiCalendar,
  FiClock,
  FiCloud,
  FiDroplet,
  FiMapPin,
  FiThermometer,
  FiWind,
} from "react-icons/fi";

export default function CityContentSection({
  data,
  cityWeather,
}: {
  data: City;
  cityWeather: CityWeather;
}) {
  return (
    <div className="h-fit xl:col-span-2 overflow-hidden  bg-gradient-to-br from-secondary to-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-lg flex flex-col gap-4 sm:gap-6">
      {/* العنوان الرئيسي */}
      <div className="header flex flex-col gap-2 sm:gap-3">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <FiMapPin className="text-primary text-xl sm:text-2xl flex-shrink-0" />
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary break-words">
            {data.name}
          </p>
        </div>
        <div
          className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: data.description }} 
        />
      </div>

      {/* الشهر والوقت المفضل */}
      {(data.favMonth?.length > 0 || data.favTime?.length > 0) && (
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 bg-card p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm">
          {data.favMonth?.length > 0 && (
            <div className="flex flex-col gap-4 sm:gap-3 flex-1">
              <div className="flex items-center gap-2">
                <FiCalendar className="text-primary text-lg sm:text-xl" />
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">
                  الشهر المفضل
                </h2>
              </div>
              <div className="bg-secondary text-primary px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base lg:text-lg w-fit">
                {data.favMonth.map((month: string) => month).join(", ")}
              </div>
            </div>
          )}

          {data.favTime?.length > 0 && (
            <div className="flex flex-col gap-4 sm:gap-3 flex-1">
              <div className="flex items-center gap-2">
                <FiClock className="text-primary text-lg sm:text-xl" />
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">
                  الأوقات المفضلة
                </h2>
              </div>
              <div className="best-time flex flex-wrap gap-2">
                {data.favTime.map((time) => (
                  <div
                    key={time}
                    className="bg-secondary text-primary px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base lg:text-lg"
                  >
                    {time}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* معلومات الطقس */}
      {cityWeather?.weather && (
        <div className="bg-card p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <FiCloud className="text-primary text-lg sm:text-xl" />
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">
              نبذة عن الطقس
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 p-3 rounded-lg sm:rounded-xl bg-secondary border border-primary/10">
              <FiThermometer className="text-primary flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-600 truncate">
                  درجة الحرارة
                </p>
                <p className="font-semibold text-primary text-sm sm:text-base">
                  {cityWeather?.main?.temp}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 p-3 rounded-lg sm:rounded-xl bg-secondary border border-primary/10">
              <FiCloud className="text-primary flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-600 truncate">
                  حالة الطقس
                </p>
                <p className="font-semibold text-primary text-sm sm:text-base">
                  {cityWeather?.weather[0]?.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 p-3 rounded-lg sm:rounded-xl bg-secondary border border-primary/10">
              <FiDroplet className="text-primary flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-600 truncate">
                  الرطوبة
                </p>
                <p className="font-semibold text-primary text-sm sm:text-base">
                  {cityWeather?.main?.humidity}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 p-3 rounded-lg sm:rounded-xl bg-secondary border border-primary/10">
              <FiWind className="text-primary flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-600 truncate">
                  سرعة الرياح
                </p>
                <p className="font-semibold text-primary text-sm sm:text-base">
                  {cityWeather?.wind?.speed}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
