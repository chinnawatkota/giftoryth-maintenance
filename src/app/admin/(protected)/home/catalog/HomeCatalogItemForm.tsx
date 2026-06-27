import Link from 'next/link';
import HomeCatalogImageField from './HomeCatalogImageField';
import type { HomeCatalogItem } from '@/lib/homeCatalog';

type HomeCatalogItemFormProps = {
  action: (formData: FormData) => Promise<void>;
  item?: HomeCatalogItem;
  slot: number;
  submitLabel: string;
};

const inputClass = 'w-full border border-shadow-black/20 px-3 py-2 text-sm outline-none focus:border-maroon';
const labelClass = 'text-sm font-light text-shadow-black/70';

const HomeCatalogItemForm = ({ action, item, slot, submitLabel }: HomeCatalogItemFormProps) => (
  <form action={action} className="grid gap-5 border border-shadow-black/10 bg-white p-5">
    {item && <input type="hidden" name="originalSlot" value={item.slot} />}

    <div className="grid gap-4 md:grid-cols-[1fr_180px]">
      <label className="grid gap-2">
        <span className={labelClass}>Title</span>
        <input name="title" defaultValue={item?.title ?? ''} required className={inputClass} />
      </label>
      <label className="grid gap-2">
        <span className={labelClass}>Sort Order</span>
        <input name="slot" type="number" min={1} defaultValue={slot} required className={inputClass} />
      </label>
    </div>

    <label className="grid gap-2">
      <span className={labelClass}>Link URL</span>
      <input name="url" defaultValue={item?.url ?? ''} required className={inputClass} />
    </label>

    <HomeCatalogImageField
      image={item?.image ?? ''}
      title={item?.title || 'Home catalog item'}
      inputClass={inputClass}
      labelClass={labelClass}
    />

    <label className="flex items-center gap-2 text-sm font-light">
      <input name="isPublished" type="checkbox" defaultChecked={item?.isPublished ?? true} />
      Published
    </label>

    <div className="flex gap-3">
      <button type="submit" className="bg-maroon px-4 py-2 text-sm font-light text-main-white">
        {submitLabel}
      </button>
      <Link href="/admin/home/catalog" className="border border-shadow-black/20 px-4 py-2 text-sm font-light">
        Cancel
      </Link>
    </div>
  </form>
);

export default HomeCatalogItemForm;

