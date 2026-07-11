export const dynamic = "force-dynamic";
import Breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import { getSeoMetadata } from "@/helper/getSeoMetadata";
import { getBlogs } from "@/services/PagesData/blogsService";
import { getSeoPage } from "@/services/Seo/seoPage";
import { NormalPageSeo } from "@/types/Seo/normalPage";
import BlogsSearch from "@/components/page-components/blogs/BlogsSearch";
import React from "react";
import Script from "next/script";
import PageSection from "@/components/layout/PageSection/PageSection";

export async function generateMetadata() {
  return getSeoMetadata("almdwnh-wadlh-alsfr", "blogs");
}

export default async function Page() {
  let seoData = null as NormalPageSeo | null;
  let data = null;

  try {
    seoData = (await getSeoPage("blogs")) as NormalPageSeo;
  } catch (error) {
    console.error("Failed to fetch blogs seo:", error);
  }

  try {
    data = await getBlogs();
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
  }

  const blogs = data?.data?.data || [];
  const baseUrl = process.env.NEXT_PUBLIC_URL;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: seoData?.data?.seo?.metaTitle || "المدونات",
    description: seoData?.data?.seo?.metaDescription || "مجموعة المقالات",
    url: `${baseUrl}/blogs`,
    mainEntity: blogs.map((blog) => ({
      "@type": "BlogPosting",
      headline: blog?.seo?.metaTitle || blog?.title,
      description: blog?.seo?.metaDescription || blog?.descText,
      image: blog.imageCover,
      datePublished: blog.createdAt,
      dateModified: blog.updatedAt || blog.createdAt,
      url: `${baseUrl}/blogs/${blog.slug}`,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "المدونات",
        item: `${baseUrl}/blogs`,
      },
    ],
  };

  return (
    <PageSection>
      {/* Inject Schema */}
      <Script
        id="blogs-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([schema, breadcrumbSchema]),
        }}
      />

      <Breadcrumb
        items={[
          { href: "/", label: "الرئيسية" },
          { href: "/blogs", label: "المدونات" },
        ]}
      />
      {blogs.length > 0 ? (
        <div className="secondary-page-layout gap-y-5! md:gap-y-10!">
          <BlogsSearch blogs={blogs} seoData={seoData} />
        </div>
      ) : (
        <div className="secondary-page-layout">
          <div className="flex flex-col items-center justify-center py-20 text-center w-full">
            <h3 className="text-2xl font-semibold text-gray-700">
              عذراً، لا توجد مدونات
            </h3>
            <p className="text-gray-500 mt-2">
              لا توجد مقالات متطابقة حالياً، يرجى المحاولة لاحقاً
            </p>
          </div>
        </div>
      )}
    </PageSection>
  );
}
