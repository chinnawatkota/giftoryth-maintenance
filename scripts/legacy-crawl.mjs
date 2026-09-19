import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_START_PATHS = ['/', '/baskets', '/custom-gift', '/about', '/contact'];
const DEFAULT_BASE_URL = 'https://giftoryth.com';
const DEFAULT_OUT_DIR = 'legacy-export';
const USER_AGENT = 'GiftorythLegacyCrawler/1.0';

const args = process.argv.slice(2);

if (args.includes('--help')) {
  console.log(`
Usage:
  npm run legacy:crawl -- [options]

Options:
  --base=https://giftoryth.com      Website base URL to crawl
  --out=legacy-export              Output directory for manifest, pages, and images
  --limit=250                      Maximum number of HTML pages to crawl
  --start=/,/baskets,/custom-gift  Comma-separated start paths
  --no-download                    Only collect image URLs; do not download image files
  --no-sitemap                     Do not seed crawl URLs from /sitemap.xml
`);
  process.exit(0);
}

const getArg = (name, fallback) => {
  const prefix = `--${name}=`;
  const value = args.find(item => item.startsWith(prefix));

  return value ? value.slice(prefix.length) : fallback;
};

const hasFlag = name => args.includes(`--${name}`);

const baseUrl = new URL(getArg('base', DEFAULT_BASE_URL));
const outputDir = path.resolve(getArg('out', DEFAULT_OUT_DIR));
const maxPages = Number(getArg('limit', '250'));
const shouldDownloadImages = !hasFlag('no-download');
const shouldUseSitemap = !hasFlag('no-sitemap');
const startPaths = getArg('start', DEFAULT_START_PATHS.join(','))
  .split(',')
  .map(item => item.trim())
  .filter(Boolean);
const allowedPageHosts = new Set([baseUrl.hostname, `www.${baseUrl.hostname.replace(/^www\./, '')}`]);
const pagesDir = path.join(outputDir, 'pages');
const imagesDir = path.join(outputDir, 'images');

const normalizeWhitespace = value => value.replace(/\s+/g, ' ').trim();

const stripHtml = value =>
  normalizeWhitespace(
    value
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
  );

const unique = values => [...new Set(values.filter(Boolean))];

const toAbsoluteUrl = (value, pageUrl) => {
  if (!value || value.startsWith('data:') || value.startsWith('blob:') || value.startsWith('mailto:') || value.startsWith('tel:')) {
    return null;
  }

  try {
    return new URL(value, pageUrl).toString();
  } catch {
    return null;
  }
};

const shouldCrawlPage = url => {
  const parsed = new URL(url);

  if (!allowedPageHosts.has(parsed.hostname)) {
    return false;
  }

  if (parsed.pathname.startsWith('/admin') || parsed.pathname.startsWith('/api')) {
    return false;
  }

  return !/\.(avif|css|gif|ico|jpe?g|js|json|map|pdf|png|svg|webp|woff2?)$/i.test(parsed.pathname);
};

const normalizePageUrl = url => {
  const parsed = new URL(url);
  parsed.hash = '';

  if (parsed.pathname !== '/' && parsed.pathname.endsWith('/')) {
    parsed.pathname = parsed.pathname.slice(0, -1);
  }

  return parsed.toString();
};

