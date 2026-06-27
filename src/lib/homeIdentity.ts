import { identityServiceItems } from '@/constants/identity-service';
import { prisma } from './prisma';

export type HomeIdentityItem = (typeof identityServiceItems)[number] & {
  isPublished: boolean;
};

export const getHomeIdentityItems = async (options: { includeHidden?: boolean } = {}) => {
  const overrides = await prisma.homeIdentityItem.findMany();
  const overridesBySlot = new Map(overrides.map(item => [item.slot, item]));
  const items: HomeIdentityItem[] = identityServiceItems.map(defaultItem => {
    const override = overridesBySlot.get(defaultItem.slot);

    return {
      ...defaultItem,
      title: override?.title || defaultItem.title,
      image: override?.image || defaultItem.image,
      imageClassName: override?.imageClassName ?? defaultItem.imageClassName,
      isPublished: override?.isPublished ?? true,
    };
  });

  return options.includeHidden ? items : items.filter(item => item.isPublished);
};

