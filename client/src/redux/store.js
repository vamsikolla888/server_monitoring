import { configureStore } from '@reduxjs/toolkit';
import { ApiStore } from './Apislice';
import Uislice from './reducers/Uislice';
import dialogSlice from './reducers/dialogSlice';

/**@Redux Persist */
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

const reducers = combineReducers({
  Uislice,
  dialogSlice,
  [ApiStore.reducerPath]: ApiStore.reducer,
});

const persistConfig = {
  key: 'root',
  // version:1,
  storage,
};

const persistReducers = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ApiStore.middleware),
});
