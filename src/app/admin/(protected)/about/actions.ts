'use server';

import { revalidatePath } from 'next/cache';
import { ABOUT_SETTING_KEYS } from '@/lib/siteSettings';
import { prisma } from '@/lib/prisma';
import { uploadSiteImage } from '@/lib/storage';

const toString = (value: FormDataEntryValue | null) => String(value || '').trim();

const upsertSiteSetting = async (key: string, value: string) =>
  prisma.siteSetting.upsert({
    where: { key },
    create: { key, value },
    update: { value },
  });

const getUploadedOrExistingImage = async (formData: FormData, fileKey: string, urlKey: string, uploadName: string) => {
  const imageFile = formData.get(fileKey);
  const uploadedImage =
    imageFile instanceof File && imageFile.size > 0
      ? await uploadSiteImage(imageFile, uploadName)
      : null;

  return uploadedImage?.imageUrl || toString(formData.get(urlKey));
};

export const updateAboutSettings = async (formData: FormData) => {
  const firstImage = await getUploadedOrExistingImage(formData, 'firstImageFile', 'firstImage', 'about-first');
  const secondImage = await getUploadedOrExistingImage(formData, 'secondImageFile', 'secondImage', 'about-second');
  const firstAlt = toString(formData.get('firstAlt'));
  const secondAlt = toString(formData.get('secondAlt'));

  if (!firstImage || !secondImage) {
    return;
  }

  await Promise.all([
    upsertSiteSetting(ABOUT_SETTING_KEYS.firstImage, firstImage),
    upsertSiteSetting(ABOUT_SETTING_KEYS.firstAlt, firstAlt),
    upsertSiteSetting(ABOUT_SETTING_KEYS.secondImage, secondImage),
    upsertSiteSetting(ABOUT_SETTING_KEYS.secondAlt, secondAlt),
  ]);

  revalidatePath('/about');
  revalidatePath('/admin/about');
};

