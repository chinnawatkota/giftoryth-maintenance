import type { ReactNode } from 'react';
import MainLayout from '../_components/MainLayout';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
