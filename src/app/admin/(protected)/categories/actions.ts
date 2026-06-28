'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const toSlug = (value: FormDataEntryValue | null) => String(value || '').trim();
const toName = (value: FormDataEntryValue | null) => String(value || '').trim();
const toSortOrder = (value: FormDataEntryValue | null) => Number(value || 0);

const categorySlugExists = async (slug: string, ignoreCategoryId?: string) => {
  const category = await prisma.category.findFirst({
    where: {
      slug,
      ...(ignoreCategoryId ? { id: { not: ignoreCategoryId } } : {}),
    },
    select: { id: true },
  });

  return Boolean(category);
};

export const createCategory = async (formData: FormData) => {
  const slug = toSlug(formData.get('slug'));
  const name = toName(formData.get('name'));

  if (!slug || !name) {
    return;
  }

  if (await categorySlugExists(slug)) {
    redirect('/admin/categories?error=slug-exists');
  }

  await prisma.category.create({
    data: {
      slug,
      name,
      sortOrder: toSortOrder(formData.get('sortOrder')),
    },
  });

  revalidatePath('/admin/categories');
};

export const updateCategory = async (formData: FormData) => {
  const id = String(formData.get('id') || '');
  const slug = toSlug(formData.get('slug'));
  const name = toName(formData.get('name'));

  if (!id || !slug || !name) {
    return;
  }

  if (await categorySlugExists(slug, id)) {
    redirect('/admin/categories?error=slug-exists');
  }

  await prisma.category.update({
    where: { id },
    data: {
      slug,
      name,
      sortOrder: toSortOrder(formData.get('sortOrder')),
    },
  });

  revalidatePath('/admin/categories');
  revalidatePath('/admin/products');
};

export const deleteCategory = async (formData: FormData) => {
  const id = String(formData.get('id') || '');

  if (!id) {
    return;
  }

  await prisma.category.delete({
    where: { id },
  });

  revalidatePath('/admin/categories');
  revalidatePath('/admin/products');
};
