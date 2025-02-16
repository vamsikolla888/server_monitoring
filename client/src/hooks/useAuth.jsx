import { useEffect } from 'react';
// import useLocalStorage from "./useLocalStorage"
import { useLocation } from 'react-router-dom';

const useAuth = () => {
  const accessToken = localStorage.getItem('accessToken');
  const location = useLocation();

  useEffect(() => {
    console.log('RERENDERED', accessToken);
  }, [accessToken, location]);
  return accessToken ? accessToken.toString() : false;
};

export default useAuth;
