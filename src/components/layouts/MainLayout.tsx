import { Outlet } from 'react-router-dom';
import { MainNavbar, PagesNavbar } from '@/components/navbars';
import { MainFooter } from '@/components/footers';

function MainLayout() {
  return (
    <div className="h-dvh w-dvw overflow-x-hidden">
      <MainNavbar />
      <PagesNavbar />
      <main className="mt-[100px] min-h-[calc(100vh-390px)] w-screen sm:mt-[120px] lg:mt-[220px]">
        <Outlet />
      </main>
      <MainFooter />
    </div>
  );
}

export default MainLayout;
