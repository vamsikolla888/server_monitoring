import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const useOnRouteChange = (route, callback) => {
  const location = useLocation();
  const isUnmountingRef = useRef(false);

  useEffect(() => {
    // Set the flag to true when the component is about to unmount
    return () => {
      if (location.pathname === route) {
        isUnmountingRef.current = true;
      }
    };
  }, [location.pathname, route]);

  useEffect(() => {
    // Check if the component is unmounting due to a route change
    return () => {
      if (isUnmountingRef.current && location.pathname === route) {
        callback();
        isUnmountingRef.current = false; // Reset the flag
      }
    };
  }, [location.pathname, route, callback]);
};

export default useOnRouteChange;