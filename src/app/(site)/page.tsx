import Script from 'next/script';
import type { Metadata } from 'next';
import HomeContent from '../_components/HomeContent';
import {
  businessStructuredData,
  websiteStructuredData,
  faqStructuredData,
} from '@/components/seo/StructuredData';
import { getSiteUrl } from '@/utils/siteUrl';
import { generateThaiKeywords } from '@/utils/thaiKeywords';

const BASE_URL = getSiteUrl();
const structuredData = [businessStructuredData, websiteStructuredData, faqStructuredData];

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'giftoryth - กระเช้าของขวัญพรีเมียม',
  description:
    'กระเช้าของขวัญพรีเมียม ดีไซน์ทันสมัยไม่ซ้ำใคร เลือกสินค้าได้ตามความต้องการ เหมาะกับทุกโอกาส จัดส่งด่วนทั่วไทย',
  keywords: generateThaiKeywords('home'),
  openGraph: {
    title: 'giftoryth - กระเช้าของขวัญพรีเมียม',
    description:
      'กระเช้าของขวัญพรีเมียม ดีไซน์ทันสมัยไม่ซ้ำใคร เลือกสินค้าได้ตามความต้องการ เหมาะกับทุกโอกาส จัดส่งด่วนทั่วไทย',
    images: ['https://images.giftoryth.com/giftoryth-public/images/Basket/04.webp'],
    url: BASE_URL,
    type: 'website',
  },
};

export default function Page() {
  return (
    <>
      <Script
        id="structured-data-home"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeContent />
    </>
  );
}
