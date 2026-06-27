import Link from 'next/link';
import { updateHomeSettings } from './actions';
import HomeCoverImageField from './HomeCoverImageField';
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
        <HomeCoverImageField defaultImage={coverImage} inputClass={inputClass} labelClass={labelClass} />

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
