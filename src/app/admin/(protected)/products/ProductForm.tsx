import type { Category, Product } from '@prisma/client';
import Link from 'next/link';

type ProductFormProps = {
  action: (formData: FormData) => Promise<void>;
  categories: Category[];
  product?: Product;
  submitLabel: string;
};

const inputClass = 'w-full border border-shadow-black/20 px-3 py-2 text-sm outline-none focus:border-maroon';
const labelClass = 'text-sm font-light text-shadow-black/70';

const ProductForm = ({ action, categories, product, submitLabel }: ProductFormProps) => (
  <form action={action} className="grid gap-5 border border-shadow-black/10 bg-white p-5">
    {product && <input type="hidden" name="id" value={product.id} />}

    <div className="grid gap-4 md:grid-cols-2">
      <label className="grid gap-2">
        <span className={labelClass}>Slug</span>
        <input name="slug" defaultValue={product?.slug} required className={inputClass} />
      </label>
      <label className="grid gap-2">
        <span className={labelClass}>Title</span>
        <input name="title" defaultValue={product?.title} required className={inputClass} />
      </label>
    </div>

    <div className="grid gap-4 md:grid-cols-[1fr_1fr_1fr]">
      <label className="grid gap-2">
        <span className={labelClass}>Price</span>
        <input name="price" type="number" defaultValue={product?.price ?? ''} className={inputClass} />
      </label>
      <label className="grid gap-2">
        <span className={labelClass}>Category</span>
        <select name="categoryId" defaultValue={product?.categoryId} required className={inputClass}>
          <option value="">Select category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-2">
        <span className={labelClass}>Sort Order</span>
        <input name="sortOrder" type="number" defaultValue={product?.sortOrder ?? 0} className={inputClass} />
      </label>
    </div>

    <label className="grid gap-2">
      <span className={labelClass}>Image URL</span>
      <input name="image" defaultValue={product?.image} className={inputClass} />
    </label>

    <label className="grid gap-2">
      <span className={labelClass}>Upload Image Optional</span>
      <input
        name="imageFile"
        type="file"
        accept="image/webp,image/jpeg,image/png"
        className="w-full border border-dashed border-shadow-black/20 px-3 py-3 text-sm file:mr-4 file:border-0 file:bg-maroon file:px-4 file:py-2 file:text-main-white"
      />
      <span className="text-xs font-light text-shadow-black/50">
        WEBP, JPG, or PNG. Max 5MB. Uploaded image replaces the Image URL on save.
      </span>
    </label>

    <label className="grid gap-2">
      <span className={labelClass}>Image CSS Class Optional</span>
      <input name="imageClassName" defaultValue={product?.imageClassName ?? ''} className={inputClass} />
    </label>

    <label className="grid gap-2">
      <span className={labelClass}>Details One Bullet Per Line</span>
      <textarea
        name="details"
        defaultValue={product?.details}
        rows={10}
        className={`${inputClass} resize-y leading-relaxed`}
      />
    </label>

    <div className="flex flex-wrap gap-6">
      <label className="flex items-center gap-2 text-sm font-light">
        <input name="isPublished" type="checkbox" defaultChecked={product?.isPublished ?? true} />
        Published
      </label>
      <label className="flex items-center gap-2 text-sm font-light">
        <input name="isBestSeller" type="checkbox" defaultChecked={product?.isBestSeller ?? false} />
        Best Seller
      </label>
    </div>

    <div className="flex gap-3">
      <button type="submit" className="bg-maroon px-4 py-2 text-sm font-light text-main-white">
        {submitLabel}
      </button>
      <Link href="/admin/products" className="border border-shadow-black/20 px-4 py-2 text-sm font-light">
        Cancel
      </Link>
    </div>
  </form>
);

export default ProductForm;
