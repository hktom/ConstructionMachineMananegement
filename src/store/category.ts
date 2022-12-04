import {createSlice} from '@reduxjs/toolkit';
import {ICategory} from '../helpers/types';

interface IProps {
  value: ICategory[] | [];
}

const initialState: IProps = {
  value: [],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    add: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    setTitle: (state, action) => {
      state.value = state.value.map(item => {
        if (item.uid === action.payload.id) {
          return {...item, titleAttribute: action.payload.titleAttribute};
        }
        return item;
      });
    },
    update: (state, action) => {
      state.value = state.value.map(item => {
        if (item.uid === action.payload.uid) {
          return action.payload;
        }
        return item;
      });
    },
    remove: (state, action) => {
      state.value = state.value.filter(
        (machine: ICategory) => machine.uid !== action.payload,
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const categoryAction = categorySlice.actions;

export default categorySlice.reducer;
