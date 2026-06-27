import Link from 'next/link';
import ContactSettingsForm from './ContactSettingsForm';
import { updateContactSettings } from './actions';
import { getContactSettings } from '@/lib/siteSettings';

const inputClass = 'w-full border border-shadow-black/20 px-3 py-2 text-sm outline-none focus:border-maroon';
const labelClass = 'text-sm font-light text-shadow-black/70';

const AdminContactPage = async () => {
  const settings = await getContactSettings();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-light">Contact Page</h1>
          <p className="mt-1 text-sm font-light text-shadow-black/60">
            Manage the logo, feature image, and Line QR shown on the Contact page.
          </p>
        </div>
        <Link href="/contact" target="_blank" className="border border-shadow-black/20 px-4 py-2 text-sm font-light">
          View Contact
        </Link>
      </div>

      <ContactSettingsForm
        action={updateContactSettings}
        settings={settings}
        inputClass={inputClass}
        labelClass={labelClass}
      />
    </div>
  );
};

export default AdminContactPage;
