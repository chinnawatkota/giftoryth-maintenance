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

  const usageCount = await prisma.product.count({
    where: {
      OR: [{ image: url }, { thumbnailImage: url }],
    },
  });

  if (usageCount > 0) {
    return;
  }

  await deleteStorageObjectPairByUrl(url);
  revalidatePath('/admin/media');
};
