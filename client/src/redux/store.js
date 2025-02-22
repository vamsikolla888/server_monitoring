import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { fileApiSlice } from './api/files.api';
import { configurationsApiSlice } from './api/configurations.api';

// Combine reducers
const rootReducer = combineReducers({
  [fileApiSlice.reducerPath]: fileApiSlice.reducer,
  [configurationsApiSlice.reducerPath]: configurationsApiSlice.reducer
});

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['fileApiSlice', 'configurationsApiSlice'], // Ensure correct reducer keys
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER',
          'persist/PURGE',
          'persist/FLUSH',
          'persist/PAUSE'
        ]
      }
    }).concat(
      fileApiSlice.middleware,
      configurationsApiSlice.middleware
    ),
});

// Persistor - Required for persistence to work
export const persistor = persistStore(store);

