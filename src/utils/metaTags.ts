export const updateMetaTags = (data: {
  title: string;
  description: string;
  image: string;
  url: string;
  price?: number;
  keywords?: string;
  type?: 'website' | 'product' | 'article';
  brand?: string;
  category?: string;
  availability?: 'in stock' | 'out of stock' | 'preorder';
}) => {
  // Update document title
  document.title = data.title;

  // Update or create meta tags
  const updateMetaTag = (property: string, content: string) => {
    let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.content = content;
  };

  const updateNameMetaTag = (name: string, content: string) => {
    let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', name);
      document.head.appendChild(meta);
    }
    meta.content = content;
  };

  // Basic meta tags
  updateNameMetaTag('description', data.description);
  if (data.keywords) {
    updateNameMetaTag('keywords', data.keywords);
  }
  updateNameMetaTag('author', 'giftoryth');
  updateNameMetaTag('robots', 'index, follow');
  updateNameMetaTag('language', 'en');
  updateNameMetaTag('revisit-after', '7 days');

  // Open Graph tags
  updateMetaTag('og:title', data.title);
  updateMetaTag('og:description', data.description);
  updateMetaTag('og:image', data.image);
  updateMetaTag('og:url', data.url);
  updateMetaTag('og:type', data.type || 'website');
  updateMetaTag('og:site_name', 'giftoryth');
  updateMetaTag('og:locale', 'en_US');

  // Twitter Card tags
  updateNameMetaTag('twitter:card', 'summary_large_image');
  updateNameMetaTag('twitter:title', data.title);
  updateNameMetaTag('twitter:description', data.description);
  updateNameMetaTag('twitter:image', data.image);
  updateNameMetaTag('twitter:site', '@giftoryth');
  updateNameMetaTag('twitter:creator', '@giftoryth');

  // Line specific tags
  updateMetaTag('line:card', 'summary_large_image');
  updateMetaTag('line:title', data.title);
  updateMetaTag('line:description', data.description);
  updateMetaTag('line:image', data.image);

  // Product specific tags
  if (data.price) {
    updateMetaTag('product:price:amount', data.price.toString());
    updateMetaTag('product:price:currency', 'THB');
    updateMetaTag('product:availability', data.availability || 'in stock');
    if (data.brand) updateMetaTag('product:brand', data.brand);
    if (data.category) updateMetaTag('product:category', data.category);
  }

  // Canonical URL
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = data.url;
};
