import { nonCustomBasketsList, customBasketsList } from '@/constants/basket';
import { getSiteUrl, withBasePath } from '@/utils/siteUrl';

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export const generateSitemap = (): string => {
  const currentDate = new Date().toISOString().split('T')[0];

  const urls: SitemapUrl[] = [
    // Main pages
    {
      loc: withBasePath('/'),
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 1.0,
    },
    {
      loc: withBasePath('/about'),
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: withBasePath('/contact'),
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: withBasePath('/baskets'),
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      loc: withBasePath('/custom-gift'),
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9,
    },
  ];

  // Add non-custom basket pages
  nonCustomBasketsList.forEach(basket => {
    urls.push({
      loc: withBasePath(`/basket/${basket.id}`),
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.7,
    });
  });

  // Add custom basket pages
  customBasketsList.forEach(basket => {
    urls.push({
      loc: withBasePath(`/basket/${basket.id}`),
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.7,
    });
  });

  // Generate XML sitemap
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return sitemapXml;
};

export const generateRobotsTxt = (): string => {
  const baseUrl = getSiteUrl();
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow admin or private areas (if any)
# Disallow: /admin/
# Disallow: /private/

# Allow all product pages
Allow: /basket/
Allow: /baskets/
Allow: /custom-gift/
Allow: /about/
Allow: /contact/

# Allow images
Allow: /images/
Allow: /*.webp
Allow: /*.jpg
Allow: /*.png
Allow: /*.svg`;
};
