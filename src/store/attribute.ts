import {createSlice} from '@reduxjs/toolkit';
import {IAttribute} from '../helpers/types';

interface IProps {
  value: IAttribute[] | [];
}

const initialState: IProps = {
  value: [],
};

export const attributeSlice = createSlice({
  name: 'attribute',
  initialState,
  reducers: {
    add: (state, action) => {
      state.value = [...state.value, ...action.payload];
    },
    update: (state, action) => {
      state.value = state.value.map(item => {
        if (item.name === action.payload.name) {
          return action.payload;
        }
        return item;
      });
    },
    remove: (state, action) => {
      state.value = state.value.filter(
        (attribute: IAttribute) => attribute.name !== action.payload,
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const attributeAction = attributeSlice.actions;

export default attributeSlice.reducer;
