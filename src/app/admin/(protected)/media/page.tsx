import Image from 'next/image';
import ConfirmSubmitButton from '../_components/ConfirmSubmitButton';
import CopyUrlButton from './CopyUrlButton';
import { deleteMediaObject } from './actions';
import { prisma } from '@/lib/prisma';
import { listMediaObjects } from '@/lib/storage';

const formatBytes = (bytes: number) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
};

const MediaPage = async () => {
  const mediaObjects = await listMediaObjects();
  const usedProducts = await prisma.product.findMany({
    where: {
      OR: [
        {
          image: {
            in: mediaObjects.map(item => item.url),
          },
        },
        {
          thumbnailImage: {
            in: mediaObjects.map(item => item.url),
          },
        },
      ],
    },
    select: {
      id: true,
      title: true,
      image: true,
      thumbnailImage: true,
    },
  });
  const productsByImage = new Map<string, typeof usedProducts>();

  for (const product of usedProducts) {
    for (const imageUrl of [product.image, product.thumbnailImage].filter(Boolean)) {
      const products = productsByImage.get(imageUrl!) || [];
      products.push(product);
      productsByImage.set(imageUrl!, products);
    }
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl font-light">Media Library</h1>
        <p className="mt-1 text-sm font-light text-shadow-black/60">
          Product images uploaded to the managed storage bucket.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mediaObjects.length === 0 && (
          <div className="border border-shadow-black/10 bg-white p-6 text-sm font-light text-shadow-black/60">
            No uploaded product images yet.
          </div>
        )}

        {mediaObjects.map(item => {
          const products = productsByImage.get(item.url) || [];
          const isUsed = products.length > 0;

          return (
            <div key={item.key} className="border border-shadow-black/10 bg-white">
              <div className="relative aspect-square overflow-hidden bg-main-white">
                <Image src={item.url} alt={item.key} fill sizes="(min-width: 1024px) 28vw, 90vw" className="object-cover" />
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
                  {isUsed
                    ? `Used by ${products.map(product => product.title).join(', ')}`
                    : 'Not used by any product'}
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
    </div>
  );
};

export default MediaPage;
