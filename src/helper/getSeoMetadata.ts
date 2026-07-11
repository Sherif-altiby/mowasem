// lib/getSeoMetadata.ts
import { Metadata } from "next";
import { Root, Seo } from "@/types/Seo/base";

// seo datat for General pages
export async function getSeoMetadata(
  slug: string,
  path: string,
): Promise<Metadata> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/seo-pages/${slug}`,
      {
        next: { revalidate: 84000 },
        signal: AbortSignal.timeout(10000),
      },
    );

    if (!res.ok) {
      return {
        title: "شركة مواسم للسياحة والسفر",
        description: "شركة مواسم للسياحة والسفر - خيارك الأول لرحلاتك",
        alternates: {
          canonical: `${process.env.NEXT_PUBLIC_URL}/${path}`,
        },
        robots: {
          index: true,
          follow: true,
        },
        icons: {
          icon: "/favicon.ico",
        },
      };
    }

    const seoData = (await res.json()) as Root;

    const baseUrl = process.env.NEXT_PUBLIC_URL || "https://zhab-wa-awda.com";

    return {
      title: seoData?.data.seo.metaTitle || "Default Title",
      description: seoData?.data.seo.metaDescription || "Default description",
      keywords: seoData?.data.seo.keywords,
      icons: {
        icon: "/favicon.ico",
      },
      openGraph: {
        title: seoData?.data.seo.ogTitle || "Default Title",
        description: seoData?.data.seo.ogDescription || "Default description",
        images: seoData?.data.seo.ogImage
          ? [seoData.data.seo.ogImage]
          : ["/favicon.ico"],
      },
      alternates: {
        canonical: `${baseUrl}/${path}`,
      },
      robots: {
        index: seoData?.data.seo.noIndex === true ? false : true,
        follow: seoData?.data.seo.noFollow === true ? false : true,
        nosnippet: seoData?.data.seo.noSnippet ?? false,
        googleBot: {
          index: seoData?.data.seo.noIndex === true ? false : true,
          follow: seoData?.data.seo.noFollow === true ? false : true,
        },
      },
    };
  } catch (error) {
    console.error(`[SEO] Error fetching metadata for slug ${slug}:`, error);
    return {
      title: "شركة مواسم للسياحة والسفر",
      description: "شركة مواسم للسياحة والسفر - خيارك الأول لرحلاتك",
      icons: {
        icon: "/favicon.ico",
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  }
}

// seo datat for Details pages
export function mapSeoToMetadata(
  seo?: Seo,
  path?: string,
  slug?: string | string[],
): Metadata {
  if (!seo) {
    return {
      title: "شركة مواسم للسياحة والسفر",
      description: "شركة مواسم للسياحة والسفر - خيارك الأول لرحلاتك",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://zhab-wa-awda.com";

  return {
    title: seo.metaTitle || "Default Title",
    description: seo.metaDescription || "Default description",
    keywords: seo.keywords,
    // canolical
    alternates: {
      canonical: `${baseUrl}/${path}/${slug ? (Array.isArray(slug) ? slug.join("/") : slug) : ""
        }`,
    },

    robots: {
      index: seo.noIndex === true ? false : true,
      follow: seo.noFollow === true ? false : true,
      nosnippet: seo.noSnippet ?? false,
      googleBot: {
        index: seo.noIndex === true ? false : true,
        follow: seo.noFollow === true ? false : true,
      },
    },

    openGraph: {
      title: seo.ogTitle || seo.metaTitle,
      description: seo.ogDescription || seo.metaDescription,
      images: seo.ogImage ? [seo.ogImage] : ["/favicon.ico"],
    },
  };
}
