import { createSlice } from '@reduxjs/toolkit';
import { ToastProps } from './types';

const initialState: ToastProps = {
  message: '',
  type: 'default',
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type || 'default';
    },
    clearToast: (state) => {
      state.message = '';
      state.type = 'default';
    },
  },
});

export const { showToast, clearToast } = toastSlice.actions;

export default toastSlice.reducer;