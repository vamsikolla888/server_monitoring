import { useEffect, useRef } from 'react';

const Overlay = ({ onClickOutside, children, className }) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      console.log('OVERLAY EVENT', event);
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [onClickOutside]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default Overlay;
