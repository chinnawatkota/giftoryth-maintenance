import Image from 'next/image';
import Link from 'next/link';
import ConfirmSubmitButton from '../../_components/ConfirmSubmitButton';
import { deleteHomeCatalogItem } from './actions';
import { getHomeCatalogItems } from '@/lib/homeCatalog';

const PAGE_SIZE = 12;

type AdminHomeCatalogPageProps = {
  searchParams: Promise<{
    q?: string;
    status?: string;
    page?: string;
  }>;
};

const inputClass = 'border border-shadow-black/20 px-3 py-2 text-sm outline-none focus:border-maroon';

const AdminHomeCatalogPage = async ({ searchParams }: AdminHomeCatalogPageProps) => {
  const params = await searchParams;
  const q = params.q?.trim().toLowerCase() || '';
  const status = params.status || '';
  const currentPage = Math.max(Number(params.page || 1), 1);
  const items = await getHomeCatalogItems({ includeHidden: true });
  const filteredItems = items.filter(item => {
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.url.toLowerCase().includes(q) ||
      String(item.slot).includes(q);
    const matchesStatus =
      !status ||
      (status === 'published' && item.isPublished) ||
      (status === 'unpublished' && !item.isPublished);

    return matchesSearch && matchesStatus;
  });
  const totalItems = filteredItems.length;
  const totalPages = Math.max(Math.ceil(totalItems / PAGE_SIZE), 1);
  const paginatedItems = filteredItems.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const from = totalItems === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const to = Math.min(currentPage * PAGE_SIZE, totalItems);

  const pageHref = (page: number) => {
    const nextParams = new URLSearchParams();

    if (q) nextParams.set('q', q);
    if (status) nextParams.set('status', status);
    nextParams.set('page', String(page));

    return `/admin/home/catalog?${nextParams.toString()}`;
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-light">Home Catalog</h1>
          <p className="mt-1 text-sm font-light text-shadow-black/60">
            Manage catalog cards shown on the home page.
          </p>
        </div>
        <Link href="/admin/home/catalog/new" className="bg-maroon px-4 py-2 text-sm font-light text-main-white">
          New Item
        </Link>
      </div>

      <form className="mt-8 grid gap-3 border border-shadow-black/10 bg-white p-4 md:grid-cols-[1fr_180px_auto_auto]">
        <input name="q" defaultValue={q} placeholder="Search title or URL" className={inputClass} />
        <select name="status" defaultValue={status} className={inputClass}>
          <option value="">All status</option>
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
        </select>
        <button type="submit" className="bg-maroon px-4 py-2 text-sm font-light text-main-white">
          Filter
        </button>
        <Link href="/admin/home/catalog" className="border border-shadow-black/20 px-4 py-2 text-center text-sm font-light">
          Reset
        </Link>
      </form>

      <div className="mt-4 text-sm font-light text-shadow-black/60">
        Showing {from}-{to} of {totalItems} items
      </div>

      <div className="mt-8 overflow-x-auto border border-shadow-black/10 bg-white">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="border-b border-shadow-black/10 bg-main-white">
            <tr>
              <th className="px-4 py-3 font-light">Image</th>
              <th className="px-4 py-3 font-light">Title</th>
              <th className="px-4 py-3 font-light">Link</th>
              <th className="px-4 py-3 font-light">Sort</th>
              <th className="px-4 py-3 font-light">Status</th>
              <th className="px-4 py-3 font-light">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center font-light text-shadow-black/60">
                  No home catalog items found.
                </td>
              </tr>
            )}
            {paginatedItems.map(item => (
              <tr key={`${item.slot}-${item.image}`} className="border-b border-shadow-black/10 last:border-b-0">
                <td className="px-4 py-3">
                  <div className="relative size-16 overflow-hidden bg-main-white">
                    <Image src={item.image} alt={item.title} fill sizes="64px" className="object-cover" />
                  </div>
                </td>
                <td className="px-4 py-3 font-light">{item.title}</td>
                <td className="px-4 py-3 text-xs font-light text-shadow-black/60">{item.url}</td>
                <td className="px-4 py-3 font-light">{item.slot}</td>
                <td className="px-4 py-3">
                  <div className={item.isPublished ? 'text-maroon' : 'text-shadow-black/40'}>
                    {item.isPublished ? 'Published' : 'Unpublished'}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link href={`/admin/home/catalog/${item.slot}/edit`} className="border border-maroon px-3 py-2 text-maroon">
                      Edit
                    </Link>
                    <form action={deleteHomeCatalogItem}>
                      <input type="hidden" name="slot" value={item.slot} />
                      <ConfirmSubmitButton
                        type="submit"
                        message={`Delete "${item.title}" from the home catalog?`}
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

export default AdminHomeCatalogPage;

