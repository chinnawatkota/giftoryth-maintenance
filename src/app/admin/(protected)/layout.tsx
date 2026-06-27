import Link from 'next/link';
import { logoutAdmin } from '../actions';
import { requireAdmin } from '@/lib/adminAuth';

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  await requireAdmin();

  return (
    <main className="min-h-dvh bg-main-white text-shadow-black">
      <header className="border-b border-shadow-black/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/admin/products" className="text-lg font-light">
            Giftoryth Admin
          </Link>
          <nav className="flex items-center gap-4 text-sm font-light">
            <Link href="/admin/home" className="hover:text-maroon">
              Home
            </Link>
            <Link href="/admin/home/identity" className="hover:text-maroon">
              Identity
            </Link>
            <Link href="/admin/home/catalog" className="hover:text-maroon">
              Home Catalog
            </Link>
            <Link href="/admin/about" className="hover:text-maroon">
              About
            </Link>
            <Link href="/admin/custom-gift" className="hover:text-maroon">
              Custom Gift
            </Link>
            <Link href="/admin/products" className="hover:text-maroon">
              Products
            </Link>
            <Link href="/admin/categories" className="hover:text-maroon">
              Categories
            </Link>
            <Link href="/admin/media" className="hover:text-maroon">
              Media
            </Link>
            <form action={logoutAdmin}>
              <button type="submit" className="hover:text-maroon">
                Logout
              </button>
            </form>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
    </main>
  );
};

export default AdminLayout;
