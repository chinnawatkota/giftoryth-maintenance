import type { Metadata } from 'next';
import { getSiteUrl } from '@/utils/siteUrl';
import { generateThaiKeywords } from '@/utils/thaiKeywords';
import CustomGiftPageClient from './CustomGiftPageClient';
import { getCustomGiftPageItems } from '@/lib/customGiftPage';

const BASE_URL = getSiteUrl();

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'คัสต้อมของขวัญ | giftoryth',
  description:
    'กระเช้าของขวัญพรีเมียม ดีไซน์ทันสมัยไม่ซ้ำใคร เลือกสินค้าได้ตามความต้องการ เหมาะกับทุกโอกาส จัดส่งด่วนทั่วไทย',
  keywords: generateThaiKeywords('custom'),
  openGraph: {
    title: 'คัสต้อมของขวัญ | giftoryth',
    description:
      'กระเช้าของขวัญพรีเมียม ดีไซน์ทันสมัยไม่ซ้ำใคร เลือกสินค้าได้ตามความต้องการ เหมาะกับทุกโอกาส จัดส่งด่วนทั่วไทย',
    images: [
      'https://images.giftoryth.com/giftoryth-public/images/special-custom-design/custom-gift/11.webp',
    ],
    url: `${BASE_URL}/custom-gift`,
    type: 'website',
  },
  alternates: {
    canonical: `${BASE_URL}/custom-gift`,
  },
};

export const dynamic = 'force-dynamic';

const CustomGiftPage = async () => {
  const items = await getCustomGiftPageItems();

  return <CustomGiftPageClient items={items} />;
};

export default CustomGiftPage;
