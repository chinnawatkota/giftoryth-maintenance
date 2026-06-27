import { customGift } from '@/constants/custom-gift';
import { prisma } from './prisma';

export type CustomGiftPageItem = (typeof customGift)[number] & {
  isPublished: boolean;
};

const DEFAULT_CUSTOM_GIFT_CLASS = 'col-span-1 bg-gray-100';
const defaultSlots = new Set(customGift.map(item => item.slot));

export const getCustomGiftPageItems = async (options: { includeHidden?: boolean } = {}) => {
  const overrides = await prisma.customGiftItem.findMany({
    orderBy: { slot: 'asc' },
  });
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
  const customItems: CustomGiftPageItem[] = overrides
    .filter(item => !defaultSlots.has(item.slot))
    .map(item => ({
      id: `custom-gift-extra-${item.slot}`,
      slot: item.slot,
      title: item.title,
      image: item.image,
      url: '',
      className: DEFAULT_CUSTOM_GIFT_CLASS,
      imageClassName: item.imageClassName ?? undefined,
      disabledLink: true,
      isPublished: item.isPublished,
    }));
  const allItems = [...items, ...customItems].sort((a, b) => a.slot - b.slot);

  return options.includeHidden ? allItems : allItems.filter(item => item.isPublished);
};

export const getNextCustomGiftSlot = async () => {
  const lastItem = await prisma.customGiftItem.findFirst({
    orderBy: { slot: 'desc' },
    select: { slot: true },
  });
  const lastDefaultSlot = Math.max(...customGift.map(item => item.slot));

  return Math.max(lastItem?.slot || 0, lastDefaultSlot) + 1;
};
