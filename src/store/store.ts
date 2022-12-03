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

import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {rootReducer} from './rootReducer';

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export const store = makeStore();

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
