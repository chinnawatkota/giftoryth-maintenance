import type { Prisma } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { deleteProduct, toggleProductPublished } from './actions';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/utils/string';
import ConfirmSubmitButton from '../_components/ConfirmSubmitButton';

const PAGE_SIZE = 12;

type ProductsPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    status?: string;
    page?: string;
  }>;
};

const inputClass = 'border border-shadow-black/20 px-3 py-2 text-sm outline-none focus:border-maroon';

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const params = await searchParams;
  const q = params.q?.trim() || '';
  const category = params.category || '';
  const status = params.status || '';
  const currentPage = Math.max(Number(params.page || 1), 1);

  const where: Prisma.ProductWhereInput = {
    ...(q
      ? {
          OR: [
            { title: { contains: q, mode: 'insensitive' } },
            { slug: { contains: q, mode: 'insensitive' } },
          ],
        }
      : {}),
    ...(category ? { categoryId: category } : {}),
    ...(status === 'published' ? { isPublished: true } : {}),
    ...(status === 'unpublished' ? { isPublished: false } : {}),
    ...(status === 'best-seller' ? { isBestSeller: true } : {}),
  };

  const [products, categories, totalProducts] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: [{ category: { sortOrder: 'asc' } }, { sortOrder: 'asc' }, { title: 'asc' }],
      include: { category: true },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.category.findMany({
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    }),
    prisma.product.count({ where }),
  ]);
  const totalPages = Math.max(Math.ceil(totalProducts / PAGE_SIZE), 1);

  const pageHref = (page: number) => {
    const nextParams = new URLSearchParams();

    if (q) nextParams.set('q', q);
    if (category) nextParams.set('category', category);
    if (status) nextParams.set('status', status);
    nextParams.set('page', String(page));

    return `/admin/products?${nextParams.toString()}`;
  };

  const from = totalProducts === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const to = Math.min(currentPage * PAGE_SIZE, totalProducts);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-light">Products</h1>
          <p className="mt-1 text-sm font-light text-shadow-black/60">Manage basket catalog items.</p>
        </div>
        <Link href="/admin/products/new" className="bg-maroon px-4 py-2 text-sm font-light text-main-white">
          New Product
        </Link>
      </div>

      <form className="mt-8 grid gap-3 border border-shadow-black/10 bg-white p-4 md:grid-cols-[1fr_220px_180px_auto_auto]">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search title or slug"
          className={inputClass}
        />
        <select name="category" defaultValue={category} className={inputClass}>
          <option value="">All categories</option>
          {categories.map(item => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <select name="status" defaultValue={status} className={inputClass}>
          <option value="">All status</option>
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
          <option value="best-seller">Best seller</option>
        </select>
        <button type="submit" className="bg-maroon px-4 py-2 text-sm font-light text-main-white">
          Filter
        </button>
        <Link href="/admin/products" className="border border-shadow-black/20 px-4 py-2 text-center text-sm font-light">
          Reset
        </Link>
      </form>

      <div className="mt-4 text-sm font-light text-shadow-black/60">
        Showing {from}-{to} of {totalProducts} products
      </div>

      <div className="mt-8 overflow-x-auto border border-shadow-black/10 bg-white">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="border-b border-shadow-black/10 bg-main-white">
            <tr>
              <th className="px-4 py-3 font-light">Image</th>
              <th className="px-4 py-3 font-light">Product</th>
              <th className="px-4 py-3 font-light">Category</th>
              <th className="px-4 py-3 font-light">Price</th>
              <th className="px-4 py-3 font-light">Sort</th>
              <th className="px-4 py-3 font-light">Status</th>
              <th className="px-4 py-3 font-light">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center font-light text-shadow-black/60">
                  No products found.
                </td>
              </tr>
            )}
            {products.map(product => (
              <tr key={product.id} className="border-b border-shadow-black/10 last:border-b-0">
                <td className="px-4 py-3">
                  <div className="relative size-16 overflow-hidden bg-main-white">
                    <Image
                      src={product.thumbnailImage || product.image}
                      alt={product.title}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-light">{product.title}</div>
                  <div className="mt-1 text-xs text-shadow-black/50">{product.slug}</div>
                </td>
                <td className="px-4 py-3 font-light">{product.category.name}</td>
                <td className="px-4 py-3 font-light">{product.price ? `฿ ${formatPrice(product.price)}` : '-'}</td>
                <td className="px-4 py-3 font-light">{product.sortOrder}</td>
                <td className="px-4 py-3">
                  <form action={toggleProductPublished}>
                    <input type="hidden" name="id" value={product.id} />
                    <input type="hidden" name="isPublished" value={product.isPublished ? '' : 'on'} />
                    <button
                      type="submit"
                      className={product.isPublished ? 'text-maroon' : 'text-shadow-black/40'}
                    >
                      {product.isPublished ? 'Published' : 'Unpublished'}
                    </button>
                  </form>
                  {product.isBestSeller && <div className="mt-1 text-xs text-main-red">Best seller</div>}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link href={`/admin/products/${product.id}/edit`} className="border border-maroon px-3 py-2 text-maroon">
                      Edit
                    </Link>
                    <form action={deleteProduct}>
                      <input type="hidden" name="id" value={product.id} />
                      <ConfirmSubmitButton
                        type="submit"
                        message={`Delete "${product.title}"? This cannot be undone.`}
                        className="border border-main-red px-3 py-2 text-main-red"
                      >
                        Delete
                      </ConfirmSubmitButton>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={pageHref(Math.max(currentPage - 1, 1))}
            className="border border-shadow-black/20 px-4 py-2 text-sm font-light aria-disabled:pointer-events-none aria-disabled:opacity-40"
            aria-disabled={currentPage <= 1}
          >
            Previous
          </Link>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;

              return (
                <Link
                  key={page}
                  href={pageHref(page)}
                  className={
                    page === currentPage
                      ? 'bg-maroon px-3 py-2 text-sm text-main-white'
                      : 'border border-shadow-black/20 px-3 py-2 text-sm font-light'
                  }
                >
                  {page}
                </Link>
              );
            })}
          </div>
          <Link
            href={pageHref(Math.min(currentPage + 1, totalPages))}
            className="border border-shadow-black/20 px-4 py-2 text-sm font-light aria-disabled:pointer-events-none aria-disabled:opacity-40"
            aria-disabled={currentPage >= totalPages}
          >
            Next
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
