import Image from 'next/image';
import Link from 'next/link';
import { updateHomeSettings } from './actions';
import { getHomeCoverImage } from '@/lib/siteSettings';

const inputClass = 'w-full border border-shadow-black/20 px-3 py-2 text-sm outline-none focus:border-maroon';
const labelClass = 'text-sm font-light text-shadow-black/70';

const AdminHomePage = async () => {
  const coverImage = await getHomeCoverImage();

  return (
    <div>
      <div>
        <h1 className="text-2xl font-light">Home Page</h1>
        <p className="mt-1 text-sm font-light text-shadow-black/60">
          Manage images shown on the storefront home page.
        </p>
      </div>

      <form action={updateHomeSettings} className="mt-8 grid gap-5 border border-shadow-black/10 bg-white p-5">
        <div className="grid gap-4 md:grid-cols-[320px_1fr]">
          <div className="grid gap-2">
            <span className={labelClass}>Cover Preview</span>
            <div className="relative aspect-[16/9] overflow-hidden border border-shadow-black/10 bg-main-white">
              <Image src={coverImage} alt="Home cover preview" fill sizes="320px" className="object-cover" />
            </div>
          </div>

          <div className="grid gap-5">
            <label className="grid gap-2">
              <span className={labelClass}>Cover Image URL</span>
              <input name="coverImage" defaultValue={coverImage} required className={inputClass} />
            </label>

            <label className="grid gap-2">
              <span className={labelClass}>Upload Cover Image Optional</span>
              <input
                name="imageFile"
                type="file"
                accept="image/webp,image/jpeg,image/png"
                className="w-full border border-dashed border-shadow-black/20 px-3 py-3 text-sm file:mr-4 file:border-0 file:bg-maroon file:px-4 file:py-2 file:text-main-white"
              />
              <span className="text-xs font-light text-shadow-black/50">
                WEBP, JPG, or PNG. Max 10MB. Saved as WEBP up to 1920px wide.
              </span>
              <Link href="/admin/media" target="_blank" className="text-xs font-light text-maroon underline-offset-4 hover:underline">
                Open media library
              </Link>
            </label>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="bg-maroon px-4 py-2 text-sm font-light text-main-white">
            Save Home Page
          </button>
          <Link href="/" target="_blank" className="border border-shadow-black/20 px-4 py-2 text-sm font-light">
            View Home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AdminHomePage;

