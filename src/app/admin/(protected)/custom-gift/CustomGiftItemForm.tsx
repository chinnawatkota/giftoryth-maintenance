import Link from 'next/link';
import CustomGiftItemImageField from './CustomGiftItemImageField';
import type { CustomGiftPageItem } from '@/lib/customGiftPage';

type CustomGiftItemFormProps = {
  action: (formData: FormData) => Promise<void>;
  item?: CustomGiftPageItem;
  slot: number;
  submitLabel: string;
};

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

const CustomGiftItemForm = ({ action, item, slot, submitLabel }: CustomGiftItemFormProps) => (
  <form action={action} className="grid gap-5 border border-shadow-black/10 bg-white p-5">
    {item && <input type="hidden" name="originalSlot" value={item.slot} />}

    <div className="grid gap-4 md:grid-cols-[1fr_180px]">
      <label className="grid gap-2">
        <span className={labelClass}>Title / Alt Text Optional</span>
        <input name="title" defaultValue={item?.title ?? ''} className={inputClass} />
      </label>
      <label className="grid gap-2">
        <span className={labelClass}>Sort Order</span>
        <input name="slot" type="number" min={1} defaultValue={slot} required className={inputClass} />
      </label>
    </div>

    <CustomGiftItemImageField
      image={item?.image ?? ''}
      title={item?.title || 'Custom gift item'}
      inputClass={inputClass}
      labelClass={labelClass}
    />

    <label className="grid gap-2">
      <span className={labelClass}>Object Position</span>
      <select name="imageClassName" defaultValue={item?.imageClassName ?? '__default__'} className={inputClass}>
        {objectPositionOptions.map(option => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>

    <label className="flex items-center gap-2 text-sm font-light">
      <input name="isPublished" type="checkbox" defaultChecked={item?.isPublished ?? true} />
      Published
    </label>

    <div className="flex gap-3">
      <button type="submit" className="bg-maroon px-4 py-2 text-sm font-light text-main-white">
        {submitLabel}
      </button>
      <Link href="/admin/custom-gift" className="border border-shadow-black/20 px-4 py-2 text-sm font-light">
        Cancel
      </Link>
    </div>
  </form>
);

export default CustomGiftItemForm;

