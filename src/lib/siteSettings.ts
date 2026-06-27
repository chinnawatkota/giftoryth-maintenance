import { prisma } from './prisma';

export const HOME_COVER_IMAGE_KEY = 'home.coverImage';
export const DEFAULT_HOME_COVER_IMAGE =
  'https://images.giftoryth.com/giftoryth-public/images/cover.webp';
export const CUSTOM_GIFT_SETTING_KEYS = {
  title: 'home.customGift.title',
  leftImage: 'home.customGift.leftImage',
  leftAlt: 'home.customGift.leftAlt',
  rightImage1: 'home.customGift.rightImage1',
  rightAlt1: 'home.customGift.rightAlt1',
  rightImage2: 'home.customGift.rightImage2',
  rightAlt2: 'home.customGift.rightAlt2',
} as const;
export const DEFAULT_CUSTOM_GIFT_SETTINGS = {
  title: 'Custom Gift',
  leftImage: 'https://images.giftoryth.com/giftoryth-public/images/shop-all-basket/signature.webp',
  leftAlt: 'Signature gift',
  rightImage1: 'https://images.giftoryth.com/giftoryth-public/images/shop-all-basket/bow.webp',
  rightAlt1: 'Bow',
  rightImage2: 'https://images.giftoryth.com/giftoryth-public/images/shop-all-basket/bow-bag.webp',
  rightAlt2: 'Bow bag',
};
export const ABOUT_SETTING_KEYS = {
  firstImage: 'about.firstImage',
  firstAlt: 'about.firstAlt',
  secondImage: 'about.secondImage',
  secondAlt: 'about.secondAlt',
} as const;
export const DEFAULT_ABOUT_SETTINGS = {
  firstImage: 'https://images.giftoryth.com/giftoryth-public/images/IMG_6078.webp',
  firstAlt: 'About Giftoryth',
  secondImage: 'https://images.giftoryth.com/giftoryth-public/images/cover.webp',
  secondAlt: 'Giftoryth gift basket',
};
export const CONTACT_SETTING_KEYS = {
  logoImage: 'contact.logoImage',
  logoAlt: 'contact.logoAlt',
  featureImage: 'contact.featureImage',
  featureAlt: 'contact.featureAlt',
  qrImage: 'contact.qrImage',
  qrAlt: 'contact.qrAlt',
} as const;
export const DEFAULT_CONTACT_SETTINGS = {
  logoImage: 'https://images.giftoryth.com/giftoryth-public/images/logos/logo-white-transparent.webp',
  logoAlt: 'Giftoryth logo',
  featureImage: 'https://images.giftoryth.com/giftoryth-public/images/IMG_6078.webp',
  featureAlt: 'Giftoryth handmade baskets',
  qrImage: 'https://images.giftoryth.com/giftoryth-public/images/line/qr.webp',
  qrAlt: 'Giftoryth Line QR code',
};

export const getSiteSetting = async (key: string) => {
  const setting = await prisma.siteSetting.findUnique({
    where: { key },
  });

  return setting?.value || null;
};

export const getHomeCoverImage = async () =>
  (await getSiteSetting(HOME_COVER_IMAGE_KEY)) || DEFAULT_HOME_COVER_IMAGE;

export const getSiteSettings = async (keys: string[]) => {
  const settings = await prisma.siteSetting.findMany({
    where: {
      key: {
        in: keys,
      },
    },
  });

  return new Map(settings.map(setting => [setting.key, setting.value]));
};

export const getCustomGiftSettings = async () => {
  const settings = await getSiteSettings(Object.values(CUSTOM_GIFT_SETTING_KEYS));

  return {
    title: settings.get(CUSTOM_GIFT_SETTING_KEYS.title) || DEFAULT_CUSTOM_GIFT_SETTINGS.title,
    leftImage: settings.get(CUSTOM_GIFT_SETTING_KEYS.leftImage) || DEFAULT_CUSTOM_GIFT_SETTINGS.leftImage,
    leftAlt: settings.get(CUSTOM_GIFT_SETTING_KEYS.leftAlt) || DEFAULT_CUSTOM_GIFT_SETTINGS.leftAlt,
    rightImage1: settings.get(CUSTOM_GIFT_SETTING_KEYS.rightImage1) || DEFAULT_CUSTOM_GIFT_SETTINGS.rightImage1,
    rightAlt1: settings.get(CUSTOM_GIFT_SETTING_KEYS.rightAlt1) || DEFAULT_CUSTOM_GIFT_SETTINGS.rightAlt1,
    rightImage2: settings.get(CUSTOM_GIFT_SETTING_KEYS.rightImage2) || DEFAULT_CUSTOM_GIFT_SETTINGS.rightImage2,
    rightAlt2: settings.get(CUSTOM_GIFT_SETTING_KEYS.rightAlt2) || DEFAULT_CUSTOM_GIFT_SETTINGS.rightAlt2,
  };
};

export const getAboutSettings = async () => {
  const settings = await getSiteSettings(Object.values(ABOUT_SETTING_KEYS));

  return {
    firstImage: settings.get(ABOUT_SETTING_KEYS.firstImage) || DEFAULT_ABOUT_SETTINGS.firstImage,
    firstAlt: settings.get(ABOUT_SETTING_KEYS.firstAlt) || DEFAULT_ABOUT_SETTINGS.firstAlt,
    secondImage: settings.get(ABOUT_SETTING_KEYS.secondImage) || DEFAULT_ABOUT_SETTINGS.secondImage,
    secondAlt: settings.get(ABOUT_SETTING_KEYS.secondAlt) || DEFAULT_ABOUT_SETTINGS.secondAlt,
  };
};

export const getContactSettings = async () => {
  const settings = await getSiteSettings(Object.values(CONTACT_SETTING_KEYS));

  return {
    logoImage: settings.get(CONTACT_SETTING_KEYS.logoImage) || DEFAULT_CONTACT_SETTINGS.logoImage,
    logoAlt: settings.get(CONTACT_SETTING_KEYS.logoAlt) || DEFAULT_CONTACT_SETTINGS.logoAlt,
    featureImage: settings.get(CONTACT_SETTING_KEYS.featureImage) || DEFAULT_CONTACT_SETTINGS.featureImage,
    featureAlt: settings.get(CONTACT_SETTING_KEYS.featureAlt) || DEFAULT_CONTACT_SETTINGS.featureAlt,
    qrImage: settings.get(CONTACT_SETTING_KEYS.qrImage) || DEFAULT_CONTACT_SETTINGS.qrImage,
    qrAlt: settings.get(CONTACT_SETTING_KEYS.qrAlt) || DEFAULT_CONTACT_SETTINGS.qrAlt,
  };
};
