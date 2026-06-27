import { prisma } from './prisma';

export type HomeCatalogItem = {
  id: string;
  slot: number;
  title: string;
  image: string;
  url: string;
  className: string;
  isPublished: boolean;
};

export const defaultHomeCatalogItems: HomeCatalogItem[] = [
  {
    id: 'home-catalog-non-custom',
    slot: 1,
    image: 'https://images.giftoryth.com/giftoryth-public/images/Basket/09.webp',
    title: 'Non-Custom Baskets',
    url: '/baskets',
    className: 'sm:max-w-[360px] md:max-w-[460px] aspect-square',
    isPublished: true,
  },
  {
    id: 'home-catalog-special-custom',
    slot: 2,
    image: 'https://images.giftoryth.com/giftoryth-public/images/Basket/09.webp',
    title: 'Special Custom Design Baskets',
    url: '/baskets#special-custom-design',
    className: 'sm:max-w-[360px] md:max-w-[460px] aspect-square',
    isPublished: true,
  },
  {
    id: 'home-catalog-custom-gift',
    slot: 3,
    image: 'https://images.giftoryth.com/giftoryth-public/images/Basket/09.webp',
    title: 'Custom-Gift',
    url: '/custom-gift',
    className: 'sm:col-span-2 lg:col-span-1 justify-self-center sm:max-h-[360px] md:max-h-[460px] aspect-square',
    isPublished: true,
  },
];

const defaultItemsBySlot = new Map(defaultHomeCatalogItems.map(item => [item.slot, item]));

export const getHomeCatalogItems = async (options: { includeHidden?: boolean } = {}) => {
  const overrides = await prisma.homeCatalogItem.findMany({
    orderBy: { slot: 'asc' },
  });
  const overridesBySlot = new Map(overrides.map(item => [item.slot, item]));
  const items = defaultHomeCatalogItems.map(defaultItem => {
    const override = overridesBySlot.get(defaultItem.slot);

    return {
      ...defaultItem,
      title: override?.title || defaultItem.title,
      image: override?.image || defaultItem.image,
      url: override?.url || defaultItem.url,
      isPublished: override?.isPublished ?? true,
    };
  });
  const customItems: HomeCatalogItem[] = overrides
    .filter(item => !defaultItemsBySlot.has(item.slot))
    .map(item => ({
      id: item.id,
      slot: item.slot,
      title: item.title,
      image: item.image,
      url: item.url,
      className: 'sm:max-w-[360px] md:max-w-[460px] aspect-square',
      isPublished: item.isPublished,
    }));
  const allItems = [...items, ...customItems].sort((a, b) => a.slot - b.slot);

  return options.includeHidden ? allItems : allItems.filter(item => item.isPublished);
};

export const getNextHomeCatalogSlot = async () => {
  const lastItem = await prisma.homeCatalogItem.findFirst({
    orderBy: { slot: 'desc' },
    select: { slot: true },
  });
  const lastDefaultSlot = Math.max(...defaultHomeCatalogItems.map(item => item.slot));

  return Math.max(lastItem?.slot || 0, lastDefaultSlot) + 1;
};

