import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

/**@Redux */
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import "./index.css";
import "./css/globals.css"
import { router } from './router.jsx';
import { store } from './redux/store.js';
import { ToastContainer } from 'react-toastify';

const persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          className="p-0 m-0"
          theme=""
          style={{ width: '400px', padding: 0 }}
        />
      </PersistGate>
    </Provider>
  </StrictMode>
);
