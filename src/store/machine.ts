import {createSlice} from '@reduxjs/toolkit';
import {IMachine} from '../helpers/types';

interface IProps {
  value: IMachine[] | [];
}

const initialState: IProps = {
  value: [],
};

export const machineSlice = createSlice({
  name: 'machine',
  initialState,
  reducers: {
    add: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    setTitle: (state, action) => {
      state.value = state.value.map(item => {
        if (item.id === action.payload.id) {
          return {...item, titleAttribute: action.payload.titleAttribute};
        }
        return item;
      });
    },
    update: (state, action) => {
      state.value = state.value.map(item => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    },
    remove: (state, action) => {
      state.value = state.value.filter(
        (machine: IMachine) => machine.id !== action.payload,
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const attributeAction = machineSlice.actions;

export default machineSlice.reducer;
