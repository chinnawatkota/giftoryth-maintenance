import ConfirmSubmitButton from '../_components/ConfirmSubmitButton';
import CustomGiftItemImageField from './CustomGiftItemImageField';
import { createCustomGiftItem, deleteCustomGiftItem, updateCustomGiftItem } from './actions';
import { getCustomGiftPageItems, getNextCustomGiftSlot } from '@/lib/customGiftPage';

const PAGE_SIZE = 8;
const inputClass = 'w-full border border-shadow-black/20 px-3 py-2 text-sm outline-none focus:border-maroon';
const labelClass = 'text-sm font-light text-shadow-black/70';
const objectPositionOptions = [
  { label: 'Keep Default', value: '__default__' },
  { label: 'Center', value: '' },
  { label: 'Left', value: 'object-left' },
  { label: 'Right', value: 'object-right' },
  { label: 'Top', value: 'object-top' },
  { label: 'Bottom', value: 'object-bottom' },
];

type AdminCustomGiftPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const AdminCustomGiftPage = async ({ searchParams }: AdminCustomGiftPageProps) => {
  const params = await searchParams;
  const requestedPage = Math.max(Number(params.page || 1), 1);
  const [items, nextSlot] = await Promise.all([
    getCustomGiftPageItems({ includeHidden: true }),
    getNextCustomGiftSlot(),
  ]);
  const featuredItem = items.find(item => item.slot === 1);
  const listItems = items.filter(item => item.slot !== 1);
  const totalListItems = listItems.length;
  const totalPages = Math.max(Math.ceil(totalListItems / PAGE_SIZE), 1);
  const currentPage = Math.min(requestedPage, totalPages);
  const paginatedListItems = listItems.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const from = totalListItems === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const to = Math.min(currentPage * PAGE_SIZE, totalListItems);
  const pageHref = (page: number) => `/admin/custom-gift?page=${page}`;

  return (
    <div>
      <div>
        <h1 className="text-2xl font-light">Custom Gift Page</h1>
        <p className="mt-1 text-sm font-light text-shadow-black/60">
          Manage the fixed featured slot and the list items shown on the Custom Gift storefront page.
        </p>
      </div>

      {featuredItem && (
        <div className="mt-8">
          <h2 className="text-xl font-light">Featured Slot</h2>
          <div className="mt-4 max-w-3xl">
            <form action={updateCustomGiftItem} className="grid gap-4 border border-shadow-black/10 bg-white p-5">
              <input type="hidden" name="slot" value={featuredItem.slot} />

              <div>
                <div className="text-sm font-light text-maroon">Slot {featuredItem.slot}</div>
                <div className="mt-1 break-words text-xs font-light text-shadow-black/50">
                  Layout: {featuredItem.className || 'default'}
                </div>
              </div>

              <CustomGiftItemImageField image={featuredItem.image} title={featuredItem.title} inputClass={inputClass} labelClass={labelClass} />

              <label className="grid gap-2">
                <span className={labelClass}>Title / Alt Text Optional</span>
                <input name="title" defaultValue={featuredItem.title} className={inputClass} />
              </label>

              <label className="grid gap-2">
                <span className={labelClass}>Object Position</span>
                <select name="imageClassName" defaultValue={featuredItem.imageClassName ?? '__default__'} className={inputClass}>
                  {objectPositionOptions.map(option => (
                    <option key={option.label} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex items-center gap-2 text-sm font-light">
                <input name="isPublished" type="checkbox" defaultChecked={featuredItem.isPublished} />
                Published
              </label>

              <button type="submit" className="w-fit bg-maroon px-4 py-2 text-sm font-light text-main-white">
                Save Featured Slot
              </button>
            </form>
          </div>
        </div>
      )}

      <form action={createCustomGiftItem} className="mt-8 grid gap-4 border border-shadow-black/10 bg-white p-5">
        <div>
          <h2 className="text-xl font-light">Add List Item</h2>
          <p className="mt-1 text-sm font-light text-shadow-black/60">
            New items are added to the regular Custom Gift grid after the featured slot.
          </p>
        </div>
        <input type="hidden" name="slot" value={nextSlot} />
        <CustomGiftItemImageField image="" title="New custom gift item" inputClass={inputClass} labelClass={labelClass} />
        <label className="grid gap-2">
          <span className={labelClass}>Title / Alt Text Optional</span>
          <input name="title" className={inputClass} />
        </label>
        <button type="submit" className="w-fit bg-maroon px-4 py-2 text-sm font-light text-main-white">
          Add Item
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-light">List Items</h2>
        <div className="mt-3 text-sm font-light text-shadow-black/60">
          Showing {from}-{to} of {totalListItems} items
        </div>
        <div className="mt-4 grid gap-5 lg:grid-cols-2">
          {paginatedListItems.map(item => (
            <div key={item.slot} className="grid gap-4 border border-shadow-black/10 bg-white p-5">
              <form action={updateCustomGiftItem} className="grid gap-4">
                <input type="hidden" name="slot" value={item.slot} />

                <div>
                  <div className="text-sm font-light text-maroon">Item {item.slot}</div>
                </div>

                <CustomGiftItemImageField image={item.image} title={item.title} inputClass={inputClass} labelClass={labelClass} />

                <label className="grid gap-2">
                  <span className={labelClass}>Title / Alt Text Optional</span>
                  <input name="title" defaultValue={item.title} className={inputClass} />
                </label>

                <label className="grid gap-2">
                  <span className={labelClass}>Object Position</span>
                  <select name="imageClassName" defaultValue={item.imageClassName ?? '__default__'} className={inputClass}>
                    {objectPositionOptions.map(option => (
                      <option key={option.label} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex items-center gap-2 text-sm font-light">
                  <input name="isPublished" type="checkbox" defaultChecked={item.isPublished} />
                  Published
                </label>

                <button type="submit" className="w-fit bg-maroon px-4 py-2 text-sm font-light text-main-white">
                  Save Item
                </button>
              </form>

              <form action={deleteCustomGiftItem}>
                <input type="hidden" name="slot" value={item.slot} />
                <ConfirmSubmitButton
                  type="submit"
                  message="Remove this Custom Gift item from the storefront?"
                  className="border border-main-red px-4 py-2 text-sm text-main-red"
                >
                  Delete
                </ConfirmSubmitButton>
              </form>
            </div>
          ))}
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
    </div>
  );
};

export default AdminCustomGiftPage;
