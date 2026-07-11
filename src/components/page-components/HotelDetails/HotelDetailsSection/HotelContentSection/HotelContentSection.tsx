import {
  FaWifi,
  FaSwimmingPool,
  FaParking,
  FaDog,
  FaBan,
  FaCheck,
  FaSnowflake,
  FaMugHot,
  FaConciergeBell,
  FaBed,
  FaWhatsapp,
} from "react-icons/fa";
import { HiStar, HiOutlineTicket } from "react-icons/hi";
import { BiCheckShield, BiUser, BiExpand } from "react-icons/bi";
import PhotoGallery from "@/components/common/ImageGallery/ImageGallery";
import { HotelData } from "@/types/Data/hotelDetails";
import { getGlobalSettings } from "@/services/PagesData/settingsService";
import Image from "next/image";
import { FiUsers } from "react-icons/fi";
import ShareButton from "@/components/page-components/tours/Sharebutton";

type HotelInclude = NonNullable<HotelData["includes"]>[number];
type HotelPolicy = {
  _id?: string;
  title: string;
  description: string;
  icon: string;
};

type NestedPolicies = {
  checkIn?: { from?: string; until?: string };
  checkOut?: { from?: string; until?: string };
  rules?: string[];
  children?: string[];
  internet?: string[];
  pets?: string[];
  parking?: string[];
  cancellation?: string[];
};

type NewRoomStructure = {
  id?: string;
  _id?: string;
  name?: string;
  title?: string;
  description?: string;
  photos?: string[];
  image?: string;
  price?: string | number;
  currency?: string;
  highlights?: string[];
  area?: string | number;
  occupancy?: { adults?: number; children?: number; maxOccupancy?: string };
  maxAdults?: number;
};

type TransformedRoom = {
  _id?: string;
  title?: string;
  description?: string;
  image?: string;
  price?: string | number;
  currency?: string;
  area?: string | number;
  maxAdults?: number;
};

const getIcon = (iconName: string) => {
  if (!iconName) return <FaCheck className="w-6 h-6 text-gray-500" />;
  switch (iconName.toLowerCase()) {
    case "wifi":
      return <FaWifi className="w-6 h-6 text-gray-600" />;
    case "pool":
      return <FaSwimmingPool className="w-6 h-6 text-gray-600" />;
    case "parking":
      return <FaParking className="w-6 h-6 text-gray-600" />;
    case "pets":
      return <FaDog className="w-6 h-6 text-gray-600" />;
    case "cancel":
      return <FaBan className="w-6 h-6 text-gray-600" />;
    case "food":
    case "breakfast":
      return <FaMugHot className="w-6 h-6 text-gray-600" />;
    case "ac":
      return <FaSnowflake className="w-6 h-6 text-gray-600" />;
    case "concierge":
    case "service":
      return <FaConciergeBell className="w-6 h-6 text-gray-600" />;
    default:
      return <FaCheck className="w-6 h-6 text-gray-600" />;
  }
};

const getPolicyIcon = (title: string) => {
  if (title.includes("دفع") || title.includes("pay"))
    return <BiCheckShield className="w-8 h-8 text-primary" />;
  if (title.includes("إلغاء") || title.includes("cancel"))
    return <FaBan className="w-8 h-8 text-primary" />;
  if (title.includes("أطفال") || title.includes("child"))
    return <BiUser className="w-8 h-8 text-primary" />;
  return <BiCheckShield className="w-8 h-8 text-primary" />;
};

