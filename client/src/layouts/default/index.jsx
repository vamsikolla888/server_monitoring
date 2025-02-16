import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import SessionExpiredDialog from '@/common/dialog/SessionExpiredDialog';
import { dialogTypes } from '@/constants/constants';
import { UiProvider } from '@/context/UiContext';
import CommonDialog from '@/common/dialog/CommonDialog';
import TableSettings from '@/common/tables/TableSettings';
import { hideDialog } from '@/redux/reducers/dialogSlice';

const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  /**@ReduxStates */
  const dialogState = useSelector((state) => state.dialogSlice);
  const dispatch = useDispatch();


  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="w-full p-4 md:p-6 2xl:px-5 2xl:py-4 bg-white">
              <UiProvider>
                <Outlet />
                <SessionExpiredDialog
                  visible={dialogState[dialogTypes.SESSIONEXPIRED]?.show}
                  onHide={() => {}}
                />
                <CommonDialog visible={dialogState[dialogTypes.TABLESETTINGS]?.show} onHide={() => dispatch(hideDialog({ type: dialogTypes.TABLESETTINGS}))} className={"w-[30%]"}>
                  <TableSettings />
                </CommonDialog>
              </UiProvider>
            </div>
          </main>

          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;
