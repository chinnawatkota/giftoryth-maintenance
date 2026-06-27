import { generateRobotsTxt } from '@/utils/sitemap';

export const revalidate = 3600;

export function GET() {
  const robots = generateRobotsTxt();
  return new Response(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
