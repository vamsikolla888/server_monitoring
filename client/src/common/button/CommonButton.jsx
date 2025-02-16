import PropTypes from 'prop-types';
import classNames from 'classnames';

const defaultProps = {
  className: '',
  children: undefined,
  variant: 'primary',
  iconSize: 16,
  disabled: false,
  onClick: () => {},
};

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'warning',
    'danger',
    'cancel',
  ]),
  iconSize: PropTypes.number,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

/**@ClassNames */
const baseClassNames =
  'cursor-pointer rounded-lg transition hover:bg-opacity-90';
const variantClassNames = {
  primary: 'bg-boxdark text-white',
  cancel: 'bg-cancel text-white',
  danger: 'bg-red-700 text-white',
  secondary: 'bg-gray text-slate-800',
  outlineCancel:
    'border-cancel border-[1.5px] text-cancel bg-white hover:bg-cancel hover:text-white',
};

const CommonButton = ({ children, variant, className, onClick, type }) => {
  const buttonClassNames = classNames(
    className,
    baseClassNames,
    variantClassNames[variant]
  );
  return (
    <button type={type} className={buttonClassNames} onClick={onClick}>
      {children}
    </button>
  );
};

/**@ComponentTypes */
CommonButton.propTypes = propTypes;
CommonButton.defaultProps = defaultProps;

export default CommonButton;
