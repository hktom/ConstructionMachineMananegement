import {combineReducers} from '@reduxjs/toolkit';
import attributeSlice from './attribute';
import categorySlice from './category';
import machineSlice from './machine';

export type IRootReducer = 'attribute' | 'machine' | 'category';

export const rootReducer = combineReducers({
  attribute: attributeSlice,
  machine: machineSlice,
  category: categorySlice,
});

export type RootState = ReturnType<typeof rootReducer>;
