import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { PrismaClient } from '@prisma/client';
import sharp from 'sharp';

const MAIN_IMAGE_SIZE = 1200;
const CARD_IMAGE_SIZE = 700;
const THUMBNAIL_IMAGE_SIZE = 240;
const MAIN_IMAGE_QUALITY = 80;
const CARD_IMAGE_QUALITY = 78;
const THUMBNAIL_IMAGE_QUALITY = 72;

const args = process.argv.slice(2);
const shouldApply = args.includes('--apply');
const force = args.includes('--force');

const getArg = (name, fallback = null) => {
  const prefix = `--${name}=`;
  const value = args.find(item => item.startsWith(prefix));

  return value ? value.slice(prefix.length) : fallback;
};

const limit = Number(getArg('limit', '0')) || null;
const onlySlug = getArg('slug');

const requiredEnv = ['S3_ENDPOINT', 'S3_BUCKET', 'S3_ACCESS_KEY_ID', 'S3_SECRET_ACCESS_KEY', 'S3_PUBLIC_BASE_URL'];
const missingEnv = requiredEnv.filter(name => !process.env[name]);

if (missingEnv.length > 0) {
  console.error(`Missing required env: ${missingEnv.join(', ')}`);
  process.exit(1);
}

const publicBaseUrl = process.env.S3_PUBLIC_BASE_URL.replace(/\/$/, '');
const prisma = new PrismaClient();
const s3 = new S3Client({
  region: 'us-east-1',
  endpoint: process.env.S3_ENDPOINT,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

const toSafeSegment = value =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

const downloadImage = async url => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Download failed ${response.status} ${response.statusText}`);
  }

  const contentType = response.headers.get('content-type') || '';

  if (!contentType.startsWith('image/')) {
    throw new Error(`Expected image content, got ${contentType || 'unknown content-type'}`);
  }

  return Buffer.from(await response.arrayBuffer());
};

const createImages = async sourceBuffer => {
  const source = sharp(sourceBuffer).rotate();
  const main = await source
    .clone()
    .resize({
      width: MAIN_IMAGE_SIZE,
      height: MAIN_IMAGE_SIZE,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: MAIN_IMAGE_QUALITY, effort: 5 })
    .toBuffer();
  const card = await source
    .clone()
    .resize({
      width: CARD_IMAGE_SIZE,
      height: CARD_IMAGE_SIZE,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: CARD_IMAGE_QUALITY, effort: 5 })
    .toBuffer();
  const thumbnail = await source
    .clone()
    .resize({
      width: THUMBNAIL_IMAGE_SIZE,
      height: THUMBNAIL_IMAGE_SIZE,
      fit: 'cover',
      withoutEnlargement: true,
    })
    .webp({ quality: THUMBNAIL_IMAGE_QUALITY, effort: 5 })
    .toBuffer();

  return { main, card, thumbnail };
};

const uploadImage = async (key, body) => {
  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: body,
      ContentType: 'image/webp',
      CacheControl: 'public, max-age=31536000, immutable',
    })
  );

  return `${publicBaseUrl}/${key}`;
};

const migrateProduct = async (product, index) => {
  if (!force && product.image.startsWith(`${publicBaseUrl}/`) && product.cardImage && product.thumbnailImage) {
    return { slug: product.slug, skipped: true, reason: 'already managed' };
  }

  const sourceUrl = product.image;
  const safeSlug = toSafeSegment(product.slug) || `product-${index + 1}`;
  const timestamp = Date.now() + index;
  const baseName = `${safeSlug}-${timestamp}.webp`;
  const imageKey = `products/${baseName}`;
  const cardKey = `products/cards/${baseName}`;
  const thumbnailKey = `products/thumbs/${baseName}`;

  if (!shouldApply) {
    return {
      slug: product.slug,
      dryRun: true,
      sourceUrl,
      imageUrl: `${publicBaseUrl}/${imageKey}`,
      cardUrl: `${publicBaseUrl}/${cardKey}`,
      thumbnailUrl: `${publicBaseUrl}/${thumbnailKey}`,
    };
  }

  const sourceBuffer = await downloadImage(sourceUrl);
  const images = await createImages(sourceBuffer);
  const [imageUrl, cardUrl, thumbnailUrl] = await Promise.all([
    uploadImage(imageKey, images.main),
    uploadImage(cardKey, images.card),
    uploadImage(thumbnailKey, images.thumbnail),
  ]);

  await prisma.product.update({
    where: { id: product.id },
    data: {
      image: imageUrl,
      cardImage: cardUrl,
      thumbnailImage: thumbnailUrl,
    },
  });

  return {
    slug: product.slug,
    sourceUrl,
    imageUrl,
    cardUrl,
    thumbnailUrl,
    bytes: {
      source: sourceBuffer.byteLength,
      image: images.main.byteLength,
      card: images.card.byteLength,
      thumbnail: images.thumbnail.byteLength,
    },
  };
};

const main = async () => {
  const products = await prisma.product.findMany({
    where: onlySlug ? { slug: onlySlug } : undefined,
    orderBy: [{ sortOrder: 'asc' }, { slug: 'asc' }],
  });
  const selectedProducts = limit ? products.slice(0, limit) : products;

  console.log(`${shouldApply ? 'Applying' : 'Dry-run'} product image migration for ${selectedProducts.length} product(s).`);

  let migrated = 0;
  let skipped = 0;
  let failed = 0;

  for (const [index, product] of selectedProducts.entries()) {
    try {
      const result = await migrateProduct(product, index);

      if (result.skipped) {
        skipped += 1;
        console.log(`- ${product.slug}: skipped (${result.reason})`);
      } else {
        migrated += 1;
        console.log(`- ${product.slug}: ${shouldApply ? 'migrated' : 'would migrate'}`);
      }
    } catch (error) {
      failed += 1;
      console.error(`- ${product.slug}: failed - ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  console.log(`Done. Migrated: ${migrated}. Skipped: ${skipped}. Failed: ${failed}.`);

  if (!shouldApply) {
    console.log('Run again with --apply to upload resized images and update the database.');
  }

  if (failed > 0) {
    process.exitCode = 1;
  }
};

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
