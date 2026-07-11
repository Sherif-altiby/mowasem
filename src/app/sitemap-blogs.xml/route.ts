import { NextResponse } from "next/server";
import { getBlogs } from "@/services/PagesData/blogsService";
import { getSeoPage } from "@/services/Seo/seoPage";
import { NormalPageSeo } from "@/types/Seo/normalPage";

export async function GET() {
  
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const seoPage = (await getSeoPage("blogs")) as NormalPageSeo;
  const data = await getBlogs();
  const blogs = data?.data?.data || [];

  const urls = blogs
    .map(
      (blog) => `
    <url>
      <loc>${baseUrl}/blogs/${blog.slug}</loc>
      <lastmod>${blog.updatedAt || new Date().toISOString()}</lastmod>
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
