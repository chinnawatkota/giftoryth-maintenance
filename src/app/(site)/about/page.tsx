/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from 'next';
import Image from 'next/image';
import { getSiteUrl } from '@/utils/siteUrl';
import { generateThaiKeywords } from '@/utils/thaiKeywords';
import { getAboutSettings } from '@/lib/siteSettings';

const BASE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา | giftoryth',
  description:
    'กระเช้าของขวัญพรีเมียม ดีไซน์ทันสมัยไม่ซ้ำใคร เลือกสินค้าได้ตามความต้องการ เหมาะกับทุกโอกาส จัดส่งด่วนทั่วไทย',
  keywords: generateThaiKeywords('about'),
  openGraph: {
    title: 'เกี่ยวกับเรา | giftoryth',
    description:
      'กระเช้าของขวัญพรีเมียม ดีไซน์ทันสมัยไม่ซ้ำใคร เลือกสินค้าได้ตามความต้องการ เหมาะกับทุกโอกาส จัดส่งด่วนทั่วไทย',
    images: ['https://images.giftoryth.com/giftoryth-public/images/IMG_6078.webp'],
    url: `${BASE_URL}/about`,
    type: 'website',
  },
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
};

export const dynamic = 'force-dynamic';

const AboutPage = async () => {
  const aboutSettings = await getAboutSettings();

  return (
    <>
      <div className="relative mx-auto mb-4 hidden min-h-[calc(100dvh-290px)] w-full max-w-[1200px] grid-cols-2 lg:grid">
        <div className="h-[500px] bg-beige">
          <Image
            src={aboutSettings.firstImage}
            alt={aboutSettings.firstAlt}
            width={1000}
            height={1000}
            className="h-full w-full object-cover"
            priority={false}
          />
        </div>
        <div className="flex h-[500px] flex-col justify-center px-16">
          <p className="drop-cap text-xs font-extralight leading-relaxed tracking-wide text-maroon sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            A gift basket that goes beyond just "a gift" If you're looking for something truly
            special a gift that's not only beautiful, but meaningful and reusable Our
            custom-designed gift baskets are made just for you. Because we believe... A great gift
            isn't just about what's inside it's about the thought, the care, and the heartfelt
            message behind it. As we like to say, "More than a gift, it's a story. "
          </p>
        </div>
        <div className="flex h-[500px] flex-col justify-center bg-white px-16">
          <p className="drop-cap text-xs font-extralight leading-relaxed tracking-wide text-maroon sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            Let us help you design a gift that tells your story. Whether it's for clients, loved
            ones, or a special occasion our baskets are made to express your values, your brand, and
            your unique style.Memorable. Personal. Uniquely yours.
          </p>
        </div>
        <div className="h-[500px] bg-beige">
          <Image
            src={aboutSettings.secondImage}
            alt={aboutSettings.secondAlt}
            width={1000}
            height={1000}
            className="h-full w-full object-cover"
            priority={false}
          />
        </div>
      </div>
      <div className="mx-auto mb-4 flex min-h-[calc(100dvh-290px)] w-full max-w-[1200px] flex-col lg:hidden">
        <div className="relative h-[500px] bg-beige">
          <Image
            src={aboutSettings.firstImage}
            alt={aboutSettings.firstAlt}
            width={1000}
            height={1000}
            className="h-full w-full object-cover"
            priority={false}
          />
          <div className="absolute left-1/2 top-1/2 flex size-full -translate-x-1/2 -translate-y-1/2 flex-col justify-center bg-shadow-black/50 px-16">
            <p className="drop-cap text-sm font-light leading-relaxed tracking-wide text-main-white sm:text-base md:text-lg lg:text-xl xl:text-2xl">
              A gift basket that goes beyond just "a gift" If you're looking for something truly
              special a gift that's not only beautiful, but meaningful and reusable Our
              custom-designed gift baskets are made just for you. Because we believe... A great gift
              isn't just about what's inside it's about the thought, the care, and the heartfelt
              message behind it. As we like to say, "More than a gift, it's a story. "
            </p>
          </div>
        </div>
        <div className="relative h-[500px] bg-beige">
          <Image
            src={aboutSettings.secondImage}
            alt={aboutSettings.secondAlt}
            width={1000}
            height={1000}
            className="h-full w-full object-cover"
            priority={false}
          />
          <div className="absolute left-1/2 top-1/2 flex size-full -translate-x-1/2 -translate-y-1/2 flex-col justify-center bg-shadow-black/50 px-16">
            <p className="drop-cap text-sm font-light leading-relaxed tracking-wide text-main-white sm:text-base md:text-lg lg:text-xl xl:text-2xl">
              Let us help you design a gift that tells your story. Whether it's for clients, loved
              ones, or a special occasion our baskets are made to express your values, your brand,
              and your unique style. Memorable. Personal. Uniquely yours.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
