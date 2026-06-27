'use server';

import { revalidatePath } from 'next/cache';
import { CONTACT_SETTING_KEYS } from '@/lib/siteSettings';
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

export const updateContactSettings = async (formData: FormData) => {
  const logoImage = await getUploadedOrExistingImage(formData, 'logoImageFile', 'logoImage', 'contact-logo');
  const featureImage = await getUploadedOrExistingImage(formData, 'featureImageFile', 'featureImage', 'contact-feature');
  const qrImage = await getUploadedOrExistingImage(formData, 'qrImageFile', 'qrImage', 'contact-qr');
  const logoAlt = toString(formData.get('logoAlt'));
  const featureAlt = toString(formData.get('featureAlt'));
  const qrAlt = toString(formData.get('qrAlt'));

  if (!logoImage || !featureImage || !qrImage) {
    return;
  }

  await Promise.all([
    upsertSiteSetting(CONTACT_SETTING_KEYS.logoImage, logoImage),
    upsertSiteSetting(CONTACT_SETTING_KEYS.logoAlt, logoAlt),
    upsertSiteSetting(CONTACT_SETTING_KEYS.featureImage, featureImage),
    upsertSiteSetting(CONTACT_SETTING_KEYS.featureAlt, featureAlt),
    upsertSiteSetting(CONTACT_SETTING_KEYS.qrImage, qrImage),
    upsertSiteSetting(CONTACT_SETTING_KEYS.qrAlt, qrAlt),
  ]);

  revalidatePath('/contact');
  revalidatePath('/admin/contact');
};
