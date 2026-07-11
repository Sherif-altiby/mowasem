import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_URL;

  const urls = [
    { loc: `${baseUrl}/FAQ`, priority: 0.6 },
    { loc: `${baseUrl}/terms`, priority: 0.5 },
    { loc: `${baseUrl}/about`, priority: 0.7 },
    { loc: `${baseUrl}/blogs`, priority: 0.7 },
    { loc: `${baseUrl}/tours`, priority: 0.7 },
    { loc: `${baseUrl}/cities`, priority: 0.7 },
    { loc: `${baseUrl}/offers`, priority: 0.7 },
    { loc: `${baseUrl}/hotels`, priority: 0.7 },
    { loc: `${baseUrl}/contact`, priority: 0.7 },
    { loc: `${baseUrl}/privacy`, priority: 0.5 },
    { loc: `${baseUrl}/flights`, priority: 0.6 },
    { loc: `${baseUrl}/services`, priority: 0.6 },
    { loc: `${baseUrl}/tour-guide`, priority: 0.7 },
    { loc: `${baseUrl}/package-types`, priority: 0.7 },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (u) => `
      <url>
        <loc>${u.loc}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${u.priority}</priority>
      </url>`
      )
      .join("")}
  </urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=7200",
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
