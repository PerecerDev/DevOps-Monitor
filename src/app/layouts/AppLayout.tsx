import { Outlet } from 'react-router-dom';

import { MobileSidebar, Sidebar } from '@/app/components/Sidebar';
import { TopBar } from '@/app/components/TopBar';
import { CommandPalette } from '@/features/search/components/CommandPalette';
import { useCommandPalette } from '@/shared/hooks/useCommandPalette';

export function AppLayout() {
  const { open, setOpen } = useCommandPalette();

  return (
    <div className="flex h-dvh overflow-hidden">
      <Sidebar />
      <MobileSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar
          onOpenCommandPalette={() => {
            setOpen(true);
          }}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6" id="main-content">
          <Outlet />
        </main>
      </div>
      <CommandPalette open={open} onOpenChange={setOpen} />
    </div>
  );
}
