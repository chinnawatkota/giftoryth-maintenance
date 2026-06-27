import { generateSitemap } from '@/utils/sitemap';

export const revalidate = 3600;

export function GET() {
  const sitemapXml = generateSitemap();
  return new Response(sitemapXml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
