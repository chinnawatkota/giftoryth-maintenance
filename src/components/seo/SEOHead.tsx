import { useEffect } from 'react';
import { getSiteUrl } from '@/utils/siteUrl';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'product' | 'article';
  price?: number;
  currency?: string;
  availability?: 'in stock' | 'out of stock' | 'preorder';
  brand?: string;
  category?: string;
  structuredData?: object;
}

const SEOHead = ({
  title = 'giftoryth - กระเช้าของขวัญพรีเมียม',
  description = 'กระเช้าของขวัญพรีเมียม ดีไซน์ทันสมัยไม่ซ้ำใคร เลือกสินค้าได้ตามความต้องการ เหมาะกับทุกโอกาส จัดส่งด่วนทั่วไทย',
  keywords = 'กระเช้าของขวัญ, ของฝาก, ส่งทั่วไทย, custom ของขวัญ, ของขวัญปีใหม่, กระเช้าปีใหม่, ของฝากสั่งทำ, ส่งฟรี, กระเช้าของฝาก, ของฝากสั่งทำ, giftoryth, กระเช้าของขวัญพรีเมียม, ของฝากคัสต้อม, ออกแบบได้ไม่ซ้ำใคร, baskets, gift baskets, custom gifts, custom ba',
  image = 'https://images.giftoryth.com/giftoryth-public/images/Basket/04.webp',
  url = getSiteUrl(),
  type = 'website',
  price,
  currency = 'THB',
  availability = 'in stock',
  brand = 'giftoryth',
  category,
  structuredData,
}: SEOHeadProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMetaTag = (property: string, content: string, isName = false) => {
      const selector = isName ? `meta[name="${property}"]` : `meta[property="${property}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement('meta');
        if (isName) {
          meta.setAttribute('name', property);
        } else {
          meta.setAttribute('property', property);
        }
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Basic meta tags
    updateMetaTag('description', description, true);
    updateMetaTag('keywords', keywords, true);
    updateMetaTag('author', 'giftoryth', true);
    updateMetaTag('robots', 'index, follow', true);
    updateMetaTag('language', 'th', true);
    updateMetaTag('revisit-after', '7 days', true);

    // Open Graph tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', image);
    updateMetaTag('og:url', url);
    updateMetaTag('og:type', type);
    updateMetaTag('og:site_name', 'giftoryth');
    updateMetaTag('og:locale', 'th_TH');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', image, true);
    updateMetaTag('twitter:site', '@giftoryth', true);
    updateMetaTag('twitter:creator', '@giftoryth', true);

    // Line specific tags
    updateMetaTag('line:card', 'summary_large_image');
    updateMetaTag('line:title', title);
    updateMetaTag('line:description', description);
    updateMetaTag('line:image', image);

    // Product specific tags
    if (type === 'product' && price) {
      updateMetaTag('product:price:amount', price.toString());
      updateMetaTag('product:price:currency', currency);
      updateMetaTag('product:availability', availability);
      if (brand) updateMetaTag('product:brand', brand);
      if (category) updateMetaTag('product:category', category);
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    // Structured Data
    if (structuredData) {
      let script = document.querySelector(
        'script[type="application/ld+json"]'
      ) as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

    // Cleanup function
    return () => {
      // Remove any dynamically added meta tags if needed
    };
  }, [
    title,
    description,
    keywords,
    image,
    url,
    type,
    price,
    currency,
    availability,
    brand,
    category,
    structuredData,
  ]);

  return null;
};

export default SEOHead;
