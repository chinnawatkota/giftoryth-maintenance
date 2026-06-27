/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from 'next';
import '@/index.css';
import { getSiteUrl } from '@/utils/siteUrl';

const BASE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: 'giftoryth - กระเช้าของขวัญพรีเมียม',
  description:
    'กระเช้าของขวัญพรีเมียม ดีไซน์ทันสมัยไม่ซ้ำใคร เลือกสินค้าได้ตามความต้องการ เหมาะกับทุกโอกาส จัดส่งด่วนทั่วไทย',
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="min-h-screen bg-main-white text-shadow-black">{children}</body>
    </html>
  );
}
