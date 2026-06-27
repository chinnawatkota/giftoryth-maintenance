import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const prisma = new PrismaClient();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const basketSourcePath = path.join(__dirname, '..', 'src', 'constants', 'basket.tsx');
const basketSource = readFileSync(basketSourcePath, 'utf8');

const categories = [
  {
    slug: 'non-custom',
    name: 'Non Custom Baskets',
    sortOrder: 10,
    startMarker: 'export const nonCustomBasketsList = [',
    endMarker: 'export const customBasketsList = [',
  },
  {
    slug: 'special-custom-design',
    name: 'Special Custom Design Baskets',
    sortOrder: 20,
    startMarker: 'export const customBasketsList = [',
    endMarker: 'export const shopAllBaskets',
  },
];

const getSection = (startMarker, endMarker) => {
  const start = basketSource.indexOf(startMarker);
  const end = basketSource.indexOf(endMarker);

  if (start === -1 || end === -1 || end <= start) {
    throw new Error(`Unable to find basket section: ${startMarker}`);
  }

  return basketSource.slice(start, end);
};

const readStringField = (block, field) => {
  const match = block.match(new RegExp(`${field}:\\s*'([^']*)'`));
  return match?.[1] ?? '';
};

const readNumberField = (block, field) => {
  const match = block.match(new RegExp(`${field}:\\s*(\\d+)`));
  return match ? Number(match[1]) : null;
};

const extractProducts = (section, categorySlug) => {
  const products = [];
  const itemPattern = /{\s*id:\s*'([^']+)'([\s\S]*?)(?=\n\s*{\s*id:|\n];)/g;
  let match;
  let sortOrder = 10;

  while ((match = itemPattern.exec(section)) !== null) {
    const block = match[0];
    const details = [...block.matchAll(/<li>([\s\S]*?)<\/li>/g)]
      .map(item => item[1].replace(/\s+/g, ' ').trim())
      .filter(Boolean)
      .join('\n');

    products.push({
      slug: match[1],
      title: readStringField(block, 'title'),
      price: readNumberField(block, 'price'),
      image: readStringField(block, 'image'),
      details,
      sortOrder,
      imageClassName: readStringField(block, 'imageClassName') || null,
      isPublished: true,
      isBestSeller: ['non-custom-04', 'non-custom-09', 'non-custom-13', 'non-custom-16', 'non-custom-03'].includes(
        match[1]
      ),
      categorySlug,
    });
    sortOrder += 10;
  }

  return products;
};

const main = async () => {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        sortOrder: category.sortOrder,
      },
      create: {
        slug: category.slug,
        name: category.name,
        sortOrder: category.sortOrder,
      },
    });
  }

  const categoryRecords = await prisma.category.findMany();
  const categoryBySlug = new Map(categoryRecords.map(category => [category.slug, category]));

  const products = categories.flatMap(category =>
    extractProducts(getSection(category.startMarker, category.endMarker), category.slug)
  );

  for (const product of products) {
    const category = categoryBySlug.get(product.categorySlug);

    if (!category) {
      throw new Error(`Missing category: ${product.categorySlug}`);
    }

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        title: product.title,
        price: product.price,
        image: product.image,
        details: product.details,
        sortOrder: product.sortOrder,
        imageClassName: product.imageClassName,
        isPublished: product.isPublished,
        isBestSeller: product.isBestSeller,
        categoryId: category.id,
      },
      create: {
        slug: product.slug,
        title: product.title,
        price: product.price,
        image: product.image,
        details: product.details,
        sortOrder: product.sortOrder,
        imageClassName: product.imageClassName,
        isPublished: product.isPublished,
        isBestSeller: product.isBestSeller,
        categoryId: category.id,
      },
    });
  }

  console.log(`Seeded ${categories.length} categories and ${products.length} products.`);
};

main()
  .catch(error => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
