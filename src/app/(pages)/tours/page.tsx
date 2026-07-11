import React from "react";
import Script from "next/script";
import TourCard from "@/components/ui/TourCard/TourCard";
import { getSeoMetadata } from "@/helper/getSeoMetadata";
import { getTours } from "@/services/PagesData/toursService";
import { getSeoPage } from "@/services/Seo/seoPage";
import { NormalPageSeo } from "@/types/Seo/normalPage";
import PageSection from "@/components/layout/PageSection/PageSection";
import SectionHeader from "@/components/common/SectionHeader/SectionHeader";
import ToursSearch from "@/components/page-components/tours/ToursSearch";
import ToursFilter from "@/components/page-components/tours/ToursFilter";
import Pagination from "@/components/common/Pagination/Pagination";
import { Tours, Daum as TourDaum } from "@/types/Data/tours";

type TourImage = {
  isCover?: boolean;
  url?: string;
};


export async function generateMetadata() {
  return getSeoMetadata("dlyl-aljwlat", "tours");
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;

  const q = typeof resolvedParams?.q === "string" ? resolvedParams.q : "";
  const cityNameFromUrl = typeof resolvedParams?.city === "string" ? resolvedParams.city : "";
  const priceRange = typeof resolvedParams?.price === "string" ? resolvedParams.price : "";

  const page = typeof resolvedParams?.page === "string" ? resolvedParams.page : "1";

  let initialData: Tours | null = null;
  try {
    initialData = await getTours();
  } catch (error) {
    console.error("Failed to fetch initial tours:", error);
  }

  const allToursForMapping: TourDaum[] = initialData?.tours || [];

  const uniqueCityObjects = Array.from(
    new Map(
      allToursForMapping
        .filter((t) => t.city)
        .map((t) => [t.city, { _id: t.city, name: t.city }])
    ).values()
  );

  const selectedCityObj = uniqueCityObjects.find(c => c.name === cityNameFromUrl);

  const queryForBackend: Record<string, string> = { limit: "9" };
  if (selectedCityObj) queryForBackend.city = selectedCityObj._id || "";
  if (q) queryForBackend.q = q;
  if (priceRange) queryForBackend.price = priceRange;
  if (page) queryForBackend.page = page;

  let data: Tours | null = null;
  try {
    data = await getTours(queryForBackend);
  } catch (error) {
    console.error("Failed to fetch filtered tours:", error);
  }

  let seoData = null as NormalPageSeo | null;
  try {
    seoData = (await getSeoPage("tours")) as NormalPageSeo;
  } catch (error) {
    console.error("Failed to fetch tours seo:", error);
  }

  const tours: TourDaum[] = data?.tours || [];
  console.log("tours", tours);
  const pagination = data?.pagination || null;
  const toursWithImages = tours.filter((tour) => {
    const img = tour?.images?.[0];
    const coverImage =
      (typeof img === "string" ? img : img?.url) ||
      tour?.rawViatorData?.images?.find((i: TourImage) => i.isCover)?.url ||
      tour?.rawViatorData?.images?.[0]?.url ||
      tour?.seo?.ogImage ||
      tour?.coverImage?.url;

    return !!coverImage;
  });
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: seoData?.data?.title || "الجولات",
    description: seoData?.data?.description || "الجولات",
    url: `${process.env.NEXT_PUBLIC_URL}/tours`,
    itemListElement: tours.map((tour: TourDaum, index: number) => ({
      "@type": "TouristTrip",
      position: index + 1,
      name: tour.title,
      description: tour.description,
      url: `${process.env.NEXT_PUBLIC_URL}/tours/${tour.slug}`,
      image: tour.coverImage?.url || tour.images?.[0]?.url,
    })),
  };

  return (
    <>
      <Script
        id="tours-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageSection>
        <div className="secondary-page-layout gap-4!  md:gap-12!">
          <ToursSearch />
          <SectionHeader
            title={seoData?.data?.title || "الجولات"}
            desc={seoData?.data?.description || "جولات ناجحة ومميزة لك معنا"}
          />

          <ToursFilter cities={uniqueCityObjects.map(c => c.name).filter((c): c is string => !!c)} />
          {toursWithImages.length > 0 ? (
            <div className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {toursWithImages.map((tour: TourDaum, i: number) => (
                  <TourCard key={tour._id ?? i} tour={tour} />
                ))}
              </div>

              {pagination && (
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.pages}
                  hasNextPage={pagination.page < pagination.pages}
                  hasPrevPage={pagination.page > 1}
                />
              )}
            </div>
          ) : (

            <div className="flex flex-col items-center justify-center py-20 text-center w-full">
              <h3 className="text-2xl font-semibold text-gray-700">
                عذراً، لا توجد نتائج
              </h3>
              <p className="text-gray-500 mt-2">
                حاول تغيير خيارات البحث لرؤية المزيد من النتائج
              </p>
            </div>
          )}

        </div>
      </PageSection>
    </>
  );
}
