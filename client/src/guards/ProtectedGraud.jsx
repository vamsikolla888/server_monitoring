import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedGraud = () => {
  const isUserAuthenticated = useAuth();
  return <Outlet />
  // console.log('ISUSERAUTHETI', isUserAuthenticated);
  // return isUserAuthenticated ? <Outlet /> : <Navigate to="/auth/signin" />;
};

export default ProtectedGraud;
