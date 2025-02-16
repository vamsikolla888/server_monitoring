import PropTypes from 'prop-types';
import { lazy, Suspense, useMemo } from 'react';
import { ArrowBigDown } from 'lucide-react';

/**@ICONTYPES */
export const REACT__ICON__TYPES = {
  ANTDESIGN: { prefix: 'ai', import: () => import('react-icons/ai') },
  BOOTSTRAP: { prefix: 'bs', import: () => import('react-icons/bs') },
  BOXICONS: { prefix: 'bi', import: () => import('react-icons/bi') },
  CIRCUM: { prefix: 'ci', import: () => import('react-icons/ci') },
  CSS: { prefix: 'cg', import: () => import('react-icons/cg') },
  DEVICONS: { prefix: 'di', import: () => import('react-icons/di') },
  FEATHER: { prefix: 'fi', import: () => import('react-icons/fi') },
  FLATCOLOR: { prefix: 'fc', import: () => import('react-icons/fc') },
  FONTAWESOME5: { prefix: 'fa', import: () => import('react-icons/fa') },
  FONTAWESOME6: { prefix: 'fa6', import: () => import('react-icons/fa6') },
  GAMEICONS: { prefix: 'gi', import: () => import('react-icons/gi') },
  GITHUBICONS: { prefix: 'go', import: () => import('react-icons/go') },
  GROMMETICONS: { prefix: 'gr', import: () => import('react-icons/gr') },
  HEROICONS: { prefix: 'hi', import: () => import('react-icons/hi') },
  VSCODEICONS: { prefix: 'vsc', import: () => import('react-icons/vsc') },
  MATERIALDESIGN: { prefix: 'md', import: () => import('react-icons/md') },
  LUCIDE: { prefix: 'lu', import: () => import('react-icons/lu') },
};

/**
 *
 * @param {*} props
 * @name
 * @className
 * @size
 * @iconType
 */

const ReactIconsProps = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.number,
  onClick: PropTypes.func,
  iconType: PropTypes.oneOf(Object.keys(REACT__ICON__TYPES)),
};

const defaultProps = {
  name: 'FcCancel',
  iconType: REACT__ICON__TYPES.FLATCOLOR,
  size: 18,
  className: '',
  onClick: () => {},
};

const ReactIcons = ({ name, className, size, onClick, iconType }) => {
  const importFunction = useMemo(() => {
    return () =>
      iconType
        .import()
        .then((module) => {
          if (module[name]) {
            return { default: module[name] };
          } else {
            console.error(`Icon ${name} not found in lucide icons`);
            return ArrowBigDown;
          }
        })
        .catch((err) => {
          console.error('Error importing icon:', err);
          return ArrowBigDown;
        });
  }, [name]);

  const IconComponent = useMemo(() => lazy(importFunction), [name]);

  return (
    <Suspense fallback={<></>}>
      <div onClick={onClick}>
        {IconComponent && <IconComponent className={className} size={size} />}
      </div>
    </Suspense>
  );
};

ReactIcons.propTypes = ReactIconsProps;
ReactIcons.defaultProps = defaultProps;
ReactIcons.displayName = 'React Icons';
export default ReactIcons;
