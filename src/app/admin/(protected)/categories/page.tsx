import { createCategory, deleteCategory, updateCategory } from './actions';
import { prisma } from '@/lib/prisma';

const inputClass = 'w-full border border-shadow-black/20 px-3 py-2 text-sm outline-none focus:border-maroon';

const CategoriesPage = async () => {
  const categories = await prisma.category.findMany({
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    include: {
      _count: {
        select: { products: true },
      },
    },
  });

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-light">Categories</h1>
          <p className="mt-1 text-sm font-light text-shadow-black/60">Manage product sections.</p>
        </div>
      </div>

      <form action={createCategory} className="mt-8 grid gap-3 border border-shadow-black/10 bg-white p-4 md:grid-cols-[1fr_1fr_120px_auto]">
        <input name="slug" placeholder="slug" required className={inputClass} />
        <input name="name" placeholder="name" required className={inputClass} />
        <input name="sortOrder" type="number" placeholder="sort" defaultValue={0} className={inputClass} />
        <button type="submit" className="bg-maroon px-4 py-2 text-sm font-light text-main-white">
          Create
        </button>
      </form>

      <div className="mt-8 overflow-x-auto border border-shadow-black/10 bg-white">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-shadow-black/10 bg-main-white">
            <tr>
              <th className="px-4 py-3 font-light">Slug</th>
              <th className="px-4 py-3 font-light">Name</th>
              <th className="px-4 py-3 font-light">Sort</th>
              <th className="px-4 py-3 font-light">Products</th>
              <th className="px-4 py-3 font-light">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category.id} className="border-b border-shadow-black/10 last:border-b-0">
                <td className="px-4 py-3">
                  <form id={`category-${category.id}`} action={updateCategory}>
                    <input type="hidden" name="id" value={category.id} />
                    <input name="slug" defaultValue={category.slug} required className={inputClass} />
                  </form>
                </td>
                <td className="px-4 py-3">
                  <input form={`category-${category.id}`} name="name" defaultValue={category.name} required className={inputClass} />
                </td>
                <td className="px-4 py-3">
                  <input form={`category-${category.id}`} name="sortOrder" type="number" defaultValue={category.sortOrder} className={inputClass} />
                </td>
                <td className="px-4 py-3 font-light">{category._count.products}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button form={`category-${category.id}`} type="submit" className="border border-maroon px-3 py-2 text-sm text-maroon">
                      Save
                    </button>
                    <form action={deleteCategory}>
                      <input type="hidden" name="id" value={category.id} />
                      <button
                        type="submit"
                        disabled={category._count.products > 0}
                        className="border border-main-red px-3 py-2 text-sm text-main-red disabled:cursor-not-allowed disabled:opacity-40"
                      >
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

export default CategoriesPage;
