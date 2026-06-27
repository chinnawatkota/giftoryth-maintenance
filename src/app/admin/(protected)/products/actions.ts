'use server';

import { prisma } from '@/lib/prisma';
import { deleteStorageObjectPairByUrl, isManagedStorageUrl, uploadProductImage } from '@/lib/storage';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const toString = (value: FormDataEntryValue | null) => String(value || '').trim();
const toInt = (value: FormDataEntryValue | null) => {
  const text = toString(value);
  return text ? Number(text) : null;
};
const toBool = (value: FormDataEntryValue | null) => value === 'on';

const productDataFromForm = async (formData: FormData) => {
  const slug = toString(formData.get('slug'));
  const imageFile = formData.get('imageFile');
  const uploadedImage =
    imageFile instanceof File ? await uploadProductImage(imageFile, slug) : null;

  return {
    slug,
    title: toString(formData.get('title')),
    price: toInt(formData.get('price')),
    image: uploadedImage?.imageUrl || toString(formData.get('image')),
    cardImage: uploadedImage?.cardUrl,
    thumbnailImage: uploadedImage?.thumbnailUrl,
    details: toString(formData.get('details')),
    categoryId: toString(formData.get('categoryId')),
    sortOrder: Number(formData.get('sortOrder') || 0),
    isPublished: toBool(formData.get('isPublished')),
    isBestSeller: toBool(formData.get('isBestSeller')),
    imageClassName: toString(formData.get('imageClassName')) || null,
  };
};

const revalidateProductPaths = () => {
  revalidatePath('/admin/products');
  revalidatePath('/baskets');
};

const deleteManagedImageIfUnused = async (imageUrl: string | null | undefined, ignoreProductId?: string) => {
  if (!imageUrl) {
    return;
  }

  if (!isManagedStorageUrl(imageUrl)) {
    return;
  }

  const usageCount = await prisma.product.count({
    where: {
      OR: [{ image: imageUrl }, { cardImage: imageUrl }, { thumbnailImage: imageUrl }],
      ...(ignoreProductId ? { id: { not: ignoreProductId } } : {}),
    },
  });

  if (usageCount === 0) {
    await deleteStorageObjectPairByUrl(imageUrl);
  }
};

export const createProduct = async (formData: FormData) => {
  const data = await productDataFromForm(formData);

  if (!data.slug || !data.title || !data.image || !data.categoryId) {
    return;
  }

  await prisma.product.create({ data });
  revalidateProductPaths();
  redirect('/admin/products');
};

export const updateProduct = async (formData: FormData) => {
  const id = toString(formData.get('id'));
  const data = await productDataFromForm(formData);

  if (!id || !data.slug || !data.title || !data.image || !data.categoryId) {
    return;
  }

  const existingProduct = await prisma.product.findUnique({
    where: { id },
    select: { image: true, cardImage: true, thumbnailImage: true },
  });

  await prisma.product.update({
    where: { id },
    data: {
      ...data,
      cardImage:
        data.cardImage === undefined
          ? existingProduct?.image === data.image
            ? existingProduct.cardImage
            : null
          : data.cardImage,
      thumbnailImage:
        data.thumbnailImage === undefined
          ? existingProduct?.image === data.image
            ? existingProduct.thumbnailImage
            : null
          : data.thumbnailImage,
    },
  });

  if (existingProduct?.image && existingProduct.image !== data.image) {
    await deleteManagedImageIfUnused(existingProduct.image, id);
    await deleteManagedImageIfUnused(existingProduct.cardImage, id);
    await deleteManagedImageIfUnused(existingProduct.thumbnailImage, id);
  }

  revalidateProductPaths();
  revalidatePath(`/basket/${data.slug}`);
  redirect('/admin/products');
};

export const deleteProduct = async (formData: FormData) => {
  const id = toString(formData.get('id'));

  if (!id) {
    return;
  }

  const product = await prisma.product.findUnique({
    where: { id },
    select: { image: true, cardImage: true, thumbnailImage: true },
  });

  if (!product) {
    return;
  }

  await prisma.product.delete({
    where: { id },
  });

  await deleteManagedImageIfUnused(product.image, id);
  await deleteManagedImageIfUnused(product.cardImage, id);
  await deleteManagedImageIfUnused(product.thumbnailImage, id);
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
