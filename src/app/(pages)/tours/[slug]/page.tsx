import React from "react";
import { Metadata } from "next";
import Script from "next/script";
import { mapSeoToMetadata } from "@/helper/getSeoMetadata";
import { getTourbySlug } from "@/services/PagesData/toursService";
import Breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import ImageGallery from "@/components/common/ImageGallery/ImageGallery";
import PageSection from "@/components/layout/PageSection/PageSection";
import TourRating from "@/components/page-components/tours/TourRating/TourRating";
import TourDetails from "@/components/page-components/tours/TourDetailds/TourDetails";
import TourInclusions from "@/components/page-components/tours/TourInclusions/TourInclusions";
import TourPackages from "@/components/page-components/TourDetails/TourPackages/TourPackages";
import TourExclusions from "@/components/page-components/tours/TourInclusions/TourExclusions";
import TourProgram from "@/components/page-components/TourDetails/TourProgram/TourProgram";
import { Clock, Info, ShieldAlert, MapPin, Bus } from "lucide-react";
import ShareButton from "@/components/page-components/tours/Sharebutton";
import { Image, Package, ProgramItem } from "@/types/Data/tourDetails";
import { Seo } from "@/types/Seo/base";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ItineraryItem {
  description?: string;
  duration?: {
    fixedDurationInMinutes?: number;
  };
}

interface Logistics {
  travelerPickup?: {
    additionalInfo?: string;
  };
}


interface TourData {
  // Core
  id?: string;
  _id: string;
  title: string;
  description: string;
  descText?: string;
  imageCover?: string;
  rating?: {
    average: number;
    count: number;
  };
  slug: string;
  productCode: string;
  program: ProgramItem[];
  source: string;
  duration: number;

  // Location
  location?: string;
  city: string | { name?: string; slug?: string; coordinates?: { lat?: string; lon?: string }; country?: { name?: string; slug?: string } } | null;
  country?: { name?: string } | null;
  coordinates?: { lat: number; lng: number };

  // Images
  images: Image[];

  // Inclusions / Exclusions
  inclusions: string[];
  includes?: string[];
  exclusions: string[];
  excludes?: string[];

  // Itinerary
  itinerary?: {
    itineraryItems?: ItineraryItem[];
  };

  // Logistics
  logistics?: Logistics;

  // Policies
  cancellationPolicy?: string | { type?: string; description?: string } | null;
  isInstantConfirmation?: boolean;
  isFreeCancellation?: boolean;
  timeZone?: string | null;

  // Packages
  packages: Package[];

  // Extra info
  additionalInfo?: (string | { description?: string })[];

  // Pricing
  price?: {
    amount: number;
    currency: string;
  };

  // Product Options
  productOptions?: {
    optionCode: string;
    title: string;
    packageDescription: string[];
    termsAndConditions: string[];
    howToUse: string[];
    price: number;
    currency: string;
    _id: string;
    id: string;
  }[];

  // Tags
  tags?: string[];

  // SEO
  seo?: Seo;

  // Saved by user
  isSavedByUser?: boolean;

  // Additional properties from Data
  shortDescription?: string;
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const tour = await getTourbySlug(slug);
    return mapSeoToMetadata(tour?.data?.seo, "tours", slug);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { title: "Tour" };
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let data;
  try {
    data = await getTourbySlug(slug);
    console.log("API Response:", data);
  } catch (error) {
    console.error("Failed to fetch tour:", error);
  }

  const tour = data?.data as TourData | undefined;
  console.log("tour details:", tour);
  if (!tour) {
    return (
      <div className="container py-10 text-center mt-24">
        <h2 className="text-2xl font-bold">
          عذراً، لم نتمكن من العثور على الجولة.
        </h2>
      </div>
    );
  }

