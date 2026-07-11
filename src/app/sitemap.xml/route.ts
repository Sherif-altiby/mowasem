export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_URL;

  const sitemaps = [
    "sitemap-static.xml",
    "sitemap-hotels.xml",
    "sitemap-blogs.xml",
    "sitemap-cities.xml",
    "sitemap-services.xml",
    "sitemap-tours.xml",
    "sitemap-tour-guide.xml",
    "sitemap-package-types.xml",
    "sitemap-offers.xml",
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (s) =>
      `<sitemap><loc>${baseUrl}/${s}</loc><lastmod>${new Date().toISOString()}</lastmod></sitemap>`
  )
  .join("\n")}
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=7200",
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
