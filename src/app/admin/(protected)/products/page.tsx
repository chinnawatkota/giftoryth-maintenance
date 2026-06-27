import Image from 'next/image';
import Link from 'next/link';
import { deleteProduct, toggleProductPublished } from './actions';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/utils/string';

const ProductsPage = async () => {
  const products = await prisma.product.findMany({
    orderBy: [{ category: { sortOrder: 'asc' } }, { sortOrder: 'asc' }, { title: 'asc' }],
    include: { category: true },
  });

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
            {products.map(product => (
              <tr key={product.id} className="border-b border-shadow-black/10 last:border-b-0">
                <td className="px-4 py-3">
                  <div className="relative size-16 overflow-hidden bg-main-white">
                    <Image src={product.image} alt={product.title} fill sizes="64px" className="object-cover" />
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
                      <button type="submit" className="border border-main-red px-3 py-2 text-main-red">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsPage;
