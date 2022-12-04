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
        if (item.uid === action.payload.uid) {
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
        (machine: IMachine) => machine.uid !== action.payload,
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const machineAction = machineSlice.actions;

export default machineSlice.reducer;
