'use client';

import { MainNavbar, PagesNavbar } from './navigation';
import MainFooter from './MainFooter';
import CustomToast from '@/components/toasts/CustomToast';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="h-dvh w-dvw overflow-x-hidden">
      <MainNavbar />
      <PagesNavbar />
      <main className="mt-[100px] min-h-[calc(100vh-390px)] w-screen sm:mt-[120px] lg:mt-[220px]">
        {children}
      </main>
      <MainFooter />
      <CustomToast />
    </div>
  );
};

export default MainLayout;
