/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from 'next';
import Script from 'next/script';
import { productItemListStructuredData } from '@/components/seo/StructuredData';
import { getSiteUrl } from '@/utils/siteUrl';
import { generateThaiKeywords } from '@/utils/thaiKeywords';
import BasketsPageClient from './BasketsPageClient';
import { getPublishedProductsByCategory } from '@/lib/catalog';

const BASE_URL = getSiteUrl();

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'กระเช้าของขวัญพรีเมียม | giftoryth',
  description:
    'กระเช้าของขวัญพรีเมียม ดีไซน์ทันสมัยไม่ซ้ำใคร เลือกสินค้าได้ตามความต้องการ เหมาะกับทุกโอกาส จัดส่งด่วนทั่วไทย',
  keywords: generateThaiKeywords('baskets'),
  openGraph: {
    title: 'กระเช้าของขวัญพรีเมียม | giftoryth',
    description:
      'กระเช้าของขวัญพรีเมียม ดีไซน์ทันสมัยไม่ซ้ำใคร เลือกสินค้าได้ตามความต้องการ เหมาะกับทุกโอกาส จัดส่งด่วนทั่วไทย',
    images: ['https://images.giftoryth.com/giftoryth-public/images/Basket/09.webp'],
    url: `${BASE_URL}/baskets`,
    type: 'website',
  },
  alternates: {
    canonical: `${BASE_URL}/baskets`,
  },
};

const BasketsPage = async () => {
  const [nonCustomBaskets, customBaskets] = await Promise.all([
    getPublishedProductsByCategory('non-custom'),
    getPublishedProductsByCategory('special-custom-design'),
  ]);

  return (
    <>
      <Script
        id="structured-data-baskets"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([productItemListStructuredData]) }}
      />
      <BasketsPageClient nonCustomBaskets={nonCustomBaskets} customBaskets={customBaskets} />
    </>
  );
};

export default BasketsPage;
