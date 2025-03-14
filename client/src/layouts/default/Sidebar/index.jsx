import React from 'react';
import Navigation from "./Navigation";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import PropTypes from 'prop-types';

const Sidebar = ({ isCollapsed }) => {
  return (
    <motion.aside
      initial={false}
      animate={{
        width: isCollapsed ? '4.3rem' : '16rem',
        opacity: 1
      }}
      transition={{ duration: 0.2 }}
      className={cn(
        'fixed left-0 top-0 z-40 dark:bg-main_background',
        'flex h-full flex-col',
        'lg:static transform',
        'transition-transform duration-200',
        'border-r-[.8px] dark:border-header_border'
      )}
    >
      <Navigation isCollapsed={isCollapsed} />
    </motion.aside>
  );
};

Sidebar.propTypes = {
  isCollapsed: PropTypes.bool
};

export default Sidebar;
