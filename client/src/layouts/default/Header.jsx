import React from 'react';
import PropTypes from 'prop-types';
import AvatarComp from './Header/components/Avatar';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-white dark:bg-header_background border-b-[.8px] dark:border-header_border shadow-md w-full">
      <div className="flex items-center space-x-4">
        <img
          src="logo.svg"
          alt="Logo"
          className="w-8 h-8 cursor-pointer"
          onClick={toggleSidebar}
        />
        <h1 className="text-lg font-semibold text-gray-800 dark:text-foreground">Monitoring</h1>
      </div>
      <div className="flex items-center gap-4">
        <AvatarComp />
      </div>
    </header>
  );
};

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired
};

export default Header; 