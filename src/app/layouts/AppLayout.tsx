import { Outlet } from 'react-router-dom';

import { MobileSidebar, Sidebar } from '@/app/components/Sidebar';
import { TopBar } from '@/app/components/TopBar';

export function AppLayout() {
  return (
    <div className="flex h-dvh overflow-hidden">
      <Sidebar />
      <MobileSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6" id="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
