import { createBrowserRouter, Navigate } from 'react-router-dom';
import SignIn from './auth/SignIn';
import DefaultLayout from './layouts/default';
import Error from './pages/misc/Error';
import FileManager from "@/pages/filemanager";
import Configurations from './pages/configurations';
import TableProvider from '@/components/custom/tables/context/TableProvider';
import Dashboard from './components/Dashboard';
import FileListView from './pages/filemanager/components/FileListView';
const routerArr = [
  {
    path: '/auth',
    children: [
      { path: 'signin', element: <SignIn /> },
      { path: '*', element: <Navigate to="/auth/signin" replace /> },
    ],
  },
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { 
        path: '/', element: <TableProvider />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "filemanager", element: <FileManager />,
            children: [
              { path: ":fileId", element: <FileManager /> }
            ]
          },
          { path: "configurations", element: <Configurations /> },
          { path: 'error', element: <Error /> },
          { path: '*', element: <Error /> },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routerArr);
