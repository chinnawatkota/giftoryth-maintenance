'use server';

import { prisma } from '@/lib/prisma';
import { deleteStorageObjectByUrl, isManagedStorageUrl } from '@/lib/storage';
import { revalidatePath } from 'next/cache';

export const deleteMediaObject = async (formData: FormData) => {
  const url = String(formData.get('url') || '');

  if (!url || !isManagedStorageUrl(url)) {
    return;
  }

  const usageCount = await prisma.product.count({
    where: { image: url },
  });

  if (usageCount > 0) {
    return;
  }

  await deleteStorageObjectByUrl(url);
  revalidatePath('/admin/media');
};
