import Image from 'next/image';
import ConfirmSubmitButton from '../_components/ConfirmSubmitButton';
import CopyUrlButton from './CopyUrlButton';
import { deleteMediaObject, uploadMediaObject } from './actions';
import { prisma } from '@/lib/prisma';
import { listMediaObjects } from '@/lib/storage';

const PAGE_SIZE = 12;

type MediaPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const formatBytes = (bytes: number) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
};

const MediaPage = async ({ searchParams }: MediaPageProps) => {
  const params = await searchParams;
  const requestedPage = Math.max(Number(params.page || 1), 1);
  const mediaObjects = await listMediaObjects();
  const totalMediaObjects = mediaObjects.length;
  const totalPages = Math.max(Math.ceil(totalMediaObjects / PAGE_SIZE), 1);
  const currentPage = Math.min(requestedPage, totalPages);
  const paginatedMediaObjects = mediaObjects.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const paginatedMediaUrls = paginatedMediaObjects.flatMap(item => [item.url, item.thumbnailUrl]);
  const [usedProducts, usedSiteSettings, usedIdentityItems] = await Promise.all([
    prisma.product.findMany({
      where: {
        OR: [
          {
            image: {
              in: paginatedMediaUrls,
            },
          },
          {
            cardImage: {
              in: paginatedMediaUrls,
            },
          },
          {
            thumbnailImage: {
              in: paginatedMediaUrls,
            },
          },
        ],
      },
      select: {
        title: true,
        image: true,
        cardImage: true,
        thumbnailImage: true,
      },
    }),
    prisma.siteSetting.findMany({
      where: {
        value: {
          in: paginatedMediaUrls,
        },
      },
      select: {
        key: true,
        value: true,
      },
    }),
    prisma.homeIdentityItem.findMany({
      where: {
        image: {
          in: paginatedMediaUrls,
        },
      },
      select: {
        slot: true,
        title: true,
        image: true,
      },
    }),
  ]);
  const usageByImage = new Map<string, string[]>();
  const pageHref = (page: number) => `/admin/media?page=${page}`;
  const from = totalMediaObjects === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const to = Math.min(currentPage * PAGE_SIZE, totalMediaObjects);

  for (const product of usedProducts) {
    for (const imageUrl of [product.image, product.cardImage, product.thumbnailImage].filter(Boolean)) {
      const usages = usageByImage.get(imageUrl!) || [];
      usages.push(`Product: ${product.title}`);
      usageByImage.set(imageUrl!, usages);
    }
  }

  for (const setting of usedSiteSettings) {
    const usages = usageByImage.get(setting.value) || [];
    usages.push(`Setting: ${setting.key}`);
    usageByImage.set(setting.value, usages);
  }

  for (const item of usedIdentityItems) {
    const usages = usageByImage.get(item.image) || [];
    usages.push(`Identity slot ${item.slot}: ${item.title}`);
    usageByImage.set(item.image, usages);
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl font-light">Media Library</h1>
        <p className="mt-1 text-sm font-light text-shadow-black/60">
          Managed images uploaded to the storage bucket.
        </p>
      </div>

      <form action={uploadMediaObject} className="mt-8 border border-shadow-black/10 bg-white p-5">
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
          <label className="grid gap-2 text-sm font-light text-shadow-black/60">
            File Name Optional
            <input
              type="text"
              name="name"
              placeholder="banner-home or product-detail"
              className="border border-shadow-black/20 px-3 py-3 text-base text-shadow-black"
            />
          </label>

          <label className="grid gap-2 text-sm font-light text-shadow-black/60">
            Upload Image
            <input
              type="file"
              name="imageFile"
              accept="image/webp,image/jpeg,image/png"
              required
              className="border border-dashed border-shadow-black/20 px-3 py-3 text-base text-shadow-black"
            />
          </label>

          <button type="submit" className="bg-main-red px-5 py-3 text-white">
            Upload
          </button>
        </div>
        <p className="mt-3 text-xs font-light text-shadow-black/50">
          WEBP, JPG, or PNG. Max 10MB. Images are resized to 1200px and saved with a thumbnail.
        </p>
      </form>

      <div className="mt-4 text-sm font-light text-shadow-black/60">
        Showing {from}-{to} of {totalMediaObjects} images
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedMediaObjects.length === 0 && (
          <div className="border border-shadow-black/10 bg-white p-6 text-sm font-light text-shadow-black/60">
            No uploaded managed images yet.
          </div>
        )}

        {paginatedMediaObjects.map(item => {
          const usages = [...(usageByImage.get(item.url) || []), ...(usageByImage.get(item.thumbnailUrl) || [])]
            .filter((usage, index, list) => list.indexOf(usage) === index);
          const isUsed = usages.length > 0;

          return (
            <div key={item.key} className="border border-shadow-black/10 bg-white">
              <div className="relative aspect-square overflow-hidden bg-main-white">
                <Image
                  src={item.thumbnailUrl}
                  alt={item.key}
                  fill
                  sizes="(min-width: 1024px) 28vw, 90vw"
                  className="object-cover"
                />
              </div>
              <div className="grid gap-3 p-4">
                <div>
                  <div className="break-all text-sm font-light text-shadow-black">{item.key}</div>
                  <div className="mt-1 text-xs font-light text-shadow-black/50">
                    {formatBytes(item.size)}
                    {item.lastModified ? ` • ${item.lastModified.toLocaleDateString('en-CA')}` : ''}
                  </div>
                </div>

                <div className="text-xs font-light text-shadow-black/60">
                  {isUsed ? `Used by ${usages.join(', ')}` : 'Not used by any managed content'}
                </div>

                <div className="flex flex-wrap gap-2">
                  <CopyUrlButton url={item.url} />
                  <form action={deleteMediaObject}>
                    <input type="hidden" name="url" value={item.url} />
                    <ConfirmSubmitButton
                      type="submit"
                      title="Delete Media"
                      message={`Delete "${item.key}" from storage? This cannot be undone.`}
                      disabled={isUsed}
                      className="border border-main-red px-3 py-2 text-sm text-main-red disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Delete
                    </ConfirmSubmitButton>
                  </form>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <a
            href={pageHref(Math.max(currentPage - 1, 1))}
            className="border border-shadow-black/20 px-4 py-2 text-sm font-light aria-disabled:pointer-events-none aria-disabled:opacity-40"
            aria-disabled={currentPage <= 1}
          >
            Previous
          </a>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;

              return (
                <a
                  key={page}
                  href={pageHref(page)}
                  className={
                    page === currentPage
                      ? 'bg-maroon px-3 py-2 text-sm text-main-white'
                      : 'border border-shadow-black/20 px-3 py-2 text-sm font-light'
                  }
                >
                  {page}
                </a>
              );
            })}
          </div>
          <a
            href={pageHref(Math.min(currentPage + 1, totalPages))}
            className="border border-shadow-black/20 px-4 py-2 text-sm font-light aria-disabled:pointer-events-none aria-disabled:opacity-40"
            aria-disabled={currentPage >= totalPages}
          >
            Next
          </a>
        </div>
      )}
    </div>
  );
};

export default MediaPage;
