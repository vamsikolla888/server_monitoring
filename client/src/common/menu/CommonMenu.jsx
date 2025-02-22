import { forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'primereact/menu';
import ClickOutside from '../../components/ClickOutside';
import CommonLucideIcon from '../Icons/CommonLucideIcon';
import Overlay from './Overlay';
// // const CommonMenu = forwardRef(({ children }, ref) => {
// //     console.log("MENU REF", ref);
// //     const items = [
// //         {
// //             template: () => <>{children}</>
// //         }
// //     ];
// //   return (
// //     <div className=''>
// //         <Menu popupAlignment='right' model={items} ref={ref} popup id="popup_menu_right" className=''>
// //         </Menu>
// //     </div>
// //   )
// // })

// const CommonMenu = ({ children, showMenu, tableMenuOptions, setShowMenu }) => {
// 	return (
// 		<Overlay onClickOutside={() => setShowMenu(false)} className="relative">
// 			<div
// 				className="rounded-md p-2 z-99999 cursor-pointer"
// 				onClick={() => setShowMenu(prev => !prev)}
// 			>
// 				<CommonLucideIcon name="ellipsis-vertical" />
//             </div>
//             <div>
// 				{showMenu && (
// 					<div className="bg-graydark absolute z-9999 right-3">
// 						{children}
// 					</div>
// 				)}
// 			</div>
// 		</Overlay>
// 		// <ClickOutside className={"relative"}>
// 		// <div className="rounded-md p-2 z-99999 cursor-pointer relative" onClick={() => setShowMenu(prev => !prev)} >
// 		//     <CommonLucideIcon name={"ellipsis-vertical"} />
// 		//     {
// 		//         showMenu &&
// 		//         <div className={`bg-graydark w-50 h-[400px] absolute mt-5 right-3`}>
// 		//             {children}
// 		//         </div>
// 		//     }
// 		//     </div>
// 		// </ClickOutside>
// 	);
// };

// CommonMenu.displayName = "menu";
// export default CommonMenu

/**@NOTE */
//pass only absolute element as child component

const CommonMenu = ({ children, setShowMenu }) => {
  return (
    <ClickOutside
      className={'relative z-99999'}
      onClick={() => setShowMenu(false)}
    >
      {/* // <ClickOutside className={""} onClick={() => setShowMenu(false)}> */}
      {children}
    </ClickOutside>
  );
};

export default CommonMenu;
