'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { HOME_COVER_IMAGE_KEY } from '@/lib/siteSettings';
import { uploadSiteImage } from '@/lib/storage';

const toString = (value: FormDataEntryValue | null) => String(value || '').trim();

export const updateHomeSettings = async (formData: FormData) => {
  const imageFile = formData.get('imageFile');
  const uploadedImage =
    imageFile instanceof File && imageFile.size > 0
      ? await uploadSiteImage(imageFile, 'home-cover')
      : null;
  const coverImage = uploadedImage?.imageUrl || toString(formData.get('coverImage'));

  if (!coverImage) {
    return;
  }

  await prisma.siteSetting.upsert({
    where: { key: HOME_COVER_IMAGE_KEY },
    create: {
      key: HOME_COVER_IMAGE_KEY,
      value: coverImage,
    },
    update: {
      value: coverImage,
    },
  });

  revalidatePath('/');
  revalidatePath('/admin/home');
};

