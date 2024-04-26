import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  Storage,
  persistReducer,
  persistStore,
} from 'redux-persist';

import {configureStore} from '@reduxjs/toolkit';
import rootReducer from '@redux/reducers';
import {MMKV} from 'react-native-mmkv';

// #region MMKV setup
const storage = new MMKV();

export const reduxStorage: Storage = {
  setItem: (key: string, value: any) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key: string) => {
    storage.delete(key);
    return Promise.resolve();
  },
};
// #endregion

// #region persist setup
const persistConfig = {
  key: 'root',
  storage: reduxStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
// #endregion

// #region store setup
let store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let persistor = persistStore(store);
// #endregion

export type StoreRootState = ReturnType<typeof store.getState>;
export type StoreDispatchType = typeof store.dispatch;

export {store, persistor};
