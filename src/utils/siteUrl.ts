const FALLBACK_SITE_URL = 'https://www.giftoryth.com';

/**
 * Resolve the canonical site URL from env, trimming any trailing slash.
 */
export const getSiteUrl = () =>
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || FALLBACK_SITE_URL;

/**
 * Prefix a path with the canonical site URL.
 */
export const withBasePath = (path = '/') => {
  const baseUrl = getSiteUrl();
  if (!path || path === '/') {
    return `${baseUrl}/`;
  }

  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};
