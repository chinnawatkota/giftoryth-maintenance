import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import sharp from 'sharp';

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const OUTPUT_IMAGE_SIZE = 1200;
const OUTPUT_IMAGE_QUALITY = 80;
const ALLOWED_IMAGE_TYPES = ['image/webp', 'image/jpeg', 'image/png'];

const getStorageConfig = () => {
  const endpoint = process.env.S3_ENDPOINT;
  const bucket = process.env.S3_BUCKET;
  const accessKeyId = process.env.S3_ACCESS_KEY_ID;
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
  const publicBaseUrl = process.env.S3_PUBLIC_BASE_URL;

  if (!endpoint || !bucket || !accessKeyId || !secretAccessKey || !publicBaseUrl) {
    return null;
  }

  return {
    endpoint,
    bucket,
    accessKeyId,
    secretAccessKey,
    publicBaseUrl,
  };
};

const toSafeSegment = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

export const uploadProductImage = async (file: File, slug: string) => {
  if (file.size === 0) {
    return null;
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error('Only WEBP, JPG, and PNG images are allowed.');
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error('Image file must be 10MB or smaller.');
  }

  const config = getStorageConfig();

  if (!config) {
    throw new Error('Storage is not configured.');
  }

  const key = `products/${toSafeSegment(slug) || 'product'}-${Date.now()}.webp`;
  const bytes = await file.arrayBuffer();
  const optimizedImage = await sharp(Buffer.from(bytes))
    .rotate()
    .resize({
      width: OUTPUT_IMAGE_SIZE,
      height: OUTPUT_IMAGE_SIZE,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({
      quality: OUTPUT_IMAGE_QUALITY,
      effort: 5,
    })
    .toBuffer();
  const client = new S3Client({
    region: 'us-east-1',
    endpoint: config.endpoint,
    forcePathStyle: true,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });

  await client.send(
    new PutObjectCommand({
      Bucket: config.bucket,
      Key: key,
      Body: optimizedImage,
      ContentType: 'image/webp',
      CacheControl: 'public, max-age=31536000, immutable',
    })
  );

  return `${config.publicBaseUrl.replace(/\/$/, '')}/${key}`;
};
