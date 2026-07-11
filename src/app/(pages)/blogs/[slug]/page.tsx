import React from "react";
import Image from "next/image";
import { Metadata } from "next";

import { getBlogBySlug } from "@/services/PagesData/blogsService";
import { mapSeoToMetadata } from "@/helper/getSeoMetadata";
import Script from "next/script";
import Breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import PageSection from "@/components/layout/PageSection/PageSection";
import logoImg from "@/../public/assets/footer-logo.webp";
import RelatedBlogs from "@/components/page-components/blogs/RelatedBlogs";
import ShareLinksMobile from "@/components/page-components/blogs/ShareLinksMobile";
import ShareLinksDesktop from "@/components/page-components/blogs/ShareLinksDesktop";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const blog = await getBlogBySlug(slug);
    return mapSeoToMetadata(blog?.data?.blog?.seo, "blogs", slug);
  } catch (error) {
    console.error("Failed to fetch blog meta:", error);
    return { title: "Blog" };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let data;
  try {
    data = await getBlogBySlug(slug);
  } catch (error) {
    console.error("Failed to fetch blog:", error);
  }
  const blog = data?.data?.blog;
  const relatedBlogs = data?.data?.relatedBlogs || [];

  if (!blog) {
    return (
      <div className="container py-10 text-center">
        <h2 className="text-2xl font-bold">
          عذراً، لم نتمكن من العثور على المدونة
        </h2>
      </div>
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_URL;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog?.seo?.metaTitle || blog.title,
    description: blog?.seo?.metaDescription || blog.descText,
    image: blog.imageCover,
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt || blog.createdAt,
    url: `${baseUrl}/blogs/${slug}`,
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
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
        item: `${baseUrl}/blogs/${slug}`,
      },
    ],
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate read time
  const calculateReadTime = (htmlContent: string) => {
    if (!htmlContent) return 5;
    const textContent = htmlContent.replace(/<[^>]*>?/gm, "");
    const wordCount = textContent.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / 200)); // 200 words per minute
  };
  const timeToRead = calculateReadTime(blog.description);

  return (
    <PageSection>
      <Script
        id="blog-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([blogSchema, breadcrumbSchema]),
        }}
      />

      <div className="w-full space-y-6!">
        <Breadcrumb
          items={[
            { href: "/", label: "الرئيسية" },
            { href: "/blogs", label: "المقالات" },
            { href: "", label: "تفاصيل المقالة" },
          ]}
        />
        <div className="secondary-page-layout w-full mt-2 gap-y-3 md:gap-y-5! bg-card rounded-[32px] p-8!">
          {/* Header Region */}
          <div className="flex flex-col gap-3 md:gap-4 items-start md:items-center text-start md:text-center mt-2">
            <h1 className="text-[14px] md:text-[40px] font-semibold text-[#0F1115] leading-snug max-w-4xl">
              {blog.title}
            </h1>
            {blog.descText && (
              <p className="text-[10px] md:text-[24px] text-[#303135] leading-relaxed max-w-3xl">
                {blog.descText}
              </p>
            )}
          </div>

          {/* Meta Information Bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 md:py-6 gap-3 md:gap-0 mt-2 border-b md:border-b-0 border-gray-100">
            {/* Top row in mobile: Author & Share Links */}
            <div className="flex items-center justify-between w-full md:hidden">
              {/* Author (Mobile)*/}
              <div className="flex items-center gap-3">
                <span className="font-medium text-[9px] text-[#1A1A1A]">
                  Zahabwaawda
                </span>
                <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center p-[2px] bg-[#E5EFFF] text-blue-800 font-bold overflow-hidden">
                  <Image
                    src={logoImg}
                    alt="Zahab"
                    width={24}
                    height={24}
                    className="rounded-full object-contain"
                  />
                </div>
              </div>

              {/* Share Links (Mobile) */}
              <ShareLinksMobile blogDescription={blog.description} />
            </div>

            {/* Desktop Share Links */}
            <ShareLinksDesktop blogDescription={blog.description} />

            {/* Date & Read Time */}
            <div className="flex items-center gap-2 text-[9px] md:text-[22px] text-[#1D1E20] font-medium">
              <span>{formatDate(blog.createdAt)}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1D1E20] mx-1 md:mx-2" />
              <span>{timeToRead} دقائق للقراءة</span>
            </div>

            {/* Desktop Author */}
            <div className="hidden md:flex items-center gap-3">
              <span className="font-medium text-[24px] text-[#1A1A1A]">
                Zahabwaawda
              </span>
              <div className="w-11 h-11 rounded-full border border-gray-100 flex items-center justify-center p-[3px] bg-[#E5EFFF] text-blue-800 font-bold overflow-hidden">
                <Image
                  src={logoImg}
                  alt="Zahab"
                  width={36}
                  height={36}
                  className="rounded-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Main Image Banner */}
          <div className="relative w-full h-[250px] md:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden mt-2 border border-gray-100 shadow-sm">
            <Image
              src={blog.imageCover || "/assets/CITY.webp"}
              alt={blog.alt || blog.title}
              fill
              sizes="(max-w-768px) 100vw, 1200px"
              className="object-cover"
              priority
            />
          </div>

          {/* Details Content & Sidebar Layout */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 pt-6">
            {/* Article Content Right - takes precedence visually in RTL */}
            <div className="flex-[3] min-w-0 flex flex-col gap-10">
              <article
                className="prose prose-lg md:prose-xl max-w-none text-[#1A1A1A] leading-[1.8]
                  prose-headings:text-[#1A1A1A] prose-headings:font-bold prose-headings:mb-4
                  prose-h2:text-2xl prose-h2:md:text-3xl
                  prose-h3:text-xl prose-h3:md:text-2xl
                  prose-p:text-[#4A4B4F] prose-p:mb-6
                  prose-li:text-[#4A4B4F] prose-li:my-2
                  prose-ul:ps-6
                  prose-a:text-primary prose-a:font-medium hover:prose-a:underline"
                dangerouslySetInnerHTML={{
                  __html: blog.description || "لا يوجد وصف",
                }}
              />

              {/* Related Blogs inner right row */}
              {relatedBlogs.length > 0 && (
                <div className="mt-6 pt-8 flex flex-col">
                  <h3 className="text-2xl md:text-[28px] font-bold text-[#1A1A1A] mb-6">
                    مقالات أخرى
                  </h3>
                  <RelatedBlogs data={relatedBlogs} />
                  {/* <RelatedBlogs blogs={relatedBlogs} currentSlug={slug} /> */}
                </div>
              )}
            </div>

            {/* Sidebar Tags Left */}
            {/* {blog.tags && blog.tags.length > 0 && (
              <div className="flex-[1] w-full">
                <div className="md:bg-[#F8F9FA] md:border border-gray-100 md:border-[#E9ECEF] rounded-3xl py-4 md:p-8 flex flex-col gap-4 md:gap-5 sticky top-24">
                  <h3 className="text-[20px] md:text-[22px] font-bold text-[#1A1A1A] text-center md:mb-1">
                    المواضيع الشائعة
                  </h3>
                  <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
                    {blog.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-4 py-2 md:px-5 md:py-2.5 rounded-xl bg-card border border-gray-200 md:border-[#E9ECEF] text-[#4A4B4F] text-[13px] md:text-base font-medium shadow-sm hover:border-primary hover:text-primary transition-colors cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </PageSection>
  );
}
