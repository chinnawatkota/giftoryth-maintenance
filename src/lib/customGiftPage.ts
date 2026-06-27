import { customGift } from '@/constants/custom-gift';
import { prisma } from './prisma';

export type CustomGiftPageItem = (typeof customGift)[number] & {
  isPublished: boolean;
};

export const getCustomGiftPageItems = async (options: { includeHidden?: boolean } = {}) => {
  const overrides = await prisma.customGiftItem.findMany();
  const overridesBySlot = new Map(overrides.map(item => [item.slot, item]));
  const items: CustomGiftPageItem[] = customGift.map(defaultItem => {
    const override = overridesBySlot.get(defaultItem.slot);

    return {
      ...defaultItem,
      title: override?.title ?? defaultItem.title,
      image: override?.image || defaultItem.image,
      imageClassName: override?.imageClassName ?? defaultItem.imageClassName,
      isPublished: override?.isPublished ?? true,
    };
  });

  return options.includeHidden ? items : items.filter(item => item.isPublished);
};

