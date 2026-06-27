'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const toString = (value: FormDataEntryValue | null) => String(value || '').trim();
const toInt = (value: FormDataEntryValue | null) => {
  const text = toString(value);
  return text ? Number(text) : null;
};
const toBool = (value: FormDataEntryValue | null) => value === 'on';

const productDataFromForm = (formData: FormData) => ({
  slug: toString(formData.get('slug')),
  title: toString(formData.get('title')),
  price: toInt(formData.get('price')),
  image: toString(formData.get('image')),
  details: toString(formData.get('details')),
  categoryId: toString(formData.get('categoryId')),
  sortOrder: Number(formData.get('sortOrder') || 0),
  isPublished: toBool(formData.get('isPublished')),
  isBestSeller: toBool(formData.get('isBestSeller')),
  imageClassName: toString(formData.get('imageClassName')) || null,
});

const revalidateProductPaths = () => {
  revalidatePath('/admin/products');
  revalidatePath('/baskets');
};

export const createProduct = async (formData: FormData) => {
  const data = productDataFromForm(formData);

  if (!data.slug || !data.title || !data.image || !data.categoryId) {
    return;
  }

  await prisma.product.create({ data });
  revalidateProductPaths();
  redirect('/admin/products');
};

export const updateProduct = async (formData: FormData) => {
  const id = toString(formData.get('id'));
  const data = productDataFromForm(formData);

  if (!id || !data.slug || !data.title || !data.image || !data.categoryId) {
    return;
  }

  await prisma.product.update({
    where: { id },
    data,
  });

  revalidateProductPaths();
  revalidatePath(`/basket/${data.slug}`);
  redirect('/admin/products');
};

export const deleteProduct = async (formData: FormData) => {
  const id = toString(formData.get('id'));

  if (!id) {
    return;
  }

  await prisma.product.delete({
    where: { id },
  });

  revalidateProductPaths();
};

export const toggleProductPublished = async (formData: FormData) => {
  const id = toString(formData.get('id'));
  const isPublished = toBool(formData.get('isPublished'));

  if (!id) {
    return;
  }

  await prisma.product.update({
    where: { id },
    data: { isPublished },
  });

  revalidateProductPaths();
};
