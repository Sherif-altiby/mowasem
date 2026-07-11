import Script from "next/script";
import Breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb";
// import ImageGallery from "@/components/common/ImageGallery/ImageGallery";
import {
  getPackagesDetails,
  getPackagesReviews,
} from "@/services/PagesData/packageTypesService";
import { getGlobalSettings } from "@/services/PagesData/settingsService";
import PackageUsersReviews, {
  Reviews,
} from "./PackageContentSection/PackageUsersReviews/PackageUsersReviews";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ReviewForm from "./PackageContentSection/PackageUsersReviews/ReviewForm";
import Link from "next/link";
import PackageClientLayout from "./PackageClientLayout";
import { MdLocationOn } from "react-icons/md";
import PageSection from "@/components/layout/PageSection/PageSection";
import SectionHeader from "@/components/common/SectionHeader/SectionHeader";

export default async function PackageDetails({ slug }: { slug: string[] }) {
  const data = await getPackagesDetails(slug[0], slug[1]);
  console.log("DATA: ", data);
  const reviews = (await getPackagesReviews(slug[1])) as Reviews;
  const pkg = data?.data?.pkg;
  const branches = data?.data?.branches || [];
  const relatedPackages = data?.data?.relatedPackages || [];
  const settings = await getGlobalSettings().catch(() => null);
  const mainPhoneNumber =
    (settings?.data?.contactInfo?.phones?.[0]?.countryCode ?? "") +
    (settings?.data?.contactInfo?.phones?.[0]?.number ?? "");
  const baseUrl = process.env.NEXT_PUBLIC_URL || "";

  if (!pkg) return null;

  const packageSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg?.seo?.metaTitle || pkg?.name || "باقة سياحية",
    description: pkg?.seo?.metaDescription || pkg?.descText || "",
    image: pkg?.imageCover || "",
    ratingValue: pkg?.ratingsAverage || 5,
    ratingCount: pkg?.ratingsQuantity || 0,
    touristType: "عام",
    provider: {
      "@type": "Organization",
      name: "Zahab & Awda",
      url: baseUrl,
    },
  };

  return (
    <PageSection>
      <Script
        id="package-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(packageSchema) }}
      />
      <Breadcrumb
        items={[
          { href: "/", label: "الرئيسية" },
          { href: "/package-types", label: "انواع الباقات" },
          {
            href: `/package-types/${slug[0]}`,
            label: pkg?.packageType?.name || "النوع",
          },
          {
            href: `/package-types/${slug[0]}/${slug[1]}`,
            label: pkg?.name || "الباقة",
          },
        ]}
      />
      <SectionHeader
        title="اختر باقة رحلتك المثالية"
        desc="استعرض الباقات المتاحة لهذه الجولة واختر الباقة التي تناسب احتياجاتك وميزانيتك. كل باقة مصممة لتمنحك تجربة سياحية مميزة، مع خدمات وخيارات مختلفة لتستمتع برحلتك بأفضل طريقة ممكنة. اختر الآن الباقة المناسبة وابدأ رحلتك معنا بكل سهولة."
      />
      <PackageClientLayout
        pkg={pkg}
        branches={branches}
        mainPhoneNumber={mainPhoneNumber}
        sidebarOptionalContent={
          <>
            <PackageUsersReviews reviews={reviews} />
            {/* <ReviewForm packageId={pkg._id} /> */}

            {/* Related Packages Section in Sidebar */}
            {relatedPackages && relatedPackages.length > 0 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold text-primary px-2">
                  باقات قد تعجبك
                </h2>
                <div className="flex flex-col gap-4">
                  {relatedPackages.map((relatedPkg) => (
                    <Link
                      href={`/package-types/${pkg?.packageType?.name || slug[0]}/${relatedPkg?.slug || ""}`}
                      key={relatedPkg?._id}
                      className="group h-fit bg-card rounded-2xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden transition-all duration-300"
                    >
                      <div className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/5 group-hover:bg-primary/10 p-3 rounded-xl transition-colors shrink-0">
                            <MdLocationOn className="w-5 h-5 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-sm font-bold text-primary  group-hover:text-primary transition-colors">
                              {relatedPkg?.name || ""}
                            </h3>
                            <p className="text-gray-400 text-[10px] ">
                              {relatedPkg?.descText || ""}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        }
      />
    </PageSection>
  );
}
