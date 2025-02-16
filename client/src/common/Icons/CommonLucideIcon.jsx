import dynamicIconImports from 'lucide-react/dynamicIconImports';
import PropTypes from 'prop-types';
import { lazy, Suspense, useMemo } from 'react';
import { ArrowBigDown } from 'lucide-react';

const CommonLucideIcon = ({ name, className, size, onClick }) => {
  // Verify if the function exists
  const importFunction = dynamicIconImports[name];
  if (!importFunction) {
    console.error(`No import function found for icon name: ${name}`);
    return <ArrowBigDown className={className} />;
  }
  const LucideIcon = useMemo(() => lazy(importFunction), [importFunction]);

  return (
    // <Suspense fallback={<ArrowBigDown className={className} />}>
    <Suspense fallback={<></>}>
      <div onClick={onClick}>
        <LucideIcon className={className} size={size} />
      </div>
    </Suspense>
  );
};

CommonLucideIcon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

CommonLucideIcon.defaultProps = {
  onClick: () => {},
};

export default CommonLucideIcon;
