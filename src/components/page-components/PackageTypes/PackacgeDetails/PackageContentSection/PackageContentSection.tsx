import { MdLocationOn, MdFlightTakeoff } from "react-icons/md";
import CitiesSwiper from "@/components/page-components/PackageTypes/PackacgeDetails/CitiesGallery/CitiesGallery";
import { Branch, Pkg } from "@/types/Data/packageDetails";
import BranchDetails from "./BranchDetails/BranchDetails";

// Server Component
export default function PackageContentSection({
  packageGlobalData,
  branches,
}: {
  packageGlobalData: Pkg;
  branches: Branch[];
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className=" bg-gradient-to-br from-[#EEF2F8] via-white to-[#EEF2F8]/50 p-6 sm:p-8 rounded-3xl shadow-lg border border-primary/5 transition-all duration-500 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-blue-400 rounded-full blur-2xl"></div>
        </div>

        <div className="flex flex-col gap-12  ">
          {/* Header Section */}
          <div className=" flex flex-col lg:flex-row items-start lg:items-center gap-4 justify-between">
            <div className="flex flex-col items-start gap-2">
              <p className="text-3xl sm:text-4xl font-bold text-primary leading-tight">
                {packageGlobalData?.name}
              </p>
              <div className="inline-flex items-center justify-center gap-2 bg-secondary text-primary  px-4 py-2 rounded-full text-sm font-medium">
                <MdLocationOn className="w-4 h-4" />
                <span>{packageGlobalData?.packageType?.name || ""}</span>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-card/60 rounded-2xl shadow-md p-4  backdrop-blur-sm border border-white/20">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-xl">
                <MdLocationOn className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">
                  عن الرحلة
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {packageGlobalData?.descText || ""}
                </p>
                <div
                  className="text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: packageGlobalData?.description || "",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Branch Details Section */}
          <BranchDetails branches={branches} />

          {/* Cities Swiper Section */}
          <div className="flex flex-col gap-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-primary mb-2">
                الوجهات المتضمنة في البرنامج
              </h2>
            </div>
            <CitiesSwiper cities={packageGlobalData?.cities || []} />
          </div>

          {/* Action Button */}
          <div className="text-center pt-6 border-t border-white/20">
            <button className="bg-primary text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto">
              <MdFlightTakeoff className="w-5 h-5" />
              احجز الآن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
