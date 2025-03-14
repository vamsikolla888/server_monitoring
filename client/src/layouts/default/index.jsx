import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { usePrefetch } from '@/redux/api/files.api';

const DefaultLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  usePrefetch("getFiles")();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="bg-white dark:bg-main_background flex flex-col h-screen overflow-hidden">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isCollapsed={isCollapsed} />
        <main className="flex-1 overflow-y-auto dark:bg-main_background px-4 py-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
