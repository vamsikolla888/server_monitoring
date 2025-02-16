import { createBrowserRouter, Navigate } from 'react-router-dom';
import SignIn from './auth/SignIn';
import DefaultLayout from './layouts/default';
import Dashboard from './components/Dashboard/Dashboard';
import Error from './components/Misc/Error';
import ProtectedGuard from './guards/ProtectedGraud';
import Profile from './components/profile/Profile';

const routerArr = [
  // Auth routes should be separate and not under the ProtectedGuard
  {
    path: '/auth',
    children: [
      {
        path: 'signin',
        element: <SignIn />,
      },
      // Optional: You can add more auth-related routes here
      {
        path: '*', // Handle any unknown auth routes
        element: <Navigate to="/auth/signin" replace />,
      },
    ],
  },
  {
    path: '/',
    element: <ProtectedGuard />, // Protect all routes under "/"
    children: [
      {
        path: '/',
        element: <DefaultLayout />,
        children: [
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: '/', // Dashboard route
            element: <Dashboard />,
          },
          {
            path: 'dashboard', // Dashboard route
            element: <Dashboard />,
          },
          {
            path: 'error',
            element: <Error />,
          },
          {
            path: '*',
            element: <Error />,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routerArr);
