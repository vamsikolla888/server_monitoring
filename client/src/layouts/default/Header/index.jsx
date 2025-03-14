import PropTypes from 'prop-types';
import Avatar from './components/Avatar';
import { DarkModeToggle } from './components/DarkModeToggle';

const Header = ({ sidebarOpen, setSidebarOpen}) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-header_background border-[1px] border-b-header_border text-foreground">
      <div className="flex flex-grow items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center justify-between dark:bg-header_background">
          <div className="flex items-center gap-3 overflow-hidden" onClick={() => setSidebarOpen(prev => !prev)}>
            <img src="logo.svg" className="w-8 h-8 min-w-[2rem]" alt="logo"/>
            {!sidebarOpen && (
              <p className='font-bold text-lg bg-gradient-to-r from-purple-400 via-purple-900 to-orange-600 text-transparent bg-clip-text whitespace-nowrap'>
                Server Management
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DarkModeToggle />
            <Avatar />
          </ul>
        </div>
      </div>
    </header>
  );

};
Header.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
};

export default Header;
