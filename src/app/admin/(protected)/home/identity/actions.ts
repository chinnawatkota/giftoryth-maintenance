'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { uploadSiteImage } from '@/lib/storage';

const toString = (value: FormDataEntryValue | null) => String(value || '').trim();
const toBool = (value: FormDataEntryValue | null) => value === 'on';

export const updateHomeIdentityItem = async (formData: FormData) => {
  const slot = Number(formData.get('slot') || 0);
  const title = toString(formData.get('title'));
  const imageFile = formData.get('imageFile');
  const uploadedImage =
    imageFile instanceof File && imageFile.size > 0
      ? await uploadSiteImage(imageFile, `identity-${slot}`)
      : null;
  const image = uploadedImage?.imageUrl || toString(formData.get('image'));
  const imageClassName = toString(formData.get('imageClassName')) || null;
  const isPublished = toBool(formData.get('isPublished'));

  if (!slot || !title || !image) {
    return;
  }

  await prisma.homeIdentityItem.upsert({
    where: { slot },
    create: {
      slot,
      title,
      image,
      imageClassName,
      isPublished,
    },
    update: {
      title,
      image,
      imageClassName,
      isPublished,
    },
  });

  revalidatePath('/');
  revalidatePath('/admin/home/identity');
};

