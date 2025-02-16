import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CommonButton from '../button/CommonButton';
import { buttonVariants } from '../../constants/constants';

/**
 * @Props
 * @MenuButtonValue
 * @MenuButtonTemplate
 * @MenuItems
 * @MenuItemTemplate
 * @MenuButtonClassName
 * @MenuItemsClassName
 * @MenuItemClassName
 *
 *
 */

const HeadlessMenuProps = {
  MenuButtonTemplate: PropTypes.func,
  MenuItemTemplate: PropTypes.func,
  menuButtonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  menuItems: PropTypes.array,
  menuItemOptionValue: PropTypes.string,
  menuButtonClassName: PropTypes.string,
  menuItemsClassName: PropTypes.string,
  menuItemClassName: PropTypes.string,
};

const defaultProps = {
  menuItemOptionValue: 'value',
  menuButtonValue: 'Options',
  menuItems: [],
  menuButtonClassName: '',
  menuItemsClassName: '',
  menuItemClassName: '',
};

const MENUBUTTON__BASE__CLASSNAME = '';
const MENUITEMS__BASE__CLASSNAME =
  'min-w-50 bg-white rounded border-[1px] border-slate-300 z-99 mt-2 shadow-lg';
const MENUITEM__BASE__CLASSNAME = 'min-w-50 px-3';

const HeadlessMenu = (props) => {
  console.log('PRO', props);
  let {
    menuButtonValue,
    MenuButtonTemplate,
    menuItems,
    menuButtonClassName,
    menuItemsClassName,
    menuItemClassName,
  } = props;
  menuButtonClassName = classNames(
    MENUBUTTON__BASE__CLASSNAME,
    menuButtonClassName
  );
  menuItemsClassName = classNames(
    MENUITEMS__BASE__CLASSNAME,
    menuItemsClassName
  );
  menuItemClassName = classNames(MENUITEM__BASE__CLASSNAME, menuItemClassName);
  return (
    <div>
      <Menu>
        {({ open }) => (
          <>
            <MenuButton className={menuButtonClassName}>
              {MenuButtonTemplate ? (
                <MenuButtonTemplate />
              ) : (
                <CommonButton
                  variant={buttonVariants.CANCEL}
                  className={menuButtonClassName}
                >
                  {menuButtonValue}
                </CommonButton>
              )}
            </MenuButton>
            <Transition
              show={open}
              enter="transform transition duration-100 ease-in"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transform transition duration-75 ease-out"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <MenuItems anchor="bottom end" className={menuItemsClassName}>
                {menuItems.map((menuItem, index) => (
                  <MenuItem key={index}>
                    {(menuItemProps) => (
                      <div>
                        <HeadlessMenuItem
                          item={menuItem}
                          menuItemProps={menuItemProps}
                          menuItemClassName={menuItemClassName}
                          {...props}
                        />
                      </div>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};

/**
 * @Props
 * @item
 * @MenuItemTemplate
 * @menuItemProps - { active: boolean, close: func, disabled: boolean, focus: boolean}
 * @menuItemOpionValue
 * @menuItemClassName
 */

const HeadlessMenuItemProps = {
  MenuItemTemplate: PropTypes.func,
  menuItemProps: PropTypes.shape({
    active: PropTypes.bool,
    close: PropTypes.func,
    disabled: PropTypes.bool,
    focus: PropTypes.bool,
  }),
  item: PropTypes.any,
  menuItemOptionValue: PropTypes.string,
  menuItemClassName: PropTypes.string,
};

const menuItemDefaultProps = {};

const HeadlessMenuItem = ({
  item,
  MenuItemTemplate,
  menuItemProps,
  menuItemOptionValue,
  menuItemClassName,
}) => {
  return (
    <>
      {MenuItemTemplate ? (
        MenuItemTemplate(
          menuItemProps,
          item,
          menuItemOptionValue,
          menuItemClassName
        )
      ) : (
        <div
          className={classNames(menuItemClassName, {
            'bg-indigo-100': menuItemProps.focus,
          })}
        >
          <span className="px-3">{item[menuItemOptionValue]}</span>
        </div>
      )}
    </>
  );
};

HeadlessMenu.propTypes = HeadlessMenuProps;
HeadlessMenu.defaultProps = defaultProps;

/**@HeadlessMenuItem Definition */
HeadlessMenuItem.propTypes = HeadlessMenuItemProps;
HeadlessMenuItem.defaultProps = menuItemDefaultProps;

export default HeadlessMenu;
