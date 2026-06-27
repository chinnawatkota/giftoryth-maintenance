import {
  DeleteObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import sharp from 'sharp';

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const OUTPUT_IMAGE_SIZE = 1200;
const THUMBNAIL_IMAGE_SIZE = 240;
const OUTPUT_IMAGE_QUALITY = 80;
const THUMBNAIL_IMAGE_QUALITY = 72;
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

const getS3Client = () => {
  const config = getStorageConfig();

  if (!config) {
    throw new Error('Storage is not configured.');
  }

  return {
    config,
    client: new S3Client({
      region: 'us-east-1',
      endpoint: config.endpoint,
      forcePathStyle: true,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    }),
  };
};

const toSafeSegment = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

const getThumbnailKey = (key: string) => {
  const parts = key.split('/');
  const fileName = parts.pop();

  if (!fileName || parts.includes('thumbs')) {
    return null;
  }

  return [...parts, 'thumbs', fileName].join('/');
};

const getMainKeyFromThumbnailKey = (key: string) => key.replace('/thumbs/', '/');

const uploadManagedImage = async (file: File, name: string, directory: 'products' | 'media') => {
  if (file.size === 0) {
    return null;
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error('Only WEBP, JPG, and PNG images are allowed.');
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error('Image file must be 10MB or smaller.');
  }

  const { client, config } = getS3Client();

  const safeSlug = toSafeSegment(name) || directory.slice(0, -1);
  const timestamp = Date.now();
  const key = `${directory}/${safeSlug}-${timestamp}.webp`;
  const thumbnailKey = `${directory}/thumbs/${safeSlug}-${timestamp}.webp`;
  const bytes = await file.arrayBuffer();
  const sourceImage = sharp(Buffer.from(bytes)).rotate();
  const optimizedImage = await sourceImage
    .clone()
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
  const thumbnailImage = await sourceImage
    .clone()
    .resize({
      width: THUMBNAIL_IMAGE_SIZE,
      height: THUMBNAIL_IMAGE_SIZE,
      fit: 'cover',
      withoutEnlargement: true,
    })
    .webp({
      quality: THUMBNAIL_IMAGE_QUALITY,
      effort: 5,
    })
    .toBuffer();

  await Promise.all([
    client.send(
      new PutObjectCommand({
        Bucket: config.bucket,
        Key: key,
        Body: optimizedImage,
        ContentType: 'image/webp',
        CacheControl: 'public, max-age=31536000, immutable',
      })
    ),
    client.send(
      new PutObjectCommand({
        Bucket: config.bucket,
        Key: thumbnailKey,
        Body: thumbnailImage,
        ContentType: 'image/webp',
        CacheControl: 'public, max-age=31536000, immutable',
      })
    ),
  ]);

  const publicBaseUrl = config.publicBaseUrl.replace(/\/$/, '');

  return {
    imageUrl: `${publicBaseUrl}/${key}`,
    thumbnailUrl: `${publicBaseUrl}/${thumbnailKey}`,
  };
};

export const uploadProductImage = async (file: File, slug: string) =>
  uploadManagedImage(file, slug, 'products');

export const uploadMediaImage = async (file: File, name: string) =>
  uploadManagedImage(file, name, 'media');

export const getStorageObjectKey = (url: string) => {
  const config = getStorageConfig();

  if (!config) {
    return null;
  }

  const publicBaseUrl = config.publicBaseUrl.replace(/\/$/, '');

  if (!url.startsWith(`${publicBaseUrl}/`)) {
    return null;
  }

  return decodeURIComponent(url.slice(publicBaseUrl.length + 1));
};

export const isManagedStorageUrl = (url: string) => Boolean(getStorageObjectKey(url));

export const deleteStorageObjectByUrl = async (url: string) => {
  const key = getStorageObjectKey(url);

  if (!key) {
    return false;
  }

  const { client, config } = getS3Client();

  await client.send(
    new DeleteObjectCommand({
      Bucket: config.bucket,
      Key: key,
    })
  );

  return true;
};

export const deleteStorageObjectPairByUrl = async (url: string) => {
  const key = getStorageObjectKey(url);

  if (!key) {
    return false;
  }

  const { client, config } = getS3Client();
  const keys = new Set([key]);
  const pairedKey = key.includes('/thumbs/') ? getMainKeyFromThumbnailKey(key) : getThumbnailKey(key);

  if (pairedKey) {
    keys.add(pairedKey);
  }

  await Promise.all(
    [...keys].map(item =>
      client.send(
        new DeleteObjectCommand({
          Bucket: config.bucket,
          Key: item,
        })
      )
    )
  );

  return true;
};

export const listMediaObjects = async () => {
  const { client, config } = getS3Client();
  const objects = [];
  const prefixes = ['products/', 'media/'];

  for (const prefix of prefixes) {
    let continuationToken: string | undefined;

    do {
      const response = await client.send(
        new ListObjectsV2Command({
          Bucket: config.bucket,
          Prefix: prefix,
          ContinuationToken: continuationToken,
        })
      );

      for (const object of response.Contents || []) {
        if (!object.Key) {
          continue;
        }

        objects.push({
          key: object.Key,
          url: `${config.publicBaseUrl.replace(/\/$/, '')}/${object.Key}`,
          size: object.Size || 0,
          lastModified: object.LastModified,
        });
      }

      continuationToken = response.NextContinuationToken;
    } while (continuationToken);
  }

  const publicBaseUrl = config.publicBaseUrl.replace(/\/$/, '');
  const objectKeys = new Set(objects.map(object => object.key));

  return objects
    .filter(object => !object.key.includes('/thumbs/'))
    .map(object => {
      const thumbnailKey = getThumbnailKey(object.key);

      return {
        ...object,
        thumbnailUrl:
          thumbnailKey && objectKeys.has(thumbnailKey) ? `${publicBaseUrl}/${thumbnailKey}` : object.url,
      };
    })
    .sort((a, b) => (b.lastModified?.getTime() || 0) - (a.lastModified?.getTime() || 0));
};
