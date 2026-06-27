import { prisma } from './prisma';

export const HOME_COVER_IMAGE_KEY = 'home.coverImage';
export const DEFAULT_HOME_COVER_IMAGE =
  'https://images.giftoryth.com/giftoryth-public/images/cover.webp';

export const getSiteSetting = async (key: string) => {
  const setting = await prisma.siteSetting.findUnique({
    where: { key },
  });

  return setting?.value || null;
};

export const getHomeCoverImage = async () =>
  (await getSiteSetting(HOME_COVER_IMAGE_KEY)) || DEFAULT_HOME_COVER_IMAGE;

