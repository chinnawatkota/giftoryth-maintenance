import Link from 'next/link';
import IdentityImageField from './IdentityImageField';
import { updateHomeIdentityItem } from './actions';
import { getHomeIdentityItems } from '@/lib/homeIdentity';

const inputClass = 'w-full border border-shadow-black/20 px-3 py-2 text-sm outline-none focus:border-maroon';
const labelClass = 'text-sm font-light text-shadow-black/70';
const objectPositionOptions = [
  { label: 'Center', value: '' },
  { label: 'Left', value: 'object-left' },
  { label: 'Right', value: 'object-right' },
  { label: 'Top', value: 'object-top' },
  { label: 'Bottom', value: 'object-bottom' },
];

const HomeIdentityPage = async () => {
  const items = await getHomeIdentityItems({ includeHidden: true });

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-light">Special Identity Service</h1>
          <p className="mt-1 text-sm font-light text-shadow-black/60">
            Manage the 8 fixed image slots used on the home page.
          </p>
        </div>
        <Link href="/admin/home" className="border border-shadow-black/20 px-4 py-2 text-sm font-light">
          Back to Home
        </Link>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {items.map(item => (
          <form key={item.slot} action={updateHomeIdentityItem} className="grid gap-4 border border-shadow-black/10 bg-white p-5">
            <input type="hidden" name="slot" value={item.slot} />

            <div>
              <div className="text-sm font-light text-maroon">Slot {item.slot}</div>
              <div className="mt-1 text-xs font-light text-shadow-black/50">
                Layout: {item.desktopGrid}
              </div>
            </div>

            <IdentityImageField image={item.image} title={item.title} inputClass={inputClass} labelClass={labelClass} />

            <label className="grid gap-2">
              <span className={labelClass}>Title / Alt Text</span>
              <input name="title" defaultValue={item.title} required className={inputClass} />
            </label>

            <label className="grid gap-2">
              <span className={labelClass}>Object Position</span>
              <select name="imageClassName" defaultValue={item.imageClassName || ''} className={inputClass}>
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
              Save Slot
            </button>
          </form>
        ))}
      </div>
    </div>
  );
};

export default HomeIdentityPage;

