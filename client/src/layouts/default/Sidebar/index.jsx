import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import CommonLucideIcon from '@/common/Icons/CommonLucideIcon';
import Navigation from "./Navigation";
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllDetailsQuery } from '@/redux/Apislice';


const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { data, isLoading, refetch } = useGetAllDetailsQuery(
    `/menus?filter=${JSON.stringify({ criteria: [] })}&sortField=sequenceNo&direction=desc`
  );

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');

  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 bg-neutral-50 border-r-[1px] border-neutral-100 top-0 z-9999 flex h-screen lg:w-72.5 flex-col overflow-y-hidden duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className='flex space-x-5 items-center py-2 px-4'>
            <img src="logo.svg" style={{width: 30, height: 30}} alt={"logo"}/>
            <p className='font-bold text-lg mt-2 bg-gradient-to-r from-purple-400 via-purple-900 to-orange-600 text-transparent bg-clip-text'>Server Management</p>
        </div>
      <Navigation />
    </aside>
  );
};

export default Sidebar;
