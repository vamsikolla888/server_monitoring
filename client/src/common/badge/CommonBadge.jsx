import Proptypes from 'prop-types';
import classNames from 'classnames';
export const BadgeColors = {
  GREEN: 'green',
  PINK: 'pink',
  ORANGE: 'orange',
  VIOLET: 'violet',
  PURPLE: 'purple',
  YELLOW: 'yellow',
  LIME: 'lime',
  TEAL: 'teal',
  CYAN: 'cyan',
  BLUE: 'blue',
  INDIGO: 'indigo',
  ROSE: 'rose',
  RED: 'red',
  ZINC: 'zinc',
  GRAY: 'gray',
};
const badgeColorCombinations = {
  [BadgeColors.GREEN]: { bgColor: '#dcfce7', color: '#16a34a' },
  [BadgeColors.PINK]: { bgColor: '#fce7f3', color: '#db2777' },
  [BadgeColors.ORANGE]: { bgColor: '#ffedd5', color: '#ea580c' },
  [BadgeColors.VIOLET]: { bgColor: '#ede9fe', color: '#7c3aed' },
  [BadgeColors.PURPLE]: { bgColor: '#f3e8ff', color: '#9333ea' },
  [BadgeColors.YELLOW]: { bgColor: '#fef9c3', color: '#ca8a04' },
  [BadgeColors.LIME]: { bgColor: '#ecfccb', color: '#65a30d' },
  [BadgeColors.TEAL]: { bgColor: '#ccfbf1', color: '#0d9488' },
  [BadgeColors.CYAN]: { bgColor: '#cffafe', color: '#0891b2' },
  [BadgeColors.BLUE]: { bgColor: '#dbeafe', color: '#2563eb' },
  [BadgeColors.INDIGO]: { bgColor: '#e0e7ff', color: '#4f46e5' },
  [BadgeColors.ROSE]: { bgColor: '#ffe4e6', color: '#e11d48' },
  [BadgeColors.RED]: { bgColor: '#fee2e2', color: '#dc2626' },
  [BadgeColors.ZINC]: { bgColor: '#f0fdf4', color: '#3f3f46' },
  [BadgeColors.GRAY]: { bgColor: '#f0fdf4', color: '#3f3f46' },
};
const defaultProps = {
  customBadge: false,
  options: [],
  value: '',
  optionLabel: 'value',
};
const CommonBadge = ({ children, options, optionLabel, value, className }) => {
  const badgeClassName = classNames('px-2 py-1 rounded', className);
  let badgeColor = badgeColorCombinations[BadgeColors.GREEN];
  if (options.length > 0) {
    let findOption = options.find((option) => option[optionLabel] === value);
    if (findOption) badgeColor = badgeColorCombinations[findOption.badgeColor];
  }
  return (
    <span
      className={badgeClassName}
      style={{
        backgroundColor: badgeColor.bgColor,
        color: badgeColor.color,
        fontSize: '1rdbeafeem',
        paddingTop: '1px',
        paddingBottom: '1px',
        borderRadius: '0.25px',
        fontFamily: `"Inter", sans-serif`,
        fontWeight: '600',
        letterSpacing: '0.6px',
      }}
    >
      {children}
    </span>
  );
};
CommonBadge.defaultProps = defaultProps;
CommonBadge.propTypes = {
  children: Proptypes.node.isRequired,
  field: Proptypes.object,
  options: Proptypes.array,
  optionLabel: Proptypes.string,
  value: Proptypes.string,
  customBadge: Proptypes.bool,
  className: Proptypes.string,
};
export default CommonBadge;
