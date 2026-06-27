'use server';

import { prisma } from '@/lib/prisma';
import { deleteStorageObjectPairByUrl, isManagedStorageUrl, uploadMediaImage } from '@/lib/storage';
import { revalidatePath } from 'next/cache';

const toString = (value: FormDataEntryValue | null) => String(value || '').trim();

export const uploadMediaObject = async (formData: FormData) => {
  const imageFile = formData.get('imageFile');
  const name = toString(formData.get('name')) || 'media';

  if (!(imageFile instanceof File) || imageFile.size === 0) {
    return;
  }

  await uploadMediaImage(imageFile, name);
  revalidatePath('/admin/media');
};

export const deleteMediaObject = async (formData: FormData) => {
  const url = String(formData.get('url') || '');

  if (!url || !isManagedStorageUrl(url)) {
    return;
  }

  const [productUsageCount, siteSettingUsageCount, identityUsageCount] = await Promise.all([
    prisma.product.count({
      where: {
        OR: [{ image: url }, { cardImage: url }, { thumbnailImage: url }],
      },
    }),
    prisma.siteSetting.count({
      where: { value: url },
    }),
    prisma.homeIdentityItem.count({
      where: { image: url },
    }),
  ]);

  if (productUsageCount + siteSettingUsageCount + identityUsageCount > 0) {
    return;
  }

  await deleteStorageObjectPairByUrl(url);
  revalidatePath('/admin/media');
};