const safeFileName = value => {
  const parsed = new URL(value);
  const joined = `${parsed.hostname}${parsed.pathname === '/' ? '/index' : parsed.pathname}`;
  const safe = joined
    .replace(/^https?:\/\//, '')
    .replace(/[^a-z0-9._-]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 180);

  return safe || 'index';
};

const sha256 = buffer => createHash('sha256').update(buffer).digest('hex');

const fetchWithTimeout = async url => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    return await fetch(url, {
      headers: {
        'user-agent': USER_AGENT,
      },
      redirect: 'follow',
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
};

const extractAttributeValues = (html, attribute) => {
  const values = [];
  const pattern = new RegExp(`${attribute}\\s*=\\s*["']([^"']+)["']`, 'gi');
  let match;

  while ((match = pattern.exec(html)) !== null) {
    values.push(match[1]);
  }

  return values;
};

const extractSrcsetUrls = value =>
  value
    .split(',')
    .map(item => item.trim().split(/\s+/)[0])
    .filter(Boolean);

const extractImages = (html, pageUrl) => {
  const srcValues = extractAttributeValues(html, 'src');
  const srcsetValues = extractAttributeValues(html, 'srcset').flatMap(extractSrcsetUrls);
  const absoluteImageValues = [...html.matchAll(/https?:\/\/[^"')\s]+?\.(?:avif|gif|jpe?g|png|svg|webp)(?:\?[^"')\s]*)?/gi)].map(
    match => match[0]
  );
  const imageUrls = [...srcValues, ...srcsetValues, ...absoluteImageValues]
    .map(value => toAbsoluteUrl(value, pageUrl))
    .filter(Boolean)
    .filter(url => /\.(avif|gif|jpe?g|png|svg|webp)(\?|$)/i.test(new URL(url).pathname + new URL(url).search));

  return unique(imageUrls);
};

const extractLinks = (html, pageUrl) =>
  unique(extractAttributeValues(html, 'href').map(value => toAbsoluteUrl(value, pageUrl)).filter(Boolean));

const decodeXmlEntities = value =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

const loadSitemapUrls = async () => {
  if (!shouldUseSitemap) {
    return [];
  }

  const sitemapUrl = new URL('/sitemap.xml', baseUrl).toString();

  try {
    const response = await fetchWithTimeout(sitemapUrl);

    if (!response.ok) {
      return [];
    }

    const xml = await response.text();
    const urls = [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)]
      .map(match => decodeXmlEntities(match[1].trim()))
      .map(value => toAbsoluteUrl(value, sitemapUrl))
      .filter(Boolean)
      .map(normalizePageUrl)
      .filter(shouldCrawlPage);

    return unique(urls);
  } catch {
    return [];
  }
};

const extractMeta = html => {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '';
  const description =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i)?.[1] ||
    html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i)?.[1] ||
    '';
  const headings = [...html.matchAll(/<h([1-3])[^>]*>([\s\S]*?)<\/h\1>/gi)].map(match => ({
    level: Number(match[1]),
    text: stripHtml(match[2]),
  }));

  return {
    title: stripHtml(title),
    description: stripHtml(description),
    headings: headings.filter(item => item.text),
  };
};

const extractJsonLd = html => {
  const items = [];

  for (const match of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    const raw = match[1].trim();

    try {
      items.push(JSON.parse(raw));
    } catch {
      items.push({ parseError: true, raw });
    }
  }

  return items;
};

const extractVisibleText = html =>
  unique(
    stripHtml(html)
      .split(/(?<=[.!?])\s+|\n+/)
      .map(normalizeWhitespace)
      .filter(item => item.length >= 2)
  ).slice(0, 500);

const downloadImage = async (url, index) => {
  try {
    const response = await fetchWithTimeout(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const parsed = new URL(url);
    const extension = path.extname(parsed.pathname) || '.bin';
    const safeName = safeFileName(url);
    const fileName = `${String(index + 1).padStart(4, '0')}-${safeName.endsWith(extension) ? safeName : `${safeName}${extension}`}`;
    const relativePath = path.join('images', fileName);
    const filePath = path.join(outputDir, relativePath);

    await writeFile(filePath, buffer);

    return {
      url,
      ok: response.ok,
      status: response.status,
      contentType: response.headers.get('content-type') || '',
      bytes: buffer.byteLength,
      sha256: sha256(buffer),
      file: relativePath.replace(/\\/g, '/'),
    };
  } catch (error) {
    return {
      url,
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

const crawl = async () => {
  await mkdir(pagesDir, { recursive: true });
  await mkdir(imagesDir, { recursive: true });

  const sitemapUrls = await loadSitemapUrls();
  const queue = unique([...startPaths.map(item => normalizePageUrl(new URL(item, baseUrl).toString())), ...sitemapUrls]);
  const visited = new Set();
  const pages = [];
  const imageUsage = new Map();
  const errors = [];

  while (queue.length > 0 && visited.size < maxPages) {
    const currentUrl = queue.shift();

    if (!currentUrl || visited.has(currentUrl) || !shouldCrawlPage(currentUrl)) {
      continue;
    }

    visited.add(currentUrl);
    console.log(`Crawling ${visited.size}/${maxPages}: ${currentUrl}`);

    try {
      const response = await fetchWithTimeout(currentUrl);
      const contentType = response.headers.get('content-type') || '';
      const html = await response.text();

      if (!contentType.includes('text/html')) {
        continue;
      }

      const pageFile = path.join('pages', `${safeFileName(currentUrl)}.html`);
      const pageImages = extractImages(html, currentUrl);
      const pageLinks = extractLinks(html, currentUrl);

      await writeFile(path.join(outputDir, pageFile), html);

      for (const imageUrl of pageImages) {
        const usage = imageUsage.get(imageUrl) || [];
        usage.push(currentUrl);
        imageUsage.set(imageUrl, usage);
      }

      for (const link of pageLinks) {
        const normalizedLink = normalizePageUrl(link);

        if (!visited.has(normalizedLink) && shouldCrawlPage(normalizedLink) && !queue.includes(normalizedLink)) {
          queue.push(normalizedLink);
        }
      }

      pages.push({
        url: currentUrl,
        status: response.status,
        finalUrl: response.url,
        file: pageFile.replace(/\\/g, '/'),
        ...extractMeta(html),
        jsonLd: extractJsonLd(html),
        links: pageLinks,
        images: pageImages,
        text: extractVisibleText(html),
      });
    } catch (error) {
      errors.push({
        url: currentUrl,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  const imageUrls = [...imageUsage.keys()].sort();
  const images = shouldDownloadImages
    ? await Promise.all(imageUrls.map((url, index) => downloadImage(url, index)))
    : imageUrls.map(url => ({ url, skipped: true }));
  const imagesWithUsage = images.map(image => ({
    ...image,
    usedBy: imageUsage.get(image.url) || [],
  }));
  const manifest = {
    crawledAt: new Date().toISOString(),
    baseUrl: baseUrl.toString(),
    maxPages,
    downloadedImages: shouldDownloadImages,
    sitemapUrls,
    stats: {
      pages: pages.length,
      images: imagesWithUsage.length,
      imageDownloadFailures: imagesWithUsage.filter(item => item.ok === false).length,
      errors: errors.length,
    },
    pages,
    images: imagesWithUsage,
    errors,
  };
  const report = [
    '# Giftoryth Legacy Crawl Report',
    '',
    `- Crawled at: ${manifest.crawledAt}`,
    `- Base URL: ${manifest.baseUrl}`,
    `- Pages: ${manifest.stats.pages}`,
    `- Images: ${manifest.stats.images}`,
    `- Image download failures: ${manifest.stats.imageDownloadFailures}`,
    `- Page errors: ${manifest.stats.errors}`,
    '',
    '## Pages',
    '',
    ...pages.map(page => `- ${page.url} (${page.status}) - ${page.title || 'Untitled'} - images: ${page.images.length}`),
    '',
    '## Images',
    '',
    ...imagesWithUsage.map(image => `- ${image.url} - ${image.bytes || 0} bytes - used by ${image.usedBy.length} page(s)`),
  ].join('\n');

  await writeFile(path.join(outputDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  await writeFile(path.join(outputDir, 'report.md'), report);

  console.log(`\nDone. Pages: ${manifest.stats.pages}. Images: ${manifest.stats.images}.`);
  console.log(`Manifest: ${path.join(outputDir, 'manifest.json')}`);
  console.log(`Report: ${path.join(outputDir, 'report.md')}`);
};

crawl().catch(error => {
  console.error(error);
  process.exit(1);
});
