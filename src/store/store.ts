// import {configureStore} from '@reduxjs/toolkit';
// import attributeSlice from './attribute';
// import categorySlice from './category';
// import machineSlice from './machine';

// export const store = configureStore({
//   reducer: {
//     attribute: attributeSlice,
//     machine: machineSlice,
//     category: categorySlice,
//   },
// });

import {
  configureStore,
  // Action,
  // AnyAction,
  // CombinedState,
  // combineReducers,
  // ThunkAction,
} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {rootReducer} from './rootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
  });

// const makeStore = () =>
//   configureStore({
//     reducer: rootReducer,
//   });

export const store = makeStore();

export const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
