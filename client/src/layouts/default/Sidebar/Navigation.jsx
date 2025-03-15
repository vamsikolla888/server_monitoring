import React from 'react'
import { Layout, Bolt } from 'lucide-react';
import { LuLayoutDashboard } from "react-icons/lu";
import { Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import DynamicIcon from '@/components/common/dynamic-icon';

// const navigation = [
//   {label: "Dashboard", icon: LuLayoutDashboard, href: "/dashboard"},
//   {label: "PM2", icon: Cpu, href: "/pm2"},
//   {label: "File Manager", icon: Layout, href: "/filemanager"},
//   {label: "Configurations", icon: Bolt, href: "/configurations"}
// ]


const navigation = [
  {label: "Dashboard", icon: "Infinity", library: "lucide-react", href: "/dashboard"},
  {label: "PM2", icon: "Infinity", library: "lucide-react", href: "/pm2"},
  {label: "File Manager", icon: "Infinity", library: "lucide-react", href: "/filemanager"},
  {label: "Configurations", icon: "Infinity", library: "lucide-react", href: "/configurations"},


]
const Navigation = ({ isCollapsed }) => {
  const location = useLocation();

  return (
    <ul className='flex flex-col my-4'>
      {navigation.map(navitem => {
        const Icon = navitem.icon;
        const isActive = location.pathname === navitem.href;

        return (
          <Link to={navitem.href} key={navitem.href}>
            <motion.li
              // whileHover={{ backgroundColor: 'rgb(238 242 255)' }}
              transition={{ duration: 0.2 }}
              className={`
                relative flex items-center py-2.5 px-4
                rounded-md mx-2 cursor-pointer group
                ${isActive ? 'bg-indigo-50 dark:bg-neutral-800' : ''}
                hover:bg-indigo-50/80 dark:hover:bg-neutral-900
              `}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DynamicIcon
                      library={navitem.library}
                      icon={navitem.icon} 
                      className={`
                        size-[1.2rem] min-w-[1.2rem]
                        transition-colors duration-200
                        ${isActive 
                          ? 'text-neutral-50 fill-indigo-100 dark:fill-neutral-700' 
                          : 'text-gray-500 fill-gray-100 dark:fill-neutral-800 group-hover:text-indigo-500 group-hover:fill-indigo-50 dark:group-hover:fill-neutral-700 dark:group-hover:text-neutral-50'
                        }
                      `} 
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="bg-gray-800 text-white px-3 py-1.5 rounded-md text-sm font-medium shadow-lg border-0"
                  >
                    {navitem.label}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              {!isCollapsed && (
                <span className={`
                  ml-3 text-sm font-medium whitespace-nowrap
                  transition-colors duration-200
                  ${isActive 
                    ? 'text-indigo-600 dark:text-neutral-50' 
                    : 'text-gray-500 group-hover:text-indigo-500 dark:group-hover:text-neutral-50'
                  }
                `}>
                  {navitem.label}
                </span>
              )}

              {isCollapsed && (
                <div className="
                  absolute left-12 ml-1 px-2 py-1
                  bg-gray-800 text-white text-xs
                  rounded-md opacity-0 invisible
                  group-hover:opacity-100 group-hover:visible
                  transition-opacity duration-200 whitespace-nowrap
                  z-1 pointer-events-none
                ">
                  {navitem.label}
                </div>
              )}
            </motion.li>
          </Link>
        );
      })}
    </ul>
  )
}

Navigation.propTypes = {
  isCollapsed: PropTypes.bool
};

export default Navigation;
