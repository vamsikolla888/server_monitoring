import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

/**@Redux */
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeProvider';
import { Provider } from 'react-redux';
import "./index.css";
import "./styles/globals.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; /* PrimeReact Theme */
import "primereact/resources/primereact.min.css"; /* Core styles */
import "primeicons/primeicons.css"; /* Icons */

import { router } from './router.jsx';
import { store } from './redux/store.js';
import { ToastContainer } from 'react-toastify';
import { Toaster } from "@/components/ui/sonner"

const persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme={"dark"} storageKey='vite-ui-theme'>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RouterProvider router={router} />
          <ToastContainer
            position="top-right"
            className="p-0 m-0"
            theme=""
            style={{ width: '400px', padding: 0 }}
          />
          <Toaster position="top-right" richColors />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
