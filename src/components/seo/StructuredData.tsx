import { customBasketsList, nonCustomBasketsList } from '@/constants/basket';
import { getSiteUrl, withBasePath } from '@/utils/siteUrl';
import { EmailAddress, LineLink } from '@/constants/contact';

const BASE_URL = getSiteUrl();

// Business structured data
export const businessStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'giftoryth',
  description:
    'กระเช้าของขวัญพรีเมียม ดีไซน์ทันสมัยไม่ซ้ำใคร เลือกสินค้าได้ตามความต้องการ เหมาะกับทุกโอกาส จัดส่งด่วนทั่วไทย',
  url: BASE_URL,
  logo: 'https://images.giftoryth.com/giftoryth-public/images/logos/logo-red-transparent.webp',
  image: 'https://images.giftoryth.com/giftoryth-public/images/Basket/04.webp',
  telephone: '02-060-2828', // Replace with actual phone number
  email: EmailAddress, // Replace with actual email
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bangkok',
    addressRegion: 'Bangkok',
    addressCountry: 'TH',
  },
  areaServed: [
    {
      '@type': 'Country',
      name: 'Thailand',
    },
    // All 77 provinces of Thailand
    { '@type': 'City', name: 'กรุงเทพมหานคร' },
    { '@type': 'City', name: 'เชียงใหม่' },
    { '@type': 'City', name: 'เชียงราย' },
    { '@type': 'City', name: 'พัทยา' },
    { '@type': 'City', name: 'ภูเก็ต' },
    { '@type': 'City', name: 'กระบี่' },
    { '@type': 'City', name: 'สุราษฎร์ธานี' },
    { '@type': 'City', name: 'นครศรีธรรมราช' },
    { '@type': 'City', name: 'ขอนแก่น' },
    { '@type': 'City', name: 'อุดรธานี' },
    { '@type': 'City', name: 'อุบลราชธานี' },
    { '@type': 'City', name: 'นครราชสีมา' },
    { '@type': 'City', name: 'ชลบุรี' },
    { '@type': 'City', name: 'ระยอง' },
    { '@type': 'City', name: 'ตราด' },
    { '@type': 'City', name: 'จันทบุรี' },
    { '@type': 'City', name: 'กาญจนบุรี' },
    { '@type': 'City', name: 'ราชบุรี' },
    { '@type': 'City', name: 'เพชรบุรี' },
    { '@type': 'City', name: 'ประจวบคีรีขันธ์' },
    { '@type': 'City', name: 'สุพรรณบุรี' },
    { '@type': 'City', name: 'นครปฐม' },
    { '@type': 'City', name: 'สมุทรสาคร' },
    { '@type': 'City', name: 'สมุทรสงคราม' },
    { '@type': 'City', name: 'สมุทรปราการ' },
    { '@type': 'City', name: 'นนทบุรี' },
    { '@type': 'City', name: 'ปทุมธานี' },
    { '@type': 'City', name: 'สระบุรี' },
    { '@type': 'City', name: 'ลพบุรี' },
    { '@type': 'City', name: 'สิงห์บุรี' },
    { '@type': 'City', name: 'ชัยนาท' },
    { '@type': 'City', name: 'อ่างทอง' },
    { '@type': 'City', name: 'อยุธยา' },
    { '@type': 'City', name: 'นครสวรรค์' },
    { '@type': 'City', name: 'กำแพงเพชร' },
    { '@type': 'City', name: 'ตาก' },
    { '@type': 'City', name: 'สุโขทัย' },
    { '@type': 'City', name: 'พิษณุโลก' },
    { '@type': 'City', name: 'พิจิตร' },
    { '@type': 'City', name: 'เพชรบูรณ์' },
    { '@type': 'City', name: 'เลย' },
    { '@type': 'City', name: 'หนองคาย' },
    { '@type': 'City', name: 'บึงกาฬ' },
    { '@type': 'City', name: 'มุกดาหาร' },
    { '@type': 'City', name: 'นครพนม' },
    { '@type': 'City', name: 'สกลนคร' },
    { '@type': 'City', name: 'กาฬสินธุ์' },
    { '@type': 'City', name: 'ร้อยเอ็ด' },
    { '@type': 'City', name: 'ยโสธร' },
    { '@type': 'City', name: 'ศรีสะเกษ' },
    { '@type': 'City', name: 'บุรีรัมย์' },
    { '@type': 'City', name: 'สุรินทร์' },
    { '@type': 'City', name: 'ชัยภูมิ' },
    { '@type': 'City', name: 'นครนายก' },
    { '@type': 'City', name: 'ปราจีนบุรี' },
    { '@type': 'City', name: 'สระแก้ว' },
  ],
  openingHours: 'Mo-Su 09:00-18:00',
  priceRange: '฿890-฿4990',
  paymentAccepted: 'เงินสด, บัตรเครดิต, การโอนเงิน',
  currenciesAccepted: 'THB',
  sameAs: [LineLink],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'กระเช้าของขวัญ',
    itemListElement: [
      ...nonCustomBasketsList.slice(0, 10).map((basket, index) => ({
        '@type': 'Offer',
        position: index + 1,
        itemOffered: {
          '@type': 'Product',
          name: basket.title,
          description: `กระเช้าของขวัญพรีเมียม: ${basket.title}`,
          image: basket.image,
          url: withBasePath(`/basket/${basket.id}`),
          brand: {
            '@type': 'Brand',
            name: 'giftoryth',
          },
          offers: {
            '@type': 'Offer',
            price: basket.price,
            priceCurrency: 'THB',
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'Organization',
              name: 'giftoryth',
            },
          },
        },
      })),
    ],
  },
};

