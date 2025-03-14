import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import SignIn from './auth/SignIn';
import DefaultLayout from './layouts/default';
import Error from './pages/misc/Error';
import FileManager from "@/pages/filemanager";
import TableProvider from '@/components/custom/tables/context/TableProvider';
import lazyLoading from './components/common/lazy-loading';




/**@Pages Components */
const Configurations = lazyLoading("@/pages/configurations/");
const PM2 = lazyLoading("@/pages/pm2");
const FilesListView = lazyLoading("@/pages/filemanager/components/FileListView");
const Dashboard = lazyLoading("@/components/Dashboard");

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
              { path: ":fileId", element: <FileManager /> },
            ]
          },
          { path: "configurations", element: <Configurations /> },
          { path: "pm2", element: <PM2 />},
          { path: 'error', element: <Error /> },
          { path: '*', element: <Error /> },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routerArr);
