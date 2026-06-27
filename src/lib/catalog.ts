import type { Product as PrismaProduct } from '@prisma/client';
import { prisma } from './prisma';

export type CatalogProduct = Omit<Product.ProductCardProps, 'price' | 'details'> & {
  price?: number;
  details: string;
  categorySlug: string;
};

const toCatalogProduct = (
  product: PrismaProduct & {
    category: {
      slug: string;
    };
  }
): CatalogProduct => ({
  id: product.slug,
  image: product.image,
  cardImage: product.cardImage ?? undefined,
  title: product.title,
  price: product.price ?? undefined,
  details: product.details,
  imageClassName: product.imageClassName ?? undefined,
  categorySlug: product.category.slug,
});

export const getPublishedProductsByCategory = async (categorySlug: string) => {
  const products = await prisma.product.findMany({
    where: {
      isPublished: true,
      category: {
        slug: categorySlug,
      },
    },
    orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }],
    include: {
      category: {
        select: { slug: true },
      },
    },
  });

  return products.map(toCatalogProduct);
};

export const getPublishedProductBySlug = async (slug: string) => {
  const product = await prisma.product.findFirst({
    where: {
      slug,
      isPublished: true,
    },
    include: {
      category: {
        select: { slug: true },
      },
    },
  });

  return product ? toCatalogProduct(product) : null;
};

export const getBestSellerProducts = async () => {
  const products = await prisma.product.findMany({
    where: {
      isPublished: true,
      isBestSeller: true,
    },
    orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }],
    include: {
      category: {
        select: { slug: true },
      },
    },
  });

  return products.map(toCatalogProduct);
};