  const coverImage = tour.images?.find((img: Image) => img?.isCover)?.url || (typeof tour.images?.[0] === 'string' ? tour.images[0] : tour.images?.[0]?.url);
  const imageUrls = tour.images?.map((img: Image) => typeof img === 'string' ? img : img.url) || [];

  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.description,
    url: `${process.env.NEXT_PUBLIC_URL}/tours/${slug}`,
    image: coverImage,
  };

  return (
    <>
      <Script
        id="tour-details-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageSection className="flex flex-col items-start gap-3 md:gap-6">
        <Breadcrumb
          items={[
            { href: "/", label: "الرئيسية" },
            { href: "/tours", label: "جولات" },
            { href: `/tours/${slug}`, label: tour.title },
          ]}
        />
        <div className="details-page-layout container bg-transparent md:bg-card rounded-3xl px-0!  md:p-6! md:border border-[#1a1a1a]/7 md:drop-shadow-[0_4px_4px_0_rgba(0,0,0,0.05)] mb-10!">
          <div className="flex flex-col items-start gap-3 md:gap-4 px-2 md:px-0">
            <h1 className="font-semibold text-lg md:text-[40px] text-[#1A1A1A] leading-tight">
              {tour.title}
            </h1>
            {tour?.rating ? <TourRating rating={tour.rating} /> : null}
            <div className="flex  w-full justify-between items-start sm:items-center gap-2 sm:gap-4">
              <p className="text-[#3B3C3E] text-xs md:text-[26px] font-medium w-full text-start flex items-center gap-2">
                <MapPin className="w-3 h-3 md:w-5 md:h-5 text-[#FEBF4C]" />
                {typeof tour.city === 'string' ? tour.city : tour.city?.name || tour.location}
                {tour.country?.name || (typeof tour.city !== 'string' && tour.city?.country?.name) ? "، " + (tour.country?.name || (typeof tour.city !== 'string' && tour.city?.country?.name)) : ""}
              </p>
              <ShareButton title={tour.title} />
            </div>
          </div>

          <ImageGallery images={imageUrls} />
          <TourDetails tour={tour} />


          <TourInclusions
            includes={
              tour.inclusions && tour.inclusions.length > 0
                ? tour.inclusions
                : tour.includes
            }
          />
          <TourExclusions
            excludes={
              tour.exclusions && tour.exclusions.length > 0
                ? tour.exclusions
                : tour.excludes
            }
          />

          {/* Tour Program */}
          {tour.program && tour.program.length > 0 && (
            <div className="w-full flex flex-col gap-6 ">
              <h2 className="text-lg md:text-[32px] font-bold text-[#1A1A1A] w-full text-right flex items-center gap-3">
                <Clock className="w-5 h-5 md:w-8 md:h-8 text-[#FEBF4C]" />
                برنامج الرحلة
              </h2>
              <TourProgram programs={tour.program} />
            </div>
          )}
          {/* Itinerary */}
          {tour.itinerary?.itineraryItems &&
            tour.itinerary.itineraryItems.length > 0 && (
              <div className="w-full flex flex-col gap-6 px-2 md:px-0">
                <h2 className="text-lg md:text-[32px] font-bold text-[#1A1A1A] w-full text-right flex items-center gap-3">
                  <Clock className="w-5 h-5 md:w-8 md:h-8 text-[#FEBF4C]" />
                  خط سير الرحلة
                </h2>
                <div className="flex flex-col gap-4 text-right">
                  {tour.itinerary.itineraryItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 p-3 md:p-4 rounded-xl border border-gray-100"
                    >
                      <p className="text-[#575859] leading-relaxed text-sm md:text-base">
                        {item.description}
                      </p>
                      {item.duration?.fixedDurationInMinutes && (
                        <p className="text-xs md:text-sm font-semibold text-[#1A1A1A] mt-2">
                          المدة: {item.duration.fixedDurationInMinutes} دقيقة
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Logistics & Pickup */}
          {tour.logistics?.travelerPickup?.additionalInfo && (
            <div className="w-full flex flex-col gap-6 px-2 md:px-0">
              <h2 className="text-lg md:text-[32px] font-bold text-[#1A1A1A] w-full text-right flex items-center gap-3">
                <Bus className="w-5 h-5 md:w-8 md:h-8 text-[#FEBF4C]" />
                الالتقاء والتوصيل
              </h2>
              <div className="bg-blue-50 p-4 md:p-5 rounded-2xl border border-blue-100 text-right">
                <p className="text-[#1A1A1A] leading-relaxed whitespace-pre-line text-xs md:text-sm lg:text-base">
                  {tour.logistics.travelerPickup.additionalInfo}
                </p>
              </div>
            </div>
          )}

          {/* Cancellation Policy */}
          {tour.cancellationPolicy && (
            <div className="w-full flex flex-col gap-6 px-2 md:px-0">
              <h2 className="text-lg md:text-[32px] font-bold text-[#1A1A1A] w-full text-right flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 md:w-8 md:h-8 text-[#FEBF4C]" />
                سياسة الإلغاء
              </h2>
              <div className="text-[#575859] leading-relaxed text-right text-xs md:text-sm lg:text-base">
                {typeof tour.cancellationPolicy === 'string' ? (
                  <p>{tour.cancellationPolicy}</p>
                ) : (
                  <>
                    {tour.cancellationPolicy.type && (
                      <p className="font-semibold mb-2">{tour.cancellationPolicy.type}</p>
                    )}
                    {tour.cancellationPolicy.description && (
                      <p>{tour.cancellationPolicy.description}</p>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Additional Info */}
          {tour.additionalInfo && tour.additionalInfo.length > 0 && (
            <div className="w-full flex flex-col gap-6 px-2 md:px-0">
              <h2 className="text-lg md:text-[32px] font-bold text-[#1A1A1A] w-full text-right flex items-center gap-3">
                <Info className="w-5 h-5 md:w-8 md:h-8 text-[#FEBF4C]" />
                معلومات إضافية
              </h2>
              <ul className="list-disc list-inside text-[#575859] leading-relaxed text-right space-y-2 text-xs md:text-sm lg:text-base">
                {tour.additionalInfo.map((info, idx) => {
                  const infoText =
                    typeof info === "string" ? info : info.description;
                  return <li key={idx}>{infoText}</li>;
                })}
              </ul>
            </div>
          )}

          {/* Map */}
          <div className="w-full flex flex-col gap-6 px-2 md:px-0">
            <h2 className="text-lg md:text-[32px] font-bold text-[#1A1A1A] w-full text-right">
              الموقع
            </h2>
            <iframe
              width="100%"
              height="553"
              className="border-0 rounded-3xl shadow-sm h-[200px] md:h-[600px]"
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${tour?.coordinates?.lat},${tour?.coordinates?.lng}&output=embed`}
            />
          </div>

          {/* Packages */}
          {(tour.packages && tour.packages.length > 0) || (tour.productOptions && tour.productOptions.length > 0) ? (
            <div className="w-full flex flex-col gap-6 px-2 md:px-0">
              <h2 className="text-lg md:text-[32px] font-bold text-[#1A1A1A] w-full text-right">
                الباقات المتاحة لرحلتك السياحية
              </h2>
              <TourPackages packages={tour.packages || tour.productOptions || []} />
            </div>
          ) : null}
        </div>
      </PageSection>
    </>
  );
}
