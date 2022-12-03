import {configureStore} from '@reduxjs/toolkit';
import attributeSlice from './attribute';
import categorySlice from './category';
import machineSlice from './machine';

export const store = configureStore({
  reducer: {
    attribute: attributeSlice,
    machine: machineSlice,
    category: categorySlice,
  },
});