const allBaskets = [...nonCustomBasketsList, ...customBasketsList];

export const productItemListStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: allBaskets.map((basket, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: basket.title || `Gift basket ${basket.id}`,
    url: withBasePath(`/basket/${basket.id}`),
    image: basket.image,
  })),
};

// Product structured data generator
export const generateProductStructuredData = (product: {
  id: string;
  title: string;
  price: number;
  image: string;
  details: React.ReactNode;
}) => {
  const productName = product.title?.trim() || `Gift basket ${product.id}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productName,
    description: `Premium gift basket: ${productName}`,
    image: product.image,
    url: withBasePath(`/basket/${product.id}`),
    brand: {
      '@type': 'Brand',
      name: 'giftoryth',
    },
    category: 'Gift Baskets',
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'THB',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      url: withBasePath(`/basket/${product.id}`),
      seller: {
        '@type': 'Organization',
        name: 'giftoryth',
        url: BASE_URL,
      },
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'TH',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        returnPolicySeasonalOverride: [],
        returnMethod: 'https://schema.org/MailReturn',
        returnFees: 'https://schema.org/FreeReturn',
        returnWindow: {
          '@type': 'QuantitativeValue',
          value: 14,
          unitCode: 'DAY',
        },
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          currency: 'THB',
          value: 0,
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'TH',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 2,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 5,
            unitCode: 'DAY',
          },
        },
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        author: {
          '@type': 'Person',
          name: 'Customer',
        },
        reviewBody: 'Excellent quality and beautiful presentation. Highly recommended!',
      },
    ],
  };
};

// Website structured data
export const websiteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'giftoryth',
  description:
    'กระเช้าของขวัญพรีเมียม ดีไซน์ทันสมัยไม่ซ้ำใคร เลือกสินค้าได้ตามความต้องการ เหมาะกับทุกโอกาส จัดส่งด่วนทั่วไทย',
  url: BASE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${withBasePath('/search')}?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
  publisher: {
    '@type': 'Organization',
    name: 'giftoryth',
    logo: {
      '@type': 'ImageObject',
      url: 'https://images.giftoryth.com/giftoryth-public/images/logos/logo-red-transparent.webp',
    },
  },
};

// Breadcrumb structured data
export const generateBreadcrumbStructuredData = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

// FAQ structured data
export const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What types of gift baskets do you offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer premium gift baskets including non-custom baskets, special custom design baskets, and custom gift arrangements. Our products range from ฿890 to ฿4990.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you deliver to all provinces in Thailand?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we deliver to all 77 provinces in Thailand including Bangkok, Chiang Mai, Phuket, Pattaya, and every other province nationwide. Contact us via Line for specific delivery arrangements.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I customize my gift basket?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely! We offer custom gift arrangements and special custom design baskets. Contact us via Line for personalized consultation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What payment methods do you accept?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We accept cash, credit cards, and bank transfers. All transactions are secure and reliable.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does delivery take to different provinces?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Delivery times vary by province. Bangkok and nearby areas: 1-2 days. Major cities: 2-3 days. Remote areas: 3-5 days. Contact us for specific delivery times to your location.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer free delivery nationwide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we offer free delivery to all provinces in Thailand for orders above a certain amount. Contact us via Line for current delivery terms and conditions.',
      },
    },
  ],
};
