import { City, CityWeather } from "@/types/Data/cityDetails";
import DetailsContactSection from "../../../common/DetailsContactSection/DetailsContactSection";
import DetailsContentSection from "@/components/page-components/CityDetails/CityDetailsSection/CityContentSection/CityContentSection";

export default function CityDetailsSection({data , cityWeather}:{data: City , cityWeather: CityWeather}) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
      {/* المحتوى الرئيسي */}
      <DetailsContentSection cityWeather={cityWeather} data={data} />
      {/* الشريط الجانبي للتواصل */}
      <DetailsContactSection />
    </div>
  );
}
