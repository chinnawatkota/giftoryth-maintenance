import CustomGiftItemImageField from './CustomGiftItemImageField';
import { updateCustomGiftItem } from './actions';
import { getCustomGiftPageItems } from '@/lib/customGiftPage';

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

const AdminCustomGiftPage = async () => {
  const items = await getCustomGiftPageItems({ includeHidden: true });

  return (
    <div>
      <div>
        <h1 className="text-2xl font-light">Custom Gift Page</h1>
        <p className="mt-1 text-sm font-light text-shadow-black/60">
          Manage the fixed image slots shown on the Custom Gift storefront page.
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {items.map(item => (
          <form key={item.slot} action={updateCustomGiftItem} className="grid gap-4 border border-shadow-black/10 bg-white p-5">
            <input type="hidden" name="slot" value={item.slot} />

            <div>
              <div className="text-sm font-light text-maroon">Slot {item.slot}</div>
              <div className="mt-1 break-words text-xs font-light text-shadow-black/50">
                Layout: {item.className || 'default'}
              </div>
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
              Save Slot
            </button>
          </form>
        ))}
      </div>
    </div>
  );
};

export default AdminCustomGiftPage;

