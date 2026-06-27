import Link from 'next/link';
import AboutSettingsForm from './AboutSettingsForm';
import { updateAboutSettings } from './actions';
import { getAboutSettings } from '@/lib/siteSettings';

const inputClass = 'w-full border border-shadow-black/20 px-3 py-2 text-sm outline-none focus:border-maroon';
const labelClass = 'text-sm font-light text-shadow-black/70';

const AdminAboutPage = async () => {
  const settings = await getAboutSettings();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-light">About Page</h1>
          <p className="mt-1 text-sm font-light text-shadow-black/60">
            Manage the two images shown on the About page.
          </p>
        </div>
        <Link href="/about" target="_blank" className="border border-shadow-black/20 px-4 py-2 text-sm font-light">
          View About
        </Link>
      </div>

      <AboutSettingsForm
        action={updateAboutSettings}
        settings={settings}
        inputClass={inputClass}
        labelClass={labelClass}
      />
    </div>
  );
};

export default AdminAboutPage;

