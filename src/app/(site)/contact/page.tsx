import type { Metadata } from 'next';
import Image from 'next/image';
import { ContactCard } from '@/components/cards';
import { contactInfo } from '@/constants/contact';
import { getContactSettings } from '@/lib/siteSettings';
import { getSiteUrl } from '@/utils/siteUrl';
import { generateThaiKeywords } from '@/utils/thaiKeywords';

const BASE_URL = getSiteUrl();

export const dynamic = 'force-dynamic';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'ติดต่อเรา | giftoryth',
  description:
    'กระเช้าของขวัญพรีเมียม ดีไซน์ทันสมัยไม่ซ้ำใคร เลือกสินค้าได้ตามความต้องการ เหมาะกับทุกโอกาส จัดส่งด่วนทั่วไทย',
  keywords: generateThaiKeywords('contact'),
  openGraph: {
    title: 'ติดต่อเรา | giftoryth',
    description:
      'กระเช้าของขวัญพรีเมียม ดีไซน์ทันสมัยไม่ซ้ำใคร เลือกสินค้าได้ตามความต้องการ เหมาะกับทุกโอกาส จัดส่งด่วนทั่วไทย',
    images: ['https://images.giftoryth.com/giftoryth-public/images/IMG_6078.webp'],
    url: `${BASE_URL}/contact`,
    type: 'website',
  },
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
};

const ContactPage = async () => {
  const contactSettings = await getContactSettings();

  return (
    <div className="mb-4 flex grid-cols-2 flex-col overflow-y-hidden max-md:min-h-[calc(100dvh-290px)] lg:grid lg:h-[calc(100dvh-290px)]">
      <div className="col-span-1 flex items-center justify-center bg-beige max-lg:max-h-[400px]">
        <Image
          src={contactSettings.logoImage}
          alt={contactSettings.logoAlt}
          width={1000}
          height={1000}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="scrollbar-hide col-span-1 flex flex-col gap-y-4 overflow-y-auto bg-white lg:gap-y-8">
        <div className="flex h-fit w-full flex-col items-center justify-center px-4 pt-[40px] md:px-10 lg:mb-10 lg:pt-[80px]">
          <div className="mb-6 h-[1px] w-32 bg-main-red"></div>
          <p className="text-center text-base font-extralight leading-relaxed text-maroon md:text-lg xl:text-xl">
            Give practical gifts that last through every precious moment. Picnic baskets designed
            for special people... in seasons filled with smiles 🧺✨ #BasketShopMoments
          </p>
        </div>

        <div className="px-4 md:px-8">
          {contactInfo.map(contact => (
            <ContactCard key={contact.id} {...contact} />
          ))}
        </div>

        <div className="relative h-[400px] w-full !bg-beige text-center">
          <Image
            src={contactSettings.featureImage}
            alt={contactSettings.featureAlt}
            width={1000}
            height={1000}
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute bottom-0 left-0 right-0 h-full w-full bg-black/30" />
          <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col gap-y-6 text-main-white">
            <p className="text-lg font-light tracking-wide md:text-2xl xl:text-3xl">
              MAM Design and Service Co., Ltd.
            </p>
            <p className="px-2 text-center text-sm font-extralight md:text-base xl:text-xl">
              Crafting beautiful handmade baskets and custom gifts with passion and precision.
            </p>
          </div>
        </div>

        <div className="shadow-card-light mx-4 mt-4 flex flex-col items-center justify-center gap-y-4 border border-gray-100 bg-white p-4 md:mx-8 md:p-8">
          <Image
            src={contactSettings.qrImage}
            alt={contactSettings.qrAlt}
            width={192}
            height={192}
            className="size-48 object-cover"
          />
          <p className="text-center text-sm font-extralight text-main md:text-base xl:text-lg">
            Join our Line to get the latest updates
          </p>
          <div className="h-[1px] w-32 bg-main-red" />
        </div>

        <div className="mb-16 text-center">
          <h3 className="mb-6 text-lg font-light text-main md:text-xl xl:text-2xl">
            Business Hours
          </h3>
          <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="py-3">
              <p className="mb-1 text-sm font-extralight text-main md:text-base">Monday - Friday</p>
              <p className="text-sm text-gray-600 md:text-base xl:text-lg">9:00 AM - 6:00 PM</p>
            </div>
            <div className="py-3">
              <p className="mb-1 text-sm font-extralight text-main md:text-base">Saturday</p>
              <p className="text-sm text-gray-600 md:text-base xl:text-lg">9:00 AM - 4:00 PM</p>
            </div>
            <div className="py-3">
              <p className="mb-1 text-sm font-extralight text-main md:text-base">Sunday</p>
              <p className="text-sm text-gray-600 md:text-base xl:text-lg">Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
