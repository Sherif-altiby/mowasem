import { NextResponse } from "next/server";
import { getTours } from "@/services/PagesData/toursService";
import { getSeoPage } from "@/services/Seo/seoPage";
import { NormalPageSeo } from "@/types/Seo/normalPage";
import { Daum } from "@/types/Data/tours";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_URL;

  const data = await getTours();
  const tours = data?.data?.tours || [];

  const seoPage = (await getSeoPage("tours")) as NormalPageSeo;

  const urls = tours
    .map(
      (tour: Daum) => `
    <url>
      <loc>${baseUrl}/tours/${tour.slug}</loc>
      <lastmod>${tour.updatedAt || new Date().toISOString()}</lastmod>
      <changefreq>${seoPage?.data?.seo?.changeFrequency || "monthly"}</changefreq>
      <priority>${seoPage?.data?.seo?.priority || 0.8}</priority>
    </url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=7200",
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
