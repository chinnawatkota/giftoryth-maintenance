'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { customGift } from '@/constants/custom-gift';
import { prisma } from '@/lib/prisma';
import { uploadSiteImage } from '@/lib/storage';

const toString = (value: FormDataEntryValue | null) => String(value || '').trim();
const toBool = (value: FormDataEntryValue | null) => value === 'on';
const defaultSlots = new Set(customGift.map(item => item.slot));

const revalidateCustomGiftPaths = () => {
  revalidatePath('/custom-gift');
  revalidatePath('/admin/custom-gift');
};

const customGiftDataFromForm = async (formData: FormData) => {
  const slot = Number(formData.get('slot') || 0);
  const title = toString(formData.get('title'));
  const imageFile = formData.get('imageFile');
  const uploadedImage =
    imageFile instanceof File && imageFile.size > 0
      ? await uploadSiteImage(imageFile, `custom-gift-page-${slot}`)
      : null;
  const image = uploadedImage?.imageUrl || toString(formData.get('image'));
  const imageClassNameInput = toString(formData.get('imageClassName'));
  const imageClassName = imageClassNameInput === '__default__' ? null : imageClassNameInput;
  const isPublished = toBool(formData.get('isPublished'));

  return {
    slot,
    title,
    image,
    imageClassName,
    isPublished,
  };
};

export const updateCustomGiftItem = async (formData: FormData) => {
  const originalSlot = Number(formData.get('originalSlot') || formData.get('slot') || 0);
  const data = await customGiftDataFromForm(formData);

  if (!originalSlot || !data.slot || !data.image) {
    return;
  }

  if (originalSlot !== data.slot) {
    await prisma.customGiftItem.deleteMany({
      where: { slot: originalSlot },
    });
  }

  await prisma.customGiftItem.upsert({
    where: { slot: data.slot },
    create: {
      ...data,
    },
    update: {
      title: data.title,
      image: data.image,
      imageClassName: data.imageClassName,
      isPublished: data.isPublished,
    },
  });

  revalidateCustomGiftPaths();
  redirect('/admin/custom-gift');
};

export const createCustomGiftItem = async (formData: FormData) => {
  const data = await customGiftDataFromForm(formData);

  if (!data.slot || !data.image) {
    return;
  }

  await prisma.customGiftItem.create({
    data,
  });

  revalidateCustomGiftPaths();
  redirect('/admin/custom-gift');
};

export const deleteCustomGiftItem = async (formData: FormData) => {
  const slot = Number(formData.get('slot') || 0);

  if (!slot || slot === 1) {
    return;
  }

  if (defaultSlots.has(slot)) {
    await prisma.customGiftItem.upsert({
      where: { slot },
      create: {
        slot,
        title: '',
        image: customGift.find(item => item.slot === slot)?.image || '',
        isPublished: false,
      },
      update: {
        isPublished: false,
      },
    });
  } else {
    await prisma.customGiftItem.deleteMany({
      where: { slot },
    });
  }

  revalidateCustomGiftPaths();
};