export default async function HotelContentSection({
  data,
}: {
  data: HotelData;
}) {
  const settings = await getGlobalSettings().catch(() => null);
  const mainPhoneNumber =
    (settings?.data?.contactInfo?.phones?.[0]?.countryCode ?? "") +
    (settings?.data?.contactInfo?.phones?.[0]?.number ?? "");

  // Handle different price structures
  const hotelPrice = typeof data?.price === 'number' 
    ? data.price 
    : data?.price?.amount || data?.price?.min || "---";

  // Handle different image structures
  const hotelImages: (string | { url: string; alt: string })[] = (() => {
    if (Array.isArray(data?.images)) {
      return data.images.filter((img): img is string => img !== undefined);
    }
    if (data?.images?.all) {
      return data.images.all.filter((img): img is string => img !== undefined);
    }
    if (data?.imageCover) {
      return [data.imageCover];
    }
    return [];
  })();

  // Handle different city/country structures
  const cityName = typeof data?.city === 'string' ? data.city : data?.city?.name;
  const countryName = typeof data?.country === 'string' ? data.country : data?.country?.name;

  // Handle different rating structures
  const starRating = data?.stars || data?.star_rating || 0;
  const reviewCount = data?.ratingCount || data?.number_of_reviews || 0;

  // Transform policies from nested object to array format
  const transformedPolicies = (() => {
    if (!data?.policies) return [];
    
    // If policies is already an array, return as is
    if (Array.isArray(data.policies)) return data.policies;
    
    // Transform nested object to array
    const policyArray: HotelPolicy[] = [];
    const policies = data.policies as NestedPolicies;
    
    if (policies.checkIn) {
      policyArray.push({
        _id: 'checkin',
        title: 'تسجيل الوصول',
        description: `من: ${policies.checkIn.from || '--'} ${policies.checkIn.until ? `إلى: ${policies.checkIn.until}` : ''}`,
        icon: 'checkin'
      });
    }
    
    if (policies.checkOut) {
      policyArray.push({
        _id: 'checkout',
        title: 'تسجيل المغادرة',
        description: `حتى: ${policies.checkOut.until || '--'}`,
        icon: 'checkout'
      });
    }
    
    if (policies.children && Array.isArray(policies.children) && policies.children.length > 0) {
      policyArray.push({
        _id: 'children',
        title: 'الأطفال',
        description: policies.children[0] || '',
        icon: 'children'
      });
    }
    
    if (policies.internet && Array.isArray(policies.internet) && policies.internet.length > 0) {
      policyArray.push({
        _id: 'internet',
        title: 'الإنترنت',
        description: policies.internet[0] || '',
        icon: 'wifi'
      });
    }
    
    if (policies.pets && Array.isArray(policies.pets) && policies.pets.length > 0) {
      policyArray.push({
        _id: 'pets',
        title: 'الحيوانات الأليفة',
        description: policies.pets[0] || '',
        icon: 'pets'
      });
    }
    
    if (policies.parking && Array.isArray(policies.parking) && policies.parking.length > 0) {
      policyArray.push({
        _id: 'parking',
        title: 'مواقف السيارات',
        description: policies.parking[0] || '',
        icon: 'parking'
      });
    }
    
    if (policies.rules && Array.isArray(policies.rules) && policies.rules.length > 0) {
      policies.rules.forEach((rule: string, index: number) => {
        policyArray.push({
          _id: `rule-${index}`,
          title: 'قواعد إضافية',
          description: rule,
          icon: 'rules'
        });
      });
    }
    
    return policyArray;
  })();

  // Transform rooms to match expected structure
  const transformedRooms = (() => {
    if (!data?.rooms) return [];

    // Check if rooms need transformation (new API structure has 'id' and 'name')
    const needsTransformation = data.rooms[0]?.id && data.rooms[0]?.name;
    
    // If rooms already have the expected structure, return as is
    if (!needsTransformation && (data.rooms[0]?._id || data.rooms[0]?.title)) return data.rooms;

    // Transform new room structure to expected format
    return data.rooms.map((room: NewRoomStructure) => {
      // Handle price - use hotel price if room price is N/A
      let roomPrice: string | number = 'N/A';
      if (room.price !== undefined && room.price !== null && room.price !== '' && room.price !== 'N/A') {
        roomPrice = room.price;
      } else if (typeof data?.price === 'number') {
        roomPrice = data.price;
      } else if (data?.price?.amount) {
        roomPrice = data.price.amount;
      } else if (data?.price?.min) {
        roomPrice = data.price.min;
      }
      
      // Convert to string if it's a number
      const finalPrice = typeof roomPrice === 'number' ? String(roomPrice) : roomPrice;
      
      return {
        _id: room.id || room._id,
        title: room.name || room.title,
        description: room.description || '',
        image: room.photos?.[0] || room.image || undefined,
        price: finalPrice,
        currency: room.currency || data.currency || 'SAR',
        area: room.highlights?.find((h: string) => h.includes('متر'))?.replace(/[^\d.]/g, '') || room.area || undefined,
        maxAdults: room.occupancy?.adults || room.maxAdults || undefined
      };
    });
  })();

  return (
    <div className="w-full relative pb-24 md:pb-8 text-primary bg-card rounded-[32px] p-6">
      {/* الشريط السفلي العائم للجوال */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card shadow-[0_-4px_15px_rgba(0,0,0,0.05)] p-4 z-50 flex justify-between items-center border-t border-gray-100">
        <a
          href={`https://wa.me/${mainPhoneNumber}?text=${encodeURIComponent(
            `مرحبًا 👋 أريد الاستفسار عن ${data?.hotel_name || data?.name}`,
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white px-5 py-3 rounded-full flex items-center gap-2 font-bold text-sm"
        >
          <FaWhatsapp className="w-5 h-5" />
          تواصل معنا عبر واتساب
        </a>
        <div className="text-left flex flex-col items-end">
          <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
            يبدأ من{" "}
            <span className="text-lg font-bold text-primary">
              {hotelPrice} {typeof data?.price === 'object' ? data?.price?.currency : data.currency || "﷼"}
            </span>
          </span>
          <span className="text-[10px] text-gray-400">
            شامل ضريبة القيمة المضافة
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-0">
        {/* الترويسة الرئيسية */}
        <div className="flex justify-between items-end mb-6 pt-4">
          <div className="flex-1 pr-0 md:pr-4">
            <h1 className="text-[20px] md:text-[40px] font-semibold text-[#1A1A1A] mb-2 leading-tight">
              {data?.hotel_name || data?.name}
            </h1>
            <div className="flex items-center gap-2 mb-3 text-[#575859] text-[12px] md:text-[24px]">
              <HiStar className="text-[#FFB800] w-5 h-5" />
              <span>{starRating} نجوم</span>
              {reviewCount > 0 ? (
                <span>({reviewCount} تقييم)</span>
              ) : null}
            </div>
            <div className="text-[14px] md:text-[26px] text-[#3B3C3E] flex items-center gap-1 font-medium">
              <span>{cityName}</span>
              {countryName && <span>، {countryName}</span>}
            </div>
          </div>
          <ShareButton title={data?.hotel_name || data?.name || "فندق"} />
        </div>

        {/* القسم الرئيسي: المحتوى والصور */}
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-8 mb-10 w-full">
          {/* النص والمرافق - على اليمين في سطح المكتب */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1 flex flex-col justify-between self-stretch mb-6">
            <div>
              <h2 className="text-[18px] md:text-[32px] font-bold mb-4 text-[#1A1A1A]">
                نظرة عامة للفندق
              </h2>
              <div
                className="text-[12px] md:text-[24px] leading-10 text-[#1A1A1A] mb-8"
                dangerouslySetInnerHTML={{
                  __html: data?.overview || data?.description || "",
                }}
              />
            </div>

            {data?.includes && data.includes.length > 0 && (
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">

                {data.includes.map((inc: HotelInclude) => (
                  <div
                    className="flex items-center gap-3 text-sm md:text-[22px] font-medium text-[#1D1E20]"
                    key={inc._id}
                  >
                    {getIcon(inc.icon)}
                    <span className="line-clamp-1">{inc.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* معرض الصور - على اليسار في سطح المكتب */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            {hotelImages && hotelImages.length > 0 && (
              <PhotoGallery images={hotelImages} />
            )}
          </div>
        </div>

        {/* محرك البحث (نموذج حقيقي) */}
        {/* <HotelBookingForm /> */}

        {/* الغرف */}
        <div className="mt-6 mb-10 w-full relative">
          <div className="flex justify-between items-center gap-3 mb-6">
            <h2 className="text-[16px] md:text-[32px] font-semibold flex items-center gap-2 text-[#1A1A1A]">
              <span className="bg-[#EEF2F8] p-2 rounded-lg text-[#1A1A1A]">
                <FaBed className="w-6 h-6 text-[#141B34]" />
              </span>
              الغرف
            </h2>
          </div>

          <div className="space-y-4">
            {transformedRooms && transformedRooms.length > 0 ? (
              transformedRooms.map((room: TransformedRoom) => (
                <div
                  key={room._id}
                  className="border border-[#E5E7EB] rounded-[16px] lg:rounded-[24px] p-4 lg:p-6 flex flex-row items-stretch gap-3 lg:gap-6 bg-card w-full overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow"
                >
                  {/* صورة الغرفة */}
                  {room.image && (
                    <div className="w-[80px] h-[80px] lg:w-[130px] lg:h-[130px] shrink-0 rounded-[12px] lg:rounded-2xl overflow-hidden relative self-center border border-gray-100">
                      <Image
                        src={room.image}
                        alt={room.title || "Room image"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* بيانات الغرفة واسمها */}
                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    <h3 className="font-semibold md:font-bold text-[12px] lg:text-[32px] mb-1 lg:mb-2 text-[#1A1A1A] leading-snug line-clamp-2">
                      {room.title}
                    </h3>
                    <p className="text-[10px] lg:text-[24px] text-[#575859] line-clamp-1 lg:line-clamp-2">
                      {room.description}
                    </p>
                  </div>

                  <div className="hidden lg:block w-px bg-gray-200 self-stretch my-2 shrink-0"></div>

                  {/* الميزات والأيقونات */}
                  <div className="flex flex-col justify-center gap-1 lg:gap-3 shrink-0 lg:px-3">
                    {room.maxAdults && (
                      <div className="flex items-center gap-1.5 lg:gap-2 text-[10px] lg:text-[24px] text-[#1A1A1A] whitespace-nowrap">
                        <FiUsers className="w-3.5 h-3.5 lg:w-5 lg:h-5 text-[#858687]" />
                        <span>{room.maxAdults} بالغين</span>
                      </div>
                    )}
                    {room.area && (
                      <div className="flex items-center gap-1.5 lg:gap-2 text-[10px] lg:text-[24px] text-[#1A1A1A] whitespace-nowrap">
                        <BiExpand className="w-3.5 h-3.5 lg:w-5 lg:h-5 text-[#3041A9]" />
                        <span>{room.area} م²</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 lg:gap-2 text-[10px] lg:text-[24px] text-[#1A1A1A] whitespace-nowrap">
                      <HiOutlineTicket className="w-3.5 h-3.5 lg:w-5 lg:h-5 text-[#00A651]" />
                      <span>مستردة</span>
                    </div>
                  </div>

                  <div className="hidden lg:block w-px bg-gray-200 self-stretch my-2 shrink-0"></div>

                  {/* السعر والزر */}
                  <div className="flex flex-col justify-center shrink-0 items-end text-right min-w-[90px] lg:min-w-[180px]">
                    <div className="w-full text-right mb-1.5 lg:mb-3">
                      <div className="text-[#1A1A1A] text-[10px] lg:text-[20px] flex items-center justify-end flex-wrap whitespace-nowrap font-medium gap-1">
                        <span className="hidden sm:inline">ابتداءً من</span>
                        <span
                          className="font-bold text-[16px] lg:text-[28px] text-primary inline-flex items-center gap-0.5 mx-0.5"
                          dir="ltr"
                        >
                          {/* <span className="text-[12px] lg:text-[20px] ">﷼</span> */}
                          <Image
                            src={"/assets/riyal.svg"}
                            alt="currency riyal"
                            width={20}
                            height={20}
                          />
                          {room.price !== 'N/A' ? room.price : '---'}
                        </span>
                        <span className="text-[#1A1A1A] text-[10px] lg:text-[20px]">
                          /ليلة
                        </span>
                      </div>
                      <div
                        className="text-[8px] lg:text-[20px] text-[#333333] whitespace-nowrap text-right w-full"
                        dir="auto"
                      >
                        (شامل ضريبة القيمة المضافة)
                      </div>
                    </div>
                    <button className="w-full lg:w-auto lg:px-12 bg-primary text-white py-1.5 lg:py-3.5 rounded-[8px] lg:rounded-[14px] font-bold text-[11px] lg:text-[16px] hover:shadow-lg transition-all self-end">
                      احجز الآن
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-xl">
                لا توجد غرف متاحة حالياً.
              </div>
            )}
          </div>
        </div>

        {/* خريطة الموقع */}
        <div className="mb-10 w-full relative">
          <h2 className="text-[18px] md:text-[32px] font-semibold md:font-bold mb-4 border-b pb-2 border-gray-100">
            الموقع الذي ستقيم فيه
          </h2>
          <iframe
            width="100%"
            height="553"
            className="border-0 rounded-3xl shadow-sm h-[200px] md:h-[600px]"
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps?q=${data?.latitude},${data?.longitude}&output=embed`}
          />
        </div>

        {/* سياسات الفندق */}
        {transformedPolicies && transformedPolicies.length > 0 && (
          <div className="mb-14 border-t pt-8 border-gray-100">
            <h2 className="text-xl font-extrabold mb-6 text-center md:text-right">
              سياسات الفندق
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {transformedPolicies.map((policy: HotelPolicy) => (
                <div
                  key={policy._id}
                  className="border border-gray-100 rounded-2xl px-6 py-7 text-center flex flex-col items-center bg-card drop-shadow-[0_2px_8px_-1px_rgb(0,0,0,0.17)] hover:shadow-lg transition-shadow"
                >
                  <div className="bg-[#E6E9F0F0] p-4 rounded-2xl mb-4">
                    {getPolicyIcon(policy.title)}
                  </div>
                  <h3 className="font-extrabold mb-2 text-[#000619] text-lg">
                    {policy.title}
                  </h3>
                  <p className="text-sm md:text-[20px] font-medium text-[#1D1E20] leading-relaxed" dangerouslySetInnerHTML={{ __html: policy.description }} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
